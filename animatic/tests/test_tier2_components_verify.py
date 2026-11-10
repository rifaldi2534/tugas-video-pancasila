"""
test_tier2_components_verify.py - Deep Verification of Procedural Character Rigging and Environments
Milestone 2 (R2) Verification Suite
"""

import os
import re
import unittest
import json

ANIMATIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC_DIR = os.path.join(ANIMATIC_DIR, "src")
COMPONENTS_DIR = os.path.join(SRC_DIR, "components")
CHARACTERS_DIR = os.path.join(COMPONENTS_DIR, "characters")
ENVIRONMENTS_DIR = os.path.join(COMPONENTS_DIR, "environments")
DATA_DIR = os.path.join(SRC_DIR, "data")

ALL_14_CHARACTERS = [
    "aryo", "dimas", "bagas", "fajar", "reza",
    "hendro", "farhan", "kevin", "danang", "zul",
    "nadia", "maya", "rere", "kirana"
]

ALL_10_EXPRESSIONS = [
    "Normal", "Happy", "Sad", "Angry", "Confused",
    "Nervous", "Suspicious", "Shocked", "Disappointed", "Serious"
]

ALL_8_POSES = [
    "idle", "walking", "sitting", "standing",
    "head_movement", "looking_left", "looking_right", "talking"
]

ALL_6_VISEMES = [
    "rest", "slight_open", "wide_open", "rounded", "u", "mbp"
]

ALL_4_ENVIRONMENTS = [
    "MaterialsLab", "SeminarRoom", "HallwayGedungW", "ExteriorStairs"
]

class TestTier2Components(unittest.TestCase):

    def test_01_character_files_exist(self):
        expected_files = [
            "CharacterRig.tsx",
            "Head.tsx",
            "Hair.tsx",
            "FaceExpressions.tsx",
            "MouthVisemes.tsx",
            "Torso.tsx",
            "Limbs.tsx",
            "CharacterProfiles.ts",
            "index.ts"
        ]
        for f in expected_files:
            p = os.path.join(CHARACTERS_DIR, f)
            self.assertTrue(os.path.isfile(p), f"Missing character component: {f}")
            self.assertGreater(os.path.getsize(p), 100, f"File {f} is suspiciously small")

    def test_02_environment_files_exist(self):
        expected_files = [
            "MaterialsLab.tsx",
            "SeminarRoom.tsx",
            "HallwayGedungW.tsx",
            "ExteriorStairs.tsx",
            "index.ts"
        ]
        for f in expected_files:
            p = os.path.join(ENVIRONMENTS_DIR, f)
            self.assertTrue(os.path.isfile(p), f"Missing environment component: {f}")
            self.assertGreater(os.path.getsize(p), 100, f"File {f} is suspiciously small")

    def test_03_zero_external_assets(self):
        bitmap_exts = re.compile(r'\.(png|jpg|jpeg|webp|gif|bmp|ico|svg)', re.IGNORECASE)
        img_tag = re.compile(r'<img\s+', re.IGNORECASE)
        url_css = re.compile(r"url\s*\(['\"][^'\"]+['\"]\)", re.IGNORECASE)

        for root, _, files in os.walk(COMPONENTS_DIR):
            for file in files:
                filepath = os.path.join(root, file)
                self.assertFalse(file.endswith(('.png', '.jpg', '.jpeg', '.webp')), f"Bitmap file found: {file}")
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                self.assertFalse(img_tag.search(content), f"HTML <img /> tag found in {file}")
                self.assertFalse(url_css.search(content), f"CSS url() import found in {file}")

    def test_04_all_10_expressions_in_face_expressions(self):
        path = os.path.join(CHARACTERS_DIR, "FaceExpressions.tsx")
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read().lower()
        for expr in ALL_10_EXPRESSIONS:
            self.assertIn(expr.lower(), content, f"Expression {expr} not explicitly handled in FaceExpressions.tsx")

    def test_05_all_6_visemes_in_mouth_visemes(self):
        path = os.path.join(CHARACTERS_DIR, "MouthVisemes.tsx")
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read().lower()
        for v in ALL_6_VISEMES:
            self.assertIn(v.lower(), content, f"Viseme {v} not explicitly handled in MouthVisemes.tsx")

    def test_06_all_8_poses_in_limbs(self):
        path = os.path.join(CHARACTERS_DIR, "Limbs.tsx")
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read().lower()
        for pose in ALL_8_POSES:
            self.assertIn(pose.lower(), content, f"Pose {pose} not explicitly handled in Limbs.tsx")

    def test_07_all_14_characters_in_profiles(self):
        path = os.path.join(CHARACTERS_DIR, "CharacterProfiles.ts")
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read().lower()
        for char_id in ALL_14_CHARACTERS:
            self.assertIn(char_id.lower(), content, f"Character {char_id} not in CharacterProfiles.ts")

    def test_08_environments_viewbox_and_lighting(self):
        for env in ALL_4_ENVIRONMENTS:
            path = os.path.join(ENVIRONMENTS_DIR, f"{env}.tsx")
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            self.assertIn('viewBox="0 0 1920 1080"', content, f"Environment {env} must have 1920x1080 viewBox")
            self.assertIn('lightingMode', content, f"Environment {env} must support dynamic lightingMode")

if __name__ == '__main__':
    unittest.main()
