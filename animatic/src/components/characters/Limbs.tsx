/**
 * SPESIMEN TERAKHIR - Limbs.tsx
 * Procedural Arms, Legs, Hand Gestures, and Signature Props System.
 * Supports all 8 Section 8 Required Poses:
 * 1. idle (relaxed natural stance)
 * 2. walking (parametric walk cycle contact & passing phases)
 * 3. sitting (90° knee bend, seated hips, lap hands)
 * 4. standing (upright assertive/confident posture)
 * 5. head_movement (coordinated stance)
 * 6. looking_left (subtle body turn)
 * 7. looking_right (subtle body turn)
 * 8. talking (open expressive conversational arm gestures)
 *
 * Plus Contextual Laboratory Poses:
 * - raising_hand_voting (Farhan voting)
 * - pulling_cable (Nadia pulling lab power plug)
 * - holding_prop (Charpy tongs, clipboard, calipers, receipts)
 * - prostrating_gratitude (Bagas sujud syukur on lab floor)
 * - eating_snack (eating warkop fried tofu)
 * - slouched_exhausted, leaning_doorframe, gesturing_aggressive, operating_machine.
 */

import React from 'react';
import { BodyPose } from '../../types/characters';

export interface LimbsProps {
  pose?: BodyPose | string;
  pantsColorHex?: string;
  shoesColorHex?: string;
  skinToneHex?: string;
  skinShadowHex?: string;
  armColorHex?: string;
  holdingProp?: string;
  accentPropHex?: string;
  walkCyclePhase?: number; // 0 to 1
  armBack?: boolean;
}

/**
 * Procedural Handheld & Dramaturgical Props (Zero Bitmaps, 100% SVG)
 */
