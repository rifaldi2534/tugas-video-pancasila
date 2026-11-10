/**
 * SPESIMEN TERAKHIR — Scene 04: Cable Pull Confrontation (8:30 - 11:30 / 4,320 frames)
 * Setting: INT. RUANG SEMINAR & TERMINAL KOMPUTER DTMM FTIRS ITS - MALAM
 * 
 * Narrative: Konsekuensi (Vulnerability & Moral Courage).
 * Dimas prepares to upload forged OriginLab data to the SIM ITS portal.
 * Nadia pulls the main extension cable plug from the wall, plunging the terminals into blackout!
 */

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { getScene } from '../data';
import { SeminarRoom } from '../components/environments';
import { CharacterRig } from '../components/characters';
import { CinematicCamera } from '../components/camera';
import { SubtitleOverlay } from '../components/subtitles';
import { AudioEngine } from '../components/audio';
import { ExtendedShotType, ExtendedMovementType } from '../components/camera/cameraPresets';

export interface Scene04Props {
  sceneStartFrame?: number;
}

export const Scene04_CablePullConfrontation: React.FC<Scene04Props> = ({ sceneStartFrame = 12240 }) => {
  const frame = useCurrentFrame();
  const scene = getScene(4);
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

  const shotType: ExtendedShotType = (activeShot?.framing.shotType as ExtendedShotType) || 'MCU';
  const movement: ExtendedMovementType = (activeShot?.framing.movement as ExtendedMovementType) || 'handheld_bracing';
  const zoom = activeShot?.framing.zoomFactor ?? 1.2;
  const focusX = activeShot?.framing.horizontalPositionPercent ?? 50;
  const focusY = activeShot?.framing.verticalPositionPercent ?? 50;

  // Power is pulled around frame 14400 (midway through scene 4)
  const isPowerCut = currentGlobalFrame >= 14400;

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
        shakeIntensity={isPowerCut ? 0.6 : 0.35}
      >
        {/* Seminar Room with dynamic lighting responding to power cable state */}
        <SeminarRoom
          lightingMode={isPowerCut ? 'power_cut_dark' : 'chiaroscuro_table'}
          monitorsOn={!isPowerCut}
          powerPlugPulled={isPowerCut}
        />

        {/* Dramatic Staging */}
        {/* Nadia (Left, beside wall outlet, having pulled the plug) */}
        <div style={{ position: 'absolute', left: 440, bottom: 95, width: 200, height: 480, zIndex: 26 }}>
          <CharacterRig
            characterId="nadia"
            pose={isPowerCut ? 'pulling_cable' : (isSpeaking('nadia') ? 'talking' : 'standing_assertive')}
            expression={isPowerCut ? "Angry" : "Serious"}
            viseme={getSpeakerViseme('nadia', 'slight_open')}
            scale={1.02}
          />
        </div>

        {/* Dimas (Center, spinning around from monitor in furious outrage) */}
        <div style={{ position: 'absolute', left: 780, bottom: 120, width: 200, height: 480, zIndex: 25 }}>
          <CharacterRig
            characterId="dimas"
            pose={getSpeakerPose('dimas', 'standing_assertive')}
            expression="Angry"
            viseme={getSpeakerViseme('dimas', 'open')}
            scale={1.08}
          />
        </div>

        {/* Aryo (Center-Right, intervening physically between Nadia and Dimas) */}
        <div style={{ position: 'absolute', left: 1060, bottom: 120, width: 200, height: 480, zIndex: 24 }}>
          <CharacterRig
            characterId="aryo"
            pose={getSpeakerPose('aryo', 'standing')}
            expression="Shocked"
            viseme={getSpeakerViseme('aryo', 'slight_open')}
            holdingProp="clipboard_bap_wood"
            scale={1.05}
          />
        </div>

        {/* Bagas (Right, stunned by Nadia's sacrifice on his behalf) */}
        <div style={{ position: 'absolute', left: 1320, bottom: 90, width: 200, height: 480, zIndex: 22 }}>
          <CharacterRig
            characterId="bagas"
            pose={getSpeakerPose('bagas', 'sitting')}
            expression="Shocked"
            viseme={getSpeakerViseme('bagas', 'rest')}
            scale={0.98}
          />
        </div>

        {/* Farhan & Hendro (Background bystanders watching in suspense) */}
        <div style={{ position: 'absolute', left: 1560, bottom: 120, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="farhan"
            pose={getSpeakerPose('farhan', 'standing')}
            expression="Nervous"
            viseme={getSpeakerViseme('farhan', 'rest')}
            scale={0.94}
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

export default Scene04_CablePullConfrontation;
