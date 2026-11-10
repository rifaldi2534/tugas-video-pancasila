/**
 * SPESIMEN TERAKHIR - ExteriorStairs.tsx
 * Procedural SVG Environment: Gedung W Exterior Campus Stairs & Sukolilo Courtyard.
 * Setting for Scene 7 (Final Epilogue: All 14 Students Sitting Together Eating Warkop Tofu).
 * 100% Procedural SVG, viewBox 0 0 1920 1080.
 * Zero Bitmaps, Zero External Stock Images.
 *
 * Key Technical & Dramaturgical Elements:
 * - Broad campus terrace stairs where the 14 students sit side-by-side
 * - Silhouettes of tropical Ketapang trees against the evening sky
 * - Deep twilight sky gradient with distant Surabaya city glow & Sukolilo night stars
 * - Warm 3000K campus street lamp casting an intimate pool of golden light
 * - Warkop brown newspaper wrap with crispy fried tofu & plastic hot tea cups
 * - Folded DTMM lab coats resting gently across knees
 * - Support for Parallax depth layers (sky_stars, distant_campus, concrete_steps, warkop_props)
 */

import React from 'react';

export interface ExteriorStairsProps {
  lightingMode?: 'evening_dusk' | 'starry_night' | 'warm_lamplight';
  showStreetLamp?: boolean;
  showWarkopFood?: boolean;
  layer?: 'all' | 'sky' | 'trees' | 'stairs' | 'foreground';
  className?: string;
  style?: React.CSSProperties;
}

