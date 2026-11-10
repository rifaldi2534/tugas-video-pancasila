/**
 * SPESIMEN TERAKHIR - Hair.tsx
 * Individualized Procedural Hair Models & Hijabs for ALL 14 DTMM FTIRS ITS Characters.
 * Full 14-Character Differentiation:
 * 1. Nadia: Dark navy hijab (jilbab_dark_navy, neat framing folds)
 * 2. Rere: Light grey hijab (jilbab_light_grey, relaxed student drape, safety pin)
 * 3. Maya: Neat ponytail with black scrunchie & soft bangs
 * 4. Kirana: Sharp shoulder-length bob tucked neatly behind ears
 * 5. Aryo: Slicked side-part with slightly weary disheveled strands
 * 6. Dimas: Pompadour undercut with pomade shine & swept volume
 * 7. Bagas: Unkempt wavy hair falling over forehead
 * 8. Fajar: Disciplined military buzz cut
 * 9. Reza: Shoulder-length thick wavy hair tied in an activist ponytail
 * 10. Hendro: Practical short crew cut / curly mechanic texture
 * 11. Farhan: Modern textured taper-fade quiff
 * 12. Kevin: Sleek, neat side-part with intellectual precision
 * 13. Danang: Curly short round, warm and friendly
 * 14. Zul: Long wavy hair tied back in a low neck bun
 */

import React from 'react';
import { HeadCoveringType } from '../../types/characters';

export interface HairProps {
  hairStyle?: string;
  hairColorHex?: string;
  headCovering?: HeadCoveringType;
  hijabColorHex?: string;
  layer?: 'back' | 'front' | 'all';
}

export const HairBack: React.FC<HairProps> = ({
  hairStyle = 'straight_parted_messy',
  hairColorHex = '#1E293B',
  headCovering = 'none',
  hijabColorHex = '#0F172A',
}) => {
  // Nadia: Dark navy hijab back cowl
  if (headCovering === 'jilbab_dark_navy') {
    return (
      <g id="hijab-back-nadia">
        <path
          d="M 68,80 C 66,54 78,48 100,48 C 122,48 134,54 132,80 C 132,108 140,140 144,165 L 56,165 C 60,140 68,108 68,80 Z"
          fill={hijabColorHex || '#0F172A'}
          stroke="#020617"
          strokeWidth="1.2"
        />
        {/* Fabric fold shadows */}
        <path
          d="M 64,130 Q 72,160 84,165"
          fill="none"
          stroke="#020617"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path
          d="M 136,130 Q 128,160 116,165"
          fill="none"
          stroke="#020617"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </g>
    );
  }

  // Rere: Light grey hijab back cowl
  if (headCovering === 'jilbab_light_grey') {
    return (
      <g id="hijab-back-rere">
        <path
          d="M 67,82 C 65,56 77,50 100,50 C 123,50 135,56 133,82 C 133,110 142,142 146,168 L 54,168 C 58,142 67,110 67,82 Z"
          fill={hijabColorHex || '#94A3B8'}
          stroke="#475569"
          strokeWidth="1.2"
        />
        {/* Flowing drape folds */}
        <path
          d="M 62,135 Q 70,162 82,168"
          fill="none"
          stroke="#475569"
          strokeWidth="1.4"
          opacity="0.5"
        />
        <path
          d="M 138,135 Q 130,162 118,168"
          fill="none"
          stroke="#475569"
          strokeWidth="1.4"
          opacity="0.5"
        />
      </g>
    );
  }

  // Maya: Neat ponytail back
  if (hairStyle.includes('ponytail') && !hairStyle.includes('wavy')) {
    return (
      <g id="hair-back-maya-ponytail">
        {/* Ponytail extension */}
        <path
          d="M 100,68 C 122,62 142,75 138,110 C 134,135 124,152 118,162 C 114,145 120,120 118,100 C 116,84 108,76 100,68 Z"
          fill={hairColorHex}
          stroke="#0F172A"
          strokeWidth="1"
        />
        {/* Black Scrunchie */}
        <ellipse cx="114" cy="74" rx="5" ry="4" fill="#09090B" stroke="#27272A" strokeWidth="1" />
      </g>
    );
  }

  // Reza: Shoulder-length wavy ponytail back
  if (hairStyle.includes('shoulder_length_wavy')) {
    return (
      <g id="hair-back-reza-wavy">
        <path
          d="M 72,82 C 68,105 66,132 70,154 C 74,158 84,156 86,146 C 88,130 84,106 82,86 Z"
          fill={hairColorHex}
        />
        <path
          d="M 128,82 C 132,105 134,132 130,154 C 126,158 116,156 114,146 C 112,130 116,106 118,86 Z"
          fill={hairColorHex}
        />
      </g>
    );
  }

  // Kirana: Bob back length
  if (hairStyle.includes('shoulder_bob')) {
    return (
      <g id="hair-back-kirana-bob">
        <path
          d="M 70,82 C 68,102 68,126 72,144 C 82,148 118,148 128,144 C 132,126 132,102 130,82 Z"
          fill={hairColorHex}
          stroke="#0F172A"
          strokeWidth="1"
        />
      </g>
    );
  }

  // Zul: Low neck bun
  if (hairStyle.includes('tied_back_neck_bun')) {
    return (
      <g id="hair-back-zul-bun">
        {/* Back bun at nape */}
        <ellipse cx="100" cy="132" rx="9" ry="8" fill={hairColorHex} stroke="#0F172A" strokeWidth="1.2" />
        <ellipse cx="100" cy="132" rx="4" ry="3" fill="#0F172A" opacity="0.6" />
      </g>
    );
  }

  // Short hair silhouettes default back
  return null;
};

