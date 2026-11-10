/**
 * SPESIMEN TERAKHIR — Scene 02: Debate & Hospital Slip (3:00 - 5:30 / 3,600 frames)
 * Setting: INT. LAB PENGUJIAN MEKANIK DTMM FTIRS ITS - MALAM
 * 
 * Narrative: Konflik (Conflict). Dimas reveals Astra job offer deadline.
 * Bagas breaks down showing his father's hospital bill from RSUD Mardi Waluyo Blitar.
 * Clash between academic integrity and survival economics.
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

export interface Scene02Props {
  sceneStartFrame?: number;
}

export const Scene02_DebateHospitalSlip: React.FC<Scene02Props> = ({ sceneStartFrame = 4320 }) => {
  const frame = useCurrentFrame();
  const scene = getScene(2);
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
  const movement: ExtendedMovementType = (activeShot?.framing.movement as ExtendedMovementType) || 'slow_push_in';
  const zoom = activeShot?.framing.zoomFactor ?? 1.1;
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
        {/* Dimmed Night Lab Environment */}
        <MaterialsLab lightingMode="dimmed_night" clockTime="23:10" />

        {/* Characters on Stage */}
        {/* Dimas (Center-Left, waving job offer contract) */}
        <div style={{ position: 'absolute', left: 520, bottom: 120, width: 200, height: 480, zIndex: 22 }}>
          <CharacterRig
            characterId="dimas"
            pose={getSpeakerPose('dimas', 'standing_assertive')}
            expression="Angry"
            viseme={getSpeakerViseme('dimas', 'slight_open')}
            holdingProp="job_offer_contract"
            scale={1.08}
          />
        </div>

        {/* Bagas (Center, emotionally broken holding hospital slip) */}
        <div style={{ position: 'absolute', left: 860, bottom: 85, width: 200, height: 480, zIndex: 24 }}>
          <CharacterRig
            characterId="bagas"
            pose={getSpeakerPose('bagas', 'sitting')}
            expression="Sad"
            viseme={getSpeakerViseme('bagas', 'rest')}
            holdingProp="rsud_blitar_hospital_slip"
            scale={1.0}
          />
        </div>

        {/* Aryo (Center-Right, weighing heavy burden of leadership) */}
        <div style={{ position: 'absolute', left: 1140, bottom: 120, width: 200, height: 480, zIndex: 21 }}>
          <CharacterRig
            characterId="aryo"
            pose={getSpeakerPose('aryo', 'standing')}
            expression="Serious"
            viseme={getSpeakerViseme('aryo', 'rest')}
            holdingProp="clipboard_bap_wood"
            scale={1.05}
          />
        </div>

        {/* Nadia (Right, witnessing Bagas's breakdown with empathy) */}
        <div style={{ position: 'absolute', left: 1380, bottom: 120, width: 200, height: 480, zIndex: 20 }}>
          <CharacterRig
            characterId="nadia"
            pose={getSpeakerPose('nadia', 'standing')}
            expression="Sad"
            viseme={getSpeakerViseme('nadia', 'rest')}
            scale={0.98}
          />
        </div>

        {/* Fajar (Left Background, near dewar) */}
        <div style={{ position: 'absolute', left: 260, bottom: 110, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="fajar"
            pose={getSpeakerPose('fajar', 'standing')}
            expression="Nervous"
            viseme={getSpeakerViseme('fajar', 'rest')}
            holdingProp="cryogenic_tongs"
            scale={0.96}
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

export default Scene02_DebateHospitalSlip;
