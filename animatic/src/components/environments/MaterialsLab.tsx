/**
 * SPESIMEN TERAKHIR - MaterialsLab.tsx
 * Procedural SVG Environment: DTMM FTIRS ITS Mechanical Testing Laboratory.
 * Setting for Scenes 1, 2, 3, 4, and 5.
 * 100% Procedural SVG, viewBox 0 0 1920 1080.
 * Zero Bitmaps, Zero External Stock Images.
 *
 * Key Technical & Dramaturgical Elements:
 * - Charpy 300J Pendulum Impact Testing Machine (ASTM E23) with dial indicator & safety catch
 * - 1.5m radius red K3L hazard perimeter line on concrete lab floor
 * - Liquid Nitrogen cryogenic Dewar vessel with subtle cold vapor paths
 * - Heavy oak/steel workbenches with Callister "Materials Science & Engineering" volumes
 * - Metallurgical specimen trays & steel V-notch specimens
 * - Fluorescent lighting (calibrated 4200K cool white)
 * - Analog lab wall clock
 * - Support for Parallax depth layers (far_wall, machinery, workbenches, foreground)
 */

import React from 'react';

export interface MaterialsLabProps {
  lightingMode?: 'fluorescent_4200k' | 'dimmed_night' | 'emergency_red' | 'climax_impact';
  showCharpyCage?: boolean;
  clockTime?: string; // e.g. "21:45"
  vaporIntensity?: number; // 0 to 1
  layer?: 'all' | 'background' | 'machinery' | 'foreground';
  className?: string;
  style?: React.CSSProperties;
}

