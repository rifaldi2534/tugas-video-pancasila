/**
 * SPESIMEN TERAKHIR - CharacterRig.tsx
 * Master Hierarchical SVG Character Rig.
 * ViewBox: 0 0 200 480 (Crisp Procedural Vector System).
 * 100% Procedural SVG, Zero Bitmaps, Zero External Dependencies.
 * Integrates:
 * - Head & Face Structure (<Head />)
 * - Individualized Hair & Hijabs for all 14 characters (<Hair />)
 * - 10 Section 8 Emotional Expressions (<FaceExpressions />)
 * - 6 Phonetic Lip-Sync Visemes (<MouthVisemes />)
 * - Authentic DTMM Attire & Lab Coats (<Torso />)
 * - 8 Poses & Contextual Lab Gestures (<Limbs />)
 * - Parametric Signature Props (<HandheldProp />)
 */

import React from 'react';
import { useCurrentFrame } from 'remotion';
import {
  Character,
  BodyPose,
  FacialExpressionState,
  PhonemeMouthShape,
} from '../../types/characters';
import { CHARACTER_PROFILES, getCharacterProfile } from './CharacterProfiles';
import { Head } from './Head';
import { HairBack, HairFront } from './Hair';
import { FaceExpressions } from './FaceExpressions';
import { MouthVisemes, VisemeType } from './MouthVisemes';
import { Torso } from './Torso';
import { Legs, Arms } from './Limbs';

