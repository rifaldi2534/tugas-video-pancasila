"""
test_helpers.py - Shared verification infrastructure, constants, and AssertionTracker.
Automated Verification Suite for SPESIMEN TERAKHIR (Procedural 2D Animatic).
Affiliation: DTMM FTIRS ITS Surabaya
"""

import os
import json
import re
import math
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple, Any, Set

# ---------------------------------------------------------------------------
# Path Anchors
# ---------------------------------------------------------------------------
TESTS_DIR = os.path.dirname(os.path.abspath(__file__))
ANIMATIC_DIR = os.path.abspath(os.path.join(TESTS_DIR, ".."))
WORKSPACE_ROOT = os.path.abspath(os.path.join(ANIMATIC_DIR, ".."))

ANALYSIS_DIR = os.path.join(WORKSPACE_ROOT, "analysis")
SCREENPLAY_DIR = os.path.join(WORKSPACE_ROOT, "screenplay")
PRODUCTION_DIR = os.path.join(WORKSPACE_ROOT, "production")
DOCS_DIR = os.path.join(WORKSPACE_ROOT, "docs")
CONCEPTS_DIR = os.path.join(DOCS_DIR, "concept_development")

SRC_DIR = os.path.join(ANIMATIC_DIR, "src")
DATA_DIR = os.path.join(SRC_DIR, "data")
TYPES_DIR = os.path.join(SRC_DIR, "types")
COMPONENTS_DIR = os.path.join(SRC_DIR, "components")
SCENES_DIR = os.path.join(SRC_DIR, "scenes")
SCRIPTS_DIR = os.path.join(ANIMATIC_DIR, "scripts")

# ---------------------------------------------------------------------------
# Canonical Project Constants & Specifications
# ---------------------------------------------------------------------------
EXPECTED_TOTAL_FRAMES = 23040        # 960 seconds * 24 FPS (16 minutes 00 seconds)
EXPECTED_TOTAL_SECONDS = 960         # 16 minutes 00 seconds
EXPECTED_FPS = 24                    # Constant 24 FPS
EXPECTED_WIDTH = 1920                # 1080p Full HD
EXPECTED_HEIGHT = 1080
EXPECTED_ASPECT_RATIO = "16:9"
EXPECTED_SCENE_COUNT = 7

# Canonical 7 Scene Breakdown (Durations & Frame counts @ 24fps)
CANONICAL_SCENE_SPECS = {
    1: {"name": "Scene 1", "seconds": 180, "frames": 4320, "slugline_substr": "LAB PENGUJIAN MEKANIK", "narrative": "Masalah"},
    2: {"name": "Scene 2", "seconds": 150, "frames": 3600, "slugline_substr": "LAB PENGUJIAN MEKANIK", "narrative": "Konflik"},
    3: {"name": "Scene 3", "seconds": 180, "frames": 4320, "slugline_substr": "LAB PENGUJIAN MEKANIK", "narrative": "Pilihan Moral"},
    4: {"name": "Scene 4", "seconds": 180, "frames": 4320, "slugline_substr": "LAB PENGUJIAN MEKANIK", "narrative": "Konsekuensi"},
    5: {"name": "Scene 5", "seconds": 120, "frames": 2880, "slugline_substr": "LAB PENGUJIAN MEKANIK", "narrative": "Klimaks"},
    6: {"name": "Scene 6", "seconds": 75,  "frames": 1800, "slugline_substr": "KORIDOR GEDUNG W",       "narrative": "Refleksi A"},
    7: {"name": "Scene 7", "seconds": 75,  "frames": 1800, "slugline_substr": "TANGGA SELASAR GEDUNG W", "narrative": "Refleksi B"},
}

# The 14 ITS DTMM Characters (10 Male, 4 Female)
CANONICAL_STUDENT_CHARACTERS = {
    "male": [
        "aryo", "dimas", "bagas", "fajar", "reza",
        "hendro", "farhan", "kevin", "danang", "zul"
    ],
    "female": [
        "nadia", "maya", "rere", "kirana"
    ]
}
ALL_14_CHARACTERS = CANONICAL_STUDENT_CHARACTERS["male"] + CANONICAL_STUDENT_CHARACTERS["female"]

# 5 Analysis Documentation Files
CANONICAL_5_ANALYSIS_FILES = [
    "file_inventory.md",
    "script_analysis.md",
    "character_guide.md",
    "scene_breakdown.md",
    "visual_style_guide.md"
]

# Source Screenplay Files for Immutability Check
SOURCE_SCREENPLAY_FILES = [
    os.path.join(SCREENPLAY_DIR, "OUTPUT_14_15_VERSION_A_SCREENPLAY_ALL_14.md"),
    os.path.join(SCREENPLAY_DIR, "OUTPUT_14_15_VERSION_B_SCREENPLAY_CAST_CREW.md"),
    os.path.join(SCREENPLAY_DIR, "VERSION_COMPARISON_TRADE_OFFS.md"),
    os.path.join(PRODUCTION_DIR, "OUTPUT_16_SHOT_LIST.md"),
    os.path.join(PRODUCTION_DIR, "OUTPUT_17_DEPARTMENT_BREAKDOWN.md"),
    os.path.join(PRODUCTION_DIR, "OUTPUT_18_PROPS_EQUIPMENT_LIST.md"),
    os.path.join(PRODUCTION_DIR, "OUTPUT_19_SHOOTING_SCHEDULE.md"),
    os.path.join(PRODUCTION_DIR, "OUTPUT_20_FINAL_PRODUCTION_CHECKLIST.md"),
]

