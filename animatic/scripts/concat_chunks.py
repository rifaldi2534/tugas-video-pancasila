"""
SPESIMEN TERAKHIR — concat_chunks.py
Lossless FFmpeg Stream-Copy Concatenation Pipeline.

Combines modular rendered scene chunks:
  animatic/out/chunks/Scene01.mp4 ... Scene07.mp4
into the definitive master film animatic:
  animatic/out/master_1080p_24fps.mp4

Uses FFmpeg concat demuxer with '-c copy' for instantaneous, lossless merging in ~2 seconds.
"""

import os
import sys
import shutil
import subprocess
from typing import List, Optional

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ANIMATIC_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
OUT_DIR = os.path.join(ANIMATIC_DIR, "out")
CHUNKS_DIR = os.path.join(OUT_DIR, "chunks")
DEFAULT_OUTPUT = os.path.join(OUT_DIR, "master_1080p_24fps.mp4")

EXPECTED_CHUNKS = [
    "Scene01.mp4",
    "Scene02.mp4",
    "Scene03.mp4",
    "Scene04.mp4",
    "Scene05.mp4",
    "Scene06.mp4",
    "Scene07.mp4",
]


def find_ffmpeg() -> Optional[str]:
    """Locates the ffmpeg executable in PATH or inside node_modules @remotion compositor."""
    # 1. System PATH
    found = shutil.which("ffmpeg")
    if found:
        return found

    # 2. Bundled Remotion Compositor binary
    remotion_ffmpeg = os.path.join(
        ANIMATIC_DIR,
        "node_modules",
        "@remotion",
        "compositor-win32-x64-msvc",
        "ffmpeg.exe",
    )
    if os.path.isfile(remotion_ffmpeg):
        return remotion_ffmpeg

    # 3. Check AppData / Local Programs
    local_ffmpeg = os.path.expandvars(r"%LOCALAPPDATA%\Programs\ffmpeg\bin\ffmpeg.exe")
    if os.path.isfile(local_ffmpeg):
        return local_ffmpeg

    return None


def main() -> int:
    print("================================================================")
    print(" SPESIMEN TERAKHIR — FFmpeg Lossless Stream Copy Concatenation")
    print("================================================================")

    ffmpeg_bin = find_ffmpeg()
    if not ffmpeg_bin:
        print("ERROR: FFmpeg binary not found in PATH or node_modules!")
        return 1

    print(f"FFmpeg binary      : {ffmpeg_bin}")
    print(f"Chunks directory   : {CHUNKS_DIR}")
    print(f"Target output file : {DEFAULT_OUTPUT}")
    print("----------------------------------------------------------------")

    if not os.path.isdir(CHUNKS_DIR):
        print(f"ERROR: Chunks directory does not exist: {CHUNKS_DIR}")
        print("Please render scene chunks first using: npm run render:chunks")
        return 1

    # Verify which chunks exist
    present_chunks: List[str] = []
    for chunk_name in EXPECTED_CHUNKS:
        chunk_path = os.path.join(CHUNKS_DIR, chunk_name)
        if os.path.isfile(chunk_path) and os.path.getsize(chunk_path) > 0:
            present_chunks.append(chunk_name)
        else:
            print(f"Warning: Chunk missing or empty: {chunk_name}")

    if not present_chunks:
        # Fallback: check any .mp4 files in chunks dir
        present_chunks = sorted([
            f for f in os.listdir(CHUNKS_DIR)
            if f.endswith(".mp4") and os.path.getsize(os.path.join(CHUNKS_DIR, f)) > 0
        ])

    if not present_chunks:
        print("ERROR: No valid scene chunk MP4 files found in chunks directory!")
        return 1

    print(f"Found {len(present_chunks)} chunk(s) to concatenate: {', '.join(present_chunks)}")

    # Create FFmpeg concat demuxer file
    concat_list_file = os.path.join(CHUNKS_DIR, "concat_manifest.txt")
    with open(concat_list_file, "w", encoding="utf-8") as f:
        for chunk_name in present_chunks:
            # Use forward slashes or relative filename
            f.write(f"file '{chunk_name}'\n")

    print(f"Generated concat demuxer manifest: {concat_list_file}")

    # Build FFmpeg command with lossless stream copy (-c copy)
    cmd = [
        ffmpeg_bin,
        "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_list_file,
        "-c", "copy",
        DEFAULT_OUTPUT,
    ]

    print(f"Executing: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=CHUNKS_DIR, capture_output=True, text=True)

    if result.returncode != 0:
        print("FFmpeg error during concatenation:")
        print(result.stderr)
        return result.returncode

    if os.path.isfile(DEFAULT_OUTPUT):
        out_size_mb = os.path.getsize(DEFAULT_OUTPUT) / (1024 * 1024)
        print("================================================================")
        print(f"SUCCESS: Master Full HD video generated: {DEFAULT_OUTPUT}")
        print(f"Master Video Size: {out_size_mb:.2f} MB")
        print("================================================================")
        return 0
    else:
        print("ERROR: Concatenated video was not created.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
