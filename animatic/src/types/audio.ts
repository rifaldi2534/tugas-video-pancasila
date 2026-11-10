/**
 * SPESIMEN TERAKHIR — Master Audio Schema & Types
 * Mendefinisikan isyarat audio diegetik, ambient room tone, foley metalurgi, dialog, dan trek keselamatan -12 dB.
 */

export type AudioCategory = 
  | 'ambient' 
  | 'foley' 
  | 'dialogue' 
  | 'music_diegetic';

export interface AudioCue {
  id: string;                      // "AUD_01_ROOMTONE", "AUD_05_CHARPY_IMPACT"
  category: AudioCategory;
  name: string;
  sourceDescription: string;
  targetDbfs: number;              // Target desibel: -24 dBFS (ambient), -14 dBFS (foley), -6 dBFS (dialogue)
  isSafetyTrackActive?: boolean;   // Khusus pemicu dentang pendulum Charpy 300J (-12 dB peak protection)
  loop: boolean;
  startSeconds: number;
  durationSeconds: number;
  startFrame: number;              // Kalkulasi pada 24 FPS
  endFrame: number;
  placeholderAssetPath: string;    // Path lokal WAV/MP3 dengan fallback synth prosedural
}
