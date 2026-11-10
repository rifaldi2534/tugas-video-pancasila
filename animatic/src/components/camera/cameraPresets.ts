/**
 * SPESIMEN TERAKHIR — Camera Presets & Movement Profiles
 * 
 * Defines standard cinematic framing presets, smartphone focal lengths (26mm / 52mm),
 * calibrated scale factors, movement profiles, and transform calculations.
 */

import { ShotType, CameraMovementType, CameraFraming, ParallaxDepthConfig } from '../../types/camera';

export type ExtendedShotType = 
  | ShotType 
  | 'establishing' 
  | 'wide' 
  | 'medium' 
  | 'close_up' 
  | 'extreme_close_up' 
  | 'over_the_shoulder' 
  | 'pov'
  | 'POV';

export type ExtendedMovementType = 
  | CameraMovementType 
  | 'slow_zoom_in' 
  | 'slow_zoom_out' 
  | 'pan_left' 
  | 'pan_right' 
  | 'tracking' 
  | 'handheld_shake';

export interface CameraPresetConfig {
  shotType: ShotType | ExtendedShotType;
  label: string;
  defaultZoom: number;
  focalLengthEqMm: 26 | 52;
  defaultFocusPercent: { x: number; y: number };
  description: string;
}

export const CAMERA_FRAMING_PRESETS: Record<string, CameraPresetConfig> = {
  EST: {
    shotType: 'EST',
    label: 'Establishing Shot',
    defaultZoom: 1.0,
    focalLengthEqMm: 26,
    defaultFocusPercent: { x: 50, y: 50 },
    description: 'Menampilkan keseluruhan lokasi lab/kampus secara makro dengan lensa 26mm.',
  },
  establishing: {
    shotType: 'EST',
    label: 'Establishing Shot',
    defaultZoom: 1.0,
    focalLengthEqMm: 26,
    defaultFocusPercent: { x: 50, y: 50 },
    description: 'Menampilkan keseluruhan lokasi lab/kampus secara makro dengan lensa 26mm.',
  },
  EWS: {
    shotType: 'EWS',
    label: 'Extreme Wide Shot',
    defaultZoom: 1.02,
    focalLengthEqMm: 26,
    defaultFocusPercent: { x: 50, y: 50 },
    description: 'Pemandangan sangat luas mencakup arsitektur gedung W dan aktivitas ensemble.',
  },
  WS: {
    shotType: 'WS',
    label: 'Wide Shot',
    defaultZoom: 1.08,
    focalLengthEqMm: 26,
    defaultFocusPercent: { x: 50, y: 50 },
    description: 'Framing penuh kepala hingga kaki karakter dan mesin Charpy.',
  },
  wide: {
    shotType: 'WS',
    label: 'Wide Shot',
    defaultZoom: 1.08,
    focalLengthEqMm: 26,
    defaultFocusPercent: { x: 50, y: 50 },
    description: 'Framing penuh kepala hingga kaki karakter dan mesin Charpy.',
  },
  MS: {
    shotType: 'MS',
    label: 'Medium Shot',
    defaultZoom: 1.30,
    focalLengthEqMm: 26,
    defaultFocusPercent: { x: 50, y: 48 },
    description: 'Framing pinggang ke atas (waist shot) untuk interaksi dialog kelompok.',
  },
  medium: {
    shotType: 'MS',
    label: 'Medium Shot',
    defaultZoom: 1.30,
    focalLengthEqMm: 26,
    defaultFocusPercent: { x: 50, y: 48 },
    description: 'Framing pinggang ke atas (waist shot) untuk interaksi dialog kelompok.',
  },
  MCU: {
    shotType: 'MCU',
    label: 'Medium Close-Up',
    defaultZoom: 1.55,
    focalLengthEqMm: 52,
    defaultFocusPercent: { x: 50, y: 44 },
    description: 'Framing dada ke atas dengan lensa telefoto 52mm untuk konfrontasi personal.',
  },
  CU: {
    shotType: 'CU',
    label: 'Close-Up',
    defaultZoom: 1.85,
    focalLengthEqMm: 52,
    defaultFocusPercent: { x: 50, y: 40 },
    description: 'Fokus intens pada ekspresi wajah dan mata dengan kedalaman telefoto 52mm.',
  },
  close_up: {
    shotType: 'CU',
    label: 'Close-Up',
    defaultZoom: 1.85,
    focalLengthEqMm: 52,
    defaultFocusPercent: { x: 50, y: 40 },
    description: 'Fokus intens pada ekspresi wajah dan mata dengan kedalaman telefoto 52mm.',
  },
  ECU: {
    shotType: 'ECU',
    label: 'Extreme Close-Up',
    defaultZoom: 2.35,
    focalLengthEqMm: 52,
    defaultFocusPercent: { x: 50, y: 38 },
    description: 'Fokus makro pada takik spesimen V-notch, jarum dial, atau mata berkeringat.',
  },
  extreme_close_up: {
    shotType: 'ECU',
    label: 'Extreme Close-Up',
    defaultZoom: 2.35,
    focalLengthEqMm: 52,
    defaultFocusPercent: { x: 50, y: 38 },
    description: 'Fokus makro pada takik spesimen V-notch, jarum dial, atau mata berkeringat.',
  },
  OTS: {
    shotType: 'OTS',
    label: 'Over The Shoulder',
    defaultZoom: 1.45,
    focalLengthEqMm: 52,
    defaultFocusPercent: { x: 42, y: 46 },
    description: 'Framing dari balik bahu lawan bicara (mis. Nadia melihat Aryo).',
  },
  over_the_shoulder: {
    shotType: 'OTS',
    label: 'Over The Shoulder',
    defaultZoom: 1.45,
    focalLengthEqMm: 52,
    defaultFocusPercent: { x: 42, y: 46 },
    description: 'Framing dari balik bahu lawan bicara (mis. Nadia melihat Aryo).',
  },
  POV: {
    shotType: 'POV',
    label: 'Point of View',
    defaultZoom: 1.25,
    focalLengthEqMm: 26,
    defaultFocusPercent: { x: 50, y: 50 },
    description: 'Sudut pandang subjektif karakter saat menatap pendulum atau surat RSUD.',
  },
  pov: {
    shotType: 'POV',
    label: 'Point of View',
    defaultZoom: 1.25,
    focalLengthEqMm: 26,
    defaultFocusPercent: { x: 50, y: 50 },
    description: 'Sudut pandang subjektif karakter saat menatap pendulum atau surat RSUD.',
  },
  INSERT: {
    shotType: 'INSERT',
    label: 'Insert Shot',
    defaultZoom: 2.10,
    focalLengthEqMm: 52,
    defaultFocusPercent: { x: 50, y: 50 },
    description: 'Insert cutaway detail: stempel BAP, mikrometer sekrup, kabel daya.',
  },
  insert: {
    shotType: 'INSERT',
    label: 'Insert Shot',
    defaultZoom: 2.10,
    focalLengthEqMm: 52,
    defaultFocusPercent: { x: 50, y: 50 },
    description: 'Insert cutaway detail: stempel BAP, mikrometer sekrup, kabel daya.',
  },
  GRAPHIC: {
    shotType: 'GRAPHIC',
    label: 'Graphic Overlay',
    defaultZoom: 1.0,
    focalLengthEqMm: 26,
    defaultFocusPercent: { x: 50, y: 50 },
    description: 'Tampilan grafis data kurva transisi ulet-getas atau diagram teknis.',
  },
};

