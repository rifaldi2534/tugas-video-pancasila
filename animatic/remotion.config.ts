import fs from 'fs';
import { Config } from '@remotion/cli/config';

// Host-tuned configuration for AMD Ryzen 5 2500U (4 Cores / 8 Threads) & Radeon Vega 8
Config.setVideoImageFormat('jpeg');
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');

// Bound concurrency to prevent out-of-memory errors on host with ~5.6GB free RAM
Config.setConcurrency(2);

// Auto-detect and configure local Chrome or Edge browser executable
const candidatePaths = [
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
for (const p of candidatePaths) {
  if (fs.existsSync(p)) {
    Config.setBrowserExecutable(p);
    break;
  }
}

// Windows GPU / Headless Browser flags
Config.setChromiumOpenGlRenderer('angle');