export interface CharacterRigProps {
  characterId?: string;
  characterProfile?: Character;
  pose?: BodyPose | string;
  expression?: FacialExpressionState | string;
  viseme?: VisemeType | PhonemeMouthShape;
  holdingProp?: string;
  scale?: number;
  posX?: number;
  posY?: number;
  flipDirection?: boolean;
  walkCyclePhase?: number;
  breathBob?: number;
  headTilt?: number;
  blinkProgress?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const CharacterRig: React.FC<CharacterRigProps> = ({
  characterId = 'aryo',
  characterProfile,
  pose = 'idle',
  expression = 'Normal',
  viseme = 'rest',
  holdingProp,
  scale = 1.0,
  posX = 0,
  posY = 0,
  flipDirection = false,
  walkCyclePhase = 0,
  breathBob,
  headTilt,
  blinkProgress,
  className = 'character-rig',
  style,
}) => {
  // Resolve Remotion timeline frame safely
  let frame = 0;
  try {
    frame = useCurrentFrame();
  } catch {
    frame = 0;
  }

  // Resolve character configuration
  const char = characterProfile || getCharacterProfile(characterId) || CHARACTER_PROFILES['aryo'];
  const vp = char.visualProfile;
  const palette = vp.palette;

  // Active prop: from props or character default
  const activeProp = holdingProp !== undefined ? holdingProp : (char.signatureProps && char.signatureProps[0]) || '';

  // Calculate composite height scale
  const finalScale = (vp.heightScale || 1.0) * scale;

  // Head shift based on looking direction
  let lookingDirection: 'forward' | 'left' | 'right' = 'forward';
  if (pose === 'looking_left') lookingDirection = 'left';
  if (pose === 'looking_right') lookingDirection = 'right';

  // Seeded phase offset per character to prevent uncanny synchrony
  const charHash = (char.id || 'aryo').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  // Automated breathing bob if breathBob is not explicitly provided
  const autoBreath = Math.sin(((frame + charHash * 7) / 24) * Math.PI * 0.8) * 2;
  const effectiveBreathBob = breathBob !== undefined ? breathBob : autoBreath;

  // Periodic automated blinking if blinkProgress is not explicitly provided
  const blinkCycle = (frame + charHash * 13) % 72;
  const autoBlink = blinkCycle < 4 ? Math.sin((blinkCycle / 4) * Math.PI) : 0;
  const effectiveBlink = blinkProgress !== undefined ? blinkProgress : autoBlink;

  // Subtle natural posture sway so no character is ever a frozen static vector
  const postureSway = Math.sin(((frame + charHash * 11) / 48) * Math.PI) * 0.5;
  const autoSwayTilt = Math.sin(((frame + charHash * 5) / 36) * Math.PI) * 0.5;

  // Head tilt based on pose or prop with subtle posture sway
  let finalHeadTilt = headTilt !== undefined ? headTilt : autoSwayTilt;
  if (pose === 'head_movement') finalHeadTilt = 8 + autoSwayTilt;
  if (pose === 'prostrating_gratitude') finalHeadTilt = 45;

  return (
    <svg
      viewBox="0 0 200 480"
      width={200}
      height={480}
      className={className}
      style={{
        width: 200,
        height: 480,
        overflow: 'visible',
        ...style,
      }}
    >
      <defs>
        {/* Skin Tone Gradient */}
        <linearGradient
          id={`skin-grad-${char.id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.skinToneHex} />
          <stop offset="100%" stopColor={palette.skinShadowHex} />
        </linearGradient>

        {/* Soft Drop Shadow for Character Depth */}
        <radialGradient id={`char-shadow-${char.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#09090B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#09090B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Root Rig Group with Position, Scale, Breathing Bob & Direction Flip */}
      <g
        id={`rig-root-${char.id}`}
        transform={`translate(${posX + postureSway}, ${posY + effectiveBreathBob}) scale(${flipDirection ? -finalScale : finalScale}, ${finalScale})`}
        style={{ transformOrigin: '100px 450px' }}
      >
        {/* 0. Ground Contact Ambient Shadow */}
        <ellipse
          cx="100"
          cy="450"
          rx="42"
          ry="9"
          fill={`url(#char-shadow-${char.id})`}
        />

        {/* 1. Hair / Hijab Back Layer */}
        <HairBack
          hairStyle={vp.hairStyle}
          hairColorHex={palette.hairOrHijabHex}
          headCovering={vp.headCovering}
          hijabColorHex={palette.hairOrHijabHex}
        />

        {/* 2. Legs & Shoes Layer */}
        <Legs
          pose={pose}
          pantsColorHex={palette.pantsColorHex}
          shoesColorHex={palette.shoesColorHex}
          walkCyclePhase={walkCyclePhase}
        />

        {/* 3. Arm Back Layer (behind torso) */}
        <Arms
          pose={pose}
          armColorHex={vp.labCoatDetails.worn ? '#F8FAFC' : palette.primaryAttireHex}
          skinToneHex={palette.skinToneHex}
          skinShadowHex={palette.skinShadowHex}
          holdingProp={activeProp}
          accentPropHex={palette.accentPropHex}
          walkCyclePhase={walkCyclePhase}
          armBack={true}
        />

        {/* 4. Torso & Attire Layer */}
        <Torso
          primaryAttireHex={palette.primaryAttireHex}
          secondaryAttireHex={palette.secondaryAttireHex}
          accentPropHex={palette.accentPropHex}
          labCoatDetails={vp.labCoatDetails}
          underlayerAttire={vp.underlayerAttire}
          bodyBuild={vp.build}
          torsoTilt={pose === 'sitting' ? 6 : 0}
        />

        {/* 5. Head Base, Ears, Neck & Facial Structure */}
        <Head
          skinToneHex={palette.skinToneHex}
          skinShadowHex={palette.skinShadowHex}
          glasses={vp.glasses}
          hasFacialHair={vp.hasFacialHair}
          facialHairStyle={vp.facialHairStyle}
          headTilt={finalHeadTilt}
          lookingDirection={lookingDirection}
        >
          {/* 6. Facial Expressions (Brows, Eyes, Expression Extras) */}
          <FaceExpressions
            expression={expression}
            skinToneHex={palette.skinToneHex}
            skinShadowHex={palette.skinShadowHex}
            browColorHex={palette.hairOrHijabHex}
            eyeColorHex="#0F172A"
            blinkProgress={effectiveBlink}
          />

          {/* 7. Mouth Viseme Overlay (Phoneme Lip-Sync) */}
          <MouthVisemes
            viseme={viseme}
            skinShadowHex={palette.skinShadowHex}
            lipColorHex={palette.skinShadowHex}
          />

          {/* 8. Hair / Hijab Front Layer */}
          <HairFront
            hairStyle={vp.hairStyle}
            hairColorHex={palette.hairOrHijabHex}
            headCovering={vp.headCovering}
            hijabColorHex={palette.hairOrHijabHex}
          />
        </Head>

        {/* 9. Arm Front Layer & Handheld Signature Props */}
        <Arms
          pose={pose}
          armColorHex={vp.labCoatDetails.worn ? '#F8FAFC' : palette.primaryAttireHex}
          skinToneHex={palette.skinToneHex}
          skinShadowHex={palette.skinShadowHex}
          holdingProp={activeProp}
          accentPropHex={palette.accentPropHex}
          walkCyclePhase={walkCyclePhase}
          armBack={false}
        />
      </g>
    </svg>
  );
};

export default CharacterRig;
