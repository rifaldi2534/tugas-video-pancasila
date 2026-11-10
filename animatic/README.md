# SPESIMEN TERAKHIR (The Final Specimen)
### Procedural 2D Cinematic Animatic Engine for Short Film Screenplay
**Afiliasi:** Departemen Teknik Material dan Metalurgi (DTMM), Fakultas Teknologi Industri dan Rekayasa Sistem (FTIRS), Institut Teknologi Sepuluh Nopember (ITS) Surabaya.

---

## 1. Overview & Dramaturgical Context

**SPESIMEN TERAKHIR** adalah animatik sinematik 2D berbasis kode penuh (*code-based animatic*) yang diadaptasi secara verbatim dari paket skenario film pendek 14 mahasiswa Departemen Teknik Material dan Metalurgi FTIRS ITS. Proyek ini memadukan ketelitian ilmiah metalurgi (uji impak Charpy ASTM E23, takik spesimen baja, nitrogen cair sub-nol -40°C, transisi ulet-ke-getas) dengan konflik moral mendalam yang merefleksikan nilai-nilai luhur Pancasila:

- **Sila Kedua (Kemanusiaan yang Adil dan Beradab):** Menempatkan keselamatan dan beban ekonomi keluarga rekan mahasiswa di atas ambisi yudisium formal.
- **Sila Keempat (Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan):** Budaya musyawarah mufakat di ruang seminar DTMM dalam menghadapi dilema kecurangan data.
- **Sila Kelima (Keadilan Sosial bagi Seluruh Rakyat Indonesia):** Penegakan kejujuran dan integritas akademik tanpa mengorbankan solidaritas persaudaraan (*brotherhood*).

---

## 2. Technical Architecture

Proyek ini dibangun menggunakan arsitektur modern berbasis React, TypeScript, dan Remotion:

```
animatic/
├── out/                           # Output video exports
│   ├── preview.mp4                # Representative prototype / fast preview render
│   ├── master_1080p_24fps.mp4     # Definitive Full HD 1080p master film
│   └── chunks/                    # Resilient chunked renders (Scene01.mp4 ... Scene07.mp4)
├── scripts/                       # Export automation & tooling
│   ├── render_preview.ts          # Fast preview export script (PrototypeScene / 540p/1080p)
│   ├── render_chunks.ts           # Resilient chunked exporter for all 7 scenes
│   ├── concat_chunks.py           # Instant lossless FFmpeg stream-copy concatenation
│   └── install_node.py            # Node.js portable runtime installer
├── src/
│   ├── components/
│   │   ├── audio/                 # Multi-track audio engine with procedural PCM WAV fallbacks
│   │   ├── camera/                # Cinematic camera (26mm/52mm framing, 3D pan/zoom, handheld shake)
│   │   ├── characters/            # 100% procedural SVG rigs for all 14 ITS DTMM characters
│   │   ├── environments/          # 4 procedural SVG environments (MaterialsLab, SeminarRoom, etc.)
│   │   └── subtitles/             # SMPTE title-safe subtitle overlay with verbatim dialogue
│   ├── data/                      # Structured canonical dataset (characters.json, scenes.json)
│   ├── scenes/                    # 7 sequential scene modules + PrototypeScene
│   │   ├── PrototypeScene.tsx     # Multi-character verification scene (Scene 1 Charpy lab)
│   │   ├── Scene01_LabOpening.tsx # 0:00 - 3:00 (Frames 0 - 4320)
│   │   ├── Scene02_DebateHospitalSlip.tsx   # 3:00 - 5:30 (Frames 4320 - 7920)
│   │   ├── Scene03_ConsensusVoting.tsx      # 5:30 - 8:30 (Frames 7920 - 12240)
│   │   ├── Scene04_CablePullConfrontation.tsx # 8:30 - 11:30 (Frames 12240 - 16560)
│   │   ├── Scene05_PendulumImpactClimax.tsx   # 11:30 - 13:30 (Frames 16560 - 19440)
│   │   ├── Scene06_ReflectiveCorridor.tsx     # 13:30 - 14:45 (Frames 19440 - 21240)
│   │   ├── Scene07_ExteriorCatharsisCredits.tsx # 14:45 - 16:00 (Frames 21240 - 23040)
│   │   └── index.ts               # Unified scenes re-export manifest
│   ├── types/                     # Strict TypeScript interfaces and schemas
│   ├── Root.tsx                   # Master Remotion composition registry (FullFilm master)
│   └── index.ts                   # Remotion entry point
└── tests/                         # 4-Tier Automated Verification Suite
    ├── test_runner.py             # Master test runner (58 tests, 81 assertions)
    ├── test_tier1_schema_and_docs.py
    ├── test_tier2_procedural_svg.py
    ├── test_tier3_camera_subtitles_audio.py
    └── test_tier4_assembly_export_pipeline.py
```

