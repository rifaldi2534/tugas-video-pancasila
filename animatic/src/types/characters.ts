/**
 * SPESIMEN TERAKHIR — Master Character Schema & Types
 * Mendefinisikan profil sosiologis, fisik, palet warna, dan state animasi 14 mahasiswa DTMM ITS.
 * Mematuhi direktif kepatuhan ekspresi emosi (10 state) dan pose karakter (8 required poses).
 */

export type Gender = 'male' | 'female';

export type BodyBuild = 'slender' | 'medium' | 'stocky' | 'athletic';

export type HeadCoveringType = 
  | 'jilbab_dark_navy' 
  | 'jilbab_light_grey' 
  | 'none';

export type GlassesType = 
  | 'black_rectangular' 
  | 'frameless' 
  | 'thin_wire' 
  | 'safety_goggles'
  | 'none';

/**
 * 10 Emotional Expressions Mandatori (Section 8 Compliance)
 * Mendukung format TitleCase standar dan snake_case/lowercase alias.
 */
export const REQUIRED_EXPRESSIONS_10 = [
  'Normal',
  'Happy',
  'Sad',
  'Angry',
  'Confused',
  'Nervous',
  'Suspicious',
  'Shocked',
  'Disappointed',
  'Serious'
] as const;

export type StandardExpression10Title = typeof REQUIRED_EXPRESSIONS_10[number];

export type StandardExpression10Lower = 
  | 'normal' 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'confused' 
  | 'nervous' 
  | 'suspicious' 
  | 'shocked' 
  | 'disappointed' 
  | 'serious';

export type DramaturgicalExpressionContext = 
  | 'neutral' 
  | 'exhausted' 
  | 'panicked' 
  | 'weeping' 
  | 'empathetic' 
  | 'relieved' 
  | 'smiling';

export type FacialExpressionState = 
  | StandardExpression10Title 
  | StandardExpression10Lower 
  | DramaturgicalExpressionContext;

/**
 * 8 Required Character Poses / Actions (Section 8 Compliance)
 * Ditambah gesture kontekstual laboratorium.
 */
export const REQUIRED_POSES_8 = [
  'idle',
  'walking',
  'sitting',
  'standing',
  'head_movement',
  'looking_left',
  'looking_right',
  'talking'
] as const;

export type StandardPose8 = typeof REQUIRED_POSES_8[number];

export type ContextualLabPose = 
  | 'idle_standing' 
  | 'idle_sitting' 
  | 'slouched_exhausted' 
  | 'leaning_doorframe' 
  | 'gesturing_aggressive' 
  | 'holding_prop' 
  | 'raising_hand_voting' 
  | 'pulling_cable' 
  | 'operating_machine' 
  | 'prostrating_gratitude' 
  | 'eating_snack';

export type BodyPose = StandardPose8 | ContextualLabPose;

export type PhonemeMouthShape = 
  | 'rest' 
  | 'slight_open' 
  | 'wide_open' 
  | 'rounded';

export interface LabCoatDetails {
  worn: boolean;
  buttoned: boolean;
  drapedOverThighs?: boolean;
  nameTagText: string;
  condition: 'clean' | 'dusty' | 'oil_stained' | 'creased' | 'apron_substitute';
}

export interface CharacterPalette {
  skinToneHex: string;
  skinShadowHex: string;
  hairOrHijabHex: string;
  primaryAttireHex: string;
  secondaryAttireHex?: string;
  pantsColorHex: string;
  shoesColorHex: string;
  accentPropHex: string;
}

export interface CharacterVisualProfile {
  heightCm: number;
  heightScale: number; // 0.92 hingga 1.04 relatif terhadap canvas
  build: BodyBuild;
  palette: CharacterPalette;
  hairStyle: string;
  headCovering: HeadCoveringType;
  glasses: GlassesType;
  hasFacialHair: boolean;
  facialHairStyle?: string;
  underlayerAttire: string;
  labCoatDetails: LabCoatDetails;
  footwear: string;
  distinctiveFeatures: string[];
  explicitAssumptions: string[];
  supportedExpressions: string[];
  supportedPoses: string[];
}

export interface Character {
  id: string; // "aryo", "dimas", "bagas", dll.
  fullName: string;
  callSign: string;
  gender: Gender;
  age: number;
  laboratory: string;
  socioEconomicStatus: string;
  archetypeRole: string;
  primaryMotivation: string;
  characterFlaw: string;
  personalStakes: string;
  signatureProps: string[];
  visualProfile: CharacterVisualProfile;
}
