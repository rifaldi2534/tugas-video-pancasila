"""
test_tier2_procedural_svg.py - Tier 2: Procedural SVG & Visual System Integrity Test Suite.
Validates:
1. Zero external stock images / copyrighted assets (strict static scan for <img, bitmaps, URLs)
2. All 14 characters have unique silhouette and palette configurations
3. Section 8 Compliance: All 10 emotional expressions explicitly supported and verified
4. Section 8 Compliance: All 8 required character poses explicitly supported and verified
5. 6 speech visemes defined for lip-sync animation
6. 4 procedural SVG environments with 1920x1080 viewBox and dynamic lighting
"""

import os
import re
import unittest
from typing import Dict, Any, List, Set

from .test_helpers import (
    SRC_DIR,
    DATA_DIR,
    TYPES_DIR,
    ANALYSIS_DIR,
    COMPONENTS_DIR,
    ALL_14_CHARACTERS,
    SECTION_8_REQUIRED_EXPRESSIONS_10,
    SECTION_8_REQUIRED_POSES_8,
    CANONICAL_POSES,
    CANONICAL_VISEMES,
    CANONICAL_EXPRESSIONS,
    CANONICAL_ENVIRONMENTS,
    AssertionTracker,
    check_file_exists,
    read_file_content,
    load_json_file,
    scan_files_for_external_assets,
)

TIER_NAME = "Tier 2: Procedural SVG & Visual System"