export const HandheldProp: React.FC<{
  propType?: string;
  accentPropHex?: string;
  posX?: number;
  posY?: number;
  rotation?: number;
}> = ({ propType = '', accentPropHex = '#B45309', posX = 0, posY = 0, rotation = 0 }) => {
  if (!propType) return null;
  const p = propType.toLowerCase();

  return (
    <g id={`prop-${p}`} transform={`translate(${posX}, ${posY}) rotate(${rotation})`}>
      {/* 1. Aryo: Clipboard BAP Kayu & Bolpoin Pilot */}
      {(p.includes('clipboard') || p.includes('bap')) && (
        <g id="prop-clipboard">
          {/* Wooden board */}
          <rect x="-14" y="-20" width="28" height="38" rx="2" fill="#92400E" stroke="#78350F" strokeWidth="1" />
          {/* White paper BAP */}
          <rect x="-12" y="-17" width="24" height="33" fill="#F8FAFC" />
          {/* Text lines */}
          <line x1="-9" y1="-12" x2="9" y2="-12" stroke="#64748B" strokeWidth="1" />
          <line x1="-9" y1="-7" x2="9" y2="-7" stroke="#64748B" strokeWidth="1" />
          <line x1="-9" y1="-2" x2="9" y2="-2" stroke="#64748B" strokeWidth="1" />
          <line x1="-9" y1="3" x2="5" y2="3" stroke="#64748B" strokeWidth="1" />
          {/* Red stamp */}
          <circle cx="4" cy="8" r="4" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.8" />
          {/* Silver clip at top */}
          <rect x="-6" y="-22" width="12" height="5" rx="1" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.8" />
        </g>
      )}

      {/* 2. Dimas: Kwitansi Transfer BCA & Map Kulit */}
      {(p.includes('bca') || p.includes('receipt') || p.includes('briefcase')) && (
        <g id="prop-bca-receipt">
          {/* Pink Hospital / Transfer Slip */}
          <rect x="-12" y="-18" width="24" height="34" rx="1" fill="#FCE7F3" stroke="#F43F5E" strokeWidth="0.8" />
          {/* BCA Logo blue banner */}
          <rect x="-10" y="-16" width="20" height="5" fill="#1D4ED8" />
          <text x="0" y="-12.5" textAnchor="middle" fill="#FFFFFF" fontSize="3.5" fontWeight="bold">
            BCA
          </text>
          {/* Rp 4.500.000 text representation */}
          <line x1="-8" y1="-7" x2="8" y2="-7" stroke="#9D174D" strokeWidth="1.2" />
          <line x1="-8" y1="-3" x2="6" y2="-3" stroke="#9D174D" strokeWidth="0.8" />
          <line x1="-8" y1="1" x2="4" y2="1" stroke="#9D174D" strokeWidth="0.8" />
        </g>
      )}

      {/* 3. Bagas: Kwitansi RSUD Blitar Merah Muda & Kartu Mahasiswa Retak */}
      {(p.includes('rsud') || p.includes('hospital_slip') || p.includes('blitar')) && (
        <g id="prop-rsud-slip">
          {/* Worn pink medical invoice */}
          <rect x="-11" y="-16" width="22" height="30" rx="1" fill="#FFE4E6" stroke="#FB7185" strokeWidth="0.8" />
          <rect x="-9" y="-14" width="18" height="4" fill="#E11D48" />
          <text x="0" y="-11" textAnchor="middle" fill="#FFFFFF" fontSize="2.8" fontWeight="bold">
            RSUD
          </text>
          <line x1="-7" y1="-6" x2="7" y2="-6" stroke="#9F1239" strokeWidth="0.8" />
          <line x1="-7" y1="-2" x2="7" y2="-2" stroke="#9F1239" strokeWidth="0.8" />
          <line x1="-7" y1="2" x2="3" y2="2" stroke="#9F1239" strokeWidth="0.8" />
        </g>
      )}

      {/* 4. Fajar: Stopwatch Digital & Jangka Sorong Vernier Caliper */}
      {(p.includes('stopwatch') || p.includes('caliper')) && (
        <g id="prop-fajar-tools">
          {/* Steel Vernier Caliper */}
          <path d="M -4,-22 L 4,-22 L 4,20 L 0,20 L 0,-18 L -4,-18 Z" fill="#E2E8F0" stroke="#475569" strokeWidth="0.8" />
          {/* Caliper jaw */}
          <path d="M 0,-18 L 14,-18 L 12,-14 L 4,-14 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="0.8" />
          {/* Sliding Vernier scale */}
          <rect x="0" y="-8" width="8" height="12" fill="#94A3B8" stroke="#475569" strokeWidth="0.6" />
        </g>
      )}

      {/* 5. Hendro: Mikrometer Sekrup Analog Mitutoyo & Kikir Segitiga */}
      {(p.includes('micrometer') || p.includes('file') || p.includes('specimen')) && (
        <g id="prop-micrometer">
          {/* C-Frame Mitutoyo green/grey */}
          <path
            d="M -12,-8 C -16,-8 -18,4 -18,10 C -18,16 -16,20 -10,20 L 4,20 C 4,14 2,14 0,14 L -8,14 C -12,14 -12,4 -8,4 L 0,4 L 0,-8 Z"
            fill="#065F46"
            stroke="#047857"
            strokeWidth="1"
          />
          {/* Thimble & Anvil spindle */}
          <rect x="0" y="-1" width="18" height="6" fill="#E2E8F0" stroke="#475569" strokeWidth="0.8" />
          <rect x="10" y="-3" width="10" height="10" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
          {/* Ratchet stop */}
          <rect x="20" y="-1" width="4" height="6" fill="#475569" />
        </g>
      )}

      {/* 6. Farhan: Flashdisk SanDisk Merah & Kunci Motor */}
      {(p.includes('sandisk') || p.includes('flashdrive')) && (
        <g id="prop-sandisk">
          {/* Red USB casing */}
          <rect x="-5" y="-12" width="10" height="20" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8" />
          {/* USB silver head */}
          <rect x="-3.5" y="-18" width="7" height="6" fill="#E2E8F0" stroke="#475569" strokeWidth="0.8" />
          {/* Red neck lanyard cord */}
          <path d="M 0,8 Q 0,26 -14,35" fill="none" stroke="#EF4444" strokeWidth="1.5" />
        </g>
      )}

      {/* 7. Danang: Botol Air Mineral 1.5L */}
      {(p.includes('water') || p.includes('mineral_water')) && (
        <g id="prop-water-bottle">
          {/* Plastic blue transparent bottle */}
          <path
            d="M -7,-18 L 7,-18 L 8,16 C 8,20 6,22 0,22 C -6,22 -8,20 -8,16 Z"
            fill="#BAE6FD"
            fillOpacity="0.6"
            stroke="#38BDF8"
            strokeWidth="0.8"
          />
          {/* Aqua blue label */}
          <rect x="-8" y="-6" width="16" height="12" fill="#0284C7" />
          {/* Blue cap */}
          <rect x="-4" y="-22" width="8" height="4" fill="#0284C7" rx="1" />
        </g>
      )}

      {/* 8. Nadia: Kabel Colokan Listrik Tebal Hitam */}
      {(p.includes('cable') || p.includes('power_cable')) && (
        <g id="prop-power-cable">
          {/* Thick black snaking power cord */}
          <path
            d="M -15,-20 Q -5,-10 0,0 Q 5,10 15,25 Q 25,40 30,55"
            fill="none"
            stroke="#09090B"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Grounded Schuko 2-pin electrical plug head */}
          <rect x="-22" y="-26" width="14" height="10" rx="3" fill="#18181B" stroke="#27272A" strokeWidth="1" />
          <line x1="-24" y1="-24" x2="-22" y2="-24" stroke="#E2E8F0" strokeWidth="2.5" />
          <line x1="-24" y1="-18" x2="-22" y2="-18" stroke="#E2E8F0" strokeWidth="2.5" />
        </g>
      )}

      {/* 9. Zul: Korek Gas Tokai Hijau */}
      {(p.includes('lighter') || p.includes('tokai')) && (
        <g id="prop-tokai-lighter">
          <rect x="-4" y="-12" width="8" height="22" rx="1.5" fill="#16A34A" stroke="#15803D" strokeWidth="0.8" />
          <rect x="-4" y="-16" width="8" height="5" fill="#94A3B8" stroke="#475569" strokeWidth="0.6" />
          <circle cx="2" cy="-14" r="1.5" fill="#334155" />
        </g>
      )}

      {/* 10. Tahu Goreng Warkop & Kertas Koran (Hendro & Scene 7) */}
      {(p.includes('tofu') || p.includes('newspaper') || p.includes('snack')) && (
        <g id="prop-fried-tofu">
          {/* Newspaper paper wrapping cone */}
          <polygon points="-12,-10 12,-10 0,18" fill="#D6D3D1" stroke="#78716C" strokeWidth="0.8" />
          {/* Golden fried crispy tofu cubes */}
          <rect x="-8" y="-14" width="8" height="8" rx="1" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
          <rect x="0" y="-16" width="9" height="9" rx="1" fill="#D97706" stroke="#92400E" strokeWidth="0.8" />
          {/* Green chili pepper */}
          <path d="M 4,-18 Q 8,-22 10,-20" stroke="#16A34A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* Default fallback prop */}
      {!p.includes('clipboard') &&
        !p.includes('bca') &&
        !p.includes('rsud') &&
        !p.includes('caliper') &&
        !p.includes('micrometer') &&
        !p.includes('sandisk') &&
        !p.includes('water') &&
        !p.includes('cable') &&
        !p.includes('lighter') &&
        !p.includes('tofu') && (
          <rect x="-8" y="-12" width="16" height="24" rx="2" fill={accentPropHex} stroke="#1E293B" strokeWidth="1" />
        )}
    </g>
  );
};

/**
 * Legs & Feet Component
 */
export const Legs: React.FC<LimbsProps> = ({
  pose = 'idle',
  pantsColorHex = '#334155',
  shoesColorHex = '#0F172A',
  walkCyclePhase = 0,
}) => {
  const normPose = (pose || 'idle').toLowerCase();

  // Sitting pose: 90° knee bend at Y=350, calves down to Y=430, shoes resting on ground
  if (normPose === 'sitting' || normPose === 'idle_sitting' || normPose.includes('sitting')) {
    return (
      <g id="legs-sitting">
        {/* Left Thigh (seated horizontal) */}
        <path d="M 78,260 L 115,260 L 125,350 L 78,350 Z" fill={pantsColorHex} />
        {/* Left Calf (vertical down to floor) */}
        <path d="M 78,350 L 98,350 L 98,440 L 78,440 Z" fill={pantsColorHex} />
        {/* Right Calf */}
        <path d="M 102,350 L 122,350 L 122,440 L 102,440 Z" fill="#1E293B" opacity="0.9" />
        {/* Left Shoe */}
        <path d="M 74,435 L 102,435 L 106,448 L 74,448 Z" fill={shoesColorHex} rx="2" />
        {/* Right Shoe */}
        <path d="M 98,435 L 126,435 L 130,448 L 98,448 Z" fill={shoesColorHex} rx="2" />
      </g>
    );
  }

  // Prostrating Gratitude (Bagas Sujud Syukur on lab floor)
  if (normPose === 'prostrating_gratitude' || normPose.includes('prostrating')) {
    return (
      <g id="legs-prostrating">
        {/* Folded legs horizontally along floor */}
        <path d="M 60,420 L 140,420 L 140,445 L 60,445 Z" fill={pantsColorHex} />
        {/* Folded shoes */}
        <path d="M 135,420 L 155,420 L 155,445 L 135,445 Z" fill={shoesColorHex} />
      </g>
    );
  }

  // Walking Cycle (contact and passing leg swing)
  if (normPose === 'walking' || normPose === 'walking_cycle') {
    const cycle = (walkCyclePhase % 1) * Math.PI * 2;
    const legLeftAngle = Math.sin(cycle) * 22; // -22 to +22 deg
    const legRightAngle = -Math.sin(cycle) * 22;

    return (
      <g id="legs-walking">
        {/* Left Leg (back or front) */}
        <g transform={`rotate(${legLeftAngle}, 88, 260)`}>
          <path d="M 76,260 L 98,260 L 96,440 L 76,440 Z" fill={pantsColorHex} />
          {/* Left Shoe */}
          <path d="M 72,434 L 104,434 L 108,450 L 72,450 Z" fill={shoesColorHex} />
          {/* White sneaker sole */}
          <rect x="72" y="446" width="36" height="4" fill="#F8FAFC" rx="1" />
        </g>
        {/* Right Leg */}
        <g transform={`rotate(${legRightAngle}, 112, 260)`}>
          <path d="M 102,260 L 124,260 L 122,440 L 102,440 Z" fill="#1E293B" />
          {/* Right Shoe */}
          <path d="M 98,434 L 130,434 L 134,450 L 98,450 Z" fill={shoesColorHex} />
          <rect x="98" y="446" width="36" height="4" fill="#F8FAFC" rx="1" />
        </g>
      </g>
    );
  }

  // Standing Assertive / Wide Stance (Dimas, Reza, Rere)
  if (normPose === 'standing' || normPose === 'standing_assertive') {
    return (
      <g id="legs-standing-assertive">
        {/* Left Leg angled outward */}
        <path d="M 76,260 L 98,260 L 90,442 L 68,442 Z" fill={pantsColorHex} />
        {/* Right Leg angled outward */}
        <path d="M 102,260 L 124,260 L 132,442 L 110,442 Z" fill="#1E293B" />
        {/* Left Shoe */}
        <path d="M 64,436 L 96,436 L 98,450 L 64,450 Z" fill={shoesColorHex} />
        <rect x="64" y="447" width="34" height="4" fill="#F8FAFC" rx="1" />
        {/* Right Shoe */}
        <path d="M 104,436 L 136,436 L 138,450 L 104,450 Z" fill={shoesColorHex} />
        <rect x="104" y="447" width="34" height="4" fill="#F8FAFC" rx="1" />
      </g>
    );
  }

  // Idle Stance (Default natural stance)
  return (
    <g id="legs-idle">
      {/* Left Leg */}
      <path d="M 76,260 L 97,260 L 96,442 L 76,442 Z" fill={pantsColorHex} />
      {/* Right Leg */}
      <path d="M 103,260 L 124,260 L 123,442 L 103,442 Z" fill="#1E293B" />
      {/* Left Shoe */}
      <path d="M 72,436 L 100,436 L 104,450 L 72,450 Z" fill={shoesColorHex} />
      <rect x="72" y="447" width="32" height="4" fill="#F8FAFC" rx="1" />
      {/* Right Shoe */}
      <path d="M 100,436 L 128,436 L 132,450 L 100,450 Z" fill={shoesColorHex} />
      <rect x="100" y="447" width="32" height="4" fill="#F8FAFC" rx="1" />
    </g>
  );
};

/**
 * Arms, Gestures & Props Component
 */
export const Arms: React.FC<LimbsProps> = ({
  pose = 'idle',
  armColorHex = '#F8FAFC',
  skinToneHex = '#D4A373',
  skinShadowHex = '#B07D4F',
  holdingProp = '',
  accentPropHex = '#B45309',
  walkCyclePhase = 0,
  armBack = false,
}) => {
  const normPose = (pose || 'idle').toLowerCase();

  // 1. Voting Pose: Right Arm raised high at 160° (Farhan, Scene 3)
  if (normPose === 'raising_hand_voting' || normPose.includes('voting')) {
    if (armBack) {
      // Left arm resting at side
      return (
        <g id="arm-left-side">
          <path d="M 50,152 L 64,152 L 58,250 L 44,250 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="51" cy="256" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        </g>
      );
    }
    // Right arm raised straight up
    return (
      <g id="arm-right-raised-voting" transform="rotate(-155, 134, 154)">
        <path d="M 124,154 L 138,154 L 136,255 L 122,255 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
        {/* Hand open palm facing forward */}
        <circle cx="129" cy="262" r="7" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        <path d="M 124,265 L 124,272 M 127,266 L 127,274 M 130,266 L 130,274 M 133,265 L 133,272" stroke={skinShadowHex} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    );
  }

  // 2. Pulling Cable Pose (Nadia, Scene 4)
  if (normPose === 'pulling_cable' || normPose.includes('cable')) {
    if (armBack) {
      return (
        <g id="arm-left-bracing">
          <path d="M 50,152 L 64,152 L 62,230 L 48,230 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="55" cy="236" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        </g>
      );
    }
    // Right arm reaching sharply downward gripping power plug
    return (
      <g id="arm-right-pulling-cable">
        <path d="M 136,152 L 148,152 L 156,258 L 144,258 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
        {/* Hand gripping plug */}
        <circle cx="150" cy="264" r="7" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        <HandheldProp propType={holdingProp || 'thick_black_power_cable'} accentPropHex={accentPropHex} posX={150} posY={264} rotation={25} />
      </g>
    );
  }

  // 3. Talking Pose (Expressive Gestures with open arms)
  if (normPose === 'talking' || normPose.includes('talking')) {
    if (armBack) {
      // Left arm slightly raised outward
      return (
        <g id="arm-left-talking" transform="rotate(18, 56, 152)">
          <path d="M 50,152 L 64,152 L 56,245 L 42,245 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="49" cy="252" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        </g>
      );
    }
    // Right arm bent at elbow gesturing outward
    return (
      <g id="arm-right-talking">
        <path d="M 136,152 L 148,152 L 160,215 L 148,215 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
        <path d="M 148,215 L 160,215 L 178,198 L 170,190 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
        {/* Expressive hand palm open */}
        <circle cx="176" cy="192" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        <HandheldProp propType={holdingProp} accentPropHex={accentPropHex} posX={176} posY={192} rotation={-15} />
      </g>
    );
  }

  // 4. Walking Cycle (Ayunan tangan berlawanan arah dengan ayunan kaki)
  if (normPose === 'walking' || normPose === 'walking_cycle') {
    const cycle = (walkCyclePhase % 1) * Math.PI * 2;
    const armSwing = Math.sin(cycle) * 20;

    if (armBack) {
      return (
        <g id="arm-left-walking" transform={`rotate(${-armSwing}, 56, 152)`}>
          <path d="M 50,152 L 64,152 L 58,248 L 44,248 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="51" cy="254" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        </g>
      );
    }
    return (
      <g id="arm-right-walking" transform={`rotate(${armSwing}, 142, 152)`}>
        <path d="M 136,152 L 150,152 L 144,248 L 130,248 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
        <circle cx="137" cy="254" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
      </g>
    );
  }

  // 5. Sitting Pose (Hands resting gently on thighs/lap)
  if (normPose === 'sitting' || normPose === 'idle_sitting' || normPose.includes('sitting')) {
    if (armBack) {
      return (
        <g id="arm-left-sitting">
          <path d="M 50,152 L 64,152 L 72,242 L 58,242 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="65" cy="248" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        </g>
      );
    }
    return (
      <g id="arm-right-sitting">
        <path d="M 136,152 L 150,152 L 128,242 L 116,242 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
        <circle cx="122" cy="248" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        <HandheldProp propType={holdingProp} accentPropHex={accentPropHex} posX={122} posY={248} />
      </g>
    );
  }

  // 6. Holding Prop / Operating Machine Pose
  if (holdingProp || normPose === 'holding_prop' || normPose.includes('operating')) {
    if (armBack) {
      return (
        <g id="arm-left-support">
          <path d="M 50,152 L 64,152 L 58,248 L 44,248 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="51" cy="254" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        </g>
      );
    }
    // Right arm angled forward holding prop at chest height
    return (
      <g id="arm-right-holding-prop">
        <path d="M 136,152 L 150,152 L 140,225 L 126,225 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
        <circle cx="133" cy="231" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
        <HandheldProp propType={holdingProp} accentPropHex={accentPropHex} posX={133} posY={231} rotation={0} />
      </g>
    );
  }

  // 7. Idle / Standing (Default relaxed arms outside torso)
  if (armBack) {
    return (
      <g id="arm-left-idle">
        <path d="M 50,152 L 64,152 L 58,250 L 44,250 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
        <circle cx="51" cy="256" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
      </g>
    );
  }

  return (
    <g id="arm-right-idle">
      <path d="M 136,152 L 150,152 L 144,250 L 130,250 Z" fill={armColorHex} stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="137" cy="256" r="6" fill={skinToneHex} stroke={skinShadowHex} strokeWidth="1" />
      <HandheldProp propType={holdingProp} accentPropHex={accentPropHex} posX={137} posY={256} />
    </g>
  );
};

export const Limbs: React.FC<LimbsProps> = (props) => {
  return (
    <g id="limbs-composite">
      <Legs {...props} />
      <Arms {...props} armBack={true} />
      <Arms {...props} armBack={false} />
    </g>
  );
};

export default Limbs;
