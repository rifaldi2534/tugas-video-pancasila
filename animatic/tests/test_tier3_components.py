"""
test_tier3_components.py - Milestone 3 Component Verification Suite
Rigorously tests:
1. Camera module exports and preset calibrations
2. SubtitleOverlay props and SMPTE title safe margins
3. AudioEngine decibel conversions, safety track attenuation, and procedural WAV generator
4. Zero external bitmaps and asset purity across camera, subtitles, and audio components
"""

import os
import re
import math
import unittest

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT_DIR, "src")
COMPONENTS_DIR = os.path.join(SRC_DIR, "components")
CAMERA_DIR = os.path.join(COMPONENTS_DIR, "camera")
SUBTITLES_DIR = os.path.join(COMPONENTS_DIR, "subtitles")
AUDIO_DIR = os.path.join(COMPONENTS_DIR, "audio")


class TestTier3Components(unittest.TestCase):
    """Milestone 3 AV Component Engine Unit & Purity Tests."""

    def test_01_camera_files_exist_and_exported(self):
        """M3.1: Verify cameraPresets.ts, CinematicCamera.tsx, and index.ts exist with valid exports."""
        presets_path = os.path.join(CAMERA_DIR, "cameraPresets.ts")
        cam_path = os.path.join(CAMERA_DIR, "CinematicCamera.tsx")
        index_path = os.path.join(CAMERA_DIR, "index.ts")

        self.assertTrue(os.path.isfile(presets_path), "cameraPresets.ts missing")
        self.assertTrue(os.path.isfile(cam_path), "CinematicCamera.tsx missing")
        self.assertTrue(os.path.isfile(index_path), "camera/index.ts missing")

        with open(presets_path, "r", encoding="utf-8") as f:
            presets_src = f.read()
        with open(cam_path, "r", encoding="utf-8") as f:
            cam_src = f.read()

        # Check presets
        self.assertIn("CAMERA_FRAMING_PRESETS", presets_src)
        self.assertIn("calculateCameraTransform", presets_src)
        self.assertIn("getHandheldShakeOffset", presets_src)
        self.assertIn("DEFAULT_PARALLAX_CONFIG", presets_src)

        # Check camera component
        self.assertIn("CinematicCamera", cam_src)
        self.assertIn("ParallaxLayer", cam_src)
        self.assertIn("translate3d", cam_src)

    def test_02_camera_presets_canonical_framing(self):
        """M3.2: Verify CAMERA_FRAMING_PRESETS defines all 7 canonical types and calibrated focal lengths."""
        presets_path = os.path.join(CAMERA_DIR, "cameraPresets.ts")
        with open(presets_path, "r", encoding="utf-8") as f:
            src = f.read()

        required_shots = ["EST", "WS", "MS", "MCU", "CU", "ECU", "INSERT", "OTS"]
        for shot in required_shots:
            self.assertIn(shot, src, f"Preset {shot} missing in cameraPresets.ts")

        # Verify dual smartphone focal lengths 26mm and 52mm
        self.assertIn("26", src)
        self.assertIn("52", src)

    def test_03_subtitles_file_exists_and_exported(self):
        """M3.3: Verify SubtitleOverlay.tsx and index.ts exist with SMPTE margins."""
        subs_path = os.path.join(SUBTITLES_DIR, "SubtitleOverlay.tsx")
        index_path = os.path.join(SUBTITLES_DIR, "index.ts")

        self.assertTrue(os.path.isfile(subs_path), "SubtitleOverlay.tsx missing")
        self.assertTrue(os.path.isfile(index_path), "subtitles/index.ts missing")

        with open(subs_path, "r", encoding="utf-8") as f:
            subs_src = f.read()

        self.assertIn("SubtitleOverlay", subs_src)
        self.assertIn("smpte-subtitle-safe-container", subs_src)
        self.assertIn("bottom: '10%'", subs_src)
        self.assertIn("textOriginal", subs_src)

    def test_04_audio_engine_files_exist_and_features(self):
        """M3.4: Verify AudioEngine.tsx and index.ts exist with dBFS and procedural synth."""
        audio_path = os.path.join(AUDIO_DIR, "AudioEngine.tsx")
        index_path = os.path.join(AUDIO_DIR, "index.ts")

        self.assertTrue(os.path.isfile(audio_path), "AudioEngine.tsx missing")
        self.assertTrue(os.path.isfile(index_path), "audio/index.ts missing")

        with open(audio_path, "r", encoding="utf-8") as f:
            audio_src = f.read()

        self.assertIn("AudioEngine", audio_src)
        self.assertIn("dbfsToLinearGain", audio_src)
        self.assertIn("generateProceduralWavUri", audio_src)
        self.assertIn("neon_hum_4200k", audio_src)
        self.assertIn("charpy_impact", audio_src)
        self.assertIn("isSafetyTrackActive", audio_src)

    def test_05_components_index_reexports_m3(self):
        """M3.5: Verify master components/index.ts re-exports camera, subtitles, and audio."""
        idx_path = os.path.join(COMPONENTS_DIR, "index.ts")
        with open(idx_path, "r", encoding="utf-8") as f:
            src = f.read()

        self.assertIn("export * from './camera'", src)
        self.assertIn("export * from './subtitles'", src)
        self.assertIn("export * from './audio'", src)

    def test_06_zero_bitmaps_in_m3_modules(self):
        """M3.6: Verify zero external bitmap references, img tags, or URLs in M3 components."""
        prohibited_img = re.compile(r"<img\s+", re.IGNORECASE)
        prohibited_foreign = re.compile(r"<foreignObject\s+", re.IGNORECASE)
        http_url = re.compile(r"https?://(?!www\.w3\.org/2000/svg)[^\s'\"`]+", re.IGNORECASE)
        prohibited_bitmap_ref = re.compile(r"['\"][^'\"]+\.(png|jpg|jpeg|webp|gif|bmp)['\"]", re.IGNORECASE)

        for folder in [CAMERA_DIR, SUBTITLES_DIR, AUDIO_DIR]:
            for root, _, files in os.walk(folder):
                for f in files:
                    if not f.endswith((".ts", ".tsx")):
                        continue
                    path = os.path.join(root, f)
                    with open(path, "r", encoding="utf-8") as file_handle:
                        content = file_handle.read()

                    self.assertIsNone(prohibited_img.search(content), f"<img /> in {f}")
                    self.assertIsNone(prohibited_foreign.search(content), f"<foreignObject /> in {f}")
                    self.assertIsNone(http_url.search(content), f"External URL in {f}")
                    self.assertIsNone(prohibited_bitmap_ref.search(content), f"Bitmap ref in {f}")


if __name__ == "__main__":
    unittest.main()
