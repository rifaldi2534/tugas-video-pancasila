"""
test_runner.py - Unified Master Test Runner for SPESIMEN TERAKHIR Animatic.
Comprehensive 4-Tier Automated Verification Suite.
Affiliation: DTMM FTIRS ITS Surabaya

Usage:
    python animatic/tests/test_runner.py
    python animatic/tests/test_runner.py --tier 1
    python animatic/tests/test_runner.py --tier 2
    python animatic/tests/test_runner.py --tier 3
    python animatic/tests/test_runner.py --tier 4
    python animatic/tests/test_runner.py --verbose
    python animatic/tests/test_runner.py --json-output out/test_report.json
"""

import sys
import os
import argparse
import unittest
import json
import time
from typing import List, Dict, Any

# Ensure workspace root and animatic directory are on sys.path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
ANIMATIC_DIR = os.path.abspath(os.path.join(CURRENT_DIR, ".."))
WORKSPACE_ROOT = os.path.abspath(os.path.join(ANIMATIC_DIR, ".."))

if WORKSPACE_ROOT not in sys.path:
    sys.path.insert(0, WORKSPACE_ROOT)
if ANIMATIC_DIR not in sys.path:
    sys.path.insert(0, ANIMATIC_DIR)

from animatic.tests.test_helpers import AssertionTracker
from animatic.tests.test_tier1_schema_and_docs import TestTier1SchemaAndDocs
from animatic.tests.test_tier2_procedural_svg import TestTier2ProceduralSvg
from animatic.tests.test_tier3_camera_subtitles_audio import TestTier3CameraSubtitlesAudio
from animatic.tests.test_tier4_assembly_export_pipeline import TestTier4AssemblyExportPipeline

# ANSI Color Codes
CYAN = "\033[96m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
BOLD = "\033[1m"
DIM = "\033[2m"
RESET = "\033[0m"


def print_banner():
    banner = f"""
{CYAN}{BOLD}========================================================================================{RESET}
{CYAN}{BOLD}   SPESIMEN TERAKHIR (The Final Specimen) — Comprehensive Animatic Test Suite           {RESET}
{CYAN}   DTMM FTIRS Institut Teknologi Sepuluh Nopember (ITS) Surabaya                         {RESET}
{CYAN}   4-Tier Automated Verification Suite | 24 FPS | 1080p | 16:00 Total Timeline          {RESET}
{CYAN}{BOLD}========================================================================================{RESET}
"""
    print(banner)


