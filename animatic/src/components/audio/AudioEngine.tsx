/**
 * SPESIMEN TERAKHIR — Remotion Multi-Track Audio Cue Engine
 * 
 * Provides professional audio management for:
 * 1. Diegetic room tones (4200K fluorescent neon hum, rain, ventilation, crickets)
 * 2. Metallurgy & lab SFX (Charpy release latch, 300J specimen impact clack, keyboard clicks, cable snap)
 * 3. Dramatic score cues (tension drone, ticking clock pulse, cathartic resolution chords)
 * 4. Broadcast dBFS calibration and Scene 5 -12 dB safety track peak protection
 * 5. Procedural WAV synthesizer fallbacks with zero external dependencies
 */

import React, { useMemo } from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { AudioCategory, AudioCue } from '../../types/audio';

/**
 * Converts target decibels relative to full scale (dBFS) to linear gain (0.0 - 1.0).
 * If safety track is active (e.g. Charpy 300J impact in Scene 5), an additional -12 dB
 * attenuation is applied (factor ≈ 0.2512).
 */
export function dbfsToLinearGain(targetDbfs: number, isSafetyTrackActive: boolean = false): number {
  // Clamp dBFS to realistic audio mixing range [-60 dBFS, 0 dBFS]
  const clampedDbfs = Math.max(-60, Math.min(0, targetDbfs));
  let linear = Math.pow(10, clampedDbfs / 20);

  if (isSafetyTrackActive) {
    const safetyAttenuation = Math.pow(10, -12 / 20); // ≈ 0.2511886
    linear *= safetyAttenuation;
  }

  return Math.max(0, Math.min(1.0, linear));
}

export type ProceduralSoundType =
  | 'neon_hum_4200k'
  | 'rain_ambient'
  | 'ventilation_hum'
  | 'crickets_exterior'
  | 'charpy_release'
  | 'charpy_impact'
  | 'keyboard_clicks'
  | 'cable_snap'
  | 'tension_drone'
  | 'ticking_clock'
  | 'resolution_chords'
  | 'silence';

/**
 * Procedural PCM WAV Synthesizer
 * Generates an in-memory 16-bit Mono PCM WAV base64 data URI.
 */
