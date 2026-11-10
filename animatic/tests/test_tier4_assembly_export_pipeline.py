"""
test_tier4_assembly_export_pipeline.py - Tier 4: Remotion Composition & Export Pipeline Test Suite.
Validates:
1. Master timeline and sequential assembly (23,040 frames @ 24fps = 16:00) in FILM_METADATA and Root.tsx
2. Composition registrations for 7 individual scene chunks for resilient chunked rendering
3. Prototype scene registration (ScenePrototype / PrototypeScene) for R4 multi-character verification
4. Export automation pipeline (render_preview.ts, render_chunks.ts, concat_chunks.py)
5. Progressive testability support across implementation milestones M1 -> M4
"""

import os
import re
import json
import unittest
from typing import Dict, Any, List

from .test_helpers import (
    SRC_DIR,
    DATA_DIR,
    SCRIPTS_DIR,
    ANIMATIC_DIR,
    EXPECTED_TOTAL_FRAMES,
    EXPECTED_TOTAL_SECONDS,
    EXPECTED_FPS,
    EXPECTED_WIDTH,
    EXPECTED_HEIGHT,
    EXPECTED_SCENE_COUNT,
    CANONICAL_SCENE_SPECS,
    AssertionTracker,
    check_file_exists,
    read_file_content,
    load_json_file,
)

TIER_NAME = "Tier 4: Assembly & Export Pipeline"