### Key Technical Pillars:
1. **Procedural SVG Visual Purity:** 100% procedurally generated SVG vector graphics and CSS transforms. Zero external raster bitmaps, stock photography, or copyrighted assets.
2. **14 Ensembled Characters:** Fully articulated vector rigs for all 14 ITS students (10 putra, 4 putri) with authentic almamater lab coats, distinctive hairstyles/hijabs, 10 dramaturgical expressions, 6 phonetic visemes, and signature engineering props.
3. **Calibrated Color Temperatures:**
   - `4200K Fluorescent`: DTMM Mechanical Testing Lab (Scenes 1, 2, 5).
   - `3800K Neutral Warm`: Computer Seminar Room & Gedung W Corridor (Scenes 3, 6).
   - `3000K Chiaroscuro & Lamplight`: Night crisis & exterior campus stairs (Scenes 4, 7).
4. **Cinematic Camera Engine:** Realizes smartphone optics (26mm Wide-Angle, 52mm Telephoto), dual-axis transforms, procedural handheld micro-shake, and multi-layer parallax depth (0.2 far wall, 0.6 machinery, 1.0 characters, 1.3 foreground).
5. **Multi-Track Audio Engine:** Synthesizes in-memory 16-bit PCM WAV audio for ambient fluorescent neon hum, keyboard clicks, rain droplets, cryogenic vapor hiss, and the monumental 300J Charpy impact with a -12 dB safety track peak limiter.

---

## 3. Master 16:00 Film Timeline & Composition Registry

The entire film timeline is mathematically calibrated at **24 FPS** spanning **23,040 frames** (960 seconds / 16 minutes 00 seconds):

| Scene ID | Slugline / Setting | Timecode | Cumulative Frames | Narrative Milestone |
|---|---|---|---|---|
| **Scene01** | `INT. LAB PENGUJIAN MEKANIK - MALAM` | 00:00 – 03:00 | 0 – 4,320 | **Masalah (Crisis):** Cacat sudut takik 55° & batas yudisium besok |
| **Scene02** | `INT. LAB PENGUJIAN MEKANIK - MALAM` | 03:00 – 05:30 | 4,320 – 7,920 | **Konflik (Conflict):** Kontrak Astra Dimas vs. Slip RSUD Bagas |
| **Scene03** | `INT. RUANG SEMINAR KOMPUTER - MALAM` | 05:30 – 08:30 | 7,920 – 12,240 | **Pilihan Moral:** Musyawarah mufakat 14 mahasiswa (Sila 4) |
| **Scene04** | `INT. RUANG SEMINAR KOMPUTER - MALAM` | 08:30 – 11:30 | 12,240 – 16,560 | **Konsekuensi:** Nadia mencabut kabel daya komputer terminal |
| **Scene05** | `INT. LAB PENGUJIAN MEKANIK - MALAM` | 11:30 – 13:30 | 16,560 – 19,440 | **Klimaks:** Ayunan pendulum 300J pada spesimen sub-nol |
| **Scene06** | `INT. KORIDOR GEDUNG W - MALAM` | 13:30 – 14:45 | 19,440 – 21,240 | **Refleksi A:** Verifikasi 84 Joule & rekonsiliasi persaudaraan |
| **Scene07** | `EXT. TANGGA SELASAR GEDUNG W - DINI HARI` | 14:45 – 16:00 | 21,240 – 23,040 | **Refleksi B:** Makan tahu warkop bersama & ending credits roll |
| **FullFilm**| **MASTER 16:00 ANTIMATIC** | **00:00 – 16:00** | **0 – 23,040** | **Full Assembly with opening, transitions, and credits** |

---

## 4. Interactive Preview Playback (Remotion Studio)

To launch the real-time interactive Remotion Player in your web browser:

