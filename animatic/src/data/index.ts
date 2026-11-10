/**
 * SPESIMEN TERAKHIR — Master Data Index
 * Menyediakan ekspor bertipe aman (type-safe) untuk seluruh data karakter, adegan, dan metadata film.
 */

import charactersData from './characters.json';
import scenesData from './scenes.json';
import { Character, Scene, FilmPackage, CameraShot, DialogueLine } from '../types/schema';

export const characters: Character[] = charactersData as Character[];
export const scenes: Scene[] = scenesData as Scene[];

export const FILM_METADATA: FilmPackage = {
  titleOriginal: 'SPESIMEN TERAKHIR',
  titleEnglish: 'The Final Specimen',
  affiliation: 'Departemen Teknik Material dan Metalurgi FTIRS ITS Surabaya',
  targetDurationSeconds: 960,
  targetTotalFrames: 23040,
  resolution: {
    width: 1920,
    height: 1080,
    aspectRatio: '16:9'
  },
  fps: 24,
  ensembleCastCount: 14,
  totalScenesCount: 7,
  closingCreditsDurationSeconds: 45,
  characters,
  scenes
};

/**
 * Mengambil profil karakter berdasarkan ID unik ("aryo", "dimas", "bagas", dll.)
 */
export function getCharacter(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}

/**
 * Mengambil adegan berdasarkan nomor babak (1 hingga 7)
 */
export function getScene(sceneNumber: number): Scene | undefined {
  return scenes.find((s) => s.sceneNumber === sceneNumber);
}

/**
 * Mengambil seluruh 57 shot dari seluruh 7 adegan secara flat
 */
export function getAllShots(): CameraShot[] {
  return scenes.flatMap((s) => s.shots);
}

/**
 * Mengambil seluruh dialog verbatim dari seluruh 7 adegan
 */
export function getAllDialogueLines(): DialogueLine[] {
  return scenes.flatMap((s) => s.dialogueLines);
}

/**
 * Menghitung total durasi frame film
 */
export function getTotalDurationFrames(): number {
  return scenes.reduce((sum, s) => sum + s.durationFrames, 0);
}

/**
 * Menemukan dialog yang sedang aktif pada nomor frame global tertentu
 */
export function getActiveDialogueAtFrame(globalFrame: number): DialogueLine | undefined {
  for (const scene of scenes) {
    if (globalFrame >= scene.startFrameCumulative && globalFrame < scene.endFrameCumulative) {
      const activeLine = scene.dialogueLines.find(
        (d) => globalFrame >= d.startFrame && globalFrame <= d.endFrame
      );
      if (activeLine) return activeLine;
    }
  }
  return undefined;
}
