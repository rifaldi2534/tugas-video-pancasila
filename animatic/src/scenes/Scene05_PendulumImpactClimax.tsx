/**
 * SPESIMEN TERAKHIR — Scene 05: Pendulum Impact Climax (11:30 - 13:30 / 2,880 frames)
 * Setting: INT. LAB PENGUJIAN MEKANIK DTMM FTIRS ITS - MALAM
 * 
 * Narrative: Klimaks (Sacrifice & Test / Authentic Charpy Impact).
 * The final untouched raw specimen is machined and sub-zero cooled with liquid nitrogen.
 * Aryo pulls the release lever; the 300J Charpy pendulum swings and strikes the specimen!
 * Activates -12 dB safety track peak protection for the monumental impact sound.
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

export interface Scene05Props {
  sceneStartFrame?: number;
}

export const Scene05_PendulumImpactClimax: React.FC<Scene05Props> = ({ sceneStartFrame = 16560 }) => {
  const frame = useCurrentFrame();
  const scene = getScene(5);
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

  const shotType: ExtendedShotType = (activeShot?.framing.shotType as ExtendedShotType) || 'CU';
  const movement: ExtendedMovementType = (activeShot?.framing.movement as ExtendedMovementType) || 'dramatic_zoom';
  const zoom = activeShot?.framing.zoomFactor ?? 1.3;
  const focusX = activeShot?.framing.horizontalPositionPercent ?? 50;
  const focusY = activeShot?.framing.verticalPositionPercent ?? 50;

  // Impact frame occurs near 17500 - 17700
  const isNearImpact = currentGlobalFrame >= 17400 && currentGlobalFrame <= 17800;

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
        shakeIntensity={isNearImpact ? 0.9 : 0.4}
      >
        {/* Lab in high-contrast Climax Impact lighting mode */}
        <MaterialsLab
          lightingMode="climax_impact"
          clockTime="03:45"
          vaporIntensity={0.85}
        />

        {/* Characters on Stage */}
        {/* Fajar (Left, transferring sub-zero specimen with cryogenic tongs) */}
        <div style={{ position: 'absolute', left: 420, bottom: 105, width: 200, height: 480, zIndex: 22 }}>
          <CharacterRig
            characterId="fajar"
            pose={getSpeakerPose('fajar', 'leaning_workbench')}
            expression="Serious"
            viseme={getSpeakerViseme('fajar', 'rest')}
            holdingProp="cryogenic_tongs"
            scale={1.02}
          />
        </div>

        {/* Aryo (Center, hand on the Charpy 300J release lever) */}
        <div style={{ position: 'absolute', left: 740, bottom: 120, width: 200, height: 480, zIndex: 26 }}>
          <CharacterRig
            characterId="aryo"
            pose={getSpeakerPose('aryo', 'standing_assertive')}
            expression="Serious"
            viseme={getSpeakerViseme('aryo', 'slight_open')}
            scale={1.08}
          />
        </div>

        {/* Dimas & Bagas (Center-Right, standing side-by-side awaiting fate) */}
        <div style={{ position: 'absolute', left: 1040, bottom: 110, width: 200, height: 480, zIndex: 24 }}>
          <CharacterRig
            characterId="dimas"
            pose={getSpeakerPose('dimas', 'standing')}
            expression={isNearImpact ? "Shocked" : "Serious"}
            viseme={getSpeakerViseme('dimas', 'rest')}
            scale={1.04}
          />
        </div>
        <div style={{ position: 'absolute', left: 1240, bottom: 100, width: 200, height: 480, zIndex: 23 }}>
          <CharacterRig
            characterId="bagas"
            pose={getSpeakerPose('bagas', 'standing')}
            expression={isNearImpact ? "Shocked" : "Nervous"}
            viseme={getSpeakerViseme('bagas', 'rest')}
            scale={0.98}
          />
        </div>

        {/* Nadia (Right, monitoring stopwatch & digital readout) */}
        <div style={{ position: 'absolute', left: 1480, bottom: 120, width: 200, height: 480, zIndex: 21 }}>
          <CharacterRig
            characterId="nadia"
            pose={getSpeakerPose('nadia', 'standing')}
            expression="Serious"
            viseme={getSpeakerViseme('nadia', 'rest')}
            holdingProp="mitutoyo_digital_caliper"
            scale={0.98}
          />
        </div>
      </CinematicCamera>

      {/* Subtitles Overlay */}
      <SubtitleOverlay dialogueLines={dialogueLines} sceneStartFrame={sceneStartFrame} />

      {/* Audio Engine with -12 dB Safety Peak Protection */}
      <AudioEngine audioCues={audioCues} sceneStartFrame={sceneStartFrame} />
    </div>
  );
};

export default Scene05_PendulumImpactClimax;
