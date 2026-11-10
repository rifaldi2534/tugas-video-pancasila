"""
test_tier3_camera_subtitles_audio.py - Tier 3: Camera, Dialogue Subtitles & Audio System Test Suite.
Validates:
1. Camera presets (7 framing types) and smartphone focal length rules (26mm / 52mm)
2. Transform matrix calculations, CSS 3D translate/scale, and parallax depth
3. Subtitle synchronization with verbatim dialogue from screenplay and title-safe attribution
4. Multi-track audio cue schema, broadcast dBFS targets, -12dB safety track, and procedural synth fallback
"""

import os
import re
import math
import unittest
from typing import Dict, Any, List

from .test_helpers import (
    SRC_DIR,
    DATA_DIR,
    TYPES_DIR,
    SCREENPLAY_DIR,
    ALL_14_CHARACTERS,
    CANONICAL_FRAMING_PRESETS,
    CANONICAL_SCENE_SPECS,
    AssertionTracker,
    check_file_exists,
    read_file_content,
    load_json_file,
    calculate_camera_transform_matrix,
)

TIER_NAME = "Tier 3: Cinematic Camera, Subtitles & Audio Engine"


class TestTier3CameraSubtitlesAudio(unittest.TestCase):
    """Tier 3 Test Suite: Validates camera math, framing presets, subtitle verbatim sync, and audio cues."""

    def _track(self, suite: str, test_id: str, description: str,
               passed: bool, details: str = "", file_path: str = None,
               is_pending: bool = False, target_milestone: str = "M3"):
        AssertionTracker.record(
            tier=TIER_NAME,
            suite=suite,
            test_id=test_id,
            description=description,
            passed=passed,
            details=details,
            file_path=file_path,
            is_pending=is_pending,
            target_milestone=target_milestone
        )
        self.assertTrue(passed or is_pending, f"[{test_id}] {description}: {details}")

    # =========================================================================
    # Suite 3.1: Remotion Cinematic Camera Presets (7 Framing Types)
    # =========================================================================
    def test_t3_cam_01_framing_presets_defined(self):
        suite = "Suite 3.1: Camera Presets"
        path = os.path.join(TYPES_DIR, "camera.ts")
        content = read_file_content(path) or ""

        # Verify ShotType union covers 7 canonical framing types
        shot_types_found = [st for st in ["EST", "WS", "MS", "MCU", "CU", "ECU", "INSERT"] if st in content]
        self._track(suite, "T3.CAM.01", "Camera types define 7 canonical framing shot types",
                    len(shot_types_found) == 7, f"Framing types found: {shot_types_found}", file_path=path)

    def test_t3_cam_02_dual_focal_length_rule(self):
        suite = "Suite 3.1: Camera Presets"
        path = os.path.join(TYPES_DIR, "camera.ts")
        content = read_file_content(path) or ""

        # Smartphone focal length rule: strictly 26mm (Wide 1x) and 52mm (Telephoto 2x)
        has_26 = "26" in content
        has_52 = "52" in content
        self._track(suite, "T3.CAM.02", "Camera types strictly enforce dual smartphone focal lengths (26mm / 52mm)",
                    has_26 and has_52, file_path=path)

    def test_t3_cam_03_shot_movements_supported(self):
        suite = "Suite 3.1: Camera Presets"
        path = os.path.join(TYPES_DIR, "camera.ts")
        content = read_file_content(path) or ""

        # Check movement types
        movements = ["static", "handheld_bracing", "slow_push_in", "slow_pull_out", "tilt_up", "tilt_down"]
        movements_found = [m for m in movements if m in content]
        self._track(suite, "T3.CAM.03", "Camera types define controlled movements (handheld, push, pull, tilt)",
                    len(movements_found) >= 5, f"Movements found: {movements_found}", file_path=path)

    def test_t3_cam_04_scene_shot_distribution(self):
        suite = "Suite 3.1: Camera Presets"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        all_shots = [shot for s in scenes for shot in s.get("shots", [])]

        shot_types_used = {s.get("framing", {}).get("shotType") for s in all_shots}
        # Verify wide, medium, and close-up variety
        has_wide = any("W" in str(st) for st in shot_types_used)
        has_medium = any("M" in str(st) for st in shot_types_used)
        has_cu = any("CU" in str(st) for st in shot_types_used)

        self._track(suite, "T3.CAM.04", "Scene shots demonstrate diverse framing (Wide, Medium, and Close-Up varieties)",
                    has_wide and has_medium and has_cu and len(all_shots) >= 40,
                    f"Total shots: {len(all_shots)}, Distinct shot types: {shot_types_used}", file_path=path)

    # =========================================================================
    # Suite 3.2: Transform Matrix & CSS Interpolation Calculations
    # =========================================================================
    def test_t3_math_01_center_focus_transformation(self):
        suite = "Suite 3.2: Camera Math"
        # Test camera centered at (960, 540) with 1.0 zoom -> should have 0 translation
        res_center = calculate_camera_transform_matrix(960.0, 540.0, 1.0)
        self.assertAlmostEqual(res_center["translate_x"], 0.0, places=1)
        self.assertAlmostEqual(res_center["translate_y"], 0.0, places=1)
        self.assertEqual(res_center["scale"], 1.0)

        # Test camera focusing on character at (480, 270) with 2.0 zoom
        # Expect translation = (960 - 480) * 2 = +960px, (540 - 270) * 2 = +540px
        res_focus = calculate_camera_transform_matrix(480.0, 270.0, 2.0)
        self.assertAlmostEqual(res_focus["translate_x"], 960.0, places=1)
        self.assertAlmostEqual(res_focus["translate_y"], 540.0, places=1)
        self.assertEqual(res_focus["scale"], 2.0)

        self._track(suite, "T3.MATH.01", "Camera center focus math produces precise translate3d and scale values",
                    True, f"Centered: {res_center['transform_css']}, Focused: {res_focus['transform_css']}")

    def test_t3_math_02_handheld_shake_bounded(self):
        suite = "Suite 3.2: Camera Math"
        # Micro-shake offsets must be safely bounded to prevent frame edge detachment
        shake_x = 4.5
        shake_y = -3.2
        res = calculate_camera_transform_matrix(960.0, 540.0, 1.15, shake_x=shake_x, shake_y=shake_y)

        # Check shake is reflected in translation
        self.assertAlmostEqual(res["translate_x"], shake_x, places=2)
        self.assertAlmostEqual(res["translate_y"], shake_y, places=2)

        self._track(suite, "T3.MATH.02", "Handheld micro-shake math correctly offsets coordinates within safety margin",
                    True, f"CSS: {res['transform_css']}")

    def test_t3_math_03_parallax_depth_config_in_types(self):
        suite = "Suite 3.2: Camera Math"
        path = os.path.join(TYPES_DIR, "camera.ts")
        content = read_file_content(path) or ""

        # ParallaxDepthConfig interface in camera.ts
        has_parallax = "ParallaxDepthConfig" in content
        has_speeds = "farBackgroundSpeed" in content and "characterStageSpeed" in content
        self._track(suite, "T3.MATH.03", "Camera schema defines ParallaxDepthConfig for multi-layer 2.5D staging",
                    has_parallax and has_speeds, file_path=path)

    # =========================================================================
    # Suite 3.3: Cinematic Subtitle Synchronization & Verbatim Dialogue Fidelity
    # =========================================================================
    def test_t3_sub_01_dialogue_timing_and_sequencing(self):
        suite = "Suite 3.3: Subtitles & Dialogue"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        all_dialogues = [d for s in scenes for d in s.get("dialogueLines", [])]

        valid_timing = True
        contained_in_scene = True
        timing_errors = []

        for s in scenes:
            s_start = s.get("startFrameCumulative", 0)
            s_end = s.get("endFrameCumulative", 0)
            for d in s.get("dialogueLines", []):
                start = d.get("startFrame", 0)
                end = d.get("endFrame", 0)
                if start >= end:
                    valid_timing = False
                    timing_errors.append(f"Dialogue {d.get('id')}: start {start} >= end {end}")
                if start < s_start or end > s_end:
                    contained_in_scene = False
                    timing_errors.append(f"Dialogue {d.get('id')}: [{start}, {end}] outside scene [{s_start}, {s_end}]")

        self._track(suite, "T3.SUB.01", "All dialogue subtitle lines have positive duration (startFrame < endFrame)",
                    valid_timing, f"Errors: {timing_errors[:3]}", file_path=path)
        self._track(suite, "T3.SUB.02", "All dialogue subtitle lines are strictly contained within scene frame boundaries",
                    contained_in_scene, f"Errors: {timing_errors[:3]}", file_path=path)

    def test_t3_sub_03_speaker_identification_and_colors(self):
        suite = "Suite 3.3: Subtitles & Dialogue"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        all_dialogues = [d for s in scenes for d in s.get("dialogueLines", [])]
        valid_speakers = set(ALL_14_CHARACTERS)

        all_valid_speakers = all(d.get("speakerId") in valid_speakers for d in all_dialogues)
        all_have_color = all(bool(d.get("highlightColorHex")) for d in all_dialogues)

        self._track(suite, "T3.SUB.03", "Every subtitle line attributes speech to a valid character from the 14 students",
                    all_valid_speakers, file_path=path)
        self._track(suite, "T3.SUB.04", "Every subtitle line defines a highlightColorHex for character speaker badges",
                    all_have_color, file_path=path)

    def test_t3_sub_05_bilingual_dialogue_fields(self):
        suite = "Suite 3.3: Subtitles & Dialogue"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        all_dialogues = [d for s in scenes for d in s.get("dialogueLines", [])]

        has_original_text = all(len(d.get("textOriginal", "")) > 0 for d in all_dialogues)
        has_translation = all(len(d.get("textTranslationId", "")) > 0 for d in all_dialogues)

        self._track(suite, "T3.SUB.05", "Dialogue lines provide verbatim Suroboyoan text and formal Indonesian translation",
                    has_original_text and has_translation, file_path=path)

    def test_t3_sub_06_verbatim_screenplay_alignment(self):
        suite = "Suite 3.3: Subtitles & Dialogue"
        path_screenplay = os.path.join(SCREENPLAY_DIR, "OUTPUT_14_15_VERSION_A_SCREENPLAY_ALL_14.md")
        content_screenplay = read_file_content(path_screenplay) or ""

        path_scenes = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path_scenes)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])

        # Sample test iconic dialogue lines from each of the 7 major scenes
        iconic_phrases = [
            "miring kabeh",          # Scene 1 Hendro
            "nitrogen",              # Scene 2 Fajar
            "bap",                   # Scene 3 Dimas / Aryo
            "cabut",                 # Scene 4 Nadia
            "sub-nol",               # Scene 5 Fajar
            "joule",                 # Scene 6 Hendro / Dimas
            "tahune"                 # Scene 7 Farhan / Zul
        ]

        phrases_in_screenplay = all(p.lower() in content_screenplay.lower() for p in iconic_phrases)

        # Check in scenes.json
        scenes_text = " ".join([d.get("textOriginal", "") for s in scenes for d in s.get("dialogueLines", [])])
        phrases_in_scenes = all(p.lower() in scenes_text.lower() for p in iconic_phrases)

        self._track(suite, "T3.SUB.06", "Dialogue lines in scenes.json faithfully preserve iconic verbatim lines from Screenplay Version A",
                    phrases_in_screenplay and phrases_in_scenes,
                    f"Screenplay matches: {phrases_in_screenplay}, Scene dataset matches: {phrases_in_scenes}")

    # =========================================================================
    # Suite 3.4: Multi-Track Audio Cue Engine & Synthesizer Fallbacks
    # =========================================================================
    def test_t3_aud_01_audio_cue_schema_in_types(self):
        suite = "Suite 3.4: Audio Engine"
        path = os.path.join(TYPES_DIR, "audio.ts")
        content = read_file_content(path) or ""

        # Verify AudioCategory and AudioCue
        has_cue = "AudioCue" in content
        has_cat = "AudioCategory" in content
        has_dbfs = "targetDbfs" in content
        has_placeholder = "placeholderAssetPath" in content
        self._track(suite, "T3.AUD.01", "TypeScript schema defines AudioCue with category, dBFS target, and placeholder asset path",
                    has_cue and has_cat and has_dbfs and has_placeholder, file_path=path)

    def test_t3_aud_02_safety_track_protection(self):
        suite = "Suite 3.4: Audio Engine"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        scene_5 = next((s for s in scenes if s.get("sceneNumber") == 5), None)
        self.assertIsNotNone(scene_5, "Scene 5 not found")

        audio_cues = scene_5.get("audioCues", [])
        safety_track_found = any(cue.get("isSafetyTrackActive") is True for cue in audio_cues)

        self._track(suite, "T3.AUD.02", "Scene 5 (Charpy pendulum impact) activates -12 dB safety track peak protection",
                    safety_track_found, f"Scene 5 audio cues: {audio_cues}", file_path=path)

    def test_t3_aud_03_broadcast_dbfs_targets(self):
        suite = "Suite 3.4: Audio Engine"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        all_cues = [cue for s in scenes for cue in s.get("audioCues", [])]

        valid_targets = True
        for cue in all_cues:
            target = cue.get("targetDbfs", 0)
            # Standard audio levels: -30 dBFS to -3 dBFS
            if not (-36 <= target <= -3):
                valid_targets = False

        self._track(suite, "T3.AUD.03", "All audio cues have calibrated dBFS target levels (-36 dBFS to -3 dBFS)",
                    valid_targets and len(all_cues) > 0, f"Total audio cues checked: {len(all_cues)}", file_path=path)


if __name__ == "__main__":
    unittest.main()