export function generateProceduralWavUri(
  soundType: ProceduralSoundType,
  durationSec: number = 2.0,
  sampleRate: number = 22050
): string {
  const numSamples = Math.floor(sampleRate * Math.max(0.2, Math.min(durationSec, 8.0)));
  const samples = new Int16Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sampleVal = 0;

    switch (soundType) {
      // 1. Ambient: 4200K Fluorescent Neon Hum (50Hz + 100Hz + gentle hiss)
      case 'neon_hum_4200k': {
        const hum50 = Math.sin(2 * Math.PI * 50 * t) * 0.45;
        const hum100 = Math.sin(2 * Math.PI * 100 * t) * 0.25;
        const hum150 = Math.sin(2 * Math.PI * 150 * t) * 0.12;
        const hiss = (Math.sin(i * 1234.567) % 1) * 0.08;
        sampleVal = hum50 + hum100 + hum150 + hiss;
        break;
      }

      // 2. Ambient: Rain / Exterior dusk
      case 'rain_ambient': {
        const whiteNoise = (Math.sin(i * 789.123) % 1);
        const lowRumble = Math.sin(2 * Math.PI * 65 * t) * 0.2;
        sampleVal = (whiteNoise * 0.35 + lowRumble) * (0.8 + 0.2 * Math.sin(2 * Math.PI * 0.3 * t));
        break;
      }

      // 3. Ambient: Ventilation Airflow Hum
      case 'ventilation_hum': {
        const fanTone = Math.sin(2 * Math.PI * 82 * t) * 0.4;
        const airFlow = (Math.sin(i * 456.789) % 1) * 0.15;
        sampleVal = fanTone + airFlow;
        break;
      }

      // 4. Ambient: Crickets (rhythmic chirp pulses)
      case 'crickets_exterior': {
        const chirpCycle = t % 0.8;
        if (chirpCycle < 0.25) {
          const chirpFreq = 4400 + Math.sin(2 * Math.PI * 25 * chirpCycle) * 300;
          sampleVal = Math.sin(2 * Math.PI * chirpFreq * t) * 0.4;
        } else {
          sampleVal = 0;
        }
        break;
      }

      // 5. SFX: Charpy Release Latch
      case 'charpy_release': {
        if (t < 0.12) {
          const decay = Math.exp(-t * 35);
          const click = Math.sin(2 * Math.PI * 1250 * t) * decay;
          sampleVal = click * 0.8;
        } else {
          sampleVal = 0;
        }
        break;
      }

      // 6. SFX: Charpy 300J Specimen Impact Clack
      case 'charpy_impact': {
        const decayFast = Math.exp(-t * 8);
        const metallicClank1 = Math.sin(2 * Math.PI * 440 * t) * 0.5;
        const metallicClank2 = Math.sin(2 * Math.PI * 880 * t) * 0.3;
        const metallicClank3 = Math.sin(2 * Math.PI * 1760 * t) * 0.2;
        const impactPulse = t < 0.04 ? (Math.sin(i * 321.654) % 1) * 0.6 : 0;
        sampleVal = (metallicClank1 + metallicClank2 + metallicClank3 + impactPulse) * decayFast;
        break;
      }

      // 7. SFX: Mitutoyo Caliper & Keyboard Clicks
      case 'keyboard_clicks': {
        const keyCycle = t % 0.2;
        if (keyCycle < 0.03) {
          const decay = Math.exp(-keyCycle * 120);
          sampleVal = (Math.sin(i * 654.321) % 1) * decay * 0.7;
        } else {
          sampleVal = 0;
        }
        break;
      }

      // 8. SFX: Power Cable Snap / Unplug
      case 'cable_snap': {
        if (t < 0.15) {
          const decay = Math.exp(-t * 25);
          const spark = (Math.sin(i * 987.654) % 1) * 0.5;
          const pop = Math.sin(2 * Math.PI * 180 * t) * 0.5;
          sampleVal = (spark + pop) * decay;
        } else {
          sampleVal = 0;
        }
        break;
      }

      // 9. Score: Tension Drone (Dissonant minor second beating)
      case 'tension_drone': {
        const toneA = Math.sin(2 * Math.PI * 73.4 * t) * 0.4; // D2
        const toneB = Math.sin(2 * Math.PI * 77.8 * t) * 0.35; // D#2
        const pulse = 0.85 + 0.15 * Math.sin(2 * Math.PI * 0.5 * t);
        sampleVal = (toneA + toneB) * pulse;
        break;
      }

      // 10. Score: Ticking Clock Pulse
      case 'ticking_clock': {
        const secProgress = t % 1.0;
        if (secProgress < 0.05) {
          const tickDecay = Math.exp(-secProgress * 90);
          sampleVal = Math.sin(2 * Math.PI * 2200 * t) * tickDecay * 0.6;
        } else {
          sampleVal = 0;
        }
        break;
      }

      // 11. Score: Resolution Chords (Warm major triad)
      case 'resolution_chords': {
        const root = Math.sin(2 * Math.PI * 130.81 * t) * 0.3; // C3
        const third = Math.sin(2 * Math.PI * 164.81 * t) * 0.25; // E3
        const fifth = Math.sin(2 * Math.PI * 196.00 * t) * 0.2; // G3
        const envelope = Math.min(1.0, t * 1.5) * Math.min(1.0, (durationSec - t) * 1.5);
        sampleVal = (root + third + fifth) * envelope;
        break;
      }

      case 'silence':
      default:
        sampleVal = 0;
        break;
    }

    // Clamp to 16-bit PCM integer range
    const clampedSample = Math.max(-1.0, Math.min(1.0, sampleVal));
    samples[i] = Math.round(clampedSample * 32767);
  }

  // Construct WAV binary header (44 bytes)
  const numChannels = 1;
  const bitsPerSample = 16;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = new Uint8Array(44 + dataSize);

  // Helper to write ASCII and 16/32-bit LE integers
  const writeStr = (offset: number, str: string) => {
    for (let c = 0; c < str.length; c++) {
      buffer[offset + c] = str.charCodeAt(c);
    }
  };
  const writeUint16LE = (offset: number, val: number) => {
    buffer[offset] = val & 0xff;
    buffer[offset + 1] = (val >> 8) & 0xff;
  };
  const writeUint32LE = (offset: number, val: number) => {
    buffer[offset] = val & 0xff;
    buffer[offset + 1] = (val >> 8) & 0xff;
    buffer[offset + 2] = (val >> 16) & 0xff;
    buffer[offset + 3] = (val >> 24) & 0xff;
  };

  writeStr(0, 'RIFF');
  writeUint32LE(4, 36 + dataSize);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  writeUint32LE(16, 16); // Subchunk1Size (16 for PCM)
  writeUint16LE(20, 1);  // AudioFormat (1 = PCM)
  writeUint16LE(22, numChannels);
  writeUint32LE(24, sampleRate);
  writeUint32LE(28, byteRate);
  writeUint16LE(32, blockAlign);
  writeUint16LE(34, bitsPerSample);
  writeStr(36, 'data');
  writeUint32LE(40, dataSize);

  // Copy sample bytes into buffer (little endian)
  let byteOffset = 44;
  for (let s = 0; s < numSamples; s++) {
    const val = samples[s];
    buffer[byteOffset++] = val & 0xff;
    buffer[byteOffset++] = (val >> 8) & 0xff;
  }

  // Convert binary buffer to Base64 in universal browser / Node environment
  let binaryStr = '';
  const len = buffer.byteLength;
  for (let b = 0; b < len; b++) {
    binaryStr += String.fromCharCode(buffer[b]);
  }

  const base64Data = typeof btoa === 'function' ? btoa(binaryStr) : Buffer.from(binaryStr, 'binary').toString('base64');
  return `data:audio/wav;base64,${base64Data}`;
}

