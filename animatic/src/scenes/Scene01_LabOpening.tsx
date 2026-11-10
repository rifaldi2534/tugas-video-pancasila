/**
 * SPESIMEN TERAKHIR — Scene 01: Lab Opening (0:00 - 3:00 / 4,320 frames)
 * Setting: INT. LAB PENGUJIAN MEKANIK DTMM FTIRS ITS - MALAM
 * 
 * Dramaturgi & Koreksi Logika Sinematik:
 * - Anti-barisan 14 anak: Karakter muncul selektif per-shot sesuai alur cerita.
 * - Suara Dialog Aktor Nyata (Edge-TTS Neural Voice) dimainkan sinkron per baris dialog.
 * - Pementasan 9 Shot Sinematik:
 *   Shot 1 (0-360)   : ECU Meja Uji: Mikrometer menjepit takik baja miring 55°.
 *   Shot 2 (360-720) : MCU Hendro & Aryo: Hendro memeriksa takik & bersuara lelah.
 *   Shot 3 (720-1320): Dialogue Hendro & Aryo berhadapan di meja uji.
 *   Shot 4 (1320-1800): Nadia melangkah ke kotak spesimen beludru merah.
 *   Shot 5 (1800-2280): CU Kevin di depan laptop portal SIM ITS.
 *   Shot 6 (2280-2880): MS Pintu lab berderit terbuka: Dimas menerobos masuk.
 *   Shot 7 (2880-3360): MCU Dimas menuntut BAP kelulusan ke Fajar & Aryo.
 *   Shot 8 (3360-3840): MS Pintu lab: Bagas masuk tertatih dengan jaket basah gerimis.
 *   Shot 9 (3840-4320): OTS Aryo menatap Dimas & Bagas (Konfrontasi sisa 1 spesimen).
 */

import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { getScene } from '../data';
import { MaterialsLab } from '../components/environments';
import { CharacterRig } from '../components/characters';
import { CinematicCamera } from '../components/camera';
import { SubtitleOverlay } from '../components/subtitles';
import { AudioEngine } from '../components/audio';
import { ExtendedShotType, ExtendedMovementType } from '../components/camera/cameraPresets';

export interface Scene01Props {
  sceneStartFrame?: number;
}

