/**
 * SPESIMEN TERAKHIR — PrototypeScene.tsx
 * Representative Prototype Scene for R4 Multi-Character Verification.
 * 
 * Features:
 * - Multi-character interaction: Aryo, Dimas, Bagas, Nadia, Hendro
 * - Procedural 2D SVG environment: MaterialsLab with calibrated 4200K fluorescent lighting
 * - Cinematic camera with dynamic shot framing and physiological handheld micro-shake
 * - Verbatim synchronized subtitle overlay
 * - Multi-track procedural audio cues
 */

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { getScene } from '../data';
import { MaterialsLab } from '../components/environments';
import { CharacterRig } from '../components/characters';
import { CinematicCamera } from '../components/camera';
import { SubtitleOverlay } from '../components/subtitles';
import { AudioEngine } from '../components/audio';
import { ExtendedShotType, ExtendedMovementType } from '../components/camera/cameraPresets';

export interface SceneProps {
  sceneStartFrame?: number;
}

export const PrototypeScene: React.FC<SceneProps> = ({ sceneStartFrame = 0 }) => {
  const frame = useCurrentFrame();
  const scene1 = getScene(1);
  const dialogueLines = scene1?.dialogueLines || [];
  const audioCues = scene1?.audioCues || [];
  const shots = scene1?.shots || [];

  const currentGlobalFrame = frame + sceneStartFrame;

  // Active dialogue line and active speaker detection
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

  // Find active camera shot based on frame
  const activeShot = shots.find(
    (s) => currentGlobalFrame >= s.startFrame && currentGlobalFrame < s.endFrame
  ) || shots[0];

  const shotType: ExtendedShotType = (activeShot?.framing.shotType as ExtendedShotType) || 'WS';
  const movement: ExtendedMovementType = (activeShot?.framing.movement as ExtendedMovementType) || 'slow_push_in';
  const zoom = activeShot?.framing.zoomFactor ?? 1.0;
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
        shakeIntensity={0.35}
      >
        {/* Materials Lab Environment */}
        <MaterialsLab lightingMode="fluorescent_4200k" />

        {/* Characters on Stage */}
        {/* 1. Hendro (Left, foreground at workbench with micrometer) */}
        <div style={{ position: 'absolute', left: 320, bottom: 110, width: 200, height: 480, zIndex: 25 }}>
          <CharacterRig
            characterId="hendro"
            pose={getSpeakerPose('hendro', 'leaning_workbench')}
            expression="Shocked"
            viseme={getSpeakerViseme('hendro', 'slight_open')}
            holdingProp="mitutoyo_digital_caliper"
            scale={1.04}
          />
        </div>

        {/* 2. Dimas (Center-Left, standing assertive with Job Offer) */}
        <div style={{ position: 'absolute', left: 620, bottom: 120, width: 200, height: 480, zIndex: 20 }}>
          <CharacterRig
            characterId="dimas"
            pose={getSpeakerPose('dimas', 'standing_assertive')}
            expression="Angry"
            viseme={getSpeakerViseme('dimas', 'slight_open')}
            holdingProp="job_offer_contract"
            scale={1.08}
          />
        </div>

        {/* 3. Bagas (Center, sitting slouched holding RSUD slip) */}
        <div style={{ position: 'absolute', left: 910, bottom: 85, width: 200, height: 480, zIndex: 20 }}>
          <CharacterRig
            characterId="bagas"
            pose={getSpeakerPose('bagas', 'sitting')}
            expression="Sad"
            viseme={getSpeakerViseme('bagas', 'rest')}
            holdingProp="rsud_blitar_hospital_slip"
            scale={0.98}
          />
        </div>

        {/* 4. Aryo (Center-Right, standing with BAP clipboard) */}
        <div style={{ position: 'absolute', left: 1160, bottom: 120, width: 200, height: 480, zIndex: 22 }}>
          <CharacterRig
            characterId="aryo"
            pose={getSpeakerPose('aryo', 'standing')}
            expression="Serious"
            viseme={getSpeakerViseme('aryo', 'rest')}
            holdingProp="clipboard_bap_wood"
            scale={1.05}
          />
        </div>

        {/* 5. Nadia (Right, observant with caliper) */}
        <div style={{ position: 'absolute', left: 1420, bottom: 120, width: 200, height: 480, zIndex: 20 }}>
          <CharacterRig
            characterId="nadia"
            pose={getSpeakerPose('nadia', 'standing')}
            expression="Confused"
            viseme={getSpeakerViseme('nadia', 'rest')}
            holdingProp="mitutoyo_digital_caliper"
            scale={0.98}
          />
        </div>
      </CinematicCamera>

      {/* Subtitles Overlay within SMPTE Safe Area */}
      <SubtitleOverlay dialogueLines={dialogueLines} sceneStartFrame={sceneStartFrame} />

      {/* Multi-Track Audio Engine with Procedural Fallbacks */}
      <AudioEngine audioCues={audioCues} sceneStartFrame={sceneStartFrame} />
    </div>
  );
};

export default PrototypeScene;