/**
 * Maps an AudioCue to its matching procedural sound archetype.
 */
export function mapCueToProceduralSound(cue: AudioCue): ProceduralSoundType {
  const cueId = (cue.id || '').toUpperCase();
  const name = (cue.name || '').toLowerCase();
  const desc = (cue.sourceDescription || '').toLowerCase();

  if (cueId.includes('CHARPY_IMPACT') || name.includes('impact') || desc.includes('dentang')) {
    return 'charpy_impact';
  }
  if (cueId.includes('RELEASE') || name.includes('release') || desc.includes('tuas')) {
    return 'charpy_release';
  }
  if (cueId.includes('ROOMTONE') || desc.includes('neon') || desc.includes('fluorescent') || desc.includes('4200k')) {
    return 'neon_hum_4200k';
  }
  if (desc.includes('hujan') || desc.includes('rain') || name.includes('rain')) {
    return 'rain_ambient';
  }
  if (desc.includes('ventilasi') || desc.includes('fan') || name.includes('ventilation')) {
    return 'ventilation_hum';
  }
  if (desc.includes('jangkrik') || desc.includes('cricket') || name.includes('cricket')) {
    return 'crickets_exterior';
  }
  if (desc.includes('keyboard') || desc.includes('caliper') || name.includes('click')) {
    return 'keyboard_clicks';
  }
  if (desc.includes('kabel') || desc.includes('cable') || name.includes('snap')) {
    return 'cable_snap';
  }
  if (desc.includes('tension') || desc.includes('tegang') || name.includes('tension')) {
    return 'tension_drone';
  }
  if (desc.includes('detik') || desc.includes('clock') || name.includes('ticking')) {
    return 'ticking_clock';
  }
  if (desc.includes('resolusi') || desc.includes('harmoni') || name.includes('resolution')) {
    return 'resolution_chords';
  }

  // Category fallback
  switch (cue.category) {
    case 'ambient':
      return 'neon_hum_4200k';
    case 'foley':
      return 'keyboard_clicks';
    case 'music_diegetic':
      return 'tension_drone';
    default:
      return 'neon_hum_4200k';
  }
}

export interface AudioEngineProps {
  audioCues?: AudioCue[];
  sceneStartFrame?: number;
  masterVolume?: number; // 0.0 - 1.0 master multiplier
  mute?: boolean;
}

export const AudioEngine: React.FC<AudioEngineProps> = ({
  audioCues = [],
  sceneStartFrame = 0,
  masterVolume = 1.0,
  mute = false,
}) => {
  // Pre-generate and memoize procedural audio URIs for all cues
  const resolvedTracks = useMemo(() => {
    return audioCues.map((cue) => {
      const soundType = mapCueToProceduralSound(cue);
      const synthUri = generateProceduralWavUri(soundType, cue.durationSeconds || 3.0);

      // Calculate calibrated linear volume with Scene 5 safety track protection
      const linearGain = dbfsToLinearGain(cue.targetDbfs, cue.isSafetyTrackActive || false);
      const finalVolume = mute ? 0 : linearGain * masterVolume;

      // Start frame relative to scene or composition
      const localStartFrame = Math.max(0, cue.startFrame - sceneStartFrame);
      const durationFrames = Math.max(1, (cue.endFrame - cue.startFrame) || Math.round(cue.durationSeconds * 24));

      // Resolve audio source: use procedural synth WAV URI for zero-dependency reliability
      const audioSrc = synthUri;

      return {
        cue,
        audioSrc,
        localStartFrame,
        durationFrames,
        finalVolume,
      };
    });
  }, [audioCues, sceneStartFrame, masterVolume, mute]);

  if (mute || resolvedTracks.length === 0) {
    return null;
  }

  return (
    <>
      {resolvedTracks.map((track) => (
        <Sequence
          key={`audio-${track.cue.id}-${track.localStartFrame}`}
          from={track.localStartFrame}
          durationInFrames={track.durationFrames}
        >
          <Audio
            src={track.audioSrc}
            volume={track.finalVolume}
            loop={track.cue.loop}
          />
        </Sequence>
      ))}
    </>
  );
};
