/**
 * SPESIMEN TERAKHIR — Master Animatic Schema Definition
 * Menghubungkan seluruh definisi entitas karakter, tata kamera, dialog, pencahayaan, dan data adegan.
 */

import { Character, FacialExpressionState, BodyPose, PhonemeMouthShape } from './characters';
import { CameraShot } from './camera';
import { AudioCue } from './audio';

export * from './characters';
export * from './camera';
export * from './audio';

export type TimecodeString = `${number}:${number}` | `${number}:${number}:${number}`;

export interface DialogueLine {
  id: string;                 // "D01_01_HENDRO", "D05_01_DIMAS"
  speakerId: string;          // Mengacu pada Character.id
  parenthetical?: string;     // "(Suara serak, menggeleng pelan)"
  textOriginal: string;       // Dialog verbatim Suroboyoan / Indonesia
  textTranslationId?: string; // Terjemahan / parafrase bahasa Indonesia formal
  startSeconds: number;       // Offset detik mulai dari awal film
  endSeconds: number;         // Offset detik selesai
  startFrame: number;         // Offset frame pada 24 FPS
  endFrame: number;           // Offset frame pada 24 FPS
  highlightColorHex?: string; // Warna tag nama pembicara pada subtitle
}

export interface CharacterStagingCoordinates {
  characterId: string;
  xPercent: number;           // Posisi horizontal panggung (0 - 100%)
  yPercent: number;           // Posisi vertikal panggung (0 - 100%)
  scale: number;              // Skala Z-axis kedalaman
  zIndex: number;             // Urutan tumpukan render: Foreground (30), Midground (20), Background (10)
  expression: FacialExpressionState;
  pose: BodyPose;
  mouthShape: PhonemeMouthShape;
  facingDirection: 'left' | 'right' | 'center';
}

export interface EnvironmentalLighting {
  locationType: 'lab_mechanic' | 'corridor_selasar' | 'exterior_stairs';
  colorTempKelvin: 4200 | 3800 | 3000;
  keyLightColorHex: string;
  ambientIntensity: number;   // 0.0 - 1.0
  chiaroscuroActive: boolean;
  spotlightTargetCoordinates?: { xPercent: number; yPercent: number };
}

export interface ActivePropState {
  propId: string;
  heldByCharacterId?: string;
  position: { xPercent: number; yPercent: number };
  stateDescription: string;
}

export interface VisualCue {
  id: string;
  sceneId: number;
  shotId: string;
  environment: EnvironmentalLighting;
  charactersOnStage: CharacterStagingCoordinates[];
  activeProps: ActivePropState[];
}

export interface Scene {
  sceneNumber: number;        // 1 hingga 7
  slugline: string;
  locationName: string;
  timeOfDay: 'MALAM';
  timecodeStart: TimecodeString;
  timecodeEnd: TimecodeString;
  durationSeconds: number;
  durationFrames: number;     // durationSeconds * 24 fps
  startFrameCumulative: number;
  endFrameCumulative: number;
  narrativeStage: 
    | 'Masalah (Crisis)' 
    | 'Konflik (Conflict)' 
    | 'Pilihan Moral (Ethical Choice)' 
    | 'Konsekuensi (Vulnerability)' 
    | 'Klimaks (Sacrifice & Test)' 
    | 'Refleksi A (Verification)' 
    | 'Refleksi B (Solidarity)';
  charactersPresentIds: string[];
  shots: CameraShot[];
  dialogueLines: DialogueLine[];
  audioCues: AudioCue[];
  visualCues: VisualCue[];
}

export interface FilmPackage {
  titleOriginal: string;
  titleEnglish: string;
  affiliation: string;
  targetDurationSeconds: number; // 960 detik (16:00)
  targetTotalFrames: number;     // 23040 frame pada 24 FPS
  resolution: {
    width: number;               // 1920
    height: number;              // 1080
    aspectRatio: string;         // '16:9'
  };
  fps: number;                   // 24
  ensembleCastCount: number;     // 14
  totalScenesCount: number;      // 7
  closingCreditsDurationSeconds: number; // 45
  characters: Character[];
  scenes: Scene[];
}
