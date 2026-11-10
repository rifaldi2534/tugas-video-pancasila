/**
 * SPESIMEN TERAKHIR - Head.tsx
 * Scalable Head Base, Skin Tone, Ears, Neck, Nose, Facial Hair, and Glasses Options.
 * Supports Glasses Types:
 * - black_rectangular (Fajar)
 * - frameless (Nadia)
 * - thin_wire (Kevin)
 * - safety_goggles (Lab K3L Safety / Charpy testing)
 * - none
 */

import React from 'react';
import { GlassesType } from '../../types/characters';

export interface HeadProps {
  skinToneHex?: string;
  skinShadowHex?: string;
  glasses?: GlassesType;
  hasFacialHair?: boolean;
  facialHairStyle?: string;
  headTilt?: number;
  lookingDirection?: 'forward' | 'left' | 'right';
  children?: React.ReactNode;
}

export const Head: React.FC<HeadProps> = ({
  skinToneHex = '#D4A373',
  skinShadowHex = '#B07D4F',
  glasses = 'none',
  hasFacialHair = false,
  facialHairStyle = '',
  headTilt = 0,
  lookingDirection = 'forward',
  children,
}) => {
  // Head shift when looking left or right
  let shiftX = 0;
  if (lookingDirection === 'left') shiftX = -4;
  if (lookingDirection === 'right') shiftX = 4;

  const renderGlasses = () => {
    switch (glasses) {
      case 'black_rectangular':
        return (
          <g id="glasses-black-rectangular">
            {/* Left Frame */}
            <rect
              x="78"
              y="86"
              width="19"
              height="14"
              rx="2.5"
              fill="none"
              stroke="#09090B"
              strokeWidth="2.2"
            />
            {/* Right Frame */}
            <rect
              x="103"
              y="86"
              width="19"
              height="14"
              rx="2.5"
              fill="none"
              stroke="#09090B"
              strokeWidth="2.2"
            />
            {/* Center Bridge */}
            <line x1="97" y1="91" x2="103" y2="91" stroke="#09090B" strokeWidth="2.2" />
            {/* Temple arms */}
            <line x1="78" y1="89" x2="73" y2="91" stroke="#09090B" strokeWidth="1.8" />
            <line x1="122" y1="89" x2="127" y2="91" stroke="#09090B" strokeWidth="1.8" />
            {/* Glare reflection */}
            <line x1="81" y1="88" x2="86" y2="88" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <line x1="106" y1="88" x2="111" y2="88" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </g>
        );

      case 'frameless':
        return (
          <g id="glasses-frameless">
            {/* Subtle Lens Outline */}
            <rect
              x="79"
              y="87"
              width="18"
              height="12"
              rx="3"
              fill="#E0F2FE"
              fillOpacity="0.15"
              stroke="#94A3B8"
              strokeWidth="0.8"
            />
            <rect
              x="103"
              y="87"
              width="18"
              height="12"
              rx="3"
              fill="#E0F2FE"
              fillOpacity="0.15"
              stroke="#94A3B8"
              strokeWidth="0.8"
            />
            {/* Titanium Bridge */}
            <path d="M 97,91 Q 100,89 103,91" fill="none" stroke="#64748B" strokeWidth="1.2" />
            {/* Delicate temples */}
            <line x1="79" y1="91" x2="73" y2="92" stroke="#64748B" strokeWidth="0.8" />
            <line x1="121" y1="91" x2="127" y2="92" stroke="#64748B" strokeWidth="0.8" />
            {/* Blue-anti reflective glare */}
            <line x1="82" y1="89" x2="88" y2="89" stroke="#38BDF8" strokeWidth="0.9" opacity="0.7" />
            <line x1="106" y1="89" x2="112" y2="89" stroke="#38BDF8" strokeWidth="0.9" opacity="0.7" />
          </g>
        );

      case 'thin_wire':
        return (
          <g id="glasses-thin-wire">
            <ellipse
              cx="88"
              cy="93"
              rx="9.5"
              ry="7.5"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            <ellipse
              cx="112"
              cy="93"
              rx="9.5"
              ry="7.5"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            {/* Curved wire bridge */}
            <path d="M 97.5,91 Q 100,88 102.5,91" fill="none" stroke="#CBD5E1" strokeWidth="1.2" />
            <line x1="78.5" y1="92" x2="73" y2="92" stroke="#CBD5E1" strokeWidth="1.0" />
            <line x1="121.5" y1="92" x2="127" y2="92" stroke="#CBD5E1" strokeWidth="1.0" />
          </g>
        );

      case 'safety_goggles':
        return (
          <g id="glasses-safety-goggles">
            {/* Transparent Large Polycarbonate Visor */}
            <path
              d="M 75,85 C 75,80 82,78 100,78 C 118,78 125,80 125,85 L 124,103 C 124,107 116,108 100,108 C 84,108 76,107 76,103 Z"
              fill="#ECFDF5"
              fillOpacity="0.3"
              stroke="#059669"
              strokeWidth="1.8"
            />
            {/* Rubber Strap */}
            <line x1="75" y1="89" x2="68" y2="93" stroke="#047857" strokeWidth="3" />
            <line x1="125" y1="89" x2="132" y2="93" stroke="#047857" strokeWidth="3" />
            {/* Protective Rim Highlight */}
            <path
              d="M 78,82 Q 100,80 122,82"
              fill="none"
              stroke="#34D399"
              strokeWidth="1.2"
              opacity="0.8"
            />
          </g>
        );

      case 'none':
      default:
        return null;
    }
  };

  return (
    <g
      id="head-component"
      transform={`translate(${shiftX}, 0) rotate(${headTilt}, 100, 110)`}
    >
      {/* Neck */}
      <g id="neck-group">
        <path
          d="M 92,122 L 92,154 L 108,154 L 108,122 Z"
          fill={skinToneHex}
        />
        {/* Neck shadow under jaw */}
        <path
          d="M 92,122 C 95,129 105,129 108,122 L 108,130 C 104,134 96,134 92,130 Z"
          fill={skinShadowHex}
          opacity="0.45"
        />
      </g>

      {/* Ears */}
      <g id="ears-group">
        {/* Left Ear */}
        <path
          d="M 74,88 C 69,88 67,93 67,98 C 67,103 70,106 74,104 Z"
          fill={skinToneHex}
          stroke={skinShadowHex}
          strokeWidth="1"
        />
        <path
          d="M 72,92 C 70,93 70,98 72,100"
          fill="none"
          stroke={skinShadowHex}
          strokeWidth="1"
        />
        {/* Right Ear */}
        <path
          d="M 126,88 C 131,88 133,93 133,98 C 133,103 130,106 126,104 Z"
          fill={skinToneHex}
          stroke={skinShadowHex}
          strokeWidth="1"
        />
        <path
          d="M 128,92 C 130,93 130,98 128,100"
          fill="none"
          stroke={skinShadowHex}
          strokeWidth="1"
        />
      </g>

      {/* Cranium & Jaw Base */}
      <path
        id="jaw-base"
        d="M 74,84 C 74,66 84,58 100,58 C 116,58 126,66 126,84 C 126,106 116,130 100,130 C 84,130 74,106 74,84 Z"
        fill={skinToneHex}
        stroke={skinShadowHex}
        strokeWidth="1.2"
      />

      {/* Nose */}
      <g id="nose-group">
        <path
          d="M 99,92 L 101,104 L 97,106 L 103,106"
          fill="none"
          stroke={skinShadowHex}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Facial Hair (Zul's mustache or scruff if enabled) */}
      {hasFacialHair && (
        <g id="facial-hair">
          {/* Mustache path */}
          <path
            d="M 94,112 Q 97,110 100,111 Q 103,110 106,112 Q 100,114 94,112 Z"
            fill="#1E293B"
            opacity="0.85"
          />
          {facialHairStyle.includes('beard') && (
            <path
              d="M 96,126 Q 100,130 104,126"
              stroke="#1E293B"
              strokeWidth="2"
              fill="none"
              opacity="0.7"
            />
          )}
        </g>
      )}

      {/* Face Expressions, Eyes, Brows, Mouth Slot */}
      {children}

      {/* Glasses Overlay */}
      {renderGlasses()}
    </g>
  );
};

export default Head;
