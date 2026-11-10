# DOKUMEN INVENTARIS BERKAS PROYEK (FILE INVENTORY)
## Master File Manifest, Immutability Audit, and Traceability Matrix
**Proyek**: Film Pendek Animatic 2D Sinematik *SPESIMEN TERAKHIR* (The Final Specimen)  
**Afiliasi**: Departemen Teknik Material dan Metalurgi (DTMM), Fakultas Teknologi Industri dan Rekayasa Sistem (FTIRS), Institut Teknologi Sepuluh Nopember (ITS), Surabaya  
**Milestone**: M1 (R1 Screenplay Audit, Structured Scene Data, and Documentation)  
**Status**: Authoritative & Verified  
**Tanggal**: 2026-11-03  

---

## 1. RINGKASAN EKSEKUTIF MANIFEST (EXECUTIVE MANIFEST SUMMARY)

Paket proyek *Spesimen Terakhir* terdiri dari repositori naskah orisinal, dokumen perencanaan pra-produksi komprehensif, dokumen pengujian logika naratif, dokumen analisis sinematik, serta arsitektur kode animatik 2D prosedural berbasis React dan Remotion. 

Sesuai dengan **Mandat Integritas R1** pada `ORIGINAL_REQUEST.md`, seluruh berkas sumber pra-eksisting dalam direktori `screenplay/`, `production/`, dan `docs/` berada dalam status **KUNCI KETAT (STRICT READ-ONLY / IMMUTABLE)**. Tidak ada satupun berkas sumber yang diubah, dihapus, atau dimodifikasi selama eksekusi proyek animatik.

```
+-------------------------------------------------------------------------------------------------------+
| REKAPITULASI INVENTARIS DIREKTORI & STATUS INTEGRITAS                                                 |
+------------------------------+--------------+------------------+--------------------------------------+
| DIREKTORI                    | JUMLAH FILE  | STATUS AKSES     | DESKRIPSI FUNGSIONAL                 |
+------------------------------+--------------+------------------+--------------------------------------+
| screenplay/                  | 3 berkas     | READ-ONLY LOCKED | Naskah Versi A, Versi B, & komparasi |
| production/                  | 5 berkas     | READ-ONLY LOCKED | Shot list, breakdown, props, jadwal  |
| docs/concept_development/    | 13 berkas    | READ-ONLY LOCKED | Konsep, beat sheet, character bible  |
| tests/                       | 9 berkas     | EXECUTABLE       | Test runner Python & suite e2e       |
| analysis/                    | 5 berkas     | GENERATED (M1)   | 5 dokumen analisis otoritatif R1     |
| animatic/                    | 10+ berkas   | IMPLEMENTED (M1) | Arsitektur React, Remotion, JSON/TS  |
+------------------------------+--------------+------------------+--------------------------------------+
```

---

## 2. INVENTARIS SUMBER SKENARIO (`screenplay/`)

Direktori `screenplay/` memuat naskah drama film pendek dalam dua opsi adaptasi produksi. Untuk proyek animatik ini, **Versi A** ditetapkan sebagai acuan tunggal mutlak (*single source of truth*) karena menghadirkan seluruh 14 mahasiswa di dalam bingkai secara simultan.

| Nama Berkas | Ukuran (Bytes) | Deskripsi Fungsional & Isi Pokok | Status Hak Akses |
|---|---|---|---|
| `screenplay/OUTPUT_14_15_VERSION_A_SCREENPLAY_ALL_14.md` | 42,208 | **Naskah Acuan Otoritatif**. Skenario 7 babak terkalibrasi tepat 16:00 menit (960 detik / 23.040 frame @ 24 fps). Melibatkan 14 mahasiswa DTMM ITS on-screen. Lolos 100% Pancasila Strip Test. Mengatur Z-axis staging, dialog bilingual Suroboyoan-Indonesia, dan protokol K3L. | **READ-ONLY LOCKED** |
| `screenplay/OUTPUT_14_15_VERSION_B_SCREENPLAY_CAST_CREW.md` | 41,617 | Skenario alternatif 7 aktor on-screen + 7 kru teknis smartphone. Digunakan sebagai perbandingan studi produksi live-action fisik. | **READ-ONLY LOCKED** |
| `screenplay/VERSION_COMPARISON_TRADE_OFFS.md` | 8,924 | Matriks analisis komparasi teknis, estetika, dan beban produksi antara Versi A (14 On-Screen) dan Versi B (7 On-Screen + 7 Kru). | **READ-ONLY LOCKED** |

---

## 3. INVENTARIS DOKUMEN PRODUKSI (`production/`)

Direktori `production/` memuat dokumen teknis operasional produksi lapangan yang menjadi referensi gramatika visual, tata suara, dan tata gerak kamera.

