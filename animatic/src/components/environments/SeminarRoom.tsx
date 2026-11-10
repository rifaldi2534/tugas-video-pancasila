/**
 * SPESIMEN TERAKHIR - SeminarRoom.tsx
 * Procedural SVG Environment: DTMM Computer Terminal & Seminar Room.
 * Setting for Scene 3 & 4 (Voting on Fraud & Nadia's Moral Crisis Power Cut).
 * 100% Procedural SVG, viewBox 0 0 1920 1080.
 * Zero Bitmaps, Zero External Stock Images.
 *
 * Key Technical & Dramaturgical Elements:
 * - Laboratory PC row with CRT/LCD monitors running SIM ITS portal & OriginLab CSV graphs
 * - Wall extension power strip with snaking black power cable (object of Nadia's intervention)
 * - Large projector screen & acrylic yudisium bulletin board
 * - Formica conference tables & hydraulic swivel chairs
 * - Chiaroscuro 3000K warm desk lamp spotlighting mode for Scene 4 crisis
 * - Support for Parallax depth layers (background, pc_terminals, conference_table, foreground)
 */

import React from 'react';

export interface SeminarRoomProps {
  lightingMode?: 'chiaroscuro_table' | 'standard_3800k' | 'power_cut_dark';
  monitorsOn?: boolean;
  powerPlugPulled?: boolean;
  layer?: 'all' | 'background' | 'terminals' | 'foreground';
  className?: string;
  style?: React.CSSProperties;
}

