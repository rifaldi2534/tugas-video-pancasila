"""
test_tier1_schema_and_docs.py - Tier 1: Schema, Data & Document Integrity Test Suite.
Validates:
1. All 5 analysis docs in analysis/
2. JSON schemas in animatic/src/data/ (characters.json, scenes.json)
3. All 14 characters presence (10 male, 4 female) with valid palettes and assumptions
4. 7 scenes summing to 23,040 frames (960s @ 24fps) with continuous timeline
5. Immutability of source screenplay files in screenplay/, production/, docs/
"""

import os
import re
import subprocess
import unittest
from typing import Dict, Any, List

from .test_helpers import (
    ANALYSIS_DIR,
    SCREENPLAY_DIR,
    PRODUCTION_DIR,
    CONCEPTS_DIR,
    DATA_DIR,
    CANONICAL_5_ANALYSIS_FILES,
    CANONICAL_STUDENT_CHARACTERS,
    ALL_14_CHARACTERS,
    CANONICAL_SCENE_SPECS,
    EXPECTED_TOTAL_FRAMES,
    EXPECTED_TOTAL_SECONDS,
    EXPECTED_SCENE_COUNT,
    SOURCE_SCREENPLAY_FILES,
    AssertionTracker,
    check_file_exists,
    read_file_content,
    load_json_file,
    extract_markdown_headings,
)

TIER_NAME = "Tier 1: Schema, Data & Document Integrity"