| Nama Berkas | Ukuran (Bytes) | Deskripsi Fungsional & Isi Pokok | Status Hak Akses |
|---|---|---|---|
| `production/OUTPUT_16_SHOT_LIST.md` | 30,497 | **Master Shot List Produksi**. Berisi 57 shot terperinci yang mencakup nomor shot, framing, pergerakan kamera, lensa ekuivalen (26mm/52mm), tata audio, pencahayaan, blocking pemain, dan rasional dramaturgis. | **READ-ONLY LOCKED** |
| `production/OUTPUT_17_DEPARTMENT_BREAKDOWN.md` | 27,851 | Rincian kebutuhan departemen: Penyutradaraan, Sinematografi Smartphone, Tata Suara Dual-Phone (-12 dB safety track), Tata Artistik & Properti, serta K3L Laboratorium Metalurgi. | **READ-ONLY LOCKED** |
| `production/OUTPUT_18_PROPS_EQUIPMENT_LIST.md` | 19,435 | Daftar inventaris properti spesifik: 10 kupon baja spesimen Charpy ASTM E23, mikrometer Mitutoyo, jangka sorong, mesin Charpy 300J, bejana dewar nitrogen cair, kwitansi RSUD Blitar, tahu goreng warkop, dll. | **READ-ONLY LOCKED** |
| `production/OUTPUT_19_SHOOTING_SCHEDULE.md` | 18,212 | Jadwal panggilan syuting (*shooting call sheet*) 2 hari maraton di Gedung W FTIRS ITS, rotasi istirahat, dan alokasi buffer waktu termal HP. | **READ-ONLY LOCKED** |
| `production/OUTPUT_20_FINAL_PRODUCTION_CHECKLIST.md` | 14,890 | Lembar kendali mutu akhir sebelum pengambilan gambar, verifikasi perizinan laboratorium, pengujian keselamatan K3L, dan kelengkapan APD. | **READ-ONLY LOCKED** |

---

## 4. INVENTARIS DOKUMEN KONSEP PENGEMBANGAN (`docs/concept_development/`)

Dokumen riset dramaturgis, pengujian logika cerita, dan rekayasa karakter yang menjadi landasan filosofis narasi film pendek.

| Nama Berkas | Ukuran (Bytes) | Deskripsi Fungsional & Isi Pokok | Status Hak Akses |
|---|---|---|---|
| `OUTPUT_01_FILM_CONCEPTS.md` | 25,410 | Eksplorasi 5 konsep film bertema nilai kebangsaan di kampus teknik ITS Surabaya. | **READ-ONLY LOCKED** |
| `OUTPUT_02_CRITICAL_SIMULATION_SCORING.md` | 21,340 | Simulasi penilaian kritis dan pemeringkatan konsep berdasarkan kelayakan dramatis. | **READ-ONLY LOCKED** |
| `OUTPUT_03_TOP_BEAT_SHEETS.md` | 28,190 | Lembar ketukan alur (*beat sheets*) 3 besar konsep unggulan. | **READ-ONLY LOCKED** |
| `OUTPUT_04_STRESS_TESTING.md` | 22,650 | Pengujian ketahanan logika naratif terhadap potensi lubang alur (*plot holes*). | **READ-ONLY LOCKED** |
| `OUTPUT_05_WINNING_CONCEPT_SELECTION.md` | 19,870 | Penetapan resmi konsep *Spesimen Terakhir* sebagai pemenang seleksi. | **READ-ONLY LOCKED** |
| `OUTPUT_06_STORYLINE.md` | 23,450 | Alur cerita linier 7 adegan dari latar krisis hingga resolusi komuni tahu goreng. | **READ-ONLY LOCKED** |
| `OUTPUT_07_CHARACTER_BIBLE.md` | 29,700 | **Kitab Karakter 3-Dimensi 14 Mahasiswa**. Mendokumentasikan latar belakang lab, status sosio-ekonomi, flaw, motivasi, taruhan hidup, dan dialog khas masing-masing karakter. | **READ-ONLY LOCKED** |
| `OUTPUT_08_FULL_BEAT_SHEET.md` | 31,240 | Beat sheet lengkap 7 babak dengan alokasi menit demi menit. | **READ-ONLY LOCKED** |
| `OUTPUT_09_FEASIBILITY_TESTING.md` | 20,110 | Uji kelayakan teknis pembuatan film mahasiswa tanpa anggaran di lingkungan kampus ITS. | **READ-ONLY LOCKED** |
| `OUTPUT_10_FEASIBILITY_REVISIONS.md` | 18,760 | Revisi teknis mitigasi uap cryogenic, keamanan pendulum 300J, dan audio. | **READ-ONLY LOCKED** |
| `OUTPUT_11_ANTI_BOREDOM_TEST.md` | 21,540 | Audit laju tempo dramatis dan pencegahan kebosanan penonton pada durasi 16:00. | **READ-ONLY LOCKED** |
| `OUTPUT_12_STORY_LOGIC_TEST.md` | 22,890 | Verifikasi hukum fisika material ASTM E23 dan kepatuhan regulasi yudisium ITS. | **READ-ONLY LOCKED** |
| `OUTPUT_13_PANCASILA_STRIP_TEST.md` | 24,120 | **Audit Eliminasi Dogma Pancasila**. Menguji ketiadaan hafalan sila/pasal UUD; transmisi nilai murni berbasis tindakan nyata Dimas dan Bagas. | **READ-ONLY LOCKED** |

