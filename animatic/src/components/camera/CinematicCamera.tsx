/**
 * SPESIMEN TERAKHIR — Remotion Cinematic Camera Engine
 * 
 * Provides dynamic 2.5D camera staging with:
 * - 7+ framing presets with dual smartphone focal lengths (26mm / 52mm)
 * - CSS 3D transforms (translate3d, scale3d / scale, rotate)
 * - Frame-based interpolation via Remotion interpolate() & spring()
 * - Procedural physiological handheld micro-shake
 * - Multi-layer parallax depth shifts (farBackground 0.2, midground 0.6, characterStage 1.0, foreground 1.3)
 */

import React, { createContext, useContext, useMemo } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  ShotType,
  CameraMovementType,
  ParallaxDepthConfig,
} from '../../types/camera';
import {
  CAMERA_FRAMING_PRESETS,
  DEFAULT_PARALLAX_CONFIG,
  ExtendedMovementType,
  ExtendedShotType,
  calculateCameraTransform,
  getHandheldShakeOffset,
} from './cameraPresets';

export interface CameraContextValue {
  frame: number;
  translateX: number;
  translateY: number;
  zoom: number;
  rotation: number;
  parallaxConfig: ParallaxDepthConfig;
}

export const CameraContext = createContext<CameraContextValue>({
  frame: 0,
  translateX: 0,
  translateY: 0,
  zoom: 1.0,
  rotation: 0,
  parallaxConfig: DEFAULT_PARALLAX_CONFIG,
});