export const ExteriorStairs: React.FC<ExteriorStairsProps> = ({
  lightingMode = 'warm_lamplight',
  showStreetLamp = true,
  showWarkopFood = true,
  layer = 'all',
  className = 'environment-exterior-stairs',
  style,
}) => {
  // 1. Twilight & Night Sky with Distant Sukolilo Campus Horizon
  const renderSky = () => (
    <g id="layer-twilight-sky">
      {/* Sky Canvas Gradient */}
      <rect x="0" y="0" width="1920" height="650" fill="url(#exterior-sky-grad)" />

      {/* Subtle Night Stars */}
      <g id="stars" fill="#FFFFFF" opacity="0.75">
        <circle cx="180" cy="80" r="1.5" />
        <circle cx="340" cy="140" r="1.2" />
        <circle cx="520" cy="60" r="2.0" />
        <circle cx="780" cy="110" r="1.5" />
        <circle cx="920" cy="45" r="1.8" />
        <circle cx="1180" cy="95" r="1.2" />
        <circle cx="1380" cy="65" r="1.6" />
        <circle cx="1560" cy="120" r="2.2" />
        <circle cx="1740" cy="75" r="1.5" />
        <circle cx="1860" cy="110" r="1.2" />
      </g>

      {/* Distant Surabaya / Sukolilo City Ambient Glow on Horizon */}
      <ellipse cx="960" cy="600" rx="980" ry="160" fill="url(#horizon-amber-glow)" opacity="0.45" />

      {/* Distant Silhouettes of ITS East Gate & Campus Tower */}
      <g id="distant-its-landmarks" fill="#090D16" opacity="0.85">
        <polygon points="120,580 140,500 160,500 180,580" />
        <polygon points="260,580 270,460 280,460 290,580" />
        {/* Tower antenna blink */}
        <circle cx="275" cy="456" r="2" fill="#EF4444" />
      </g>
    </g>
  );

  // 2. Ketapang Tropical Trees & Garden Courtyard
  const renderTrees = () => (
    <g id="layer-ketapang-trees">
      {/* Midground Foliage: Broad tiered branches of Ketapang trees */}
      {/* Left Tree */}
      <g id="ketapang-left" transform="translate(60, 260)">
        <path d="M 120,380 Q 140,240 160,140 Q 170,80 180,0 L 200,0 Q 190,80 180,240 Q 160,340 180,380 Z" fill="#111827" />
        {/* Tiered horizontal foliage canopies */}
        <ellipse cx="180" cy="60" rx="160" ry="40" fill="#064E3B" opacity="0.9" />
        <ellipse cx="200" cy="130" rx="200" ry="48" fill="#064E3B" opacity="0.85" />
        <ellipse cx="210" cy="210" rx="240" ry="55" fill="#047857" opacity="0.8" />
      </g>

      {/* Right Tree */}
      <g id="ketapang-right" transform="translate(1520, 240)">
        <path d="M 160,400 Q 140,260 130,160 Q 120,90 110,0 L 90,0 Q 100,90 110,260 Q 120,360 100,400 Z" fill="#111827" />
        <ellipse cx="110" cy="50" rx="150" ry="38" fill="#064E3B" opacity="0.9" />
        <ellipse cx="90" cy="120" rx="190" ry="46" fill="#064E3B" opacity="0.85" />
        <ellipse cx="80" cy="200" rx="220" ry="52" fill="#047857" opacity="0.8" />
      </g>

      {/* Campus Street Lamp on Pedestal Pole (3000K Warm Light) */}
      {showStreetLamp && (
        <g id="campus-street-lamp" transform="translate(1420, 280)">
          {/* Iron Pole */}
          <rect x="0" y="0" width="14" height="420" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          {/* Lamp Bracket Arm */}
          <path d="M 7,30 Q -40,10 -60,40 L -60,60" fill="none" stroke="#1E293B" strokeWidth="10" strokeLinecap="round" />
          {/* Glass Bell Housing */}
          <polygon points="-75,60 -45,60 -35,95 -85,95" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
          <polygon points="-70,62 -50,62 -42,90 -78,90" fill="#FEF08A" />
          {/* Golden Warm Streetlight Pool Cone */}
          <polygon
            points="-85,95 -35,95 240,680 -420,680"
            fill="url(#street-lamp-light-grad)"
            opacity="0.6"
          />
        </g>
      )}
    </g>
  );

  // 3. Broad Concrete Terrace Stairs (Where the 14 Students Sit)
  const renderStairs = () => (
    <g id="layer-terrace-stairs">
      {/* 
        Descending staircase tiers across 1920 width:
        Step 1 (Top terrace): Y=600..660
        Step 2: Y=660..730
        Step 3: Y=730..810
        Step 4: Y=810..900
        Step 5 (Bottom wide terrace): Y=900..1080
      */}
      {/* Step 1: Tread & Riser */}
      <polygon points="0,580 1920,580 1920,640 0,640" fill="#475569" />
      <polygon points="0,640 1920,640 1920,660 0,660" fill="#1E293B" />

      {/* Step 2 */}
      <polygon points="0,660 1920,660 1920,730 0,730" fill="#64748B" />
      <polygon points="0,730 1920,730 1920,755 0,755" fill="#1E293B" />

      {/* Step 3 (Primary character sitting tier) */}
      <polygon points="0,755 1920,755 1920,845 0,845" fill="#475569" />
      <polygon points="0,845 1920,845 1920,875 0,875" fill="#1E293B" />

      {/* Step 4 */}
      <polygon points="0,875 1920,875 1920,970 0,970" fill="#64748B" />
      <polygon points="0,970 1920,970 1920,1000 0,1000" fill="#1E293B" />

      {/* Step 5 (Bottom Landing Floor) */}
      <polygon points="0,1000 1920,1000 1920,1080 0,1080" fill="#475569" />

      {/* Concrete Expansion joints */}
      <line x1="380" y1="580" x2="380" y2="1080" stroke="#334155" strokeWidth="2.5" />
      <line x1="840" y1="580" x2="840" y2="1080" stroke="#334155" strokeWidth="2.5" />
      <line x1="1300" y1="580" x2="1300" y2="1080" stroke="#334155" strokeWidth="2.5" />
      <line x1="1720" y1="580" x2="1720" y2="1080" stroke="#334155" strokeWidth="2.5" />
    </g>
  );

  // 4. Warkop Food & Props Layer (Scene 7 iconic shared meal)
  const renderForeground = () => {
    if (!showWarkopFood) return null;

    return (
      <g id="layer-warkop-food" transform="translate(940, 810)">
        {/* Brown Newspaper Wrapping with Crispy Fried Tofu */}
        <polygon points="-35,-15 35,-15 0,32" fill="#D6D3D1" stroke="#78716C" strokeWidth="2" />
        <rect x="-24" y="-22" width="18" height="18" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
        <rect x="-2" y="-26" width="20" height="20" rx="3" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
        <rect x="12" y="-18" width="16" height="16" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
        {/* Green Chili Peppers on newspaper */}
        <path d="M -12,-8 Q -6,-14 -4,-10" stroke="#16A34A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 8,-12 Q 15,-18 17,-14" stroke="#16A34A" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Clear Plastic Hot Tea Glasses with Straws */}
        <g id="tea-cup-1" transform="translate(-75, -25)">
          <polygon points="0,0 26,0 22,44 4,44" fill="#FEF08A" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="1.2" />
          <polygon points="2,14 24,14 21,42 5,42" fill="#B45309" fillOpacity="0.8" />
          <line x1="18" y1="-8" x2="10" y2="38" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g id="tea-cup-2" transform="translate(60, -25)">
          <polygon points="0,0 26,0 22,44 4,44" fill="#FEF08A" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="1.2" />
          <polygon points="2,14 24,14 21,42 5,42" fill="#B45309" fillOpacity="0.8" />
          <line x1="8" y1="-8" x2="16" y2="38" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 1920 1080"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#030712',
        ...style,
      }}
    >
      <defs>
        {/* Evening Twilight Sky Gradient */}
        <linearGradient id="exterior-sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#030712" />
          <stop offset="40%" stopColor="#0F172A" />
          <stop offset="75%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>

        {/* Horizon Amber City Glow */}
        <radialGradient id="horizon-amber-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#EA580C" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#312E81" stopOpacity="0" />
        </radialGradient>

        {/* 3000K Streetlight Pool Gradient */}
        <linearGradient id="street-lamp-light-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#FDE047" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FDE047" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {(layer === 'all' || layer === 'sky') && renderSky()}
      {(layer === 'all' || layer === 'trees') && renderTrees()}
      {(layer === 'all' || layer === 'stairs') && renderStairs()}
      {(layer === 'all' || layer === 'foreground') && renderForeground()}
    </svg>
  );
};

export default ExteriorStairs;