export const HairFront: React.FC<HairProps> = ({
  hairStyle = 'straight_parted_messy',
  hairColorHex = '#1E293B',
  headCovering = 'none',
  hijabColorHex = '#0F172A',
}) => {
  // Nadia: Dark navy hijab front frame
  if (headCovering === 'jilbab_dark_navy') {
    return (
      <g id="hijab-front-nadia">
        {/* Inner Ciput band */}
        <path
          d="M 78,74 C 84,68 116,68 122,74 L 122,77 C 116,71 84,71 78,77 Z"
          fill="#334155"
        />
        {/* Hijab Face Oval Frame */}
        <path
          d="M 74,70 C 82,56 118,56 126,70 C 132,82 131,106 126,118 C 122,128 114,136 100,140 C 86,136 78,128 74,118 C 69,106 68,82 74,70 Z"
          fill="none"
          stroke={hijabColorHex || '#0F172A'}
          strokeWidth="7"
          strokeLinejoin="round"
        />
        {/* Chin drape fold */}
        <path
          d="M 88,138 Q 100,146 112,138 L 118,166 L 82,166 Z"
          fill={hijabColorHex || '#0F172A'}
          stroke="#020617"
          strokeWidth="1"
        />
        {/* Left chest drape */}
        <path
          d="M 82,142 Q 74,152 70,166 L 88,166 Z"
          fill={hijabColorHex || '#0F172A'}
        />
      </g>
    );
  }

  // Rere: Light grey hijab front frame
  if (headCovering === 'jilbab_light_grey') {
    return (
      <g id="hijab-front-rere">
        {/* Hijab Face Oval Frame */}
        <path
          d="M 74,72 C 82,58 118,58 126,72 C 131,84 130,108 126,120 C 122,129 113,137 100,141 C 87,137 78,129 74,120 C 70,108 69,84 74,72 Z"
          fill="none"
          stroke={hijabColorHex || '#94A3B8'}
          strokeWidth="6.5"
          strokeLinejoin="round"
        />
        {/* Chin pin & relaxed drape */}
        <path
          d="M 90,139 Q 100,147 110,139 L 115,168 L 85,168 Z"
          fill={hijabColorHex || '#94A3B8'}
          stroke="#64748B"
          strokeWidth="1"
        />
        {/* Pearl safety pin under chin */}
        <circle cx="100" cy="141" r="1.5" fill="#F8FAFC" stroke="#475569" strokeWidth="0.5" />
      </g>
    );
  }

  // Maya: Ponytail front bangs
  if (hairStyle.includes('ponytail') && !hairStyle.includes('wavy')) {
    return (
      <g id="hair-front-maya">
        {/* Forehead scalp hairline */}
        <path
          d="M 72,82 C 72,56 82,50 100,50 C 118,50 128,56 128,82 C 124,76 116,70 100,70 C 84,70 76,76 72,82 Z"
          fill={hairColorHex}
          stroke="#0F172A"
          strokeWidth="1"
        />
        {/* Side bangs framing cheeks */}
        <path d="M 73,78 Q 72,92 75,102" fill="none" stroke={hairColorHex} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 127,78 Q 128,92 125,102" fill="none" stroke={hairColorHex} strokeWidth="2.5" strokeLinecap="round" />
        {/* Soft front hair fringe */}
        <path d="M 85,68 Q 92,75 96,73" fill="none" stroke={hairColorHex} strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }

  // Kirana: Shoulder bob front
  if (hairStyle.includes('shoulder_bob')) {
    return (
      <g id="hair-front-kirana">
        {/* Sleek top cap */}
        <path
          d="M 71,80 C 71,54 82,48 100,48 C 118,48 129,54 129,80 C 124,72 116,66 100,66 C 84,66 76,72 71,80 Z"
          fill={hairColorHex}
        />
        {/* Left side bob curve behind ear */}
        <path
          d="M 72,76 C 70,90 68,112 71,130 C 74,131 77,126 77,112 C 77,96 76,84 76,76 Z"
          fill={hairColorHex}
        />
        {/* Right side bob curve */}
        <path
          d="M 128,76 C 130,90 132,112 129,130 C 126,131 123,126 123,112 C 123,96 124,84 124,76 Z"
          fill={hairColorHex}
        />
      </g>
    );
  }

  // Aryo: Straight parted messy
  if (hairStyle.includes('parted_messy') || hairStyle.includes('straight_parted')) {
    return (
      <g id="hair-front-aryo">
        <path
          d="M 72,82 C 71,56 81,50 100,50 C 118,50 128,56 128,82 C 122,72 114,68 102,68 C 96,68 86,70 72,82 Z"
          fill={hairColorHex}
        />
        {/* Parted fringe sweeping to right */}
        <path
          d="M 82,68 Q 96,66 112,74 C 116,76 120,80 122,86 Q 114,76 102,74 Z"
          fill={hairColorHex}
        />
        {/* Loose messy strands on forehead */}
        <path d="M 88,70 Q 92,76 90,81" fill="none" stroke={hairColorHex} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 97,71 Q 102,77 106,79" fill="none" stroke={hairColorHex} strokeWidth="1.8" strokeLinecap="round" />
      </g>
    );
  }

  // Dimas: Pompadour undercut pomade
  if (hairStyle.includes('pompadour') || hairStyle.includes('undercut')) {
    return (
      <g id="hair-front-dimas">
        {/* High swept pompadour volume */}
        <path
          d="M 75,76 C 73,50 82,42 100,42 C 117,42 126,50 125,76 C 121,66 114,62 100,62 C 86,62 79,66 75,76 Z"
          fill={hairColorHex}
        />
        {/* Pomade high crest */}
        <path
          d="M 80,56 C 88,44 112,44 120,56 C 114,50 96,48 80,56 Z"
          fill="#334155"
          opacity="0.4"
        />
        {/* Trimmed undercut sides */}
        <path d="M 74,78 L 74,88 L 77,88 L 77,78 Z" fill="#09090B" opacity="0.6" />
        <path d="M 126,78 L 126,88 L 123,88 L 123,78 Z" fill="#09090B" opacity="0.6" />
      </g>
    );
  }

  // Bagas: Unkempt wavy hair over forehead
  if (hairStyle.includes('unkempt_wavy')) {
    return (
      <g id="hair-front-bagas">
        <path
          d="M 72,82 C 70,54 80,48 100,48 C 119,48 129,54 128,82 C 122,72 112,68 100,68 C 88,68 78,72 72,82 Z"
          fill={hairColorHex}
        />
        {/* Messy waves dropping into forehead / eyes */}
        <path d="M 78,72 Q 84,82 82,88" fill="none" stroke={hairColorHex} strokeWidth="2.8" strokeLinecap="round" />
        <path d="M 88,68 Q 93,80 91,89" fill="none" stroke={hairColorHex} strokeWidth="2.8" strokeLinecap="round" />
        <path d="M 98,68 Q 104,79 101,88" fill="none" stroke={hairColorHex} strokeWidth="2.8" strokeLinecap="round" />
        <path d="M 108,70 Q 115,79 114,87" fill="none" stroke={hairColorHex} strokeWidth="2.8" strokeLinecap="round" />
      </g>
    );
  }

  // Fajar: Military buzz cut
  if (hairStyle.includes('buzz_cut') || hairStyle.includes('military')) {
    return (
      <g id="hair-front-fajar">
        <path
          d="M 74,80 C 74,58 83,54 100,54 C 117,54 126,58 126,80 C 122,72 116,68 100,68 C 84,68 78,72 74,80 Z"
          fill={hairColorHex}
        />
        {/* Textured buzz stippling overlay */}
        <path
          d="M 80,64 L 82,62 M 90,60 L 92,58 M 100,58 L 102,56 M 110,60 L 112,58 M 118,64 L 120,62"
          stroke="#09090B"
          strokeWidth="1.2"
          opacity="0.5"
        />
      </g>
    );
  }

  // Reza: Thick wavy front
  if (hairStyle.includes('shoulder_length_wavy')) {
    return (
      <g id="hair-front-reza">
        <path
          d="M 72,80 C 71,52 80,46 100,46 C 120,46 129,52 128,80 C 123,70 114,66 100,66 C 86,66 77,70 72,80 Z"
          fill={hairColorHex}
        />
        {/* Center-part wave curls */}
        <path d="M 86,66 Q 80,74 76,82" fill="none" stroke={hairColorHex} strokeWidth="3" strokeLinecap="round" />
        <path d="M 114,66 Q 120,74 124,82" fill="none" stroke={hairColorHex} strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  }

  // Hendro: Short practical crew
  if (hairStyle.includes('short_practical_crew') || hairStyle.includes('crew')) {
    return (
      <g id="hair-front-hendro">
        <path
          d="M 73,80 C 73,56 82,52 100,52 C 118,52 127,56 127,80 C 121,72 114,68 100,68 C 86,68 79,72 73,80 Z"
          fill={hairColorHex}
        />
        {/* Short curls texture */}
        <circle cx="86" cy="62" r="2.5" fill={hairColorHex} opacity="0.6" />
        <circle cx="100" cy="58" r="2.5" fill={hairColorHex} opacity="0.6" />
        <circle cx="114" cy="62" r="2.5" fill={hairColorHex} opacity="0.6" />
      </g>
    );
  }

  // Farhan: Modern taper fade quiff
  if (hairStyle.includes('taper_fade') || hairStyle.includes('quiff')) {
    return (
      <g id="hair-front-farhan">
        {/* Upward textured quiff */}
        <path
          d="M 74,78 C 73,52 82,44 98,43 C 114,42 125,48 126,78 C 120,68 112,64 98,64 C 84,64 78,68 74,78 Z"
          fill={hairColorHex}
        />
        {/* Spiked quiff tips */}
        <path d="M 94,44 L 98,39 L 102,44" fill={hairColorHex} />
        <path d="M 104,45 L 108,41 L 112,47" fill={hairColorHex} />
      </g>
    );
  }

  // Kevin: Side-part neat groomed
  if (hairStyle.includes('neat_groomed') || hairStyle.includes('side_part')) {
    return (
      <g id="hair-front-kevin">
        {/* Pristine razor-sharp side part */}
        <path
          d="M 73,80 C 72,56 82,50 100,50 C 118,50 127,56 127,80 C 122,70 114,68 100,68 C 86,68 78,70 73,80 Z"
          fill={hairColorHex}
        />
        {/* Left sharp part line */}
        <line x1="84" y1="62" x2="84" y2="72" stroke="#09090B" strokeWidth="1.2" opacity="0.6" />
        {/* Smooth groomed combing */}
        <path d="M 86,64 Q 100,62 118,68" fill="none" stroke={hairColorHex} strokeWidth="2.2" />
      </g>
    );
  }

  // Danang: Curly short round neat
  if (hairStyle.includes('curly_short_round') || hairStyle.includes('curly')) {
    return (
      <g id="hair-front-danang">
        <path
          d="M 72,80 C 70,54 80,48 100,48 C 120,48 130,54 128,80 C 122,72 114,68 100,68 C 86,68 78,72 72,80 Z"
          fill={hairColorHex}
        />
        {/* Round curl bumps along hairline */}
        <circle cx="76" cy="74" r="3.5" fill={hairColorHex} />
        <circle cx="83" cy="67" r="3.5" fill={hairColorHex} />
        <circle cx="92" cy="62" r="3.5" fill={hairColorHex} />
        <circle cx="100" cy="60" r="3.5" fill={hairColorHex} />
        <circle cx="108" cy="62" r="3.5" fill={hairColorHex} />
        <circle cx="117" cy="67" r="3.5" fill={hairColorHex} />
        <circle cx="124" cy="74" r="3.5" fill={hairColorHex} />
      </g>
    );
  }

  // Zul: Long tied back front with loose wavy strands
  if (hairStyle.includes('tied_back') || hairStyle.includes('long_tied')) {
    return (
      <g id="hair-front-zul">
        <path
          d="M 72,80 C 70,52 80,48 100,48 C 120,48 130,52 128,80 C 122,70 114,66 100,66 C 86,66 78,70 72,80 Z"
          fill={hairColorHex}
        />
        {/* Loose strands around ears */}
        <path d="M 72,78 Q 70,90 73,98" fill="none" stroke={hairColorHex} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 128,78 Q 130,90 127,98" fill="none" stroke={hairColorHex} strokeWidth="2.2" strokeLinecap="round" />
      </g>
    );
  }

  // Standard fallback front hair
  return (
    <g id="hair-front-default">
      <path
        d="M 73,80 C 72,56 82,50 100,50 C 118,50 127,56 127,80 C 121,70 114,66 100,66 C 86,66 78,70 73,80 Z"
        fill={hairColorHex}
      />
    </g>
  );
};

export const Hair: React.FC<HairProps> = (props) => {
  const { layer = 'all' } = props;
  return (
    <g id="hair-composite">
      {(layer === 'back' || layer === 'all') && <HairBack {...props} />}
      {(layer === 'front' || layer === 'all') && <HairFront {...props} />}
    </g>
  );
};

export default Hair;