```bash
# In the animatic/ directory:
npm run preview
# or
npm run dev
```

This launches the Remotion Studio web server at `http://localhost:3000`, allowing frame-by-frame scrubbing, camera angle inspection, audio playback, and visual component tweaking across all registered compositions:
- `FullFilm` (Master 16:00 timeline)
- `PrototypeScene` (30-second multi-character lab conflict)
- `Scene01` through `Scene07` (Individual sequential scenes)
- `CharacterShowcase` (Interactive procedural rig viewer for all 14 characters)
- `EnvironmentShowcase` (Procedural environment viewer)

---

## 5. Automated Verification Suite Execution

The project includes an end-to-end 4-Tier Automated Verification Suite with **58 tests** and **81 assertions**:

```bash
# Run comprehensive automated verification suite:
python animatic/tests/test_runner.py
```

Expected output:
```
========================================================================================
   SPESIMEN TERAKHIR (The Final Specimen) — Comprehensive Animatic Test Suite           
   DTMM FTIRS Institut Teknologi Sepuluh Nopember (ITS) Surabaya                         
   4-Tier Automated Verification Suite | 24 FPS | 1080p | 16:00 Total Timeline          
========================================================================================

VERIFICATION SUMMARY BY TIER:
Tier 1: Schema & Documentation (M1)            | 38     | 38      | 0        | 0      | PASS 100%
Tier 2: Procedural SVG & Purity (M2)           | 16     | 16      | 0        | 0      | PASS 100%
Tier 3: Camera, Subs & Audio (M3)              | 16     | 16      | 0        | 0      | PASS 100%
Tier 4: Assembly & Export Pipeline (M4)        | 11     | 11      | 0        | 0      | PASS 100%

TOTAL ASSERTIONS: 81  |  PASSED: 81  |  PENDING: 0  |  FAILED: 0  |  ELAPSED: ~0.7s
SUCCESS: All executed assertions passed cleanly! (Zero test defects, 100% compliant)
```

To run TypeScript static type checking:
```bash
npx tsc --noEmit
```

---

## 6. Video Export Pipeline (MP4 H.264)

### Option A: Fast Preview Export (`preview.mp4`)
Renders a fast verification video of `PrototypeScene` (30 seconds @ 24fps):
```bash
npm run render:preview
# or custom scale:
npx tsx scripts/render_preview.ts --scale 0.5 --out out/preview.mp4
```

### Option B: Resilient Chunked Export Pipeline (Low RAM Architecture)
Designed to run reliably on workstations with as low as 5.6 GB of free RAM:
```bash
# 1. Render all 7 sequential scene chunks into out/chunks/
npm run render:chunks

# 2. Perform lossless FFmpeg stream-copy concatenation into master Full HD video:
npm run render:concat

# 3. Or run the combined pipeline:
npm run render:full
```

Output files:
- `animatic/out/preview.mp4` — Verification preview video.
- `animatic/out/chunks/Scene01.mp4` through `Scene07.mp4` — Individual scene chunks.
- `animatic/out/master_1080p_24fps.mp4` — Master 1920x1080 Full HD, 24 FPS, H.264/AAC video.

---

## 7. Credits & Affiliation

- **Karya:** Skenario Film Pendek "Spesimen Terakhir"
- **Institusi:** Departemen Teknik Material dan Metalurgi (DTMM), FTIRS, Institut Teknologi Sepuluh Nopember (ITS), Surabaya
- **Pemeran Karakter Mahasiswa DTMM (14 Mahasiswa):**
  - Aryo (Koordinator Lab / Penanggung Jawab BAP)
  - Dimas (Astra Job Applicant / Pragmatisme Bertahan)
  - Bagas (Mahasiswa asal Blitar / Beban Pengobatan Ayah di RSUD Mardi Waluyo)
  - Nadia (Penguji Dimensi Takik / Hati Nurani Akademik)
  - Hendro (Operator Mikrometer / Kelelahan Fisik 14 Jam)
  - Fajar (Operator Nitrogen Cair Cryogenic)
  - Farhan, Reza, Kevin, Danang, Zul, Kirana, Maya, Rere
- **Teknologi Animasi:** React 18 &bull; Remotion 4.0 &bull; SVG Vector Engine &bull; TypeScript &bull; FFmpeg