def run_suites(selected_tiers: List[int], verbose: bool = False) -> int:
    """Run test suites for the selected tiers and output formatted report."""
    AssertionTracker.reset()
    suite = unittest.TestSuite()
    loader = unittest.TestLoader()

    tier_classes = {
        1: TestTier1SchemaAndDocs,
        2: TestTier2ProceduralSvg,
        3: TestTier3CameraSubtitlesAudio,
        4: TestTier4AssemblyExportPipeline,
    }

    for t in selected_tiers:
        if t in tier_classes:
            suite.addTests(loader.loadTestsFromTestCase(tier_classes[t]))

    start_time = time.time()
    # Suppress default unittest dots if running custom report, or show if verbose
    runner = unittest.TextTestRunner(verbosity=2 if verbose else 1)
    result = runner.run(suite)
    elapsed = time.time() - start_time

    # Retrieve assertion summary
    summary = AssertionTracker.get_summary()

    # Print Formatted Report Table
    print(f"\n{BOLD}VERIFICATION SUMMARY BY TIER:{RESET}")
    print(f"{DIM}{'—' * 88}{RESET}")
    print(f"{'Tier Name':<46} | {'Total':<6} | {'Passed':<7} | {'Pending':<8} | {'Failed':<6} | {'Status'}")
    print(f"{DIM}{'—' * 88}{RESET}")

    tier_names = {
        "Tier 1: Schema, Data & Document Integrity": "Tier 1: Schema & Documentation (M1)",
        "Tier 2: Procedural SVG & Visual System": "Tier 2: Procedural SVG & Purity (M2)",
        "Tier 3: Cinematic Camera, Subtitles & Audio Engine": "Tier 3: Camera, Subs & Audio (M3)",
        "Tier 4: Assembly & Export Pipeline": "Tier 4: Assembly & Export Pipeline (M4)",
    }

    tier_all_clean = True
    for full_name, display_name in tier_names.items():
        stats = summary["tier_stats"].get(full_name, {"total": 0, "pass": 0, "pending": 0, "fail": 0})
        total = stats["total"]
        passed = stats["pass"]
        pending = stats["pending"]
        failed = stats["fail"]

        if total == 0:
            status_str = f"{DIM}SKIPPED{RESET}"
        elif failed > 0:
            status_str = f"{RED}{BOLD}FAILED{RESET}"
            tier_all_clean = False
        elif pending > 0:
            status_str = f"{YELLOW}PENDING MILESTONE{RESET}"
        else:
            status_str = f"{GREEN}{BOLD}PASS 100%{RESET}"

        print(f"{display_name:<46} | {total:<6} | {GREEN}{passed:<7}{RESET} | {YELLOW}{pending:<8}{RESET} | {RED if failed else DIM}{failed:<6}{RESET} | {status_str}")

    print(f"{DIM}{'—' * 88}{RESET}")

    total_assertions = summary["total_assertions"]
    total_passed = summary["passed"]
    total_pending = summary["pending"]
    total_failed = summary["failed"]

    print(f"{BOLD}TOTAL ASSERTIONS:{RESET} {total_assertions}  |  "
          f"{GREEN}{BOLD}PASSED:{RESET} {total_passed}  |  "
          f"{YELLOW}{BOLD}PENDING:{RESET} {total_pending}  |  "
          f"{RED if total_failed else GREEN}{BOLD}FAILED:{RESET} {total_failed}  |  "
          f"{DIM}ELAPSED:{RESET} {elapsed:.3f}s\n")

    # If there are failures, print detailed errors
    if total_failed > 0:
        print(f"{RED}{BOLD}FAILURES DETECTED:{RESET}")
        for r in summary["results"]:
            if r.status == "FAIL":
                print(f"  {RED}[X] [{r.test_id}] {r.suite_name} -> {r.description}{RESET}")
                if r.details:
                    print(f"      {DIM}{r.details}{RESET}")
                if r.file_path:
                    print(f"      {DIM}File: {r.file_path}{RESET}")
        print()
        return 1

    # Verification status
    if not result.wasSuccessful():
        print(f"{RED}{BOLD}TEST RUNNER ERROR: Some unittest test cases encountered uncaught exceptions.{RESET}")
        return 1

    print(f"{GREEN}{BOLD}SUCCESS: All executed assertions passed cleanly! (Zero test defects, 100% compliant){RESET}\n")
    return 0


def main():
    parser = argparse.ArgumentParser(description="SPESIMEN TERAKHIR Animatic Master Verification Runner")
    parser.add_argument("--tier", type=int, choices=[1, 2, 3, 4], help="Run a specific verification tier (1, 2, 3, or 4)")
    parser.add_argument("--verbose", "-v", action="store_true", help="Enable verbose per-test output")
    parser.add_argument("--json-output", type=str, help="Path to write JSON summary output report")

    args = parser.parse_args()

    print_banner()

    if args.tier:
        selected_tiers = [args.tier]
        print(f"Executing selected verification: {BOLD}Tier {args.tier}{RESET} only\n")
    else:
        selected_tiers = [1, 2, 3, 4]
        print(f"Executing comprehensive verification: {BOLD}Tiers 1, 2, 3, and 4{RESET}\n")

    exit_code = run_suites(selected_tiers, verbose=args.verbose)

    if args.json_output:
        summary = AssertionTracker.get_summary()
        out_path = os.path.abspath(args.json_output)
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        # Serialize results
        data_to_save = {
            "total_assertions": summary["total_assertions"],
            "passed": summary["passed"],
            "failed": summary["failed"],
            "pending": summary["pending"],
            "tier_stats": summary["tier_stats"],
            "results": [
                {
                    "tier": r.tier,
                    "suite": r.suite_name,
                    "test_id": r.test_id,
                    "description": r.description,
                    "status": r.status,
                    "details": r.details,
                    "file_path": r.file_path,
                    "target_milestone": r.target_milestone
                }
                for r in summary["results"]
            ]
        }
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data_to_save, f, indent=2)
        print(f"Test report JSON written to: {out_path}")

    sys.exit(exit_code)


if __name__ == "__main__":
    main()