# Section 8 Compliance: 10 Required Emotional Expressions
SECTION_8_REQUIRED_EXPRESSIONS_10 = [
    "Normal", "Happy", "Sad", "Angry", "Confused",
    "Nervous", "Suspicious", "Shocked", "Disappointed", "Serious"
]

# Section 8 Compliance: 8 Required Poses / Actions
SECTION_8_REQUIRED_POSES_8 = [
    "idle", "walking", "sitting", "standing",
    "head_movement", "looking_left", "looking_right", "talking"
]

# 6 Canonical Procedural Poses (Legacy & Contextual)
CANONICAL_POSES = [
    "idle_standing",
    "sitting_desk",          # or "idle_sitting"
    "standing_assertive",    # or "gesturing_aggressive"
    "walking_cycle",
    "head_turn",
    "gesturing"              # or "holding_prop"
]

# 6 Canonical Mouth Visemes (Lip Sync)
CANONICAL_VISEMES = ["REST", "AI", "O", "U", "ETC", "MBP"]

# 7 Canonical Facial Expressions
CANONICAL_EXPRESSIONS = [
    "calm",         # or "neutral"
    "tense",
    "frustrated",   # or "angry" / "panicked"
    "defensive",
    "empathetic",
    "determined",
    "reflective"    # or "relieved"
]

# 4 Recurring Campus Environments
CANONICAL_ENVIRONMENTS = [
    "MaterialsLab",     # Lab Pengujian Mekanik DTMM (Scenes 1-5)
    "SeminarRoom",      # Ruang Komputer / Seminar DTMM
    "HallwayGedungW",   # Koridor Gedung W FTIRS (Scene 6)
    "ExteriorStairs"    # Tangga Selasar Gedung W FTIRS (Scene 7)
]

# 7 Framing Types Presets
CANONICAL_FRAMING_PRESETS = [
    "ESTABLISHING",     # or "EST"
    "WIDE",            # or "WS" / "EWS"
    "MEDIUM",          # or "MS"
    "MEDIUM_CLOSE_UP", # or "MCU"
    "CLOSE_UP",        # or "CU"
    "EXTREME_CLOSE_UP",# or "ECU"
    "POV"              # or "INSERT" / "GRAPHIC"
]

# ---------------------------------------------------------------------------
# Assertion Tracker for Structured Reporting
# ---------------------------------------------------------------------------
@dataclass
class AssertionResult:
    tier: str
    suite_name: str
    test_id: str
    description: str
    status: str       # "PASS", "FAIL", "PENDING_MILESTONE"
    details: str = ""
    file_path: Optional[str] = None
    target_milestone: str = "M1"

class AssertionTracker:
    """Singleton tracker collecting assertion execution results across all suites."""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AssertionTracker, cls).__new__(cls)
            cls._instance.results: List[AssertionResult] = []
        return cls._instance

    @classmethod
    def reset(cls):
        tracker = cls()
        tracker.results.clear()

    @classmethod
    def record(cls, tier: str, suite: str, test_id: str, description: str,
               passed: bool, details: str = "", file_path: Optional[str] = None,
               is_pending: bool = False, target_milestone: str = "M1") -> AssertionResult:
        if is_pending:
            status = "PENDING_MILESTONE"
        else:
            status = "PASS" if passed else "FAIL"

        tracker = cls()
        res = AssertionResult(
            tier=tier,
            suite_name=suite,
            test_id=test_id,
            description=description,
            status=status,
            details=details,
            file_path=file_path,
            target_milestone=target_milestone
        )
        tracker.results.append(res)
        return res

    @classmethod
    def get_summary(cls) -> Dict[str, Any]:
        tracker = cls()
        total = len(tracker.results)
        passed = sum(1 for r in tracker.results if r.status == "PASS")
        failed = sum(1 for r in tracker.results if r.status == "FAIL")
        pending = sum(1 for r in tracker.results if r.status == "PENDING_MILESTONE")

        tier_stats: Dict[str, Dict[str, int]] = {}
        for r in tracker.results:
            if r.tier not in tier_stats:
                tier_stats[r.tier] = {"total": 0, "pass": 0, "fail": 0, "pending": 0}
            tier_stats[r.tier]["total"] += 1
            if r.status == "PASS":
                tier_stats[r.tier]["pass"] += 1
            elif r.status == "FAIL":
                tier_stats[r.tier]["fail"] += 1
            else:
                tier_stats[r.tier]["pending"] += 1

        return {
            "total_assertions": total,
            "passed": passed,
            "failed": failed,
            "pending": pending,
            "tier_stats": tier_stats,
            "results": tracker.results
        }

