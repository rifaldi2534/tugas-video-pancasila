"""
install_node.py - Portable Node.js and npm downloader and installer
"""

import os
import sys
import time
import zipfile
import urllib.request
import subprocess

NODE_VERSION = "v20.18.0"
URL = f"https://nodejs.org/dist/{NODE_VERSION}/node-{NODE_VERSION}-win-x64.zip"
TARGET_DIR = os.path.expandvars(r"%LOCALAPPDATA%\Programs\nodejs")
ZIP_DEST = os.path.expandvars(r"%TEMP%\node.zip")

def main():
    print(f"Target directory: {TARGET_DIR}")
    if os.path.isfile(os.path.join(TARGET_DIR, "node.exe")):
        print("node.exe already exists!")
        return 0

    os.makedirs(TARGET_DIR, exist_ok=True)
    print(f"Downloading Node.js {NODE_VERSION} from {URL}...")

    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    req = urllib.request.Request(URL, headers=headers)

    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=30) as response, open(ZIP_DEST, "wb") as out_file:
            total_size = int(response.headers.get("Content-Length", 0))
            downloaded = 0
            chunk_size = 256 * 1024

            while True:
                chunk = response.read(chunk_size)
                if not chunk:
                    break
                out_file.write(chunk)
                downloaded += len(chunk)
                elapsed = time.time() - t0
                rate = downloaded / (1024 * 1024 * elapsed) if elapsed > 0 else 0
                pct = (downloaded / total_size * 100) if total_size > 0 else 0
                print(f"\rProgress: {downloaded/(1024*1024):.1f}/{total_size/(1024*1024):.1f} MB ({pct:.1f}%) @ {rate:.2f} MB/s", end="", flush=True)

        print("\nDownload complete!")
    except Exception as e:
        print(f"\nDownload error: {e}")
        return 1

    print(f"Extracting {ZIP_DEST} to {TARGET_DIR}...")
    try:
        with zipfile.ZipFile(ZIP_DEST, "r") as zip_ref:
            prefix = f"node-{NODE_VERSION}-win-x64/"
            for member in zip_ref.infolist():
                if member.filename.startswith(prefix):
                    rel_path = member.filename[len(prefix):]
                    if not rel_path:
                        continue
                    dest_path = os.path.join(TARGET_DIR, rel_path)
                    if member.is_dir():
                        os.makedirs(dest_path, exist_ok=True)
                    else:
                        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                        with zip_ref.open(member) as source, open(dest_path, "wb") as target:
                            target.write(source.read())
        print("Extraction complete!")
        if os.path.exists(ZIP_DEST):
            os.remove(ZIP_DEST)
    except Exception as e:
        print(f"Extraction error: {e}")
        return 1

    # Verify installation
    node_exe = os.path.join(TARGET_DIR, "node.exe")
    if os.path.isfile(node_exe):
        res = subprocess.run([node_exe, "-v"], capture_output=True, text=True)
        print(f"Node.js installed successfully: {res.stdout.strip()}")
        return 0
    else:
        print("node.exe not found after extraction!")
        return 1

if __name__ == "__main__":
    sys.exit(main())