export interface ParallaxLayerProps {
  depth?: number; // 0.2 = far wall, 0.6 = machinery, 1.0 = characters, 1.3 = foreground
  speed?: number; // Override custom speed factor
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * ParallaxLayer shifts its position relative to camera movement according to depth factor.
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  depth = 1.0,
  speed,
  children,
  style,
  className,
}) => {
  const camera = useContext(CameraContext);
  const factor = speed !== undefined ? speed : depth;

  // The layer moves in proportional perspective based on depth factor
  // A depth of 0.2 moves at 20% of the camera pan, creating illusion of infinite distance
  const layerX = camera.translateX * factor;
  const layerY = camera.translateY * factor;

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: `translate3d(${layerX.toFixed(2)}px, ${layerY.toFixed(2)}px, 0px)`,
        transformOrigin: '50% 50%',
        willChange: 'transform',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export interface CinematicCameraProps {
  shotType?: ExtendedShotType;
  movement?: ExtendedMovementType;
  zoom?: number;
  focusX?: number; // Coordinate X (pixels or percent 0-100)
  focusY?: number; // Coordinate Y (pixels or percent 0-100)
  rotation?: number; // Base tilt angle (-2.0 to +2.0 degrees)
  enableShake?: boolean;
  shakeIntensity?: number;
  useSpringEntry?: boolean;
  movementDuration?: number;
  parallaxConfig?: Partial<ParallaxDepthConfig>;
  // Dedicated layer slots (optional convenience)
  farBackground?: React.ReactNode;
  midground?: React.ReactNode;
  characterStage?: React.ReactNode;
  foreground?: React.ReactNode;
  // Standard children
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const CinematicCamera: React.FC<CinematicCameraProps> = ({
  shotType = 'WS',
  movement = 'static',
  zoom,
  focusX,
  focusY,
  rotation = 0,
  enableShake = true,
  shakeIntensity = 0.5,
  useSpringEntry = false,
  movementDuration,
  parallaxConfig: customParallax,
  farBackground,
  midground,
  characterStage,
  foreground,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { width: viewportWidth, height: viewportHeight, fps, durationInFrames } = useVideoConfig();

  const totalFrames = movementDuration || durationInFrames || 240;

  // 1. Resolve preset defaults
  const preset = CAMERA_FRAMING_PRESETS[shotType] || CAMERA_FRAMING_PRESETS.WS;

  const resolvedBaseZoom = zoom !== undefined ? zoom : preset.defaultZoom;

  // Resolve focus center coordinates
  let baseCenterX: number;
  if (focusX !== undefined) {
    baseCenterX = focusX <= 100 ? (focusX / 100) * viewportWidth : focusX;
  } else {
    baseCenterX = (preset.defaultFocusPercent.x / 100) * viewportWidth;
  }

  let baseCenterY: number;
  if (focusY !== undefined) {
    baseCenterY = focusY <= 100 ? (focusY / 100) * viewportHeight : focusY;
  } else {
    baseCenterY = (preset.defaultFocusPercent.y / 100) * viewportHeight;
  }

  // 2. Compute dynamic movement offsets
  let dynamicZoom = resolvedBaseZoom;
  let dynamicCenterX = baseCenterX;
  let dynamicCenterY = baseCenterY;
  let dynamicRotation = rotation;

  // Spring transition on shot entry if requested
  const springProgress = useSpringEntry
    ? spring({ frame, fps, config: { damping: 16, mass: 0.8, stiffness: 80 } })
    : 1.0;

  switch (movement) {
    case 'slow_push_in':
    case 'slow_zoom_in': {
      const zoomMul = interpolate(frame, [0, totalFrames], [1.0, 1.15], {
        extrapolateRight: 'clamp',
      });
      dynamicZoom = resolvedBaseZoom * zoomMul;
      break;
    }

    case 'slow_pull_out':
    case 'slow_zoom_out': {
      const zoomMul = interpolate(frame, [0, totalFrames], [1.15, 1.0], {
        extrapolateRight: 'clamp',
      });
      dynamicZoom = resolvedBaseZoom * zoomMul;
      break;
    }

    case 'pan_left':
    case 'slow_pan_left': {
      // Camera pans left -> viewport moves left -> elements shift right to left
      const panOffset = interpolate(frame, [0, totalFrames], [100, -100], {
        extrapolateRight: 'clamp',
      });
      dynamicCenterX = baseCenterX + panOffset;
      break;
    }

    case 'pan_right':
    case 'slow_pan_right': {
      const panOffset = interpolate(frame, [0, totalFrames], [-100, 100], {
        extrapolateRight: 'clamp',
      });
      dynamicCenterX = baseCenterX + panOffset;
      break;
    }

    case 'tilt_up': {
      const tiltOffset = interpolate(frame, [0, totalFrames], [50, -50], {
        extrapolateRight: 'clamp',
      });
      dynamicCenterY = baseCenterY + tiltOffset;
      break;
    }

    case 'tilt_down': {
      const tiltOffset = interpolate(frame, [0, totalFrames], [-50, 50], {
        extrapolateRight: 'clamp',
      });
      dynamicCenterY = baseCenterY + tiltOffset;
      break;
    }

    case 'tracking': {
      const trackX = Math.sin((frame / fps) * 0.8) * 45;
      const trackY = Math.cos((frame / fps) * 0.6) * 20;
      dynamicCenterX = baseCenterX + trackX;
      dynamicCenterY = baseCenterY + trackY;
      break;
    }

    case 'passive_ninja_walk': {
      // Steady camera operator walking with slight vertical step bobbing
      const stepBob = Math.sin(frame * 0.35) * 3.5;
      dynamicCenterY = baseCenterY + stepBob;
      break;
    }

    case 'whip_pan': {
      const whipProgress = interpolate(frame, [0, Math.min(totalFrames, 18)], [0, 1], {
        extrapolateRight: 'clamp',
      });
      dynamicCenterX = baseCenterX + (1 - whipProgress) * 400;
      break;
    }

    case 'handheld_bracing':
    case 'handheld_shake':
    case 'static':
    default:
      break;
  }

  // 3. Compute physiological handheld micro-shake
  const effectiveShakeIntensity = enableShake
    ? movement === 'handheld_bracing' || movement === 'handheld_shake'
      ? shakeIntensity * 1.2
      : shakeIntensity * 0.5
    : 0;

  const { shakeX, shakeY, shakeRot } = getHandheldShakeOffset(frame, effectiveShakeIntensity);
  dynamicRotation += shakeRot;

  // Apply spring entry easing to zoom if specified
  if (useSpringEntry) {
    dynamicZoom = 1.0 + (dynamicZoom - 1.0) * springProgress;
  }

  // 4. Calculate master transform matrix
  const transformMatrix = calculateCameraTransform(
    dynamicCenterX,
    dynamicCenterY,
    dynamicZoom,
    dynamicRotation,
    shakeX,
    shakeY,
    viewportWidth,
    viewportHeight
  );

  // Parallax configuration
  const mergedParallaxConfig: ParallaxDepthConfig = useMemo(
    () => ({
      ...DEFAULT_PARALLAX_CONFIG,
      ...customParallax,
    }),
    [customParallax]
  );

  const contextValue: CameraContextValue = useMemo(
    () => ({
      frame,
      translateX: transformMatrix.translateX,
      translateY: transformMatrix.translateY,
      zoom: dynamicZoom,
      rotation: dynamicRotation,
      parallaxConfig: mergedParallaxConfig,
    }),
    [frame, transformMatrix.translateX, transformMatrix.translateY, dynamicZoom, dynamicRotation, mergedParallaxConfig]
  );

  return (
    <CameraContext.Provider value={contextValue}>
      <div
        className="cinematic-camera-viewport"
        style={{
          position: 'relative',
          width: viewportWidth,
          height: viewportHeight,
          overflow: 'hidden',
          backgroundColor: '#09090B',
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
          ...style,
        }}
      >
        {/* Layer 1: Far Background (Depth 0.2) */}
        {farBackground && (
          <ParallaxLayer depth={mergedParallaxConfig.farBackgroundSpeed}>
            {farBackground}
          </ParallaxLayer>
        )}

        {/* Layer 2: Midground Machinery / Desks (Depth 0.6) */}
        {midground && (
          <ParallaxLayer depth={mergedParallaxConfig.midgroundSpeed}>
            {midground}
          </ParallaxLayer>
        )}

        {/* Layer 3: Main Character Stage (Depth 1.0) with Full Camera Transform */}
        <div
          className="cinematic-camera-stage"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: viewportWidth,
            height: viewportHeight,
            transform: transformMatrix.transformCss,
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {characterStage}
          {children}
        </div>

        {/* Layer 4: Foreground Overlay (Depth 1.3) */}
        {foreground && (
          <ParallaxLayer depth={mergedParallaxConfig.foregroundSpeed}>
            {foreground}
          </ParallaxLayer>
        )}
      </div>
    </CameraContext.Provider>
  );
};