# ---------------------------------------------------------------------------
# Utility Functions
# ---------------------------------------------------------------------------
def check_file_exists(file_path: str) -> bool:
    """Check if file exists and is a regular file."""
    return os.path.isfile(file_path)

def read_file_content(file_path: str) -> Optional[str]:
    """Read full text content of a file."""
    if not os.path.isfile(file_path):
        return None
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return None

def load_json_file(file_path: str) -> Tuple[Optional[Any], Optional[str]]:
    """Parse JSON file, returning (data, error_message)."""
    if not os.path.isfile(file_path):
        return None, f"File not found: {file_path}"
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data, None
    except json.JSONDecodeError as e:
        return None, f"JSON Decode Error at line {e.lineno}, col {e.colno}: {e.msg}"
    except Exception as e:
        return None, str(e)

def extract_markdown_headings(content: str) -> List[Tuple[int, str]]:
    """Extract list of (level, title) for all markdown headers."""
    headings = []
    for line in content.splitlines():
        m = re.match(r"^(#{1,6})\s+(.*)$", line.strip())
        if m:
            headings.append((len(m.group(1)), m.group(2).strip()))
    return headings

def scan_files_for_external_assets(target_dir: str) -> List[Dict[str, Any]]:
    """
    Forensic scanner for banned external assets in animatic source:
    - Bitmap file extensions: .png, .jpg, .jpeg, .webp, .gif, .bmp, .tiff
    - <img src=... or <Image src=...
    - External URLs: http:// or https:// (except xmlns definitions)
    - CSS url(...) imports
    - <image xlink:href=...
    """
    violations = []
    if not os.path.isdir(target_dir):
        return violations

    bitmap_exts = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tiff", ".ico"}

    for root, _, files in os.walk(target_dir):
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            full_path = os.path.join(root, f)

            # Check direct bitmap file presence
            if ext in bitmap_exts:
                violations.append({
                    "file": full_path,
                    "line": 1,
                    "type": "BITMAP_FILE_PRESENT",
                    "match": f"Prohibited bitmap asset file found: {f}"
                })
                continue

            # Check text / code files (.ts, .tsx, .js, .jsx, .css, .html)
            if ext in {".ts", ".tsx", ".js", ".jsx", ".css", ".html", ".json"}:
                try:
                    with open(full_path, "r", encoding="utf-8", errors="ignore") as fp:
                        for lineno, line in enumerate(fp, start=1):
                            # Skip comments if needed, but strict check is preferred
                            # 1. <img tag
                            if re.search(r"<img\b", line, re.IGNORECASE):
                                violations.append({
                                    "file": full_path,
                                    "line": lineno,
                                    "type": "PROHIBITED_HTML_IMG_TAG",
                                    "match": line.strip()
                                })
                            # 2. Bitmap extension references
                            if re.search(r"['\"][^'\"]+\.(?:png|jpg|jpeg|webp|gif|bmp)['\"]", line, re.IGNORECASE):
                                violations.append({
                                    "file": full_path,
                                    "line": lineno,
                                    "type": "BITMAP_IMPORT_OR_REFERENCE",
                                    "match": line.strip()
                                })
                            # 3. External HTTP URL (ignoring standard w3.org xml namespaces)
                            url_match = re.search(r"https?://(?!www\.w3\.org)[^\s'\"`]+", line)
                            if url_match:
                                violations.append({
                                    "file": full_path,
                                    "line": lineno,
                                    "type": "EXTERNAL_NETWORK_URL_FOUND",
                                    "match": url_match.group(0)
                                })
                            # 4. CSS url() with bitmap or network
                            if re.search(r"url\s*\(['\"][^'\"]+['\"]\)", line):
                                violations.append({
                                    "file": full_path,
                                    "line": lineno,
                                    "type": "CSS_URL_IMPORT",
                                    "match": line.strip()
                                })
                except Exception:
                    pass

    return violations

def calculate_camera_transform_matrix(
    center_x: float,
    center_y: float,
    zoom_factor: float,
    rotation_deg: float = 0.0,
    shake_x: float = 0.0,
    shake_y: float = 0.0,
    viewport_width: float = 1920.0,
    viewport_height: float = 1080.0
) -> Dict[str, Any]:
    """
    Authoritative reference model for Remotion camera CSS 3D transform.
    Produces translate3d and scale values matching CameraWrapper specifications.
    """
    # Camera translates the canvas in reverse of the focus center offset from screen center
    orig_cx = viewport_width / 2.0
    orig_cy = viewport_height / 2.0

    # Translation offset: to focus on (center_x, center_y), we translate by (orig_cx - center_x) * zoom
    translate_x = (orig_cx - center_x) * zoom_factor + shake_x
    translate_y = (orig_cy - center_y) * zoom_factor + shake_y

    transform_css = (
        f"translate3d({translate_x:.2f}px, {translate_y:.2f}px, 0px) "
        f"scale({zoom_factor:.4f}) "
        f"rotate({rotation_deg:.2f}deg)"
    )

    return {
        "translate_x": translate_x,
        "translate_y": translate_y,
        "scale": zoom_factor,
        "rotation": rotation_deg,
        "transform_css": transform_css
    }