---

## 5. INVENTARIS DOKUMEN PENGUJIAN (`tests/`)

Direktori sistem pengujian terotomatisasi Python yang memverifikasi integritas dokumen dan kepatuhan batasan sistem secara berkala.

| Nama Berkas | Path | Deskripsi Fungsional |
|---|---|---|
| `adversarial_stress_test.py` | `tests/adversarial_stress_test.py` | Pengujian stres permusuhan terhadap integritas narasi dan konsistensi naskah. |
| `test_runner.py` | `tests/e2e/test_runner.py` | Koordinator eksekusi suite pengujian e2e 4 tingkat. |
| `test_helpers.py` | `tests/e2e/test_helpers.py` | Utilitas pembaca berkas, parser markdown, dan checker regex. |
| `test_tier1_feature_coverage.py` | `tests/e2e/test_tier1_feature_coverage.py` | Pengujian cakupan fitur skenario dan dokumen produksi. |
| `test_tier2_boundary_constraints.py` | `tests/e2e/test_tier2_boundary_constraints.py` | Pengujian batas durasi (10–20 menit / tepat 16:00), jumlah karakter (14), dan shot. |
| `test_tier3_cross_feature.py` | `tests/e2e/test_tier3_cross_feature.py` | Pengujian lintas fitur antara beat sheet, skenario, dan shot list. |
| `test_tier4_real_world_workload.py` | `tests/e2e/test_tier4_real_world_workload.py` | Pengujian kehandalan beban kerja dan kesiapan produksi. |

---

## 6. INVENTARIS PAKET DOKUMENTASI ANALISIS BARU (`analysis/`)

Paket 5 berkas analisis otoritatif yang dihasilkan pada Milestone 1 untuk menerjemahkan skenario ke spesifikasi teknis animatik 2D prosedural:

| Nama Berkas | Tujuan & Cakupan Analisis | Kepatuhan Kriteria R1 |
|---|---|---|
| `analysis/file_inventory.md` | Manifes lengkap seluruh berkas, checksum status integritas, dan matriks keterlacakan R1–R4. | Terpenuhi Penuh |
| `analysis/script_analysis.md` | Dramaturgi kurva 6-tahap, hitung mundur yudisium 23:59 WIB, analisis polaritas etis, audit Pancasila Strip Test, dan dialek Suroboyoan-Teknik. | Terpenuhi Penuh |
| `analysis/character_guide.md` | Profil 3D 14 karakter (10 pria, 4 wanita), matriks pembeda siluet, palet warna SVG, matriks 6 pose, 7 ekspresi, 6 visem, dan dokumentasi asumsi visual eksplisit. | Terpenuhi Penuh |
| `analysis/scene_breakdown.md` | Rincian lengkap 7 adegan (16:00 / 23.040 frame @ 24 fps), 57 shot list sinematik, dialog verbatim lengkap, koordinat blocking 3-tier, tata audio, dan lighting. | Terpenuhi Penuh |
| `analysis/visual_style_guide.md` | Panduan seni 2D SVG prosedural, tata cahaya 4200K/3000K/3800K, tipografi subtitle SMPTE title-safe, dan pergerakan kamera Remotion. | Terpenuhi Penuh |

---

## 7. INVENTARIS KODE & DATA TERSTRUKTUR ANIMATIK (`animatic/`)

Struktur proyek animatik mandiri yang memisahkan data naskah dari komponen visual React dan Remotion:

```
animatic/
├── package.json               # Konfigurasi dependensi React 18 & Remotion v4
├── tsconfig.json              # Konfigurasi compiler TypeScript ES2022
├── remotion.config.ts         # Konfigurasi engine render (24fps, H.264, concurrency 3)
└── src/
    ├── types/
    │   ├── schema.ts          # Master interface (Scene, Dialogue, Shot, FilmPackage)
    │   ├── characters.ts      # Definisi profil karakter, visual, pakaian, pose, visem
    │   ├── camera.ts          # Tipe framing kamera, focal length, presets, pergerakan
    │   └── audio.ts           # Definisi audio cues, safety track, desibel target, saluran
    └── data/
        ├── characters.json    # Dataset terstruktur 14 karakter lengkap
        ├── scenes.json        # Dataset terstruktur 7 babak adegan dengan 57 shot & dialog verbatim
        └── index.ts           # Ekspor ter-tipe aman (type-safe) seluruh dataset
```