export const DEFAULT_PARALLAX_CONFIG: ParallaxDepthConfig = {
  farBackgroundSpeed: 0.2,  // Kecepatan pergeseran dinding belakang / pemandangan jauh
  midgroundSpeed: 0.6,      // Kecepatan pergeseran mesin/meja midground
  characterStageSpeed: 1.0, // Kecepatan utama panggung karakter
  foregroundSpeed: 1.3,     // Kecepatan aksen foreground (menghasilkan efek kedalaman kuat)
};

export interface TransformMatrixResult {
  translateX: number;
  translateY: number;
  scale: number;
  rotation: number;
  transformCss: string;
}

/**
 * Calculates CSS 3D transform coordinates centered around (centerX, centerY).
 * To focus on (centerX, centerY) at a given zoomFactor, the canvas translates
 * in reverse by (viewportCenter - targetCenter) * zoomFactor.
 */
export function calculateCameraTransform(
  centerX: number,
  centerY: number,
  zoomFactor: number,
  rotationDeg: number = 0,
  shakeX: number = 0,
  shakeY: number = 0,
  viewportWidth: number = 1920,
  viewportHeight: number = 1080
): TransformMatrixResult {
  const origCx = viewportWidth / 2.0;
  const origCy = viewportHeight / 2.0;

  const translateX = (origCx - centerX) * zoomFactor + shakeX;
  const translateY = (origCy - centerY) * zoomFactor + shakeY;

  const transformCss = 
    `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0px) ` +
    `scale(${zoomFactor.toFixed(4)}) ` +
    `rotate(${rotationDeg.toFixed(2)}deg)`;

  return {
    translateX,
    translateY,
    scale: zoomFactor,
    rotation: rotationDeg,
    transformCss,
  };
}

/**
 * Procedural physiological handheld micro-shake generator.
 * Uses deterministic harmonic sine frequencies for smooth, organic camera breathing
 * without random jitter or hydration mismatch.
 */
export function getHandheldShakeOffset(frame: number, intensity: number = 1.0): {
  shakeX: number;
  shakeY: number;
  shakeRot: number;
} {
  if (intensity <= 0) {
    return { shakeX: 0, shakeY: 0, shakeRot: 0 };
  }

  // Multi-frequency harmonic synthesis: primary slow breathing + secondary micro-tremor
  const shakeX = (Math.sin(frame * 0.17) * 2.6 + Math.sin(frame * 0.43) * 1.4) * intensity;
  const shakeY = (Math.cos(frame * 0.13) * 2.2 + Math.sin(frame * 0.37) * 1.1) * intensity;
  const shakeRot = (Math.sin(frame * 0.09) * 0.35 + Math.cos(frame * 0.23) * 0.15) * intensity;

  return { shakeX, shakeY, shakeRot };
}
