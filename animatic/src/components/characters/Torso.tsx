/**
 * SPESIMEN TERAKHIR - Torso.tsx
 * Procedural Clothing, Underlayers, and Lab Coat System.
 * Supported Attire Variants:
 * - Clean lab coat (Fajar, Dimas, Nadia)
 * - Oil-stained / greasy lab coat (Hendro)
 * - Creased / crumpled lab coat (Aryo, Kevin)
 * - Workshop leather/denim apron (Hendro)
 * - Faded HMMT amber hoodie with kangaroo pouch (Bagas)
 * - Plaid flannel shirt (Dimas)
 * - Cotton polo shirts (Aryo, Danang, Zul)
 * - Female blouses & campus formal blazers (Maya, Rere, Kirana)
 * - Name tag embroidery ("NAME - DTMM ITS")
 */

import React from 'react';
import { LabCoatDetails } from '../../types/characters';

export interface TorsoProps {
  primaryAttireHex?: string;
  secondaryAttireHex?: string;
  accentPropHex?: string;
  labCoatDetails?: LabCoatDetails;
  underlayerAttire?: string;
  bodyBuild?: 'slender' | 'medium' | 'stocky' | 'athletic';
  torsoTilt?: number;
}

export const Torso: React.FC<TorsoProps> = ({
  primaryAttireHex = '#1E3A8A',
  secondaryAttireHex = '#F8FAFC',
  accentPropHex = '#B45309',
  labCoatDetails = {
    worn: true,
    buttoned: true,
    nameTagText: 'STUDENT - DTMM ITS',
    condition: 'clean',
  },
  underlayerAttire = 'Kemeja polo',
  bodyBuild = 'medium',
  torsoTilt = 0,
}) => {
  // Adjust torso width based on body build
  let shoulderLeft = 66;
  let shoulderRight = 134;
  let waistLeft = 74;
  let waistRight = 126;

  if (bodyBuild === 'stocky') {
    shoulderLeft = 60;
    shoulderRight = 140;
    waistLeft = 70;
    waistRight = 130;
  } else if (bodyBuild === 'slender') {
    shoulderLeft = 70;
    shoulderRight = 130;
    waistLeft = 77;
    waistRight = 123;
  } else if (bodyBuild === 'athletic') {
    shoulderLeft = 62;
    shoulderRight = 138;
    waistLeft = 74;
    waistRight = 126;
  }

  const { worn = true, buttoned = true, condition = 'clean', nameTagText = '' } = labCoatDetails;

  // Render underlayer shirt / flannel / hoodie
  const renderUnderlayer = () => {
    const isFlannel = underlayerAttire.toLowerCase().includes('flannel');
    const isHoodie = underlayerAttire.toLowerCase().includes('hoodie');

    if (isHoodie) {
      return (
        <g id="underlayer-hoodie">
          {/* Faded HMMT Hoodie Base */}
          <path
            d={`M ${shoulderLeft},152 L 100,166 L ${shoulderRight},152 L ${waistRight},260 L ${waistLeft},260 Z`}
            fill={primaryAttireHex || '#D97706'}
          />
          {/* Hood collar fold behind neck */}
          <path
            d="M 85,148 Q 100,158 115,148 L 120,158 Q 100,168 80,158 Z"
            fill="#B45309"
          />
          {/* Drawstrings */}
          <line x1="92" y1="162" x2="92" y2="182" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="108" y1="162" x2="108" y2="182" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
          {/* Kangaroo Pouch */}
          <path
            d={`M ${waistLeft + 6},218 L ${waistRight - 6},218 L ${waistRight - 8},252 L ${waistLeft + 8},252 Z`}
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="1.2"
          />
          {/* Faded HMMT text badge */}
          <text
            x="100"
            y="190"
            textAnchor="middle"
            fill="#FEF3C7"
            fontSize="7"
            fontWeight="bold"
            fontFamily="sans-serif"
            opacity="0.85"
          >
            HMMT ITS
          </text>
        </g>
      );
    }

    if (isFlannel) {
      return (
        <g id="underlayer-flannel">
          {/* Base Shirt */}
          <path
            d={`M ${shoulderLeft},152 L 100,166 L ${shoulderRight},152 L ${waistRight},260 L ${waistLeft},260 Z`}
            fill={primaryAttireHex || '#991B1B'}
          />
          {/* Flannel Plaid Grid Pattern */}
          <line x1="84" y1="156" x2="84" y2="260" stroke="#18181B" strokeWidth="2.5" opacity="0.65" />
          <line x1="100" y1="166" x2="100" y2="260" stroke="#18181B" strokeWidth="2.5" opacity="0.65" />
          <line x1="116" y1="156" x2="116" y2="260" stroke="#18181B" strokeWidth="2.5" opacity="0.65" />
          <line x1="70" y1="185" x2="130" y2="185" stroke="#18181B" strokeWidth="2" opacity="0.65" />
          <line x1="72" y1="215" x2="128" y2="215" stroke="#18181B" strokeWidth="2" opacity="0.65" />
          <line x1="74" y1="245" x2="126" y2="245" stroke="#18181B" strokeWidth="2" opacity="0.65" />
          {/* Collar */}
          <path d="M 88,152 L 100,164 L 92,168 Z" fill="#7F1D1D" stroke="#18181B" strokeWidth="1" />
          <path d="M 112,152 L 100,164 L 108,168 Z" fill="#7F1D1D" stroke="#18181B" strokeWidth="1" />
        </g>
      );
    }

    // Default Polo / Blouse / T-Shirt
    return (
      <g id="underlayer-standard">
        <path
          d={`M ${shoulderLeft},152 L 100,164 L ${shoulderRight},152 L ${waistRight},260 L ${waistLeft},260 Z`}
          fill={primaryAttireHex}
        />
        {/* Collar V-Neck / Polo placket */}
        <path d="M 90,152 L 100,165 L 94,168 Z" fill={secondaryAttireHex || '#F8FAFC'} />
        <path d="M 110,152 L 100,165 L 106,168 Z" fill={secondaryAttireHex || '#F8FAFC'} />
        {/* Placket */}
        <line x1="100" y1="165" x2="100" y2="188" stroke="#0F172A" strokeWidth="1.2" opacity="0.5" />
        <circle cx="100" cy="172" r="0.8" fill="#F8FAFC" />
        <circle cx="100" cy="182" r="0.8" fill="#F8FAFC" />
      </g>
    );
  };

  // Render Lab Coat or Apron overlay
  const renderOuterLayer = () => {
    if (!worn && condition !== 'apron_substitute') {
      return null;
    }

    // Hendro's Workshop Apron
    if (condition === 'apron_substitute') {
      return (
        <g id="workshop-apron">
          {/* Neck Loop Strap */}
          <path d="M 88,152 Q 100,146 112,152 L 112,168 L 88,168 Z" fill="#374151" />
          {/* Apron Bib */}
          <path
            d={`M 84,168 L 116,168 L ${waistRight - 4},275 L ${waistLeft + 4},275 Z`}
            fill="#4B5563"
            stroke="#1F2937"
            strokeWidth="1.5"
          />
          {/* Front Tool Pocket */}
          <rect
            x="86"
            y="215"
            width="28"
            height="26"
            fill="#374151"
            stroke="#1F2937"
            strokeWidth="1"
          />
          {/* Grease / Oil smudges on apron */}
          <ellipse cx="94" cy="225" rx="5" ry="3" fill="#111827" opacity="0.6" />
          <ellipse cx="104" cy="232" rx="4" ry="2" fill="#111827" opacity="0.5" />
          {/* Pen / Micrometer slot */}
          <line x1="100" y1="215" x2="100" y2="241" stroke="#1F2937" strokeWidth="1" />
        </g>
      );
    }

    // Standard Lab Coat (Clean, Creased, or Oil-stained)
    const coatBaseColor = '#F8FAFC';
    const coatShadowColor = '#CBD5E1';

    let lapelCreaseOverlay: React.ReactNode = null;
    let stainOverlay: React.ReactNode = null;

    if (condition === 'creased') {
      lapelCreaseOverlay = (
        <g id="creases-overlay">
          <path d="M 80,180 L 88,195 M 76,210 L 86,220" stroke="#94A3B8" strokeWidth="1" opacity="0.7" />
          <path d="M 120,185 L 114,200 M 122,215 L 112,228" stroke="#94A3B8" strokeWidth="1" opacity="0.7" />
          <path d="M 86,250 L 98,258" stroke="#94A3B8" strokeWidth="1" opacity="0.6" />
        </g>
      );
    } else if (condition === 'oil_stained') {
      stainOverlay = (
        <g id="oil-stains-overlay">
          <ellipse cx="86" cy="210" rx="4" ry="2.5" fill="#374151" opacity="0.55" />
          <ellipse cx="114" cy="235" rx="6" ry="3.5" fill="#1F2937" opacity="0.6" />
          <ellipse cx="106" cy="180" rx="3" ry="2" fill="#4B5563" opacity="0.5" />
          <circle cx="82" cy="245" r="2" fill="#111827" opacity="0.45" />
        </g>
      );
    } else if (condition === 'dusty') {
      stainOverlay = (
        <g id="dust-smudges-overlay">
          <path d="M 82,190 Q 90,195 86,205" stroke="#A8A29E" strokeWidth="2" opacity="0.4" fill="none" />
          <path d="M 112,210 Q 120,218 116,226" stroke="#A8A29E" strokeWidth="2.5" opacity="0.4" fill="none" />
        </g>
      );
    }

    if (buttoned) {
      // Buttoned Lab Coat
      return (
        <g id="lab-coat-buttoned">
          {/* Main Coat Body extending down to thighs */}
          <path
            d={`M ${shoulderLeft - 2},152 L 94,166 L 100,172 L 106,166 L ${shoulderRight + 2},152 L ${waistRight + 4},295 L ${waistLeft - 4},295 Z`}
            fill={coatBaseColor}
            stroke={coatShadowColor}
            strokeWidth="1.2"
          />
          {/* Coat Lapels */}
          <path
            d={`M ${shoulderLeft - 2},152 L 88,188 L 100,188 L 94,166 Z`}
            fill={coatShadowColor}
            opacity="0.35"
          />
          <path
            d={`M ${shoulderRight + 2},152 L 112,188 L 100,188 L 106,166 Z`}
            fill={coatShadowColor}
            opacity="0.35"
          />
          {/* Left Lapel flap over right */}
          <path
            d="M 94,166 L 88,188 L 100,188 Z"
            fill={coatBaseColor}
            stroke={coatShadowColor}
            strokeWidth="1"
          />
          <path
            d="M 106,166 L 112,188 L 100,188 Z"
            fill={coatBaseColor}
            stroke={coatShadowColor}
            strokeWidth="1"
          />
          {/* Center Button Line */}
          <line x1="100" y1="188" x2="100" y2="295" stroke={coatShadowColor} strokeWidth="1.2" />
          {/* Buttons */}
          <circle cx="100" cy="202" r="1.5" fill="#475569" />
          <circle cx="100" cy="222" r="1.5" fill="#475569" />
          <circle cx="100" cy="242" r="1.5" fill="#475569" />
          <circle cx="100" cy="262" r="1.5" fill="#475569" />
          {/* Chest Pocket & DTMM Name Tag */}
          <rect x="76" y="184" width="16" height="18" fill="none" stroke={coatShadowColor} strokeWidth="1" />
          {nameTagText && (
            <g id="name-tag">
              <rect x="77" y="186" width="14" height="6" fill="#1E3A8A" rx="0.5" />
              <text x="84" y="190.5" textAnchor="middle" fill="#FFFFFF" fontSize="2.8" fontWeight="bold" fontFamily="sans-serif">
                DTMM
              </text>
            </g>
          )}
          {/* Lower Side Pockets */}
          <rect x="74" y="240" width="14" height="20" fill="none" stroke={coatShadowColor} strokeWidth="1" />
          <rect x="112" y="240" width="14" height="20" fill="none" stroke={coatShadowColor} strokeWidth="1" />
          {/* Creases and Stains */}
          {lapelCreaseOverlay}
          {stainOverlay}
        </g>
      );
    } else {
      // Unbuttoned Lab Coat Flapping Open (Shows underlayer)
      return (
        <g id="lab-coat-unbuttoned">
          {/* Left Coat Flap */}
          <path
            d={`M ${shoulderLeft - 2},152 L 88,166 L 86,295 L ${waistLeft - 4},295 Z`}
            fill={coatBaseColor}
            stroke={coatShadowColor}
            strokeWidth="1.2"
          />
          {/* Right Coat Flap */}
          <path
            d={`M ${shoulderRight + 2},152 L 112,166 L 114,295 L ${waistRight + 4},295 Z`}
            fill={coatBaseColor}
            stroke={coatShadowColor}
            strokeWidth="1.2"
          />
          {/* Left Lapel */}
          <path d={`M ${shoulderLeft - 2},152 L 84,188 L 88,188 L 88,166 Z`} fill={coatShadowColor} opacity="0.4" />
          <path d={`M ${shoulderRight + 2},152 L 116,188 L 112,188 L 112,166 Z`} fill={coatShadowColor} opacity="0.4" />
          {/* Chest Pocket on left */}
          <rect x="73" y="186" width="13" height="16" fill="none" stroke={coatShadowColor} strokeWidth="1" />
          {/* Lower Pockets */}
          <rect x="72" y="242" width="12" height="18" fill="none" stroke={coatShadowColor} strokeWidth="1" />
          <rect x="115" y="242" width="12" height="18" fill="none" stroke={coatShadowColor} strokeWidth="1" />
          {/* Creases and Stains */}
          {lapelCreaseOverlay}
          {stainOverlay}
        </g>
      );
    }
  };

  return (
    <g id="torso-component" transform={`rotate(${torsoTilt}, 100, 210)`}>
      {/* 1. Underlayer Attire (Flannel, Hoodie, Polo, Blouse) */}
      {renderUnderlayer()}

      {/* 2. Outer Garment Layer (Lab Coat or Apron) */}
      {renderOuterLayer()}

      {/* 3. Waist Belt / Pants Waistband */}
      <rect
        x={waistLeft}
        y="256"
        width={waistRight - waistLeft}
        height="8"
        fill="#18181B"
        stroke="#09090B"
        strokeWidth="0.8"
      />
      <rect x="96" y="257" width="8" height="6" fill="#D4D4D8" rx="1" />
    </g>
  );
};

export default Torso;
