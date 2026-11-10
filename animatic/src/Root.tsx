/**
 * SPESIMEN TERAKHIR - Root.tsx
 * Master Remotion Root & Composition Registry.
 * 
 * Registers:
 * 1. FullFilm: Master 16:00 film animatic (23,040 frames @ 24fps, 1080p Full HD)
 * 2. Scene01 through Scene07: Individual scene chunks for modular rendering & fast preview
 * 3. PrototypeScene: Multi-character verification scene (Scene 1 Charpy lab conflict)
 * 4. CharacterShowcase: Procedural SVG rig inspector for all 14 ITS DTMM characters
 * 5. EnvironmentShowcase: Procedural SVG environment inspector
 */

import React from 'react';
import { Composition, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { FILM_METADATA } from './data';
import {
  PrototypeScene,
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
} from './scenes';
import { CharacterRig, CHARACTER_PROFILES } from './components/characters';
import { MaterialsLab } from './components/environments';

/**
 * Opening Title Card Component (Frames 0 - 144 / ~6 seconds)
 */
const OpeningTitleCard: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [10, 40, 110, 140], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame > 144) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        backgroundColor: '#09090B',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: titleOpacity,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div style={{ color: '#38BDF8', fontSize: 24, letterSpacing: 8, textTransform: 'uppercase', marginBottom: 20 }}>
        Departemen Teknik Material dan Metalurgi FTIRS ITS
      </div>
      <h1 style={{ color: '#F8FAFC', fontSize: 64, letterSpacing: 10, fontWeight: 800, margin: '0 0 16px 0' }}>
        SPESIMEN TERAKHIR
      </h1>
      <div style={{ color: '#94A3B8', fontSize: 22, letterSpacing: 6, textTransform: 'uppercase' }}>
        The Final Specimen &bull; 16:00 Animatic
      </div>
    </div>
  );
};

/**
 * FullFilm Master Assembly Component
 * Sequential timeline spanning exactly 23,040 frames (960 seconds / 16 minutes 00 seconds).
 */
export const FullFilm: React.FC = () => {
  return (
    <div style={{ width: 1920, height: 1080, backgroundColor: '#09090B', position: 'relative', overflow: 'hidden' }}>
      {/* 1. Opening Title Card Overlay */}
      <OpeningTitleCard />

      {/* 2. Scene 01: Lab Opening (0:00 - 3:00 / 4,320 frames) */}
      <Sequence from={0} durationInFrames={4320} name="Scene01_LabOpening">
        <Scene01 sceneStartFrame={0} />
      </Sequence>

      {/* 3. Scene 02: Debate & Hospital Slip (3:00 - 5:30 / 3,600 frames) */}
      <Sequence from={4320} durationInFrames={3600} name="Scene02_DebateHospitalSlip">
        <Scene02 sceneStartFrame={4320} />
      </Sequence>

      {/* 4. Scene 03: Consensus & Voting (5:30 - 8:30 / 4,320 frames) */}
      <Sequence from={7920} durationInFrames={4320} name="Scene03_ConsensusVoting">
        <Scene03 sceneStartFrame={7920} />
      </Sequence>

      {/* 5. Scene 04: Cable Pull Confrontation (8:30 - 11:30 / 4,320 frames) */}
      <Sequence from={12240} durationInFrames={4320} name="Scene04_CablePullConfrontation">
        <Scene04 sceneStartFrame={12240} />
      </Sequence>

      {/* 6. Scene 05: Pendulum Impact Climax (11:30 - 13:30 / 2,880 frames) */}
      <Sequence from={16560} durationInFrames={2880} name="Scene05_PendulumImpactClimax">
        <Scene05 sceneStartFrame={16560} />
      </Sequence>

      {/* 7. Scene 06: Reflective Corridor (13:30 - 14:45 / 1,800 frames) */}
      <Sequence from={19440} durationInFrames={1800} name="Scene06_ReflectiveCorridor">
        <Scene06 sceneStartFrame={19440} />
      </Sequence>

      {/* 8. Scene 07: Exterior Catharsis & Ending Credits (14:45 - 16:00 / 1,800 frames) */}
      <Sequence from={21240} durationInFrames={1800} name="Scene07_ExteriorCatharsisCredits">
        <Scene07 sceneStartFrame={21240} showCredits={true} />
      </Sequence>
    </div>
  );
};

// Re-export scene components for individual chunk composition mounting
export {
  PrototypeScene,
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
};

// Character Showcase Component (all 14 characters)
export const CharacterShowcase: React.FC = () => {
  const charIds = Object.keys(CHARACTER_PROFILES);
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#0F172A',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 40,
        boxSizing: 'border-box',
      }}
    >
      {charIds.map((id) => (
        <div key={id} style={{ width: 220, height: 480, margin: 10, textAlign: 'center' }}>
          <CharacterRig characterId={id} pose="idle" expression="Normal" />
          <div style={{ color: '#F8FAFC', marginTop: 10, fontFamily: 'sans-serif', fontWeight: 'bold' }}>
            {id.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
};

// Environment Showcase Component
export const EnvironmentShowcase: React.FC = () => {
  return (
    <div style={{ width: 1920, height: 1080, position: 'relative' }}>
      <MaterialsLab lightingMode="fluorescent_4200k" />
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Master Full Film Composition (16:00, 23040 frames @ 24fps) */}
      <Composition
        id="FullFilm"
        component={FullFilm}
        durationInFrames={FILM_METADATA.targetTotalFrames} // 23040 frames
        fps={FILM_METADATA.fps} // 24 fps
        width={FILM_METADATA.resolution.width} // 1920
        height={FILM_METADATA.resolution.height} // 1080
      />

      {/* 2. Representative Prototype Scene for M2/M4 E2E verification */}
      <Composition
        id="PrototypeScene"
        component={PrototypeScene}
        durationInFrames={720} // 30 seconds preview @ 24fps
        fps={24}
        width={1920}
        height={1080}
      />

      {/* 3. Seven Sequential Scene Chunks for Resilient Modular Export */}
      <Composition id="Scene01" component={Scene01} durationInFrames={4320} fps={24} width={1920} height={1080} />
      <Composition id="Scene02" component={Scene02} durationInFrames={3600} fps={24} width={1920} height={1080} />
      <Composition id="Scene03" component={Scene03} durationInFrames={4320} fps={24} width={1920} height={1080} />
      <Composition id="Scene04" component={Scene04} durationInFrames={4320} fps={24} width={1920} height={1080} />
      <Composition id="Scene05" component={Scene05} durationInFrames={2880} fps={24} width={1920} height={1080} />
      <Composition id="Scene06" component={Scene06} durationInFrames={1800} fps={24} width={1920} height={1080} />
      <Composition id="Scene07" component={Scene07} durationInFrames={1800} fps={24} width={1920} height={1080} />

      {/* 4. Visual Rig & Environment Inspectors */}
      <Composition id="CharacterShowcase" component={CharacterShowcase} durationInFrames={240} fps={24} width={1920} height={1080} />
      <Composition id="EnvironmentShowcase" component={EnvironmentShowcase} durationInFrames={240} fps={24} width={1920} height={1080} />
    </>
  );
};

export default RemotionRoot;