export const SeminarRoom: React.FC<SeminarRoomProps> = ({
  lightingMode = 'standard_3800k',
  monitorsOn = true,
  powerPlugPulled = false,
  layer = 'all',
  className = 'environment-seminar-room',
  style,
}) => {
  const isChiaroscuro = lightingMode === 'chiaroscuro_table';
  const isPowerCut = lightingMode === 'power_cut_dark' || powerPlugPulled;

  // 1. Far Wall & Projector Screen
  const renderBackground = () => (
    <g id="layer-far-wall">
      {/* Ceiling */}
      <polygon points="0,0 1920,0 1920,200 0,200" fill="#18181B" />
      {/* Wall acoustic soundproofing grid */}
      <polygon points="0,200 1920,200 1920,680 0,680" fill="#27272A" />
      <line x1="0" y1="360" x2="1920" y2="360" stroke="#3F3F46" strokeWidth="2" />
      <line x1="0" y1="520" x2="1920" y2="520" stroke="#3F3F46" strokeWidth="2" />
      <line x1="480" y1="200" x2="480" y2="680" stroke="#3F3F46" strokeWidth="1.5" />
      <line x1="960" y1="200" x2="960" y2="680" stroke="#3F3F46" strokeWidth="1.5" />
      <line x1="1440" y1="200" x2="1440" y2="680" stroke="#3F3F46" strokeWidth="1.5" />

      {/* Large Overhead Motorized Projector Screen */}
      <rect x="240" y="240" width="620" height="340" rx="4" fill="#FAFAFA" stroke="#52525B" strokeWidth="8" />
      <text x="550" y="300" textAnchor="middle" fill="#09090B" fontSize="22" fontWeight="bold" fontFamily="sans-serif">
        SIDANG YUDISIUM PERIODE 128
      </text>
      <text x="550" y="340" textAnchor="middle" fill="#2563EB" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
        DEPARTEMEN TEKNIK MATERIAL & METALURGI FTIRS ITS
      </text>
      {/* Projected OriginLab Impact Curve */}
      <g id="projected-graph" transform="translate(320, 370)">
        <line x1="0" y1="160" x2="440" y2="160" stroke="#09090B" strokeWidth="2" />
        <line x1="0" y1="0" x2="0" y2="160" stroke="#09090B" strokeWidth="2" />
        <path
          d="M 20,150 Q 80,140 160,110 T 300,30 L 420,20"
          fill="none"
          stroke="#DC2626"
          strokeWidth="3.5"
        />
        <text x="200" y="180" fill="#52525B" fontSize="12" fontFamily="sans-serif">
          Suhu Uji (°C) vs Energi Serap (Joule)
        </text>
      </g>

      {/* Acrylic Department Announcement Board */}
      <rect x="1380" y="260" width="360" height="260" rx="6" fill="#F4F4F5" stroke="#71717A" strokeWidth="6" />
      <rect x="1400" y="280" width="320" height="36" fill="#1E3A8A" rx="2" />
      <text x="1560" y="304" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="bold">
        DEADLINE UPLOAD BAP YUDISIUM
      </text>
      <text x="1560" y="350" textAnchor="middle" fill="#DC2626" fontSize="24" fontWeight="bold">
        PUKUL 23:59 WIB
      </text>
      <text x="1560" y="380" textAnchor="middle" fill="#09090B" fontSize="13">
        SIM ITS Cloud Server Close Connection
      </text>

      {/* Carpeted Room Floor */}
      <polygon points="0,680 1920,680 1920,1080 0,1080" fill="#3F3F46" />
      <line x1="0" y1="760" x2="1920" y2="760" stroke="#52525B" strokeWidth="2" />
      <line x1="0" y1="880" x2="1920" y2="880" stroke="#52525B" strokeWidth="2" />
    </g>
  );

  // 2. PC Workstation Terminals & Nadia's Power Socket
  const renderTerminals = () => (
    <g id="layer-pc-terminals">
      {/* PC Workstation Formica Bench (Left to Center) */}
      <rect x="120" y="580" width="860" height="35" fill="#71717A" stroke="#52525B" strokeWidth="2" />
      {/* Metal Legs */}
      <rect x="160" y="615" width="20" height="240" fill="#27272A" />
      <rect x="920" y="615" width="20" height="240" fill="#27272A" />

      {/* Row of 3 Laboratory Desktop PC Monitors */}
      {[0, 1, 2].map((idx) => {
        const posX = 200 + idx * 260;
        const screenLit = monitorsOn && !isPowerCut;

        return (
          <g key={idx} id={`pc-station-${idx}`} transform={`translate(${posX}, 430)`}>
            {/* Monitor Bezel */}
            <rect x="0" y="0" width="180" height="130" rx="6" fill="#18181B" stroke="#3F3F46" strokeWidth="2" />
            {/* Display Panel */}
            <rect
              x="8"
              y="8"
              width="164"
              height="114"
              rx="2"
              fill={screenLit ? '#0284C7' : '#09090B'}
            />
            {screenLit && (
              <g id="monitor-content">
                {/* Browser tab header */}
                <rect x="8" y="8" width="164" height="16" fill="#0369A1" />
                <circle cx="16" cy="16" r="3" fill="#EF4444" />
                <circle cx="26" cy="16" r="3" fill="#F59E0B" />
                <circle cx="36" cy="16" r="3" fill="#10B981" />
                <text x="80" y="20" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                  SIM ITS: Final Submission
                </text>
                {/* Progress bar */}
                <rect x="20" y="60" width="140" height="14" rx="2" fill="#0C4A6E" />
                <rect x="20" y="60" width="115" height="14" rx="2" fill="#38BDF8" />
                <text x="90" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                  BAP Draft 85% Uploaded
                </text>
              </g>
            )}
            {/* Monitor Stand & Base */}
            <rect x="80" y="130" width="20" height="25" fill="#27272A" />
            <rect x="60" y="152" width="60" height="6" rx="2" fill="#3F3F46" />
            {/* Desktop CPU Tower on floor */}
            <rect x="20" y="160" width="55" height="140" rx="3" fill="#18181B" stroke="#27272A" strokeWidth="1" />
            <circle cx="47" cy="180" r="4" fill={screenLit ? '#22C55E' : '#EF4444'} />
            <line x1="28" y1="210" x2="66" y2="210" stroke="#3F3F46" strokeWidth="1" />
          </g>
        );
      })}

      {/* Nadia's Power Socket on Wall & Snaking Black Power Cord */}
      <g id="nadia-power-socket" transform="translate(70, 640)">
        {/* Wall 4-gang electrical power strip */}
        <rect x="0" y="0" width="40" height="110" rx="4" fill="#F4F4F5" stroke="#71717A" strokeWidth="2" />
        <circle cx="20" cy="25" r="9" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
        <circle cx="20" cy="55" r="9" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
        <circle cx="20" cy="85" r="9" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />

        {/* The Black Power Cord */}
        {powerPlugPulled ? (
          // Disconnected plug dangling loose
          <g id="plug-disconnected">
            <path d="M 20,55 Q 35,95 60,130" fill="none" stroke="#09090B" strokeWidth="6" strokeLinecap="round" />
            <rect x="52" y="125" width="16" height="12" rx="3" fill="#18181B" />
            {/* Sparks from yank */}
            <line x1="20" y1="55" x2="14" y2="48" stroke="#F59E0B" strokeWidth="2" />
            <line x1="20" y1="55" x2="28" y2="48" stroke="#F59E0B" strokeWidth="2" />
          </g>
        ) : (
          // Connected power plug
          <g id="plug-connected">
            <rect x="12" y="48" width="16" height="14" rx="3" fill="#18181B" stroke="#09090B" strokeWidth="1" />
            <path d="M 20,62 Q 40,85 100,100" fill="none" stroke="#09090B" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}
      </g>
    </g>
  );

  // 3. Central Round Conference Table & Chiaroscuro Table Lamp
  const renderForeground = () => (
    <g id="layer-conference-table">
      {/* Central Solid Wood Table where the 14 Students Sit */}
      <g id="conference-table" transform="translate(1050, 680)">
        <polygon points="40,0 780,0 720,70 0,70" fill="#92400E" stroke="#78350F" strokeWidth="3" />
        <rect x="0" y="70" width="720" height="240" fill="#451A03" />

        {/* Swivel Lab Chairs around table */}
        {[-80, 160, 420, 680].map((chairX, idx) => (
          <g key={idx} id={`swivel-chair-${idx}`} transform={`translate(${chairX}, -80)`}>
            {/* Curved Chair Backrest */}
            <rect x="0" y="0" width="80" height="70" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="2" />
            {/* Chrome Hydraulic Stem */}
            <rect x="36" y="70" width="8" height="90" fill="#CBD5E1" />
          </g>
        ))}

        {/* The Crucial Chiaroscuro 3000K Desk Lamp (Scene 4) */}
        <g id="desk-lamp" transform="translate(360, -90)">
          {/* Circular Weighted Base */}
          <ellipse cx="0" cy="90" rx="22" ry="7" fill="#1F2937" stroke="#111827" strokeWidth="1.5" />
          {/* Flexible Gooseneck Arm */}
          <path d="M 0,90 Q -25,40 0,0" fill="none" stroke="#374151" strokeWidth="7" strokeLinecap="round" />
          {/* Bell Lampshade angled down */}
          <polygon points="-25,-5 25,-5 35,25 -35,25" fill="#1F2937" stroke="#111827" strokeWidth="2" />
          {/* 3000K Warm Incandescent Light Cone */}
          <polygon
            points="-35,25 35,25 320,380 -320,380"
            fill="url(#lamp-light-cone-grad)"
            opacity={isChiaroscuro ? 0.95 : 0.65}
          />
        </g>
      </g>
    </g>
  );

  return (
    <svg
      viewBox="0 0 1920 1080"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#18181B',
        ...style,
      }}
    >
      <defs>
        {/* 3000K Warm Spotlight Cone */}
        <linearGradient id="lamp-light-cone-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FDBA74" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FDBA74" stopOpacity="0.02" />
        </linearGradient>

        {/* Chiaroscuro Radial Shadow Falloff */}
        <radialGradient id="chiaroscuro-vignette" cx="72%" cy="65%" r="65%">
          <stop offset="0%" stopColor="#0B0F19" stopOpacity="0" />
          <stop offset="45%" stopColor="#0B0F19" stopOpacity="0.25" />
          <stop offset="85%" stopColor="#0B0F19" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0B0F19" stopOpacity="0.98" />
        </radialGradient>
      </defs>

      {(layer === 'all' || layer === 'background') && renderBackground()}
      {(layer === 'all' || layer === 'terminals') && renderTerminals()}
      {(layer === 'all' || layer === 'foreground') && renderForeground()}

      {/* Chiaroscuro Heavy Shadow Overlay in Crisis Mode */}
      {isChiaroscuro && (
        <rect
          x="0"
          y="0"
          width="1920"
          height="1080"
          fill="url(#chiaroscuro-vignette)"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </svg>
  );
};

export default SeminarRoom;
