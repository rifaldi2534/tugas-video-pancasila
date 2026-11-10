/**
 * SPESIMEN TERAKHIR — Scene 03: Consensus & Voting (5:30 - 8:30 / 4,320 frames)
 * Setting: INT. RUANG SEMINAR & TERMINAL KOMPUTER DTMM FTIRS ITS - MALAM
 * 
 * Narrative: Pilihan Moral (Ethical Choice / Sila 4).
 * All 14 DTMM students gather for emergency deliberation (Musyawarah).
 * Aryo demands a democratic vote on whether to fabricate test data or repeat the semester.
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

export interface Scene03Props {
  sceneStartFrame?: number;
}

export const Scene03_ConsensusVoting: React.FC<Scene03Props> = ({ sceneStartFrame = 7920 }) => {
  const frame = useCurrentFrame();
  const scene = getScene(3);
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

  const shotType: ExtendedShotType = (activeShot?.framing.shotType as ExtendedShotType) || 'WS';
  const movement: ExtendedMovementType = (activeShot?.framing.movement as ExtendedMovementType) || 'static';
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
        shakeIntensity={0.25}
      >
        {/* Seminar Room Environment */}
        <SeminarRoom lightingMode="standard_3800k" monitorsOn={true} />

        {/* Ensemble of 14 Students around Seminar Conference Tables */}
        {/* Left Wing: Zul, Hendro, Fajar, Danang */}
        <div style={{ position: 'absolute', left: 60, bottom: 135, width: 200, height: 480, zIndex: 16 }}>
          <CharacterRig
            characterId="zul"
            pose={getSpeakerPose('zul', 'sitting')}
            expression="Normal"
            viseme={getSpeakerViseme('zul', 'rest')}
            scale={0.90}
          />
        </div>
        <div style={{ position: 'absolute', left: 190, bottom: 130, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="hendro"
            pose={getSpeakerPose('hendro', 'sitting')}
            expression="Serious"
            viseme={getSpeakerViseme('hendro', 'rest')}
            scale={0.92}
          />
        </div>
        <div style={{ position: 'absolute', left: 320, bottom: 130, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="fajar"
            pose={getSpeakerPose('fajar', 'sitting')}
            expression="Nervous"
            viseme={getSpeakerViseme('fajar', 'rest')}
            scale={0.92}
          />
        </div>
        <div style={{ position: 'absolute', left: 450, bottom: 140, width: 200, height: 480, zIndex: 16 }}>
          <CharacterRig
            characterId="danang"
            pose={getSpeakerPose('danang', 'sitting')}
            expression="Serious"
            viseme={getSpeakerViseme('danang', 'rest')}
            scale={0.90}
          />
        </div>

        {/* Center: Dimas, Aryo, Bagas, Nadia */}
        <div style={{ position: 'absolute', left: 600, bottom: 120, width: 200, height: 480, zIndex: 25 }}>
          <CharacterRig
            characterId="dimas"
            pose={getSpeakerPose('dimas', 'standing_assertive')}
            expression="Angry"
            viseme={getSpeakerViseme('dimas', 'rest')}
            holdingProp="job_offer_contract"
            scale={1.05}
          />
        </div>
        <div style={{ position: 'absolute', left: 780, bottom: 125, width: 200, height: 480, zIndex: 24 }}>
          <CharacterRig
            characterId="aryo"
            pose={getSpeakerPose('aryo', 'standing')}
            expression="Serious"
            viseme={getSpeakerViseme('aryo', 'rest')}
            holdingProp="clipboard_bap_wood"
            scale={1.06}
          />
        </div>
        <div style={{ position: 'absolute', left: 950, bottom: 90, width: 200, height: 480, zIndex: 23 }}>
          <CharacterRig
            characterId="bagas"
            pose={getSpeakerPose('bagas', 'sitting')}
            expression="Sad"
            viseme={getSpeakerViseme('bagas', 'rest')}
            scale={0.95}
          />
        </div>
        <div style={{ position: 'absolute', left: 1120, bottom: 120, width: 200, height: 480, zIndex: 25 }}>
          <CharacterRig
            characterId="nadia"
            pose={getSpeakerPose('nadia', 'standing')}
            expression="Serious"
            viseme={getSpeakerViseme('nadia', 'rest')}
            scale={0.98}
          />
        </div>

        {/* Right Wing: Reza, Farhan, Rere, Kevin, Kirana, Maya */}
        <div style={{ position: 'absolute', left: 1260, bottom: 130, width: 200, height: 480, zIndex: 19 }}>
          <CharacterRig
            characterId="reza"
            pose={getSpeakerPose('reza', 'sitting')}
            expression="Serious"
            viseme={getSpeakerViseme('reza', 'rest')}
            scale={0.92}
          />
        </div>
        <div style={{ position: 'absolute', left: 1390, bottom: 130, width: 200, height: 480, zIndex: 20 }}>
          <CharacterRig
            characterId="farhan"
            pose={getSpeakerPose('farhan', isSpeaking('farhan') ? 'raising_hand_voting' : 'sitting')}
            expression="Serious"
            viseme={getSpeakerViseme('farhan', 'rest')}
            scale={0.92}
          />
        </div>
        <div style={{ position: 'absolute', left: 1510, bottom: 130, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="rere"
            pose={getSpeakerPose('rere', 'sitting')}
            expression="Angry"
            viseme={getSpeakerViseme('rere', 'rest')}
            scale={0.90}
          />
        </div>
        <div style={{ position: 'absolute', left: 1620, bottom: 135, width: 200, height: 480, zIndex: 17 }}>
          <CharacterRig
            characterId="kevin"
            pose={getSpeakerPose('kevin', 'sitting')}
            expression="Suspicious"
            viseme={getSpeakerViseme('kevin', 'rest')}
            scale={0.90}
          />
        </div>
        <div style={{ position: 'absolute', left: 1720, bottom: 130, width: 200, height: 480, zIndex: 17 }}>
          <CharacterRig
            characterId="kirana"
            pose={getSpeakerPose('kirana', 'sitting')}
            expression="Confused"
            viseme={getSpeakerViseme('kirana', 'rest')}
            scale={0.90}
          />
        </div>
        <div style={{ position: 'absolute', left: 1810, bottom: 130, width: 200, height: 480, zIndex: 17 }}>
          <CharacterRig
            characterId="maya"
            pose={getSpeakerPose('maya', 'sitting')}
            expression="Nervous"
            viseme={getSpeakerViseme('maya', 'rest')}
            scale={0.90}
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

export default Scene03_ConsensusVoting;
