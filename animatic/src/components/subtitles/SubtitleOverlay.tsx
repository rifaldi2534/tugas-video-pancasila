/**
 * SPESIMEN TERAKHIR — Remotion Cinematic Subtitle System
 * 
 * Renders verbatim dialog subtitles within SMPTE title-safe margins (bottom 10–15%),
 * featuring:
 * - Speaker badge with character palette accent color
 * - Verbatim dialogue from screenplay
 * - Bilingual / contextual translation display (Suroboyoan & Indonesian formal)
 * - Parenthetical dramaturgical directions
 * - Frame-accurate fade transitions with Remotion interpolate()
 */

import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { DialogueLine } from '../../types/schema';
import { CHARACTER_PROFILES } from '../characters/CharacterProfiles';

export interface SubtitleOverlayProps {
  dialogueLines?: DialogueLine[];
  activeLine?: DialogueLine;
  sceneStartFrame?: number; // Offset if scene timeline is relative
  showSpeakerBadge?: boolean;
  showTranslation?: boolean;
  showParenthetical?: boolean;
  fadeDurationFrames?: number;
  style?: React.CSSProperties;
}

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({
  dialogueLines = [],
  activeLine,
  sceneStartFrame = 0,
  showSpeakerBadge = true,
  showTranslation = true,
  showParenthetical = true,
  fadeDurationFrames = 4,
  style,
}) => {
  const frame = useCurrentFrame();
  const currentGlobalFrame = frame + sceneStartFrame;

  // Resolve currently active dialogue line
  let currentLine = activeLine;
  if (!currentLine && dialogueLines.length > 0) {
    currentLine = dialogueLines.find((line) => {
      // Lines can be indexed by cumulative frames or local frames
      const start = line.startFrame;
      const end = line.endFrame;
      return currentGlobalFrame >= start && currentGlobalFrame < end;
    });
  }

  if (!currentLine) {
    return null;
  }

  // Calculate smooth fade-in and fade-out opacity
  const lineStart = currentLine.startFrame;
  const lineEnd = currentLine.endFrame;
  const lineDuration = lineEnd - lineStart;
  const localFrame = currentGlobalFrame - lineStart;

  const effectiveFade = Math.min(fadeDurationFrames, Math.floor(lineDuration / 3));

  let opacity = 1;
  if (localFrame < effectiveFade) {
    opacity = interpolate(localFrame, [0, effectiveFade], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (localFrame > lineDuration - effectiveFade) {
    opacity = interpolate(localFrame, [lineDuration - effectiveFade, lineDuration], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // Resolve speaker name and badge color
  const speakerProfile = CHARACTER_PROFILES[currentLine.speakerId.toLowerCase()];
  const speakerName = speakerProfile?.callSign || speakerProfile?.fullName || currentLine.speakerId.toUpperCase();
  const badgeColor = currentLine.highlightColorHex || speakerProfile?.visualProfile?.palette?.primaryAttireHex || '#38BDF8';

  return (
    <div
      className="smpte-subtitle-safe-container"
      style={{
        position: 'absolute',
        bottom: '10%', // SMPTE Title Safe bottom margin (10-15%)
        left: '50%',
        transform: 'translateX(-50%)',
        width: '84%',
        maxWidth: 1380,
        zIndex: 900,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.05s ease-out',
        ...style,
      }}
    >
      {/* Subtitle Glassmorphism Box */}
      <div
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: `3px solid ${badgeColor}`,
          borderRadius: 14,
          padding: '16px 28px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.65), 0 2px 8px rgba(0, 0, 0, 0.4)',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Header: Speaker Badge & Parenthetical Direction */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 8,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {showSpeakerBadge && (
            <span
              style={{
                backgroundColor: badgeColor,
                color: '#09090B',
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                padding: '3px 12px',
                borderRadius: 999,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontFamily: `'Inter', 'Segoe UI', system-ui, sans-serif`,
              }}
            >
              {speakerName}
            </span>
          )}

          {showParenthetical && currentLine.parenthetical && (
            <span
              style={{
                color: '#94A3B8',
                fontSize: 15,
                fontStyle: 'italic',
                fontFamily: `'Inter', 'Segoe UI', system-ui, sans-serif`,
              }}
            >
              {currentLine.parenthetical}
            </span>
          )}
        </div>

        {/* Verbatim Dialogue Text (Suroboyoan / Indonesian) */}
        <div
          style={{
            color: '#F8FAFC',
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: 0.2,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 0, 0, 0.5)',
            fontFamily: `'Inter', 'Segoe UI', system-ui, sans-serif`,
            margin: '2px 0',
          }}
        >
          &ldquo;{currentLine.textOriginal}&rdquo;
        </div>

        {/* Formal Indonesian Translation / Context Subtext */}
        {showTranslation && currentLine.textTranslationId && (
          <div
            style={{
              color: '#CBD5E1',
              fontSize: 17,
              fontWeight: 400,
              fontStyle: 'italic',
              marginTop: 6,
              paddingTop: 6,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              letterSpacing: 0.1,
              fontFamily: `'Inter', 'Segoe UI', system-ui, sans-serif`,
            }}
          >
            {currentLine.textTranslationId}
          </div>
        )}
      </div>
    </div>
  );
};
