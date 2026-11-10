/**
 * SPESIMEN TERAKHIR - CharacterProfiles.ts
 * Visual configuration and signature prop definitions for all 14 DTMM FTIRS ITS student characters.
 * 10 Male, 4 Female students with differentiated silhouettes, palettes, and dramaturgical props.
 */

import { Character } from '../../types/characters';
import rawCharacters from '../../data/characters.json';

export const CHARACTER_PROFILES: Record<string, Character> = (
  rawCharacters as Character[]
).reduce((acc, char) => {
  acc[char.id] = char;
  return acc;
}, {} as Record<string, Character>);

export const ALL_CHARACTER_IDS = [
  'aryo',
  'dimas',
  'bagas',
  'fajar',
  'reza',
  'hendro',
  'farhan',
  'kevin',
  'danang',
  'zul',
  'nadia',
  'maya',
  'rere',
  'kirana',
] as const;

export type CharacterId = (typeof ALL_CHARACTER_IDS)[number];

export function getCharacterProfile(id: string): Character | undefined {
  return CHARACTER_PROFILES[id.toLowerCase()];
}

export default CHARACTER_PROFILES;