export const MaterialsLab: React.FC<MaterialsLabProps> = ({
  lightingMode = 'fluorescent_4200k',
  showCharpyCage = true,
  clockTime = '22:15',
  vaporIntensity = 0.5,
  layer = 'all',
  className = 'environment-materials-lab',
  style,
}) => {
  // Lighting Color Calibration
  let ambientOverlayColor = 'rgba(226, 238, 248, 0.08)'; // 4200K Cool White
  let ceilingLampGlow = '#F8FAFC';
  if (lightingMode === 'dimmed_night') {
    ambientOverlayColor = 'rgba(11, 15, 25, 0.65)';
    ceilingLampGlow = '#94A3B8';
  } else if (lightingMode === 'emergency_red') {
    ambientOverlayColor = 'rgba(239, 68, 68, 0.25)';
    ceilingLampGlow = '#FCA5A5';
  } else if (lightingMode === 'climax_impact') {
    ambientOverlayColor = 'rgba(254, 243, 199, 0.15)';
    ceilingLampGlow = '#FFFFFF';
  }

  // 1. Far Wall & Ceiling (Z-depth: 0.2)
  const renderBackground = () => (
    <g id="layer-far-wall">
      {/* Ceiling */}
      <polygon points="0,0 1920,0 1920,240 0,240" fill="#1E293B" />
      {/* Fluorescent Light Fixtures (4200K) */}
      <rect x="220" y="40" width="420" height="22" rx="4" fill="#F1F5F9" />
      <rect x="230" y="44" width="400" height="14" rx="2" fill={ceilingLampGlow} />
      <ellipse cx="430" cy="51" rx="260" ry="80" fill="url(#neon-glow-grad)" opacity="0.4" />

      <rect x="820" y="40" width="420" height="22" rx="4" fill="#F1F5F9" />
      <rect x="830" y="44" width="400" height="14" rx="2" fill={ceilingLampGlow} />
      <ellipse cx="1030" cy="51" rx="260" ry="80" fill="url(#neon-glow-grad)" opacity="0.4" />

      <rect x="1420" y="40" width="380" height="22" rx="4" fill="#F1F5F9" />
      <rect x="1430" y="44" width="360" height="14" rx="2" fill={ceilingLampGlow} />

      {/* Main Laboratory Back Wall */}
      <polygon points="0,240 1920,240 1920,720 0,720" fill="#E2E8F0" />
      {/* Wall concrete panels & tile line */}
      <line x1="0" y1="460" x2="1920" y2="460" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="640" y1="240" x2="640" y2="720" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="1280" y1="240" x2="1280" y2="720" stroke="#CBD5E1" strokeWidth="2" />

      {/* Whiteboard with ASTM Charpy Impact formulas */}
      <rect x="100" y="280" width="380" height="190" fill="#F8FAFC" stroke="#64748B" strokeWidth="6" rx="4" />
      <text x="130" y="320" fill="#0F172A" fontSize="18" fontWeight="bold" fontFamily="monospace">
        ASTM E23 - CHARPY V-NOTCH
      </text>
      <text x="130" y="355" fill="#1E3A8A" fontSize="14" fontFamily="monospace">
        E = m * g * (h1 - h2)
      </text>
      <text x="130" y="385" fill="#059669" fontSize="14" fontFamily="monospace">
        Spesimen Baja Karbon Rendah
      </text>
      <text x="130" y="415" fill="#DC2626" fontSize="14" fontFamily="monospace">
        Temperatur Uji: -196 °C (LN2)
      </text>
      {/* Aluminum board tray */}
      <rect x="90" y="470" width="400" height="10" fill="#94A3B8" rx="2" />

      {/* Laboratory Analog Wall Clock */}
      <circle cx="860" cy="340" r="42" fill="#FFFFFF" stroke="#0F172A" strokeWidth="5" />
      <circle cx="860" cy="340" r="3" fill="#DC2626" />
      {/* Clock hands showing 22:15 */}
      <line x1="860" y1="340" x2="880" y2="340" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="860" y1="340" x2="850" y2="310" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      <text x="860" y="396" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
        {clockTime}
      </text>

      {/* Safety Sign Board: K3L DTMM FTIRS ITS */}
      <rect x="1520" y="280" width="280" height="150" fill="#047857" rx="6" stroke="#065F46" strokeWidth="4" />
      <rect x="1530" y="290" width="260" height="40" fill="#FFFFFF" rx="3" />
      <text x="1660" y="318" textAnchor="middle" fill="#047857" fontSize="20" fontWeight="bold" fontFamily="sans-serif">
        UTAMAKAN K3L
      </text>
      <text x="1660" y="355" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
        LAB PENGUJIAN MEKANIK DTMM
      </text>
      <text x="1660" y="385" textAnchor="middle" fill="#FEF08A" fontSize="12" fontFamily="sans-serif">
        WAJIB: KACAMATA SAFETY & JAS LAB
      </text>

      {/* Lab Tiled Floor with Perspective */}
      <polygon points="0,720 1920,720 1920,1080 0,1080" fill="#94A3B8" />
      {/* Perspective floor tile grid lines */}
      <line x1="0" y1="780" x2="1920" y2="780" stroke="#64748B" strokeWidth="1.5" />
      <line x1="0" y1="860" x2="1920" y2="860" stroke="#64748B" strokeWidth="2" />
      <line x1="0" y1="960" x2="1920" y2="960" stroke="#64748B" strokeWidth="2.5" />
      <line x1="300" y1="720" x2="100" y2="1080" stroke="#64748B" strokeWidth="1.5" />
      <line x1="700" y1="720" x2="600" y2="1080" stroke="#64748B" strokeWidth="1.5" />
      <line x1="1200" y1="720" x2="1250" y2="1080" stroke="#64748B" strokeWidth="1.5" />
      <line x1="1600" y1="720" x2="1750" y2="1080" stroke="#64748B" strokeWidth="1.5" />
    </g>
  );

  // 2. Heavy Machinery Layer: Charpy 300J & Liquid Nitrogen Tank (Z-depth: 0.6)
  const renderMachinery = () => (
    <g id="layer-machinery">
      {/* Red K3L Safety Hazard Demarcation Perimeter around Charpy Machine */}
      <ellipse
        cx="1200"
        cy="880"
        rx="360"
        ry="130"
        fill="none"
        stroke="#EF4444"
        strokeWidth="6"
        strokeDasharray="24 16"
      />
      <text x="1200" y="1000" textAnchor="middle" fill="#EF4444" fontSize="18" fontWeight="bold" letterSpacing="4">
        ZONA BAHAYA IMPAK 300 JOULE - RADIUS 1.5M
      </text>

      {/* --- Charpy 300J Impact Machine (ASTM E23) --- */}
      <g id="charpy-machine" transform="translate(1000, 380)">
        {/* Massive Cast Iron Base */}
        <polygon points="50,480 350,480 380,540 20,540" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
        <rect x="70" y="440" width="260" height="40" fill="#334155" stroke="#1E293B" strokeWidth="2" />

        {/* Specimen Anvil Support Pillars */}
        <rect x="160" y="380" width="80" height="60" fill="#475569" stroke="#1E293B" strokeWidth="2" />
        {/* Anvil V-block jaws */}
        <polygon points="175,380 185,395 215,395 225,380" fill="#64748B" />
        {/* Placed Charpy Steel Specimen with V-notch */}
        <rect x="180" y="386" width="40" height="9" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1" />
        <polygon points="199,390 201,390 200,394" fill="#0F172A" />

        {/* Vertical Twin Columns */}
        <rect x="80" y="60" width="36" height="380" fill="#475569" stroke="#1E293B" strokeWidth="3" />
        <rect x="284" y="60" width="36" height="380" fill="#475569" stroke="#1E293B" strokeWidth="3" />
        {/* Top Crosshead Beam */}
        <rect x="60" y="30" width="280" height="40" fill="#334155" stroke="#0F172A" strokeWidth="3" />

        {/* Pendulum Axle Bearing Hub */}
        <circle cx="200" cy="50" r="28" fill="#1E293B" stroke="#475569" strokeWidth="4" />
        <circle cx="200" cy="50" r="10" fill="#E2E8F0" />

        {/* Circular Angle & Energy Dial Indicator (0 to 300 Joules) */}
        <circle cx="200" cy="50" r="72" fill="none" stroke="#F8FAFC" strokeWidth="6" />
        <circle cx="200" cy="50" r="69" fill="#0F172A" fillOpacity="0.85" />
        {/* Dial Scale Tick Marks */}
        <line x1="200" y1="-16" x2="200" y2="-8" stroke="#F8FAFC" strokeWidth="2" />
        <line x1="250" y1="10" x2="244" y2="15" stroke="#F8FAFC" strokeWidth="2" />
        <line x1="266" y1="50" x2="258" y2="50" stroke="#F8FAFC" strokeWidth="2" />
        {/* Pointer Needle pointing to ~52.4 J */}
        <line x1="200" y1="50" x2="246" y2="18" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
        <text x="200" y="85" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="bold">
          300 J
        </text>

        {/* Pendulum Arm & Striking Hammer Blade */}
        {/* Arm shaft extending down to specimen */}
        <line x1="200" y1="50" x2="200" y2="380" stroke="#94A3B8" strokeWidth="12" strokeLinecap="round" />
        {/* Massive Hammer Blade (Striker) */}
        <path
          d="M 160,330 L 240,330 L 240,380 L 210,400 L 190,400 L 160,380 Z"
          fill="#334155"
          stroke="#0F172A"
          strokeWidth="3"
        />
        {/* Hardened tool steel striking edge */}
        <polygon points="196,375 204,375 200,398" fill="#F1F5F9" stroke="#0F172A" strokeWidth="1" />

        {/* Safety Wire Mesh Cage */}
        {showCharpyCage && (
          <g id="safety-cage" opacity="0.45">
            <rect x="40" y="20" width="320" height="490" fill="none" stroke="#F59E0B" strokeWidth="4" />
            <line x1="40" y1="140" x2="360" y2="140" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="40" y1="260" x2="360" y2="260" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="40" y1="380" x2="360" y2="380" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="120" y1="20" x2="120" y2="510" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="200" y1="20" x2="200" y2="510" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="280" y1="20" x2="280" y2="510" stroke="#F59E0B" strokeWidth="1.5" />
          </g>
        )}
      </g>

      {/* --- Liquid Nitrogen (LN2) Cryogenic Dewar Vessel --- */}
      <g id="dewar-tank" transform="translate(680, 560)">
        {/* Stainless Steel Tank Body */}
        <rect x="0" y="40" width="130" height="240" rx="20" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" />
        <ellipse cx="65" cy="40" rx="65" ry="18" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
        {/* Blue band & LN2 Label */}
        <rect x="0" y="110" width="130" height="45" fill="#0284C7" />
        <text x="65" y="138" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
          LIQUID N2 -196°C
        </text>
        {/* Pressure release valve & neck */}
        <rect x="52" y="10" width="26" height="30" fill="#64748B" />
        <circle cx="65" cy="10" r="12" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />

        {/* Cold Cryogenic Vapor Drift (Procedural Path) */}
        {vaporIntensity > 0 && (
          <g id="cryogenic-vapor" opacity={vaporIntensity * 0.75}>
            <path
              d="M 55,10 C 20,-20 8,-40 2,-70 C -4,-100 20,-120 40,-140 C 60,-120 75,-140 100,-120 C 130,-100 120,-60 90,-40 C 75,-20 80,10 55,10 Z"
              fill="url(#vapor-grad)"
            />
            <ellipse cx="80" cy="-60" rx="35" ry="18" fill="url(#vapor-grad)" />
          </g>
        )}
      </g>
    </g>
  );

  // 3. Workbenches, Tooling & Foreground Elements (Z-depth: 1.0 - 1.4)
  const renderForeground = () => (
    <g id="layer-workbenches">
      {/* Heavy Wooden Lab Preparation Workbench (Left) */}
      <g id="workbench-left" transform="translate(40, 680)">
        {/* Wooden Countertop */}
        <polygon points="0,0 520,0 480,45 0,45" fill="#78350F" stroke="#451A03" strokeWidth="2" />
        <rect x="0" y="45" width="480" height="240" fill="#451A03" />
        <rect x="20" y="60" width="200" height="80" fill="#78350F" stroke="#451A03" strokeWidth="2" rx="3" />
        <rect x="250" y="60" width="200" height="80" fill="#78350F" stroke="#451A03" strokeWidth="2" rx="3" />

        {/* Callister Textbook & Lab Manuals */}
        <rect x="60" y="-14" width="70" height="14" rx="2" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="1" />
        <text x="95" y="-4" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">
          CALLISTER 10E
        </text>
        <rect x="55" y="-24" width="75" height="10" rx="1" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />

        {/* Red Velvet Specimen Box containing 10 ASTM E23 specimens */}
        <rect x="180" y="-18" width="120" height="18" rx="2" fill="#881337" stroke="#4C0519" strokeWidth="1.5" />
        {/* Specimen bars row inside box */}
        <line x1="190" y1="-9" x2="200" y2="-9" stroke="#E2E8F0" strokeWidth="4" />
        <line x1="205" y1="-9" x2="215" y2="-9" stroke="#E2E8F0" strokeWidth="4" />
        <line x1="220" y1="-9" x2="230" y2="-9" stroke="#E2E8F0" strokeWidth="4" />
        <line x1="235" y1="-9" x2="245" y2="-9" stroke="#E2E8F0" strokeWidth="4" />
        <line x1="250" y1="-9" x2="260" y2="-9" stroke="#E2E8F0" strokeWidth="4" />
        <line x1="265" y1="-9" x2="275" y2="-9" stroke="#E2E8F0" strokeWidth="4" />
        <line x1="280" y1="-9" x2="290" y2="-9" stroke="#DC2626" strokeWidth="4" />

        {/* Crucible Tongs on bench edge */}
        <path d="M 340,-6 Q 370,-15 400,-6" fill="none" stroke="#94A3B8" strokeWidth="3" />
        <path d="M 340,-2 Q 370,-11 400,-2" fill="none" stroke="#94A3B8" strokeWidth="3" />
        <circle cx="360" cy="-6" r="3" fill="#475569" />
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
        backgroundColor: '#0F172A',
        ...style,
      }}
    >
      <defs>
        {/* 4200K Neon Fluorescent Lamp Glow */}
        <radialGradient id="neon-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E2EEF8" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#E2EEF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E2EEF8" stopOpacity="0" />
        </radialGradient>

        {/* Cryogenic Vapor Gradient */}
        <radialGradient id="vapor-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F0F9FF" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Layer Rendering */}
      {(layer === 'all' || layer === 'background') && renderBackground()}
      {(layer === 'all' || layer === 'machinery') && renderMachinery()}
      {(layer === 'all' || layer === 'foreground') && renderForeground()}

      {/* Ambient Lighting Mood Overlay */}
      <rect
        x="0"
        y="0"
        width="1920"
        height="1080"
        fill={ambientOverlayColor}
        style={{ pointerEvents: 'none', mixBlendMode: 'multiply' }}
      />
    </svg>
  );
};

export default MaterialsLab;