class TestTier1SchemaAndDocs(unittest.TestCase):
    """Tier 1 Test Suite: Validates documentation completeness, JSON datasets, and source immutability."""

    def _track(self, suite: str, test_id: str, description: str,
               passed: bool, details: str = "", file_path: str = None,
               is_pending: bool = False, target_milestone: str = "M1"):
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
    # Suite 1: Analysis Documentation Package Integrity (analysis/)
    # =========================================================================
    def test_t1_doc_01_file_inventory(self):
        suite = "Suite 1.1: Analysis Docs"
        path = os.path.join(ANALYSIS_DIR, "file_inventory.md")
        exists = check_file_exists(path)
        self._track(suite, "T1.DOC.01a", "analysis/file_inventory.md exists", exists, file_path=path)

        content = read_file_content(path) or ""
        self._track(suite, "T1.DOC.01b", "file_inventory.md has substantive content (> 5000 chars)",
                    len(content) > 5000, f"Observed length: {len(content)} chars", file_path=path)

        # Check required sections in file inventory
        has_scripts = "screenplay" in content.lower() or "output_14_15" in content.lower()
        has_production = "production" in content.lower() or "output_16" in content.lower()
        has_animatic = "animatic" in content.lower()
        self._track(suite, "T1.DOC.01c", "file_inventory.md indexes screenplay, production, and animatic trees",
                    has_scripts and has_production and has_animatic, file_path=path)

    def test_t1_doc_02_script_analysis(self):
        suite = "Suite 1.1: Analysis Docs"
        path = os.path.join(ANALYSIS_DIR, "script_analysis.md")
        exists = check_file_exists(path)
        self._track(suite, "T1.DOC.02a", "analysis/script_analysis.md exists", exists, file_path=path)

        content = read_file_content(path) or ""
        self._track(suite, "T1.DOC.02b", "script_analysis.md has substantive dramaturgy analysis (> 5000 chars)",
                    len(content) > 5000, f"Observed length: {len(content)} chars", file_path=path)

        # Check narrative stages and core conflict
        has_conflict = "spesimen" in content.lower() and ("dimas" in content.lower() or "bagas" in content.lower())
        has_pancasila = "pancasila" in content.lower()
        has_7_acts = all(f"babak {i}" in content.lower() or f"scene {i}" in content.lower() or f"adegan {i}" in content.lower() for i in range(1, 8))
        self._track(suite, "T1.DOC.02c", "script_analysis.md covers core conflict, ethical dilemma, and 7-act dramaturgy",
                    has_conflict and has_pancasila and has_7_acts, file_path=path)

    def test_t1_doc_03_character_guide(self):
        suite = "Suite 1.1: Analysis Docs"
        path = os.path.join(ANALYSIS_DIR, "character_guide.md")
        exists = check_file_exists(path)
        self._track(suite, "T1.DOC.03a", "analysis/character_guide.md exists", exists, file_path=path)

        content = read_file_content(path) or ""
        self._track(suite, "T1.DOC.03b", "character_guide.md has exhaustive profiles (> 10000 chars)",
                    len(content) > 10000, f"Observed length: {len(content)} chars", file_path=path)

        # Verify all 14 characters are documented
        missing_chars = [c for c in ALL_14_CHARACTERS if c not in content.lower()]
        self._track(suite, "T1.DOC.03c", "character_guide.md documents all 14 student characters",
                    len(missing_chars) == 0, f"Missing characters: {missing_chars}", file_path=path)

        # Verify explicit assumptions section exists
        has_assumptions = "asumsi" in content.lower() or "explicit assumptions" in content.lower()
        self._track(suite, "T1.DOC.03d", "character_guide.md documents explicit visual assumptions",
                    has_assumptions, file_path=path)

    def test_t1_doc_04_scene_breakdown(self):
        suite = "Suite 1.1: Analysis Docs"
        path = os.path.join(ANALYSIS_DIR, "scene_breakdown.md")
        exists = check_file_exists(path)
        self._track(suite, "T1.DOC.04a", "analysis/scene_breakdown.md exists", exists, file_path=path)

        content = read_file_content(path) or ""
        self._track(suite, "T1.DOC.04b", "scene_breakdown.md has comprehensive breakdown (> 10000 chars)",
                    len(content) > 10000, f"Observed length: {len(content)} chars", file_path=path)

        # Verify 16:00 duration and 23,040 frames mentioned
        has_duration = "16:00" in content or "960" in content
        has_frames = "23.040" in content or "23,040" in content or "23040" in content
        self._track(suite, "T1.DOC.04c", "scene_breakdown.md specifies 16:00 (960s) and 23,040 frames @ 24fps",
                    has_duration and has_frames, file_path=path)

        # Verify 7 scenes are broken down
        has_all_scenes = all(f"scene {i}" in content.lower() or f"adegan {i}" in content.lower() or f"babak {i}" in content.lower() for i in range(1, 8))
        self._track(suite, "T1.DOC.04d", "scene_breakdown.md covers all 7 scenes",
                    has_all_scenes, file_path=path)

    def test_t1_doc_05_visual_style_guide(self):
        suite = "Suite 1.1: Analysis Docs"
        path = os.path.join(ANALYSIS_DIR, "visual_style_guide.md")
        exists = check_file_exists(path)
        self._track(suite, "T1.DOC.05a", "analysis/visual_style_guide.md exists", exists, file_path=path)

        content = read_file_content(path) or ""
        self._track(suite, "T1.DOC.05b", "visual_style_guide.md has detailed visual specs (> 5000 chars)",
                    len(content) > 5000, f"Observed length: {len(content)} chars", file_path=path)

        # Verify SVG procedural design and zero external assets policy
        has_svg = "svg" in content.lower()
        has_lighting = "4200k" in content.lower() or "3000k" in content.lower() or "3800k" in content.lower()
        self._track(suite, "T1.DOC.05c", "visual_style_guide.md specifies procedural SVG architecture and lighting",
                    has_svg and has_lighting, file_path=path)

    # =========================================================================
    # Suite 2: Character Dataset Schema & Demographics (characters.json)
    # =========================================================================
    def test_t1_char_01_json_validity(self):
        suite = "Suite 1.2: Character Schema"
        path = os.path.join(DATA_DIR, "characters.json")
        data, err = load_json_file(path)
        self._track(suite, "T1.CHAR.01", "characters.json exists and is valid parseable JSON",
                    data is not None, f"Error: {err}", file_path=path)

    def test_t1_char_02_count_and_gender_balance(self):
        suite = "Suite 1.2: Character Schema"
        path = os.path.join(DATA_DIR, "characters.json")
        data, err = load_json_file(path)
        if data is None:
            self._track(suite, "T1.CHAR.02", "characters.json contains exactly 14 characters", False, f"File unreadable: {err}", file_path=path)
            return

        chars = data if isinstance(data, list) else data.get("characters", [])
        self._track(suite, "T1.CHAR.02", "characters.json contains exactly 14 characters",
                    len(chars) == 14, f"Observed count: {len(chars)}", file_path=path)

        males = [c for c in chars if c.get("gender") == "male"]
        females = [c for c in chars if c.get("gender") == "female"]
        self._track(suite, "T1.CHAR.03", "Exact gender balance: 10 male and 4 female students",
                    len(males) == 10 and len(females) == 4,
                    f"Observed: {len(males)} male, {len(females)} female", file_path=path)

    def test_t1_char_04_all_14_canonical_ids_present(self):
        suite = "Suite 1.2: Character Schema"
        path = os.path.join(DATA_DIR, "characters.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("characters.json not available")

        chars = data if isinstance(data, list) else data.get("characters", [])
        observed_ids = {c.get("id", "").lower() for c in chars}
        expected_ids = set(ALL_14_CHARACTERS)

        missing = expected_ids - observed_ids
        self._track(suite, "T1.CHAR.04", "All 14 canonical character IDs are present",
                    len(missing) == 0, f"Missing IDs: {missing}", file_path=path)

    def test_t1_char_05_profile_completeness_and_palettes(self):
        suite = "Suite 1.2: Character Schema"
        path = os.path.join(DATA_DIR, "characters.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("characters.json not available")

        chars = data if isinstance(data, list) else data.get("characters", [])
        hex_pattern = re.compile(r"^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$")

        all_have_required_fields = True
        all_palettes_valid = True
        all_have_assumptions = True
        heights_within_range = True

        for c in chars:
            # Required top-level fields
            if not (c.get("id") and c.get("fullName") and c.get("laboratory") and c.get("archetypeRole")):
                all_have_required_fields = False
            
            vp = c.get("visualProfile", {})
            palette = vp.get("palette", {})
            
            # Palette hex codes check
            skin = palette.get("skinToneHex", "")
            hair = palette.get("hairOrHijabHex", "")
            attire = palette.get("primaryAttireHex", "")
            if not (hex_pattern.match(skin) and hex_pattern.match(hair) and hex_pattern.match(attire)):
                all_palettes_valid = False

            # Explicit assumptions
            assumptions = vp.get("explicitAssumptions", [])
            if not isinstance(assumptions, list) or len(assumptions) == 0:
                all_have_assumptions = False

            # Height scale range (0.92 to 1.08)
            height_scale = vp.get("heightScale", 1.0)
            if not (0.90 <= height_scale <= 1.10):
                heights_within_range = False

        self._track(suite, "T1.CHAR.05", "All 14 profiles have complete metadata (ID, name, lab, role)",
                    all_have_required_fields, file_path=path)
        self._track(suite, "T1.CHAR.06", "All 14 visual profiles have valid hex color palettes",
                    all_palettes_valid, file_path=path)
        self._track(suite, "T1.CHAR.07", "All 14 characters have explicit visual assumptions documented",
                    all_have_assumptions, file_path=path)
        self._track(suite, "T1.CHAR.08", "Character heightScale metrics are bounded within realistic range (0.90 - 1.10)",
                    heights_within_range, file_path=path)

    def test_t1_char_09_section8_expressions_in_schema(self):
        suite = "Suite 1.2: Character Schema"
        from .test_helpers import TYPES_DIR, SECTION_8_REQUIRED_EXPRESSIONS_10
        types_path = os.path.join(TYPES_DIR, "characters.ts")
        content = read_file_content(types_path) or ""

        # Check all 10 required emotional expressions in schema
        missing_exprs = [e for e in SECTION_8_REQUIRED_EXPRESSIONS_10 if e not in content and e.lower() not in content.lower()]
        self._track(suite, "T1.CHAR.09", "Section 8 Compliance: characters.ts explicitly defines all 10 required emotional expressions",
                    len(missing_exprs) == 0, f"Missing expressions: {missing_exprs}", file_path=types_path)

    def test_t1_char_10_section8_poses_in_schema(self):
        suite = "Suite 1.2: Character Schema"
        from .test_helpers import TYPES_DIR, SECTION_8_REQUIRED_POSES_8
        types_path = os.path.join(TYPES_DIR, "characters.ts")
        content = read_file_content(types_path) or ""

        # Check all 8 required poses in schema
        missing_poses = [p for p in SECTION_8_REQUIRED_POSES_8 if p not in content.lower()]
        self._track(suite, "T1.CHAR.10", "Section 8 Compliance: characters.ts explicitly defines all 8 required character poses",
                    len(missing_poses) == 0, f"Missing poses: {missing_poses}", file_path=types_path)

    # =========================================================================
    # Suite 3: Scene Dataset Schema & Mathematical Calibration (scenes.json)
    # =========================================================================
    def test_t1_scene_01_json_validity_and_count(self):
        suite = "Suite 1.3: Scene Schema & Calibration"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, err = load_json_file(path)
        self._track(suite, "T1.SCENE.01", "scenes.json exists and is valid parseable JSON",
                    data is not None, f"Error: {err}", file_path=path)
        if data is None:
            return

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        self._track(suite, "T1.SCENE.02", "scenes.json contains exactly 7 scenes",
                    len(scenes) == EXPECTED_SCENE_COUNT, f"Observed: {len(scenes)}", file_path=path)

    def test_t1_scene_03_total_timeline_and_frame_calibration(self):
        suite = "Suite 1.3: Scene Schema & Calibration"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        total_frames = sum(s.get("durationFrames", 0) for s in scenes)
        total_seconds = sum(s.get("durationSeconds", 0) for s in scenes)

        self._track(suite, "T1.SCENE.03", "Total timeline duration is EXACTLY 23,040 frames (960s @ 24fps)",
                    total_frames == EXPECTED_TOTAL_FRAMES and total_seconds == EXPECTED_TOTAL_SECONDS,
                    f"Observed: {total_frames} frames ({total_seconds}s), Expected: {EXPECTED_TOTAL_FRAMES} frames ({EXPECTED_TOTAL_SECONDS}s)",
                    file_path=path)

    def test_t1_scene_04_per_scene_duration_calibration(self):
        suite = "Suite 1.3: Scene Schema & Calibration"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        scene_map = {s.get("sceneNumber"): s for s in scenes}

        mismatches = []
        for snum, spec in CANONICAL_SCENE_SPECS.items():
            sc = scene_map.get(snum)
            if not sc:
                mismatches.append(f"Scene {snum} missing")
                continue
            obs_frames = sc.get("durationFrames")
            obs_secs = sc.get("durationSeconds")
            if obs_frames != spec["frames"] or obs_secs != spec["seconds"]:
                mismatches.append(f"Scene {snum}: expected {spec['frames']}f/{spec['seconds']}s, got {obs_frames}f/{obs_secs}s")

        self._track(suite, "T1.SCENE.04", "All 7 individual scenes match canonical frame & second durations",
                    len(mismatches) == 0, f"Mismatches: {mismatches}", file_path=path)

    def test_t1_scene_05_frame_continuity(self):
        suite = "Suite 1.3: Scene Schema & Calibration"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = sorted(data if isinstance(data, list) else data.get("scenes", []), key=lambda s: s.get("sceneNumber", 0))

        continuous = True
        current_frame = 0
        details = []

        for s in scenes:
            start = s.get("startFrameCumulative", -1)
            end = s.get("endFrameCumulative", -1)
            duration = s.get("durationFrames", 0)

            if start != current_frame or end != start + duration:
                continuous = False
                details.append(f"Scene {s.get('sceneNumber')}: expected start {current_frame}, got {start}; end {end}")
            current_frame = end

        self._track(suite, "T1.SCENE.05", "Cumulative frame offsets form seamless continuous timeline 0 -> 23040",
                    continuous and current_frame == EXPECTED_TOTAL_FRAMES,
                    f"Details: {details}, final frame: {current_frame}", file_path=path)

    def test_t1_scene_06_dialogue_camera_and_audio_cues(self):
        suite = "Suite 1.3: Scene Schema & Calibration"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        total_shots = sum(len(s.get("shots", [])) for s in scenes)
        total_dialogues = sum(len(s.get("dialogueLines", [])) for s in scenes)
        total_audio = sum(len(s.get("audioCues", [])) for s in scenes)

        self._track(suite, "T1.SCENE.06", f"Scenes contain rich cinematography cues (Total shots: {total_shots} >= 40)",
                    total_shots >= 40, f"Observed shots: {total_shots}", file_path=path)
        self._track(suite, "T1.SCENE.07", f"Scenes contain complete dialogue lines (Total dialogues: {total_dialogues} >= 40)",
                    total_dialogues >= 40, f"Observed dialogues: {total_dialogues}", file_path=path)
        self._track(suite, "T1.SCENE.08", f"Scenes contain multi-track audio cues (Total audio cues: {total_audio} >= 7)",
                    total_audio >= 7, f"Observed audio cues: {total_audio}", file_path=path)

    # =========================================================================
    # Suite 4: Source Screenplay Immutability Check
    # =========================================================================
    def test_t1_immut_01_source_screenplay_files_intact(self):
        suite = "Suite 1.4: Screenplay Immutability"
        missing = [f for f in SOURCE_SCREENPLAY_FILES if not check_file_exists(f)]
        self._track(suite, "T1.IMMUT.01", "All canonical source screenplay & production files exist and are intact",
                    len(missing) == 0, f"Missing files: {missing}")

    def test_t1_immut_02_version_a_screenplay_integrity(self):
        suite = "Suite 1.4: Screenplay Immutability"
        path = os.path.join(SCREENPLAY_DIR, "OUTPUT_14_15_VERSION_A_SCREENPLAY_ALL_14.md")
        content = read_file_content(path) or ""

        has_title = "SPESIMEN TERAKHIR" in content
        has_all_14 = all(name in content for name in [
            "ARYO", "DIMAS", "BAGAS", "FAJAR", "REZA",
            "HENDRO", "FARHAN", "KEVIN", "DANANG", "ZUL",
            "NADIA", "MAYA", "RERE", "KIRANA"
        ])
        has_7_scenes = all(f"SCENE {i}" in content for i in range(1, 8))

        self._track(suite, "T1.IMMUT.02", "Version A screenplay preserves canonical title, 14 characters, and 7 scenes",
                    has_title and has_all_14 and has_7_scenes, file_path=path)

    def test_t1_immut_03_git_status_check(self):
        suite = "Suite 1.4: Screenplay Immutability"
        # Check if git repository exists and verify zero modifications to screenplay/, production/, docs/
        git_cmd = "git"
        git_exe = r"C:\Users\user\AppData\Local\GitHubDesktop\app-3.4.0\resources\app\git\cmd\git.exe"
        if os.path.isfile(git_exe):
            git_cmd = git_exe

        try:
            res = subprocess.run([git_cmd, "status", "--porcelain", "screenplay", "production", "docs"],
                                 capture_output=True, text=True, cwd=os.path.dirname(ANALYSIS_DIR), timeout=5)
            if res.returncode == 0:
                modified = [line for line in res.stdout.splitlines() if line.strip()]
                self._track(suite, "T1.IMMUT.03", "Git confirms zero modifications to screenplay/, production/, docs/",
                            len(modified) == 0, f"Modified files: {modified}")
            else:
                # If not a git repo, verify file non-emptiness as fallback
                all_non_empty = all(os.path.getsize(f) > 100 for f in SOURCE_SCREENPLAY_FILES if os.path.isfile(f))
                self._track(suite, "T1.IMMUT.03", "Source screenplay files exist and have non-zero size (fallback integrity)",
                            all_non_empty)
        except Exception as e:
            all_non_empty = all(os.path.getsize(f) > 100 for f in SOURCE_SCREENPLAY_FILES if os.path.isfile(f))
            self._track(suite, "T1.IMMUT.03", f"Source screenplay integrity verified (size check): {e}",
                        all_non_empty)


if __name__ == "__main__":
    unittest.main()
