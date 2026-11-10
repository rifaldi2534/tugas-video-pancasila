/**
 * SPESIMEN TERAKHIR — render_chunks.ts
 * Resilient Chunked Video Export Pipeline for all 7 Scenes.
 * 
 * Designed specifically for low-memory environments (5.6 GB RAM ceiling):
 * - Bundles the Remotion source code once
 * - Sequentially renders Scene01 through Scene07 to out/chunks/Scene01.mp4 ... Scene07.mp4
 * - Restricts concurrency to 2 threads to prevent Chrome memory exhaustion
 * - Prepares chunked MP4s for instant lossless FFmpeg concatenation
 */

import path from 'path';
import fs from 'fs';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';

export const SCENE_IDS = [
  'Scene01',
  'Scene02',
  'Scene03',
  'Scene04',
  'Scene05',
  'Scene06',
  'Scene07',
] as const;

interface RenderChunksOptions {
  scenes?: string[];
  chunksDir?: string;
  concurrency?: number;
  crf?: number;
  scale?: number;
  frameLimitPerChunk?: number;
}

async function renderChunks(options: RenderChunksOptions = {}) {
  const rootDir = path.resolve(__dirname, '..');
  const entryPoint = path.resolve(rootDir, 'src/index.ts');
  const chunksDir = options.chunksDir || path.resolve(rootDir, 'out/chunks');

  if (!fs.existsSync(chunksDir)) {
    fs.mkdirSync(chunksDir, { recursive: true });
  }

  const scenesToRender = options.scenes && options.scenes.length > 0 ? options.scenes : SCENE_IDS;
  const concurrency = options.concurrency || 2;
  const crf = options.crf || 20;
  const scale = options.scale !== undefined ? options.scale : 1.0;

  console.log('================================================================');
  console.log(' SPESIMEN TERAKHIR — Chunked Multi-Scene Export Pipeline');
  console.log('================================================================');
  console.log(`Target Scenes      : ${scenesToRender.join(', ')}`);
  console.log(`Output Directory   : ${chunksDir}`);
  console.log(`Resolution Scale   : ${scale}x (${Math.round(1920 * scale)}x${Math.round(1080 * scale)})`);
  console.log(`Worker Concurrency : ${concurrency} parallel render threads`);
  console.log('----------------------------------------------------------------');

  const candidateBrowsers = [
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];
  const browserExecutable = candidateBrowsers.find((p) => fs.existsSync(p));
  if (browserExecutable) {
    console.log(`Using detected browser   : ${browserExecutable}`);
  }

  const overallStartTime = Date.now();

  console.log(`[Phase 1] Bundling master Remotion project...`);
  const bundleLocation = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });
  console.log(`[Phase 1] Webpack bundle ready: ${bundleLocation}`);

  console.log(`[Phase 2] Executing sequential scene rendering...`);
  for (let idx = 0; idx < scenesToRender.length; idx++) {
    const sceneId = scenesToRender[idx];
    const outputFile = path.resolve(chunksDir, `${sceneId}.mp4`);
    const sceneStartTime = Date.now();

    console.log(`\n>>> [Scene ${idx + 1}/${scenesToRender.length}] Rendering ${sceneId}...`);

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: sceneId,
      browserExecutable,
    });

    const frameRange: [number, number] | undefined = options.frameLimitPerChunk
      ? [0, Math.min(options.frameLimitPerChunk - 1, composition.durationInFrames - 1)]
      : undefined;

    const targetFrames = frameRange ? frameRange[1] - frameRange[0] + 1 : composition.durationInFrames;
    console.log(`    Specs: ${composition.width}x${composition.height} @ ${composition.fps}fps (${targetFrames} frames) -> ${outputFile}`);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputFile,
      pixelFormat: 'yuv420p',
      imageFormat: 'jpeg',
      jpegQuality: 85,
      crf,
      concurrency,
      scale,
      frameRange,
      browserExecutable,
      onProgress: ({ progress, renderedFrames }) => {
        const pct = (progress * 100).toFixed(1);
        process.stdout.write(`\r    Progress [${sceneId}]: ${renderedFrames} frames (${pct}%)`);
      },
    });

    const sceneDuration = ((Date.now() - sceneStartTime) / 1000).toFixed(1);
    const stat = fs.existsSync(outputFile) ? fs.statSync(outputFile) : null;
    const sizeMb = stat ? (stat.size / (1024 * 1024)).toFixed(2) : '0';
    console.log(`\n    [Completed] ${sceneId}.mp4 (${sizeMb} MB in ${sceneDuration}s)`);
  }

  const totalDuration = ((Date.now() - overallStartTime) / 1000).toFixed(1);
  console.log('\n================================================================');
  console.log(`All scene chunks rendered successfully in ${totalDuration}s!`);
  console.log(`Chunk files stored in: ${chunksDir}`);
  console.log('================================================================');
}

const args = process.argv.slice(2);
let requestedScenes: string[] = [];
let frameLimit: number | undefined;
let concurrency = 2;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--scene' && args[i + 1]) {
    requestedScenes.push(args[++i]);
  } else if (args[i] === '--frames' && args[i + 1]) {
    frameLimit = parseInt(args[++i], 10);
  } else if (args[i] === '--concurrency' && args[i + 1]) {
    concurrency = parseInt(args[++i], 10);
  }
}

renderChunks({
  scenes: requestedScenes.length > 0 ? requestedScenes : undefined,
  frameLimitPerChunk: frameLimit,
  concurrency,
})
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal error during chunked render:', err);
    process.exit(1);
  });

export { renderChunks };