export const Scene01_LabOpening: React.FC<Scene01Props> = ({ sceneStartFrame = 0 }) => {
  const frame = useCurrentFrame();
  const scene = getScene(1);
  const dialogueLines = scene?.dialogueLines || [];
  const audioCues = scene?.audioCues || [];
  const shots = scene?.shots || [];

  const currentGlobalFrame = frame + sceneStartFrame;

  // Deteksi shot aktif
  const activeShot = shots.find(
    (s) => currentGlobalFrame >= s.startFrame && currentGlobalFrame < s.endFrame
  ) || shots[0];

  const shotNumber = activeShot?.shotNumber || 1;
  const shotType: ExtendedShotType = (activeShot?.framing.shotType as ExtendedShotType) || 'WS';
  const movement: ExtendedMovementType = (activeShot?.framing.movement as ExtendedMovementType) || 'slow_push_in';
  const zoom = activeShot?.framing.zoomFactor ?? 1.0;
  const focusX = activeShot?.framing.horizontalPositionPercent ?? 50;
  const focusY = activeShot?.framing.verticalPositionPercent ?? 50;

  // Deteksi dialog aktif untuk lip-sync & gestur tangan
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
        shakeIntensity={0.3}
      >
        {/* Latar Laboratorium Pengujian Mekanik DTMM ITS */}
        <MaterialsLab lightingMode="fluorescent_4200k" clockTime="22:15" />

        {/* ========================================================================= */}
        {/* PEMENTASAN LOGIS BERDASARKAN SHOT AKTIF (ANTI-BARISAN 14 ANAK) */}
        {/* ========================================================================= */}

        {/* --- SHOT 1 & 2: Meja Uji Mekanik (Hanya Hendro dan Aryo) --- */}
        {(shotNumber === 1 || shotNumber === 2) && (
          <>
            {/* Hendro duduk di bangku lab menatap spesimen dengan mikrometer */}
            <div style={{ position: 'absolute', left: 740, bottom: 90, width: 200, height: 480, zIndex: 26 }}>
              <CharacterRig
                characterId="hendro"
                pose={getSpeakerPose('hendro', 'sitting')}
                expression="Disappointed"
                viseme={getSpeakerViseme('hendro', 'slight_open')}
                holdingProp="mitutoyo_digital_caliper"
                scale={1.12}
                flipDirection={false} // menghadap ke kanan ke arah Aryo
              />
            </div>
            {/* Aryo berdiri di samping meja uji, cemas memegang papan BAP */}
            <div style={{ position: 'absolute', left: 1040, bottom: 105, width: 200, height: 480, zIndex: 24 }}>
              <CharacterRig
                characterId="aryo"
                pose={getSpeakerPose('aryo', 'standing')}
                expression="Serious"
                viseme={getSpeakerViseme('aryo', 'rest')}
                holdingProp="clipboard_bap_wood"
                scale={1.10}
                flipDirection={true} // menoleh ke kiri menatap Hendro
              />
            </div>
          </>
        )}

        {/* --- SHOT 3: Dialog Hendro & Aryo (Fajar di latar belakang dekat dewar nitrogen) --- */}
        {shotNumber === 3 && (
          <>
            {/* Hendro menjelaskan takik cacat */}
            <div style={{ position: 'absolute', left: 680, bottom: 95, width: 200, height: 480, zIndex: 26 }}>
              <CharacterRig
                characterId="hendro"
                pose={getSpeakerPose('hendro', 'sitting')}
                expression="Serious"
                viseme={getSpeakerViseme('hendro', 'slight_open')}
                holdingProp="mitutoyo_digital_caliper"
                scale={1.08}
                flipDirection={false}
              />
            </div>
            {/* Aryo mendengarkan dengan tegang */}
            <div style={{ position: 'absolute', left: 1020, bottom: 105, width: 200, height: 480, zIndex: 25 }}>
              <CharacterRig
                characterId="aryo"
                pose={getSpeakerPose('aryo', 'standing')}
                expression="Shocked"
                viseme={getSpeakerViseme('aryo', 'rest')}
                holdingProp="clipboard_bap_wood"
                scale={1.08}
                flipDirection={true}
              />
            </div>
            {/* Fajar di latar belakang dekat tabung nitrogen */}
            <div style={{ position: 'absolute', left: 340, bottom: 130, width: 200, height: 480, zIndex: 18 }}>
              <CharacterRig
                characterId="fajar"
                pose="standing"
                expression="Nervous"
                viseme="rest"
                holdingProp="cryogenic_tongs"
                scale={0.88}
                flipDirection={false}
              />
            </div>
          </>
        )}

        {/* --- SHOT 4: Nadia Melangkah ke Kotak Beludru Merah --- */}
        {shotNumber === 4 && (
          <>
            {/* Nadia memeriksa kupon spesimen terakhir */}
            <div style={{ position: 'absolute', left: 880, bottom: 100, width: 200, height: 480, zIndex: 28 }}>
              <CharacterRig
                characterId="nadia"
                pose={getSpeakerPose('nadia', 'standing')}
                expression="Confused"
                viseme={getSpeakerViseme('nadia', 'rest')}
                holdingProp="mitutoyo_digital_caliper"
                scale={1.12}
                flipDirection={true} // menoleh ke Hendro
              />
            </div>
            {/* Hendro di meja uji */}
            <div style={{ position: 'absolute', left: 580, bottom: 90, width: 200, height: 480, zIndex: 25 }}>
              <CharacterRig
                characterId="hendro"
                pose={getSpeakerPose('hendro', 'sitting')}
                expression="Normal"
                viseme={getSpeakerViseme('hendro', 'rest')}
                scale={1.05}
                flipDirection={false}
              />
            </div>
            {/* Aryo di samping */}
            <div style={{ position: 'absolute', left: 1180, bottom: 105, width: 200, height: 480, zIndex: 24 }}>
              <CharacterRig
                characterId="aryo"
                pose="standing"
                expression="Serious"
                holdingProp="clipboard_bap_wood"
                scale={1.05}
                flipDirection={true}
              />
            </div>
          </>
        )}

        {/* --- SHOT 5: Close Up Kevin di Meja Terminal Laptop SIM ITS --- */}
        {shotNumber === 5 && (
          <>
            {/* Kevin panik di meja komputer */}
            <div style={{ position: 'absolute', left: 860, bottom: 90, width: 200, height: 480, zIndex: 28 }}>
              <CharacterRig
                characterId="kevin"
                pose={getSpeakerPose('kevin', 'talking')}
                expression="Shocked"
                viseme={getSpeakerViseme('kevin', 'wide_open')}
                scale={1.25}
                flipDirection={false}
              />
            </div>
            {/* Aryo di samping memperhatikan layar */}
            <div style={{ position: 'absolute', left: 560, bottom: 105, width: 200, height: 480, zIndex: 24 }}>
              <CharacterRig
                characterId="aryo"
                pose="standing"
                expression="Serious"
                holdingProp="clipboard_bap_wood"
                scale={1.05}
                flipDirection={false}
              />
            </div>
          </>
        )}

        {/* --- SHOT 6 & 7: Dimas Mendobrak Pintu Lab Menuntut Kalibrasi --- */}
        {(shotNumber === 6 || shotNumber === 7) && (
          <>
            {/* Dimas di ambang pintu, langkah tegap membawa map Astra */}
            <div style={{ position: 'absolute', left: 420, bottom: 100, width: 200, height: 480, zIndex: 28 }}>
              <CharacterRig
                characterId="dimas"
                pose={getSpeakerPose('dimas', 'standing_assertive')}
                expression="Angry"
                viseme={getSpeakerViseme('dimas', 'slight_open')}
                holdingProp="job_offer_contract"
                scale={1.15}
                flipDirection={false} // menatap ke arah Aryo & Fajar di kanan
              />
            </div>
            {/* Aryo berdiri menghadang */}
            <div style={{ position: 'absolute', left: 960, bottom: 105, width: 200, height: 480, zIndex: 25 }}>
              <CharacterRig
                characterId="aryo"
                pose={getSpeakerPose('aryo', 'standing')}
                expression="Serious"
                viseme={getSpeakerViseme('aryo', 'rest')}
                holdingProp="clipboard_bap_wood"
                scale={1.08}
                flipDirection={true} // menatap Dimas
              />
            </div>
            {/* Fajar di dekat mesin Charpy */}
            <div style={{ position: 'absolute', left: 1240, bottom: 100, width: 200, height: 480, zIndex: 22 }}>
              <CharacterRig
                characterId="fajar"
                pose="standing"
                expression="Nervous"
                viseme="rest"
                holdingProp="cryogenic_tongs"
                scale={1.02}
                flipDirection={true}
              />
            </div>
          </>
        )}

        {/* --- SHOT 8: Bagas Masuk Tertatih dengan Jaket Basah --- */}
        {shotNumber === 8 && (
          <>
            {/* Bagas berdiri lemah di pintu */}
            <div style={{ position: 'absolute', left: 460, bottom: 85, width: 200, height: 480, zIndex: 28 }}>
              <CharacterRig
                characterId="bagas"
                pose="standing"
                expression="Sad"
                viseme="rest"
                scale={1.12}
                flipDirection={false}
              />
            </div>
            {/* Dimas menoleh ke Bagas */}
            <div style={{ position: 'absolute', left: 820, bottom: 100, width: 200, height: 480, zIndex: 25 }}>
              <CharacterRig
                characterId="dimas"
                pose="standing_assertive"
                expression="Serious"
                holdingProp="job_offer_contract"
                scale={1.08}
                flipDirection={true}
              />
            </div>
            {/* Aryo di tengah */}
            <div style={{ position: 'absolute', left: 1140, bottom: 105, width: 200, height: 480, zIndex: 24 }}>
              <CharacterRig
                characterId="aryo"
                pose="standing"
                expression="Serious"
                holdingProp="clipboard_bap_wood"
                scale={1.08}
                flipDirection={true}
              />
            </div>
          </>
        )}

        {/* --- SHOT 9: Konfrontasi 3 Sudut (Aryo, Dimas, Bagas) Sisa 1 Spesimen --- */}
        {shotNumber === 9 && (
          <>
            {/* Dimas di kiri menatap Aryo */}
            <div style={{ position: 'absolute', left: 460, bottom: 100, width: 200, height: 480, zIndex: 26 }}>
              <CharacterRig
                characterId="dimas"
                pose="standing_assertive"
                expression="Angry"
                viseme="rest"
                holdingProp="job_offer_contract"
                scale={1.10}
                flipDirection={false}
              />
            </div>
            {/* Aryo di tengah memegang kotak spesimen berbicara ke Dimas & Bagas */}
            <div style={{ position: 'absolute', left: 880, bottom: 105, width: 200, height: 480, zIndex: 28 }}>
              <CharacterRig
                characterId="aryo"
                pose={getSpeakerPose('aryo', 'talking')}
                expression="Serious"
                viseme={getSpeakerViseme('aryo', 'slight_open')}
                holdingProp="clipboard_bap_wood"
                scale={1.12}
                flipDirection={false}
              />
            </div>
            {/* Bagas di kanan mendengarkan dengan cemas */}
            <div style={{ position: 'absolute', left: 1260, bottom: 85, width: 200, height: 480, zIndex: 25 }}>
              <CharacterRig
                characterId="bagas"
                pose="standing"
                expression="Sad"
                viseme="rest"
                scale={1.08}
                flipDirection={true}
              />
            </div>
          </>
        )}

      </CinematicCamera>

      {/* Synchronized Subtitles (Teks asli Suroboyoan & Terjemahan) */}
      <SubtitleOverlay dialogueLines={dialogueLines} sceneStartFrame={sceneStartFrame} />

      {/* Multi-Track Audio Engine (Ambience 4200K + SFX) */}
      <AudioEngine audioCues={audioCues} sceneStartFrame={sceneStartFrame} />

      {/* ========================================================================= */}
      {/* SUARA DIALOG AKTOR NYATA (EDGE NEURAL VOICE PLAYBACK) */}
      {/* ========================================================================= */}
      {dialogueLines.map((line) => {
        const localStart = Math.max(0, line.startFrame - sceneStartFrame);
        const duration = Math.max(1, line.endFrame - line.startFrame);
        const audioSrc = staticFile(`audio/dialogue/scene01/${line.id}.mp3`);

        return (
          <Sequence
            key={`voice-${line.id}`}
            from={localStart}
            durationInFrames={duration}
          >
            <Audio src={audioSrc} volume={1.0} />
          </Sequence>
        );
      })}
    </div>
  );
};

export default Scene01_LabOpening;
