/**
 * SPESIMEN TERAKHIR — Scene 06: Reflective Corridor (13:30 - 14:45 / 1,800 frames)
 * Setting: INT. KORIDOR GEDUNG W FTIRS ITS - MALAM / DINI HARI
 * 
 * Narrative: Refleksi A (Verification & Reconciliation).
 * Test results confirm 84 Joules authentic impact energy.
 * Dimas and Bagas reconcile in the brutalist corridor as rain gently falls outside.
 * True brotherhood and engineering integrity prevail over fear.
 */

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { getScene } from '../data';
import { HallwayGedungW } from '../components/environments';
import { CharacterRig } from '../components/characters';
import { CinematicCamera } from '../components/camera';
import { SubtitleOverlay } from '../components/subtitles';
import { AudioEngine } from '../components/audio';
import { ExtendedShotType, ExtendedMovementType } from '../components/camera/cameraPresets';

export interface Scene06Props {
  sceneStartFrame?: number;
}

export const Scene06_ReflectiveCorridor: React.FC<Scene06Props> = ({ sceneStartFrame = 19440 }) => {
  const frame = useCurrentFrame();
  const scene = getScene(6);
  const dialogueLines = scene?.dialogueLines || [];
  const audioCues = scene?.audioCues || [];
  const shots = scene?.shots || [];

  const currentGlobalFrame = frame + sceneStartFrame;

  // Active dialogue line and dynamic speaker lip-sync detection
  const activeLine = dialogueLines.find(
    (d) => currentGlobalFrame >= d.startFrame && currentGlobalFrame < d.endFrame
  );
  const PHONETIC_VISEMES = ['slight_open', 'wide_open', 'rounded', 'MBP', 'slight_open', 'U', 'wide_open', 'rest'] as const;
  const isSpeaking = (speakerId: string) => activeLine?.speakerId === speakerId;
  const getSpeakerViseme = (speakerId: string, defaultViseme: any = 'rest') =>
    isSpeaking(speakerId)
      ? PHONETIC_VISEMES[Math.floor((frame / 3) % PHONETIC_VISEMES.length)]
      : defaultViseme;
  const getSpeakerPose = (speakerId: string, basePose: any = 'idle') =>
    isSpeaking(speakerId)
      ? (basePose === 'sitting' ? 'sitting' : 'talking')
      : basePose;

  // Active shot framing
  const activeShot = shots.find(
    (s) => currentGlobalFrame >= s.startFrame && currentGlobalFrame < s.endFrame
  ) || shots[0];

  const shotType: ExtendedShotType = (activeShot?.framing.shotType as ExtendedShotType) || 'MS';
  const movement: ExtendedMovementType = (activeShot?.framing.movement as ExtendedMovementType) || 'slow_pan_right';
  const zoom = activeShot?.framing.zoomFactor ?? 1.05;
  const focusX = activeShot?.framing.horizontalPositionPercent ?? 50;
  const focusY = activeShot?.framing.verticalPositionPercent ?? 50;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        overflow: 'hidden',
        backgroundColor: '#09090B',
      }}
    >
      <CinematicCamera
        shotType={shotType}
        movement={movement}
        zoom={zoom}
        focusX={focusX}
        focusY={focusY}
        enableShake={true}
        shakeIntensity={0.2}
      >
        {/* Hallway Environment with 3800K downlight and rain reflections */}
        <HallwayGedungW lightingMode="warm_3800k" showRainDrips={true} />

        {/* Characters on Corridor Stage */}
        {/* Zul (Far Left, senior watching and congratulating with respect) */}
        <div style={{ position: 'absolute', left: 320, bottom: 120, width: 200, height: 480, zIndex: 21 }}>
          <CharacterRig
            characterId="zul"
            pose={getSpeakerPose('zul', 'standing')}
            expression="Happy"
            viseme={getSpeakerViseme('zul', 'rest')}
            scale={1.0}
          />
        </div>

        {/* Dimas (Left, leaning against brutalist concrete pillar) */}
        <div style={{ position: 'absolute', left: 540, bottom: 120, width: 200, height: 480, zIndex: 22 }}>
          <CharacterRig
            characterId="dimas"
            pose={getSpeakerPose('dimas', 'standing')}
            expression="Normal"
            viseme={getSpeakerViseme('dimas', 'slight_open')}
            scale={1.04}
          />
        </div>

        {/* Bagas (Center-Left, standing beside Dimas with deep gratitude) */}
        <div style={{ position: 'absolute', left: 780, bottom: 110, width: 200, height: 480, zIndex: 22 }}>
          <CharacterRig
            characterId="bagas"
            pose={getSpeakerPose('bagas', 'standing')}
            expression="Normal"
            viseme={getSpeakerViseme('bagas', 'slight_open')}
            scale={0.98}
          />
        </div>

        {/* Aryo (Center-Right, holding authentic 84 Joule BAP report) */}
        <div style={{ position: 'absolute', left: 1060, bottom: 120, width: 200, height: 480, zIndex: 24 }}>
          <CharacterRig
            characterId="aryo"
            pose={getSpeakerPose('aryo', 'standing')}
            expression="Normal"
            viseme={getSpeakerViseme('aryo', 'rest')}
            holdingProp="clipboard_bap_wood"
            scale={1.05}
          />
        </div>

        {/* Nadia (Right, leaning gently against window sill, smiling quietly) */}
        <div style={{ position: 'absolute', left: 1320, bottom: 115, width: 200, height: 480, zIndex: 20 }}>
          <CharacterRig
            characterId="nadia"
            pose={getSpeakerPose('nadia', 'standing')}
            expression="Normal"
            viseme={getSpeakerViseme('nadia', 'rest')}
            scale={0.98}
          />
        </div>

        {/* Hendro (Far Right, lab coat unbuttoned, relaxed) */}
        <div style={{ position: 'absolute', left: 1560, bottom: 110, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="hendro"
            pose={getSpeakerPose('hendro', 'standing')}
            expression="Normal"
            viseme={getSpeakerViseme('hendro', 'rest')}
            scale={1.02}
          />
        </div>
      </CinematicCamera>

      {/* Subtitles Overlay */}
      <SubtitleOverlay dialogueLines={dialogueLines} sceneStartFrame={sceneStartFrame} />

      {/* Audio Engine */}
      <AudioEngine audioCues={audioCues} sceneStartFrame={sceneStartFrame} />
    </div>
  );
};

export default Scene06_ReflectiveCorridor;
