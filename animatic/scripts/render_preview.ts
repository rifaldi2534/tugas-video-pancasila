/**
 * SPESIMEN TERAKHIR — render_preview.ts
 * Fast preview export pipeline for Remotion compositions.
 * 
 * Supports:
 * - Standalone PrototypeScene preview (30s / 720 frames @ 24fps)
 * - Configurable scaling (540p/720p/1080p)
 * - Direct renderMedia integration with H.264 / yuv420p output
 * - Progress reporting and automatic out/ directory management
 */

import path from 'path';
import fs from 'fs';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';

interface RenderPreviewOptions {
  compositionId: string;
  outputPath: string;
  scale: number;
  crf: number;
  concurrency: number;
  frameRange?: [number, number];
}

async function runPreviewExport(options: Partial<RenderPreviewOptions> = {}) {
  const rootDir = path.resolve(__dirname, '..');
  const entryPoint = path.resolve(rootDir, 'src/index.ts');
  const outDir = path.resolve(rootDir, 'out');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const compositionId = options.compositionId || 'PrototypeScene';
  const outputPath = options.outputPath || path.resolve(outDir, 'preview.mp4');
  const scale = options.scale !== undefined ? options.scale : 1.0;
  const crf = options.crf || 23;
  const concurrency = options.concurrency || 4;

  console.log('================================================================');
  console.log(' SPESIMEN TERAKHIR — Remotion Fast Preview Video Export Pipeline');
  console.log('================================================================');
  console.log(`Target Composition : ${compositionId}`);
  console.log(`Output File        : ${outputPath}`);
  console.log(`Resolution Scale   : ${scale}x (${Math.round(1920 * scale)}x${Math.round(1080 * scale)})`);
  console.log(`Codec / Format     : H.264 / yuv420p (CRF ${crf})`);
  console.log(`Worker Concurrency : ${concurrency} parallel threads`);
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

  const startTime = Date.now();

  console.log(`[1/3] Bundling Remotion project from ${entryPoint}...`);
  const bundleLocation = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });
  console.log(`[1/3] Remotion bundle prepared at: ${bundleLocation}`);

  console.log(`[2/3] Inspecting composition: ${compositionId}...`);
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
    browserExecutable,
  });

  const durationFrames = options.frameRange
    ? options.frameRange[1] - options.frameRange[0] + 1
    : composition.durationInFrames;

  console.log(`[2/3] Composition found: ${composition.width}x${composition.height} @ ${composition.fps}fps, ${durationFrames} frames`);

  console.log(`[3/3] Rendering video via renderMedia to ${outputPath}...`);
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: outputPath,
    pixelFormat: 'yuv420p',
    imageFormat: 'jpeg',
    jpegQuality: 85,
    crf,
    concurrency,
    scale,
    frameRange: options.frameRange,
    browserExecutable,
    onProgress: ({ progress, renderedFrames }) => {
      const pct = (progress * 100).toFixed(1);
      process.stdout.write(`\rRender Progress: [${renderedFrames} frames] ${pct}% complete...`);
    },
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n================================================================`);
  console.log(`Preview video export SUCCESS: ${outputPath} (${durationSec}s elapsed)`);
  console.log('================================================================');

  // Verify file was written
  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    console.log(`Output File Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
  }
}

const args = process.argv.slice(2);
let compositionId = 'PrototypeScene';
let scale = 1.0;
let outputPath = '';
let maxFrames: number | undefined;
let concurrency: number | undefined;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--composition' && args[i + 1]) {
    compositionId = args[++i];
  } else if (args[i] === '--scale' && args[i + 1]) {
    scale = parseFloat(args[++i]);
  } else if (args[i] === '--out' && args[i + 1]) {
    outputPath = args[++i];
  } else if (args[i] === '--frames' && args[i + 1]) {
    maxFrames = parseInt(args[++i], 10);
  } else if (args[i] === '--concurrency' && args[i + 1]) {
    concurrency = parseInt(args[++i], 10);
  }
}

const frameRange: [number, number] | undefined = maxFrames ? [0, maxFrames - 1] : undefined;

runPreviewExport({
  compositionId,
  scale,
  outputPath: outputPath || undefined,
  frameRange,
  concurrency,
})
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal error during preview export:', err);
    process.exit(1);
  });

export { runPreviewExport };