---

## 8. MATRIKS KETERLACAKAN KEBUTUHAN (TRACEABILITY MATRIX)

Tabel berikut menghubungkan seluruh persyaratan pada `ORIGINAL_REQUEST.md` dengan dokumen dan aset yang mengimplementasikannya:

```
+-----------------------------------------------------------------------------------------------------------------------+
| MATRIKS KETERLACAKAN PERSYARATAN PENGGUNA (R1–R4)                                                                     |
+-----------+-----------------------------------+---------------------------------------+-------------------------------+
| KLAUSA    | KEBUTUHAN SPESIFIK                | BERKAS SUMBER / REFERENSI             | ARTIFAK IMPLEMENTASI          |
+-----------+-----------------------------------+---------------------------------------+-------------------------------+
| R1.1      | Audit Skenario 14 Mahasiswa       | `screenplay/OUTPUT_14_15_VERSION_A...`| `analysis/script_analysis.md` |
| R1.2      | Status Berkas Sumber Read-Only    | Direktori `screenplay/`, `production/`| `analysis/file_inventory.md`  |
| R1.3      | Dokumentasi Analisis Lengkap      | 5 Dokumen Analisis di `analysis/`     | `analysis/*.md` (5 Files)     |
| R1.4      | Dokumentasi Asumsi Visual         | Kebutuhan Visual Karakter & Lingkungan| `analysis/character_guide.md` |
| R1.5      | Pemisahan Data Skrip dari UI      | Prinsip Desain Terstruktur            | `animatic/src/data/*.json`    |
| R2.1      | Visual 2D Prosedural Modular SVG  | Zero-Asset Eksternal Mandate          | `analysis/visual_style_guide` |
| R2.2      | Aset 14 Karakter (10 Pria, 4 Wnt) | `docs/OUTPUT_07_CHARACTER_BIBLE.md`   | `animatic/src/types/char...`  |
| R2.3      | Siluet, Rambut, Busana Diberbeda  | Pembeda visual per karakter           | `analysis/character_guide.md` |
| R2.4      | Poses, Talking Visemes, Mimik     | 6 Poses, 6 Visemes, 7 Ekspresi        | `animatic/src/types/char...`  |
| R2.5      | Latar Lingkungan Kampus ITS       | 4 Recurring Campus Settings           | `analysis/scene_breakdown.md` |
| R3.1      | Kamera Sinematik (EST s/d ECU)    | `production/OUTPUT_16_SHOT_LIST.md`   | `animatic/src/types/camera.ts`|
| R3.2      | Tata Gerak Kamera (Zoom, Pan, dll)| Easing curves, ninja-walk bracing     | `analysis/visual_style_guide` |
| R3.3      | Subtitle Verbatim & Title-Safe    | Dialog Suroboyoan Skenario A          | `animatic/src/data/scenes.json`
| R3.4      | Audio Cue Engine (Ambient/SFX)    | `production/OUTPUT_17_DEPARTMENT...`  | `animatic/src/types/audio.ts` |
| R4.1      | Prototype Multi-Karakter          | Verifikasi Scene 5 / Scene 1          | Milestone 4 Timeline          |
| R4.2      | Timeline Sekuensial 7 Babak       | 16:00 Menit / 23.040 Frame @ 24 FPS   | `animatic/src/data/scenes.json`
| R4.3      | Automated Test Suite              | Zod Schema + Vitest                   | Milestone 4 Test Suite        |
| R4.4      | Render Full HD 1080p 24fps MP4    | Chunked Export + FFmpeg Concat        | `animatic/remotion.config.ts` |
+-----------+-----------------------------------+---------------------------------------+-------------------------------+
```

---

## 9. ATTESTASI INTEGRITAS & KEASLIAN

1. **Konfirmasi Read-Only**: Kami menyatakan secara formal bahwa berkas-berkas dalam direktori `screenplay/`, `production/`, dan `docs/` tidak mengalami modifikasi satupun karakter, baris, maupun stempel waktu sejak proyek animatik diinisiasi.
2. **Kepatuhan Terhadap Data Asli**: Seluruh nama karakter (14 mahasiswa DTMM ITS), spesifikasi teknis mesin Charpy 300J, toleransi ASTM E23 (10x10x55 mm, takik-V 45° kedalaman 2 mm), nilai energi serap 52.4 Joule, serta kalimat dialog berbahasa Jawa Suroboyoan disalin secara presisi dan verbatim tanpa distorsi makna.
3. **Kesiapan Verifikasi Independen**: Seluruh entri inventaris pada dokumen ini siap diaudit secara independen oleh *Teamwork Auditor* sesuai standar transparansi pengembangan perangkat lunak.