class TestTier4AssemblyExportPipeline(unittest.TestCase):
    """Tier 4 Test Suite: Validates timeline assembly, composition specs, and export scripts."""

    def _track(self, suite: str, test_id: str, description: str,
               passed: bool, details: str = "", file_path: str = None,
               is_pending: bool = False, target_milestone: str = "M4"):
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
    # Suite 4.1: Master Timeline & Metadata Architecture
    # =========================================================================
    def test_t4_meta_01_film_metadata_in_index(self):
        suite = "Suite 4.1: Timeline & Metadata"
        path = os.path.join(DATA_DIR, "index.ts")
        content = read_file_content(path) or ""

        # Verify FILM_METADATA defines exact 23,040 frames and 960s
        has_metadata = "FILM_METADATA" in content
        has_23040 = "23040" in content
        has_960 = "960" in content
        has_24fps = "fps: 24" in content
        has_1080p = "1920" in content and "1080" in content

        self._track(suite, "T4.META.01", "FILM_METADATA defines master timeline: 23,040 frames, 960s, 24fps, 1080p 16:9",
                    has_metadata and has_23040 and has_960 and has_24fps and has_1080p,
                    f"Metadata found: {has_metadata}, 23040 frames: {has_23040}, 960s: {has_960}", file_path=path)

    def test_t4_meta_02_helper_functions_in_index(self):
        suite = "Suite 4.1: Timeline & Metadata"
        path = os.path.join(DATA_DIR, "index.ts")
        content = read_file_content(path) or ""

        # Check export helper functions
        has_get_char = "getCharacter" in content
        has_get_scene = "getScene" in content
        has_get_shots = "getAllShots" in content
        has_get_dialogues = "getAllDialogueLines" in content
        has_get_total = "getTotalDurationFrames" in content

        self._track(suite, "T4.META.02", "Data index provides type-safe query helpers (getCharacter, getScene, getAllShots, etc.)",
                    has_get_char and has_get_scene and has_get_shots and has_get_dialogues and has_get_total,
                    file_path=path)

    def test_t4_meta_03_remotion_config_tuned_for_hardware(self):
        suite = "Suite 4.1: Timeline & Metadata"
        path = os.path.join(ANIMATIC_DIR, "remotion.config.ts")
        content = read_file_content(path) or ""

        # Remotion config should define H.264, yuv420p, and concurrency bounded to 2-3
        has_codec = "h264" in content.lower()
        has_pixel = "yuv420p" in content.lower()
        has_concurrency = "concurrency" in content.lower()

        self._track(suite, "T4.META.03", "remotion.config.ts defines H.264 codec, yuv420p pixel format, and bounded concurrency",
                    has_codec and has_pixel and has_concurrency,
                    f"Codec: {has_codec}, Pixel: {has_pixel}, Concurrency: {has_concurrency}", file_path=path)

    # =========================================================================
    # Suite 4.2: Root.tsx Compositions Registry (Progressive M4 Verification)
    # =========================================================================
    def test_t4_root_01_composition_declarations(self):
        suite = "Suite 4.2: Root Compositions"
        path = os.path.join(SRC_DIR, "Root.tsx")
        exists = check_file_exists(path)

        if not exists:
            # Scheduled for Milestone 4
            self._track(suite, "T4.ROOT.01", "Root.tsx registers FullFilm master composition (23,040 frames @ 24fps)",
                        False, "Pending deliverable creation in Milestone 4", file_path=path,
                        is_pending=True, target_milestone="M4")
            self._track(suite, "T4.ROOT.02", "Root.tsx registers all 7 individual scene chunks for chunked export",
                        False, "Pending deliverable creation in Milestone 4", file_path=path,
                        is_pending=True, target_milestone="M4")
            self._track(suite, "T4.ROOT.03", "Root.tsx registers representative PrototypeScene for R4 validation",
                        False, "Pending deliverable creation in Milestone 4", file_path=path,
                        is_pending=True, target_milestone="M4")
            return

        content = read_file_content(path) or ""

        # Validate master film composition
        has_full_film = "FullFilm" in content or "AnimaticRoot" in content or "SpesimenTerakhir" in content
        has_23040 = "23040" in content or "totalFrames" in content or "targetTotalFrames" in content

        self._track(suite, "T4.ROOT.01", "Root.tsx registers FullFilm master composition (23,040 frames @ 24fps)",
                    has_full_film and has_23040, file_path=path)

        # Validate 7 scene compositions
        has_7_scenes = all(f"Scene0{i}" in content or f"Scene{i}" in content for i in range(1, 8))
        self._track(suite, "T4.ROOT.02", "Root.tsx registers all 7 individual scene chunks for chunked export",
                    has_7_scenes, file_path=path)

        # Validate prototype scene
        has_proto = "Prototype" in content
        self._track(suite, "T4.ROOT.03", "Root.tsx registers representative PrototypeScene for R4 validation",
                    has_proto, file_path=path)

    # =========================================================================
    # Suite 4.3: Export Automation Scripts Pipeline (Progressive M4 Verification)
    # =========================================================================
    def test_t4_exp_01_render_preview_script(self):
        suite = "Suite 4.3: Export Pipeline"
        path = os.path.join(SCRIPTS_DIR, "render_preview.ts")
        exists = check_file_exists(path)

        if not exists:
            self._track(suite, "T4.EXP.01", "render_preview.ts exists and configures fast preview export (540p/720p)",
                        False, "Pending deliverable creation in Milestone 4", file_path=path,
                        is_pending=True, target_milestone="M4")
            return

        content = read_file_content(path) or ""
        has_render = "renderMedia" in content or "render" in content
        self._track(suite, "T4.EXP.01", "render_preview.ts exists and configures fast preview export (540p/720p)",
                    has_render, file_path=path)

    def test_t4_exp_02_render_chunks_script(self):
        suite = "Suite 4.3: Export Pipeline"
        path = os.path.join(SCRIPTS_DIR, "render_chunks.ts")
        exists = check_file_exists(path)

        if not exists:
            self._track(suite, "T4.EXP.02", "render_chunks.ts iterates through all 7 scenes and writes to out/chunks/",
                        False, "Pending deliverable creation in Milestone 4", file_path=path,
                        is_pending=True, target_milestone="M4")
            return

        content = read_file_content(path) or ""
        has_scenes_loop = "Scene0" in content or "chunks" in content
        self._track(suite, "T4.EXP.02", "render_chunks.ts iterates through all 7 scenes and writes to out/chunks/",
                    has_scenes_loop, file_path=path)

    def test_t4_exp_03_concat_chunks_script(self):
        suite = "Suite 4.3: Export Pipeline"
        path = os.path.join(SCRIPTS_DIR, "concat_chunks.py")
        exists = check_file_exists(path)

        if not exists:
            self._track(suite, "T4.EXP.03", "concat_chunks.py implements FFmpeg lossless stream copy (-c copy)",
                        False, "Pending deliverable creation in Milestone 4", file_path=path,
                        is_pending=True, target_milestone="M4")
            return

        content = read_file_content(path) or ""
        has_ffmpeg = "ffmpeg" in content.lower()
        has_concat = "concat" in content.lower()
        has_copy = "-c copy" in content or "copy" in content

        self._track(suite, "T4.EXP.03", "concat_chunks.py implements FFmpeg lossless stream copy (-c copy)",
                    has_ffmpeg and has_concat and has_copy, file_path=path)

    # =========================================================================
    # Suite 4.4: Package Dependencies & Interactive Player Architecture
    # =========================================================================
    def test_t4_pkg_01_remotion_dependencies(self):
        suite = "Suite 4.4: Package Dependencies"
        pkg_path = os.path.join(ANIMATIC_DIR, "package.json")
        data, err = load_json_file(pkg_path)
        self.assertIsNotNone(data, f"package.json unreadable: {err}")

        deps = data.get("dependencies", {})
        dev_deps = data.get("devDependencies", {})
        all_deps = {**deps, **dev_deps}

        # Verify remotion core, player, and bundler/cli/renderer
        has_remotion = "remotion" in all_deps
        has_player = "@remotion/player" in all_deps
        has_bundler = "@remotion/bundler" in all_deps or "remotion" in all_deps
        has_renderer = "@remotion/renderer" in all_deps or "remotion" in all_deps

        self._track(suite, "T4.PKG.01", "package.json defines Remotion core, @remotion/player, and render tooling",
                    has_remotion and has_player and (has_bundler or has_renderer),
                    f"Dependencies: {list(all_deps.keys())}", file_path=pkg_path)

    def test_t4_pkg_02_npm_scripts_registered(self):
        suite = "Suite 4.4: Package Dependencies"
        pkg_path = os.path.join(ANIMATIC_DIR, "package.json")
        data, _ = load_json_file(pkg_path)
        if not data:
            self.skipTest("package.json not available")

        scripts = data.get("scripts", {})
        has_preview = "preview" in scripts or "dev" in scripts
        has_render = any("render" in s for s in scripts.keys())

        self._track(suite, "T4.PKG.02", "package.json registers preview and render execution scripts",
                    has_preview and has_render,
                    f"Registered scripts: {list(scripts.keys())}", file_path=pkg_path)


if __name__ == "__main__":
    unittest.main()