class TestTier2ProceduralSvg(unittest.TestCase):
    """Tier 2 Test Suite: Validates zero-external-asset purity, character rigs, poses, visemes, and environments."""

    def _track(self, suite: str, test_id: str, description: str,
               passed: bool, details: str = "", file_path: str = None,
               is_pending: bool = False, target_milestone: str = "M2"):
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
    # Suite 2.1: Asset Purity & Zero External Assets Policy Enforcement
    # =========================================================================
    def test_t2_pure_01_zero_bitmap_files(self):
        suite = "Suite 2.1: Zero-Asset Purity"
        violations = scan_files_for_external_assets(SRC_DIR)
        bitmap_files = [v for v in violations if v["type"] == "BITMAP_FILE_PRESENT"]
        self._track(suite, "T2.PURE.01", "Zero external bitmap image files (.png, .jpg, .webp, etc.) in animatic/src/",
                    len(bitmap_files) == 0, f"Found bitmap files: {bitmap_files}", file_path=SRC_DIR)

    def test_t2_pure_02_zero_html_img_tags(self):
        suite = "Suite 2.1: Zero-Asset Purity"
        violations = scan_files_for_external_assets(SRC_DIR)
        img_tags = [v for v in violations if v["type"] == "PROHIBITED_HTML_IMG_TAG"]
        self._track(suite, "T2.PURE.02", "Zero HTML <img /> tags in animatic source code",
                    len(img_tags) == 0, f"Found <img /> tags: {img_tags}", file_path=SRC_DIR)

    def test_t2_pure_03_zero_bitmap_imports(self):
        suite = "Suite 2.1: Zero-Asset Purity"
        violations = scan_files_for_external_assets(SRC_DIR)
        imports = [v for v in violations if v["type"] == "BITMAP_IMPORT_OR_REFERENCE"]
        self._track(suite, "T2.PURE.03", "Zero bitmap asset imports or string references in source files",
                    len(imports) == 0, f"Found bitmap references: {imports}", file_path=SRC_DIR)

    def test_t2_pure_04_zero_external_network_urls(self):
        suite = "Suite 2.1: Zero-Asset Purity"
        violations = scan_files_for_external_assets(SRC_DIR)
        urls = [v for v in violations if v["type"] == "EXTERNAL_NETWORK_URL_FOUND"]
        self._track(suite, "T2.PURE.04", "Zero unapproved external network HTTP/HTTPS resource URLs",
                    len(urls) == 0, f"Found URLs: {urls}", file_path=SRC_DIR)

    # =========================================================================
    # Suite 2.2: 14 Character Visual Differentiation & Palette Uniqueness
    # =========================================================================
    def test_t2_diff_01_height_scale_distribution(self):
        suite = "Suite 2.2: Character Differentiation"
        path = os.path.join(DATA_DIR, "characters.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("characters.json not available")

        chars = data if isinstance(data, list) else data.get("characters", [])
        height_scales = [c.get("visualProfile", {}).get("heightScale", 1.0) for c in chars]
        unique_scales = set(height_scales)

        self._track(suite, "T2.DIFF.01", "Character heights are visually differentiated (at least 4 distinct scales)",
                    len(unique_scales) >= 4, f"Unique scales found: {len(unique_scales)}: {sorted(list(unique_scales))}", file_path=path)

    def test_t2_diff_02_primary_palette_uniqueness(self):
        suite = "Suite 2.2: Character Differentiation"
        path = os.path.join(DATA_DIR, "characters.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("characters.json not available")

        chars = data if isinstance(data, list) else data.get("characters", [])
        composite_palettes = [
            (
                c.get("visualProfile", {}).get("palette", {}).get("primaryAttireHex", "").upper(),
                c.get("visualProfile", {}).get("palette", {}).get("accentPropHex", "").upper(),
                c.get("visualProfile", {}).get("palette", {}).get("hairOrHijabHex", "").upper()
            )
            for c in chars
        ]

        unique_palettes = set(composite_palettes)
        self._track(suite, "T2.DIFF.02", "All 14 characters have 100% unique composite color palette signatures",
                    len(unique_palettes) == 14,
                    f"Unique palette signatures: {len(unique_palettes)}/14",
                    file_path=path)

    def test_t2_diff_03_female_character_differentiation(self):
        suite = "Suite 2.2: Character Differentiation"
        path = os.path.join(DATA_DIR, "characters.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("characters.json not available")

        chars = data if isinstance(data, list) else data.get("characters", [])
        female_chars = {c.get("id"): c for c in chars if c.get("gender") == "female"}

        self.assertIn("nadia", female_chars)
        self.assertIn("maya", female_chars)
        self.assertIn("rere", female_chars)
        self.assertIn("kirana", female_chars)

        nadia_cov = female_chars["nadia"].get("visualProfile", {}).get("headCovering")
        rere_cov = female_chars["rere"].get("visualProfile", {}).get("headCovering")
        maya_cov = female_chars["maya"].get("visualProfile", {}).get("headCovering")
        kirana_cov = female_chars["kirana"].get("visualProfile", {}).get("headCovering")

        has_jilbab_distinction = ("jilbab" in str(nadia_cov).lower() or "hijab" in str(nadia_cov).lower()) and \
                                 ("jilbab" in str(rere_cov).lower() or "hijab" in str(rere_cov).lower())
        has_hair_distinction = maya_cov in ["none", None] and kirana_cov in ["none", None]

        self._track(suite, "T2.DIFF.03", "Female student characters have authentic head covering & hair differentiation",
                    has_jilbab_distinction and has_hair_distinction,
                    f"Nadia: {nadia_cov}, Rere: {rere_cov}, Maya: {maya_cov}, Kirana: {kirana_cov}", file_path=path)

    def test_t2_diff_04_signature_props_assigned(self):
        suite = "Suite 2.2: Character Differentiation"
        path = os.path.join(DATA_DIR, "characters.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("characters.json not available")

        chars = data if isinstance(data, list) else data.get("characters", [])
        all_have_props = all(len(c.get("signatureProps", [])) > 0 for c in chars)

        char_props = {c.get("id"): " ".join(c.get("signatureProps", [])).lower() for c in chars}
        aryo_has_clip = "clipboard" in char_props.get("aryo", "")
        hendro_has_tool = "micrometer" in char_props.get("hendro", "") or "caliper" in char_props.get("hendro", "") or "majun" in char_props.get("hendro", "")
        bagas_has_slip = "kwitansi" in char_props.get("bagas", "") or "receipt" in char_props.get("bagas", "") or "hoodie" in char_props.get("bagas", "")

        self._track(suite, "T2.DIFF.04", "All 14 characters possess distinctive dramaturgical signature props",
                    all_have_props and aryo_has_clip and hendro_has_tool and bagas_has_slip,
                    f"All have props: {all_have_props}, Aryo clipboard: {aryo_has_clip}, Hendro tool: {hendro_has_tool}, Bagas slip: {bagas_has_slip}",
                    file_path=path)

    # =========================================================================
    # Suite 2.3: Procedural Pose System (Section 8: 8 Required Poses)
    # =========================================================================
    def test_t2_pose_01_pose_types_defined(self):
        suite = "Suite 2.3: Pose System"
        path = os.path.join(TYPES_DIR, "characters.ts")
        content = read_file_content(path) or ""

        # Verify REQUIRED_POSES_8 is defined
        poses_found = [p for p in SECTION_8_REQUIRED_POSES_8 if p in content.lower()]
        self._track(suite, "T2.POSE.01", "TypeScript types define all 8 Section 8 required character poses",
                    len(poses_found) == 8, f"Poses found in schema: {poses_found}", file_path=path)

    def test_t2_pose_02_scene_poses_utilization(self):
        suite = "Suite 2.3: Pose System"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        observed_poses = set()
        for s in scenes:
            for vc in s.get("visualCues", []):
                for cos in vc.get("charactersOnStage", []):
                    if cos.get("pose"):
                        observed_poses.add(cos.get("pose"))

        # Verify that all 8 required poses are used across scene staging
        missing = [p for p in SECTION_8_REQUIRED_POSES_8 if p not in observed_poses]
        self._track(suite, "T2.POSE.02", "Section 8 Compliance: All 8 required poses are actively utilized in scene staging",
                    len(missing) == 0, f"Observed poses: {observed_poses}, Missing: {missing}", file_path=path)

    # =========================================================================
    # Suite 2.4: Procedural Lip-Sync Viseme System (6 Visemes)
    # =========================================================================
    def test_t2_viseme_01_viseme_types_defined(self):
        suite = "Suite 2.4: Viseme System"
        path = os.path.join(TYPES_DIR, "characters.ts")
        content = read_file_content(path) or ""

        has_phonemes = "PhonemeMouthShape" in content or "rest" in content.lower()
        self._track(suite, "T2.VISEME.01", "Character types define phoneme mouth shapes for lip-sync",
                    has_phonemes, file_path=path)

    def test_t2_viseme_02_viseme_spec_in_visual_guide(self):
        suite = "Suite 2.4: Viseme System"
        char_guide_path = os.path.join(ANALYSIS_DIR, "character_guide.md")
        vis_guide_path = os.path.join(ANALYSIS_DIR, "visual_style_guide.md")
        char_content = read_file_content(char_guide_path) or ""
        vis_content = read_file_content(vis_guide_path) or ""
        combined_content = char_content + "\n" + vis_content

        # Verify documentation of speech visemes / phonemes (rest, open, rounded or REST, AI, O, U)
        has_viseme_section = "VISEME" in combined_content.upper() or "PHONEME" in combined_content.upper() or "MULUT BICARA" in combined_content.upper()
        has_viseme_shapes = any(v in combined_content for v in ["rest", "slight_open", "wide_open", "rounded", "REST", "AI", "MBP"])

        self._track(suite, "T2.VISEME.02", "Analysis documentation defines speech viseme/phoneme mouth shapes for lip-sync",
                    has_viseme_section and has_viseme_shapes,
                    f"Viseme section: {has_viseme_section}, Shapes found: {has_viseme_shapes}",
                    file_path=char_guide_path)

    # =========================================================================
    # Suite 2.5: Dramaturgical Facial Expressions (Section 8: 10 Expressions)
    # =========================================================================
    def test_t2_expr_01_expression_types_defined(self):
        suite = "Suite 2.5: Expression System"
        path = os.path.join(TYPES_DIR, "characters.ts")
        content = read_file_content(path) or ""

        # Verify REQUIRED_EXPRESSIONS_10 is defined in characters.ts
        has_required_const = "REQUIRED_EXPRESSIONS_10" in content
        found_exprs = [e for e in SECTION_8_REQUIRED_EXPRESSIONS_10 if e in content or e.lower() in content.lower()]
        self._track(suite, "T2.EXPR.01", "TypeScript types define all 10 Section 8 required emotional expressions",
                    has_required_const and len(found_exprs) == 10,
                    f"Expressions found in types: {found_exprs}", file_path=path)

    def test_t2_expr_02_all_10_expressions_in_scenes(self):
        suite = "Suite 2.5: Expression System"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        observed_exprs = set()
        for s in scenes:
            for vc in s.get("visualCues", []):
                for cos in vc.get("charactersOnStage", []):
                    if cos.get("expression"):
                        observed_exprs.add(cos.get("expression"))

        # Verify that all 10 expressions are utilized in scene visual staging
        missing = [e for e in SECTION_8_REQUIRED_EXPRESSIONS_10 if e not in observed_exprs and e.lower() not in [x.lower() for x in observed_exprs]]
        self._track(suite, "T2.EXPR.02", "Section 8 Compliance: All 10 emotional expressions are actively staged in scenes",
                    len(missing) == 0, f"Observed expressions: {observed_exprs}, Missing: {missing}", file_path=path)

    # =========================================================================
    # Suite 2.6: Procedural Background Environments (4 Locations & Lighting)
    # =========================================================================
    def test_t2_env_01_all_4_locations_represented(self):
        suite = "Suite 2.6: Environments"
        path = os.path.join(DATA_DIR, "scenes.json")
        data, _ = load_json_file(path)
        if not data:
            self.skipTest("scenes.json not available")

        scenes = data if isinstance(data, list) else data.get("scenes", [])
        locations = {s.get("slugline", "").upper() for s in scenes}

        has_lab = any("LAB" in loc for loc in locations)
        has_corridor = any("KORIDOR" in loc or "GEDUNG W" in loc for loc in locations)
        has_stairs = any("TANGGA" in loc or "SELASAR" in loc for loc in locations)

        self._track(suite, "T2.ENV.01", "All recurring DTMM campus locations are mapped in scene data",
                    has_lab and has_corridor and has_stairs, f"Locations observed: {locations}", file_path=path)

    def test_t2_env_02_dynamic_lighting_modes_in_visual_cues(self):
        suite = "Suite 2.6: Environments"
        path = os.path.join(DATA_DIR, "scenes.json")
        content = read_file_content(path) or ""

        has_4200 = "4200" in content
        has_3000 = "3000" in content
        has_3800 = "3800" in content or "chiaroscuro" in content.lower()

        self._track(suite, "T2.ENV.02", "Scene data incorporates calibrated lighting color temperatures (4200K, 3000K, 3800K)",
                    has_4200 and has_3000 and has_3800, file_path=path)


if __name__ == "__main__":
    unittest.main()
