/**
 * SPESIMEN TERAKHIR — Scene 07: Exterior Catharsis & Ending Credits (14:45 - 16:00 / 1,800 frames)
 * Setting: EXT. TANGGA SELASAR GEDUNG W FTIRS ITS - DINI HARI
 * 
 * Narrative: Refleksi B (Solidarity & Pancasila Catharsis).
 * All 14 DTMM students sit together side-by-side along the concrete terrace stairs,
 * sharing warm warkop fried tofu and hot tea under the Sukolilo night sky.
 * Incorporates elegant cinematic credits roll celebrating truth, brotherhood, and Pancasila.
 */

import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { getScene } from '../data';
import { ExteriorStairs } from '../components/environments';
import { CharacterRig } from '../components/characters';
import { CinematicCamera } from '../components/camera';
import { SubtitleOverlay } from '../components/subtitles';
import { AudioEngine } from '../components/audio';
import { ExtendedShotType, ExtendedMovementType } from '../components/camera/cameraPresets';

export interface Scene07Props {
  sceneStartFrame?: number;
  showCredits?: boolean;
}

export const Scene07_ExteriorCatharsisCredits: React.FC<Scene07Props> = ({
  sceneStartFrame = 21240,
  showCredits = true,
}) => {
  const frame = useCurrentFrame();
  const scene = getScene(7);
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

  // Active shot framing
  const activeShot = shots.find(
    (s) => currentGlobalFrame >= s.startFrame && currentGlobalFrame < s.endFrame
  ) || shots[0];

  const shotType: ExtendedShotType = (activeShot?.framing.shotType as ExtendedShotType) || 'EWS';
  const movement: ExtendedMovementType = (activeShot?.framing.movement as ExtendedMovementType) || 'slow_pull_out';
  const zoom = activeShot?.framing.zoomFactor ?? 1.0;
  const focusX = activeShot?.framing.horizontalPositionPercent ?? 50;
  const focusY = activeShot?.framing.verticalPositionPercent ?? 50;

  // Credits roll animation (begins at local frame 600 through end 1800)
  const creditsProgress = interpolate(frame, [500, 1800], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const creditsY = interpolate(creditsProgress, [0, 1], [600, -850]);
  const creditsOpacity = interpolate(frame, [500, 560, 1750, 1800], [0, 0.95, 0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        shakeIntensity={0.15}
      >
        {/* Exterior Campus Stairs Environment with Sukolilo Stars */}
        <ExteriorStairs lightingMode="warm_lamplight" showWarkopFood={true} />

        {/* The 14 Students Sitting Together across Terrace Stairs */}
        {/* Row 1 (Lower Terrace): Zul, Danang, Farhan, Bagas, Dimas */}
        <div style={{ position: 'absolute', left: 240, bottom: 90, width: 200, height: 480, zIndex: 25 }}>
          <CharacterRig
            characterId="zul"
            pose="sitting"
            expression="Happy"
            viseme={getSpeakerViseme('zul', 'rest')}
            scale={0.9}
          />
        </div>
        <div style={{ position: 'absolute', left: 380, bottom: 90, width: 200, height: 480, zIndex: 25 }}>
          <CharacterRig
            characterId="danang"
            pose="sitting"
            expression="Normal"
            viseme={getSpeakerViseme('danang', 'rest')}
            scale={0.9}
          />
        </div>
        <div style={{ position: 'absolute', left: 540, bottom: 90, width: 200, height: 480, zIndex: 26 }}>
          <CharacterRig
            characterId="farhan"
            pose="sitting"
            expression="Happy"
            viseme={getSpeakerViseme('farhan', 'rest')}
            holdingProp="gorengan_tahu_paper"
            scale={0.95}
          />
        </div>
        <div style={{ position: 'absolute', left: 720, bottom: 90, width: 200, height: 480, zIndex: 27 }}>
          <CharacterRig
            characterId="bagas"
            pose="sitting"
            expression="Happy"
            viseme={getSpeakerViseme('bagas', 'rest')}
            holdingProp="warkop_teh_cup"
            scale={0.95}
          />
        </div>
        <div style={{ position: 'absolute', left: 890, bottom: 90, width: 200, height: 480, zIndex: 27 }}>
          <CharacterRig
            characterId="dimas"
            pose="sitting"
            expression="Normal"
            viseme={getSpeakerViseme('dimas', 'rest')}
            scale={0.98}
          />
        </div>

        {/* Row 2 (Middle Terrace): Aryo, Nadia, Hendro, Fajar */}
        <div style={{ position: 'absolute', left: 1080, bottom: 120, width: 200, height: 480, zIndex: 23 }}>
          <CharacterRig
            characterId="aryo"
            pose="sitting"
            expression="Happy"
            viseme={getSpeakerViseme('aryo', 'rest')}
            scale={0.96}
          />
        </div>
        <div style={{ position: 'absolute', left: 1240, bottom: 120, width: 200, height: 480, zIndex: 23 }}>
          <CharacterRig
            characterId="nadia"
            pose="sitting"
            expression="Happy"
            viseme={getSpeakerViseme('nadia', 'rest')}
            scale={0.94}
          />
        </div>
        <div style={{ position: 'absolute', left: 1390, bottom: 120, width: 200, height: 480, zIndex: 22 }}>
          <CharacterRig
            characterId="hendro"
            pose="sitting"
            expression="Happy"
            viseme={getSpeakerViseme('hendro', 'rest')}
            scale={0.94}
          />
        </div>
        <div style={{ position: 'absolute', left: 1530, bottom: 120, width: 200, height: 480, zIndex: 22 }}>
          <CharacterRig
            characterId="fajar"
            pose="sitting"
            expression="Normal"
            viseme={getSpeakerViseme('fajar', 'rest')}
            scale={0.92}
          />
        </div>

        {/* Row 3 (Upper Terrace): Kirana, Maya, Rere, Kevin, Reza */}
        <div style={{ position: 'absolute', left: 340, bottom: 160, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="reza"
            pose="sitting"
            expression="Normal"
            viseme={getSpeakerViseme('reza', 'rest')}
            scale={0.88}
          />
        </div>
        <div style={{ position: 'absolute', left: 500, bottom: 160, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="kevin"
            pose="sitting"
            expression="Normal"
            viseme={getSpeakerViseme('kevin', 'rest')}
            scale={0.88}
          />
        </div>
        <div style={{ position: 'absolute', left: 1140, bottom: 160, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="kirana"
            pose="sitting"
            expression="Happy"
            viseme={getSpeakerViseme('kirana', 'rest')}
            scale={0.88}
          />
        </div>
        <div style={{ position: 'absolute', left: 1280, bottom: 160, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="maya"
            pose="sitting"
            expression="Happy"
            viseme={getSpeakerViseme('maya', 'rest')}
            scale={0.88}
          />
        </div>
        <div style={{ position: 'absolute', left: 1420, bottom: 160, width: 200, height: 480, zIndex: 18 }}>
          <CharacterRig
            characterId="rere"
            pose="sitting"
            expression="Happy"
            viseme={getSpeakerViseme('rere', 'rest')}
            scale={0.88}
          />
        </div>
      </CinematicCamera>

      {/* Subtitles Overlay */}
      <SubtitleOverlay dialogueLines={dialogueLines} sceneStartFrame={sceneStartFrame} />

      {/* Audio Engine */}
      <AudioEngine audioCues={audioCues} sceneStartFrame={sceneStartFrame} />

      {/* Cinematic Rolling Credits Overlay */}
      {showCredits && frame >= 500 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1920,
            height: 1080,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: creditsOpacity,
            zIndex: 60,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: creditsY,
              width: 900,
              textAlign: 'center',
              fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              color: '#F8FAFC',
              textShadow: '0 2px 8px rgba(0,0,0,0.85)',
            }}
          >
            <h1 style={{ fontSize: 38, letterSpacing: 6, fontWeight: 800, color: '#38BDF8', marginBottom: 8 }}>
              SPESIMEN TERAKHIR
            </h1>
            <p style={{ fontSize: 20, letterSpacing: 4, color: '#94A3B8', marginBottom: 30, textTransform: 'uppercase' }}>
              The Final Specimen &bull; DTMM FTIRS ITS
            </p>

            <div style={{ width: 120, height: 2, backgroundColor: '#38BDF8', margin: '0 auto 30px' }} />

            <h3 style={{ fontSize: 18, letterSpacing: 3, color: '#CBD5E1', marginBottom: 12, textTransform: 'uppercase' }}>
              Nilai-Nilai Luhur Pancasila
            </h3>
            <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.6, marginBottom: 25 }}>
              <strong style={{ color: '#F1F5F9' }}>Sila Kedua:</strong> Kemanusiaan yang Adil dan Beradab (Empati & Kemanusiaan)<br />
              <strong style={{ color: '#F1F5F9' }}>Sila Keempat:</strong> Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan (Musyawarah Mufakat)<br />
              <strong style={{ color: '#F1F5F9' }}>Sila Kelima:</strong> Keadilan Sosial bagi Seluruh Rakyat Indonesia (Integritas Akademik & Keadilan)
            </p>

            <div style={{ width: 80, height: 1, backgroundColor: '#475569', margin: '0 auto 25px' }} />

            <h3 style={{ fontSize: 18, letterSpacing: 3, color: '#CBD5E1', marginBottom: 12, textTransform: 'uppercase' }}>
              Ensemble Mahasiswa DTMM FTIRS ITS
            </h3>
            <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.8, marginBottom: 30 }}>
              Aryo &bull; Dimas &bull; Bagas &bull; Nadia &bull; Hendro &bull; Fajar &bull; Kevin<br />
              Farhan &bull; Reza &bull; Danang &bull; Zul &bull; Kirana &bull; Maya &bull; Rere
            </p>

            <div style={{ width: 80, height: 1, backgroundColor: '#475569', margin: '0 auto 25px' }} />

            <p style={{ fontSize: 14, color: '#64748B', letterSpacing: 2 }}>
              DIPRODUKSI SECARA PROSEDURAL DENGAN REACT &bull; REMOTION &bull; SVG VECTOR ENGINE
            </p>
            <p style={{ fontSize: 13, color: '#475569', marginTop: 10 }}>
              Surabaya &bull; Jawa Timur &bull; Indonesia
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scene07_ExteriorCatharsisCredits;
