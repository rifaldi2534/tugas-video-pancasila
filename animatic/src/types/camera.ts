/**
 * SPESIMEN TERAKHIR — Master Camera Schema & Types
 * Mendefinisikan tipe shot, framing, focal length smartphone ekuivalen (26mm / 52mm), dan pergerakan kamera Remotion.
 */

export type ShotType = 
  | 'EST' 
  | 'EWS' 
  | 'WS' 
  | 'MS' 
  | 'MCU' 
  | 'CU' 
  | 'ECU' 
  | 'OTS' 
  | 'INSERT'
  | 'GRAPHIC';

export type CameraMovementType = 
  | 'static' 
  | 'handheld_bracing' 
  | 'passive_ninja_walk' 
  | 'slow_pan_left' 
  | 'slow_pan_right' 
  | 'slow_push_in' 
  | 'slow_pull_out' 
  | 'tilt_up' 
  | 'tilt_down' 
  | 'whip_pan';

export interface CameraFraming {
  shotType: ShotType;
  focalLengthEqMm: 26 | 52; // Lensa Smartphone: 26mm (Wide 1x) atau 52mm (Telephoto 2x)
  movement: CameraMovementType;
  horizontalPositionPercent: number; // 0 - 100% titik fokus horizontal
  verticalPositionPercent: number;   // 0 - 100% titik fokus vertikal
  zoomFactor: number;                // 1.0 = normal, 1.3 = medium zoom, 1.8 = extreme close-up
  rotationDeg?: number;              // Kemiringan rotasi mikro (-2.0 s/d +2.0)
  shutterSpeed: '1/50s';
  frameRateFps: 24;
}

export interface CameraShot {
  shotId: string;       // "SHOT_1_01" s/d "SHOT_7_07"
  shotNumber: number;   // 1 s/d 57
  sceneId: number;      // 1 s/d 7
  durationSeconds: number;
  startFrame: number;
  endFrame: number;
  framing: CameraFraming;
  description: string;
  dramaturgicalSubtext: string;
}

export interface ParallaxDepthConfig {
  farBackgroundSpeed: number;   // default: 0.2
  midgroundSpeed: number;       // default: 0.6
  characterStageSpeed: number;  // default: 1.0
  foregroundSpeed: number;      // default: 1.3
}
