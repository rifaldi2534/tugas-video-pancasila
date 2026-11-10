import { describe, it, expect } from 'vitest';
import { ALL_CHARACTER_IDS, CHARACTER_PROFILES, getCharacterProfile } from '../CharacterProfiles';

describe('Procedural Character System', () => {
  it('should have all 14 ITS student characters defined', () => {
    expect(ALL_CHARACTER_IDS.length).toBe(14);
    for (const id of ALL_CHARACTER_IDS) {
      const profile = getCharacterProfile(id);
      expect(profile).toBeDefined();
      expect(profile?.id).toBe(id);
      expect(profile?.visualProfile).toBeDefined();
      expect(profile?.visualProfile.palette).toBeDefined();
    }
  });

  it('should have 4 female students with authentic hijab and hair differentiation', () => {
    const nadia = getCharacterProfile('nadia');
    const rere = getCharacterProfile('rere');
    const maya = getCharacterProfile('maya');
    const kirana = getCharacterProfile('kirana');

    expect(nadia?.visualProfile.headCovering).toBe('jilbab_dark_navy');
    expect(rere?.visualProfile.headCovering).toBe('jilbab_light_grey');
    expect(maya?.visualProfile.headCovering).toBe('none');
    expect(kirana?.visualProfile.headCovering).toBe('none');
  });

  it('should have unique color palettes for all 14 characters', () => {
    const signatures = new Set<string>();
    for (const id of ALL_CHARACTER_IDS) {
      const p = getCharacterProfile(id)!.visualProfile.palette;
      const sig = `${p.primaryAttireHex}-${p.accentPropHex}-${p.hairOrHijabHex}`;
      signatures.add(sig);
    }
    expect(signatures.size).toBe(14);
  });
});
