/**
 * SPESIMEN TERAKHIR - MouthVisemes.tsx
 * Procedural SVG Lip-Sync Viseme Engine.
 * 6 Phonetic Viseme Shapes:
 * - rest / REST (Neutral closed line)
 * - slight_open / AI (A, I, E - slightly open with teeth)
 * - wide_open / ETC (Open exclamation / consonants)
 * - rounded / O (Round 'O' vowel)
 * - U (Pursed small 'U' vowel)
 * - MBP (Compressed lips for M, B, P consonants)
 */

import React from 'react';
import { PhonemeMouthShape } from '../../types/characters';

export type VisemeType = PhonemeMouthShape | 'REST' | 'AI' | 'O' | 'U' | 'ETC' | 'MBP' | string;

export interface MouthVisemesProps {
  viseme?: VisemeType;
  skinShadowHex?: string;
  lipColorHex?: string;
  mouthInsideHex?: string;
  teethColorHex?: string;
}

export const MouthVisemes: React.FC<MouthVisemesProps> = ({
  viseme = 'rest',
  skinShadowHex = '#B07D4F',
  lipColorHex = '#881337',
  mouthInsideHex = '#450A0A',
  teethColorHex = '#F8FAFC',
}) => {
  const norm = (viseme || 'rest').toLowerCase();

  switch (norm) {
    case 'ai':
    case 'slight_open':
      return (
        <g id="viseme-slight-open-ai">
          {/* Cavity */}
          <path
            d="M 91,114 Q 100,111 109,114 Q 110,121 100,121 Q 90,121 91,114 Z"
            fill={mouthInsideHex}
            stroke={lipColorHex}
            strokeWidth="1.2"
          />
          {/* Upper teeth */}
          <path d="M 93,114 Q 100,113 107,114 L 106,116 Q 100,115 94,116 Z" fill={teethColorHex} />
          {/* Tongue hint */}
          <ellipse cx="100" cy="119" rx="4" ry="2" fill="#E11D48" opacity="0.8" />
        </g>
      );

    case 'wide_open':
    case 'etc':
      return (
        <g id="viseme-wide-open">
          {/* Deep Cavity */}
          <path
            d="M 89,113 Q 100,109 111,113 Q 113,125 100,125 Q 87,125 89,113 Z"
            fill={mouthInsideHex}
            stroke={lipColorHex}
            strokeWidth="1.5"
          />
          {/* Upper teeth */}
          <path d="M 92,113 Q 100,111 108,113 L 107,116 Q 100,114 93,116 Z" fill={teethColorHex} />
          {/* Lower teeth */}
          <path d="M 94,123 Q 100,121 106,123 L 105,124 Q 100,123 95,124 Z" fill={teethColorHex} />
          {/* Tongue */}
          <path d="M 95,122 Q 100,118 105,122 Z" fill="#E11D48" />
        </g>
      );

    case 'o':
    case 'rounded':
      return (
        <g id="viseme-rounded-o">
          <ellipse
            cx="100"
            cy="117"
            rx="6.5"
            ry="7.5"
            fill={mouthInsideHex}
            stroke={lipColorHex}
            strokeWidth="1.6"
          />
          {/* Inner dark center */}
          <ellipse cx="100" cy="117" rx="3.5" ry="4.5" fill="#1C1917" />
          <ellipse cx="100" cy="119.5" rx="3" ry="1.5" fill="#E11D48" opacity="0.8" />
        </g>
      );

    case 'u':
      return (
        <g id="viseme-u">
          <ellipse
            cx="100"
            cy="117"
            rx="4.2"
            ry="5.2"
            fill={mouthInsideHex}
            stroke={lipColorHex}
            strokeWidth="1.8"
          />
          <circle cx="100" cy="117" r="2.2" fill="#1C1917" />
        </g>
      );

    case 'mbp':
      return (
        <g id="viseme-mbp">
          {/* Firmly pressed lips line */}
          <path
            d="M 91,116 Q 100,115.5 109,116"
            stroke={lipColorHex}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 93,116 Q 100,115.5 107,116"
            stroke={skinShadowHex}
            strokeWidth="1"
            fill="none"
          />
        </g>
      );

    case 'rest':
    default:
      return (
        <g id="viseme-rest">
          <path
            d="M 92,116 Q 100,117.5 108,116"
            stroke={skinShadowHex}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );
  }
};

export default MouthVisemes;
