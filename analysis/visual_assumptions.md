# DAFTAR ASUMSI VISUAL & INTERPRETASI PRODUKSI (VISUAL ASSUMPTIONS CATALOG)
## Dokumentasi Otoritatif Asumsi Visual, Interpretasi Sinematik, Parameter Teknis, dan Matriks Verifikasi Skenario
**Proyek**: Film Pendek Animatic 2D Sinematik *SPESIMEN TERAKHIR* (The Final Specimen)  
**Afiliasi**: Departemen Teknik Material dan Metalurgi (DTMM), Fakultas Teknologi Industri dan Rekayasa Sistem (FTIRS), Institut Teknologi Sepuluh Nopember (ITS), Surabaya  
**Milestone**: M1 (R1 Screenplay Audit, Structured Scene Data, and Documentation — Binding Directive Gate Review)  
**Status**: Authoritative Production Deliverable  
**Tanggal**: 2026-11-04  
**Standar Timeline**: 24 FPS Konstan | Resolusi 1920x1080 Full HD (16:9) | Durasi Tepat 16:00 (23.040 Frame)  

---

## 1. PENDAHULUAN & PRINSIP PEMISAHAN FAKTA SKENARIO VS ASUMSI PRODUKSI

Sesuai dengan arahan tata kelola proyek (Milestone 1, Bagian 5, 11, dan 15C), setiap komponen visual, teknis, spasial, akustik, dan dramaturgis yang **tidak tertera secara eksplisit dan harfiah di dalam naskah skenario kanonikal** (`screenplay/OUTPUT_14_15_VERSION_A_SCREENPLAY_ALL_14.md`) wajib didefinisikan, diklasifikasikan, dan ditandai secara formal.

### Konvensi Pelabelan Formal:
1. **`[Fakta Skenario]`**: Fakta naratif, peristiwa, dialog verbatim, atau petunjuk lakuan yang tertulis langsung pada naskah skenario asli.
2. **`[Asumsi Visual]`**: Keputusan visual yang dirancang untuk mewujudkan naskah menjadi bentuk visual grafis 2D SVG/CSS, mencakup pilihan shot, sudut kamera, palet warna hex, detail busana, siluet, tata letak spasial, dan pencahayaan Kelvin.
3. **`[Interpretasi Produksi]`**: Keputusan teknis penyutradaraan, rekayasa audio SFX, kalibrasi transisi, dinamika tempo adegan, dan parameter sistem Remotion yang menjamin kepatuhan terhadap standar industri film dan kuota frame (23.040 frame @ 24 fps).

Dokumen ini mengompilasi seluruh asumsi visual dan interpretasi produksi ke dalam 6 kategori utama serta menyajikan matriks perbandingan babak demi babak (*Scene-by-Scene Script-to-Assumption Matrix*).

---

## 2. KATEGORI 1: TATA KAMERA & SINEMATOGRAFI (CAMERA & CINEMATOGRAPHY)

Naskah skenario menetapkan filosofi umum "Zero-Budget Smartphone Filmmaking, Handheld Bracing / Passive Ninja-Walk, Shutter Speed 1/50s pada 25 fps, lensa ekuivalen 26mm & 52mm". Seluruh pembagian shot spesifik, durasi, pergerakan, dan batas frame di bawah ini adalah **`[Asumsi Visual]`** dan **`[Interpretasi Produksi]`**.

### A. Matriks 57 Shot & Pilihan Lensa Sinematik `[Interpretasi Produksi]`
Total 57 shot didistribusikan ke dalam 7 adegan secara proporsional untuk menjaga ritme dramatis tanpa melanggar kuota 23.040 frame:
- **Scene 1 (180s / 4320 frames)**: 9 Shot (`SHOT_1_01` s.d. `SHOT_1_09`) — Rasio lensa: 5 shot 52mm (detail spesimen, micro-expression), 4 shot 26mm (spatial awareness 14 orang).
- **Scene 2 (150s / 3600 frames)**: 8 Shot (`SHOT_2_01` s.d. `SHOT_2_08`) — Fokus benturan hak modal: kombinasi MCU 52mm dan Low-Angle Two-Shot Dimas-Aryo.
- **Scene 3 (180s / 4320 frames)**: 9 Shot (`SHOT_3_01` s.d. `SHOT_3_09`) — Dinamika debat voting CSV: panning cepat 26mm menyapu 9 tangan terangkat, disusul Close-Up Kevin & Reza.
- **Scene 4 (180s / 4320 frames)**: 9 Shot (`SHOT_4_01` s.d. `SHOT_4_09`) — Chiaroscuro 3000K: Dutch Angle ringan saat kabel dicabut, ECU mata Dimas, OTS Bagas-Dimas.
- **Scene 5 (120s / 2880 frames)**: 8 Shot (`SHOT_5_01` s.d. `SHOT_5_08`) — Pengujian Charpy: High-speed tracking ayunan pendulum 300J, freeze microsecond pada kontak takik, Slow-Mo 48fps ekuivalen.
- **Scene 6 (75s / 1800 frames)**: 7 Shot (`SHOT_6_01` s.d. `SHOT_6_07`) — Katarsis koridor: Two-shot Zul-Dimas, MCU Kirana membuka portofolio kerja.
- **Scene 7 (75s / 1800 frames)**: 7 Shot (`SHOT_7_01` s.d. `SHOT_7_07`) — Komuni tahu goreng: Wide-shot tangga, slow backward pull-out (Ninja-Walk), Graphic lock hening.

### B. Karakteristik Pergerakan Kamera Prosedural `[Asumsi Visual]`
1. **Passive Handheld Bracing Simulation**: Kamera tidak pernah statis kaku 100% pada shot emosional; Remotion menerapkan fungsi sinusoidal halus (`Math.sin(frame * 0.05) * 1.5px`) untuk meniru nafas operator kamera smartphone.
2. **Focal Length Field of View (FOV)**:
   - Lensa Wide 26mm: Ditransformasikan pada skala CSS `transform: scale(1.0)` dengan sudut pandang lebar 79°.
   - Lensa Tele/Portrait 52mm: Ditransformasikan pada skala CSS `transform: scale(1.45) translate(X, Y)` untuk isolasi emosi karakter dengan sudut pandang 45°.
3. **Penyelarasan Framerate 24 FPS `[Interpretasi Produksi]`**: Naskah menyebut referensi 25 fps PAL, namun spesifikasi animasi master Remotion disepakati terkunci pada **24 FPS konstan** (960 detik = tepat 23.040 frame) sesuai standar proyek film bioskop internasional.

---

## 3. KATEGORI 2: TATA PANGGUNG, KOORDINAT & STAGING SPASIAL (STAGING & BLOCKING)

Naskah skenario memberikan arahan blocking naratif (misal: "Hendro di foreground, Aryo di midground, Zul di background"). Seluruh koordinat piksel, layer paralaks, matriks skala, pose, ekspresi, dan visem di bawah ini adalah **`[Asumsi Visual]`** dan **`[Interpretasi Produksi]`**.

### A. Arsitektur 4-Layer Paralaks Spasial `[Asumsi Visual]`
Canvas panggung berukuran 1920x1080 piksel dibagi ke dalam 4 layer kedalaman:
1. **Layer 1: Far Background (Depth 0.2, Z-Index 10)**: Dinding keramik lab (`#E2E8F0`), kisi jendela kaca berembun hujan, pilar beton Gedung W.
2. **Layer 2: Midground Environment (Depth 0.6, Z-Index 20)**: Papan tulis putih berjadwal, mesin uji Charpy 300J, mesin uji tarik UTM, lemari instrumen metalurgi, tabung gas argon.
3. **Layer 3: Character Staging Stage (Depth 1.0, Z-Index 30–50)**: Meja kayu preparasi panjang, meja bundar diskusi, ke-14 karakter mahasiswa dengan Z-index adaptif berdasarkan jarak ke kamera.
4. **Layer 4: Foreground Overlay (Depth 1.3, Z-Index 60)**: Ujung meja terpotong (*cut-off foreground table*), uap dingin nitrogen cair (`<feTurbulence>` filter), bayangan kap lampu belajar leher angsa.

### B. Matriks Skala Tinggi & Posisi Koordinat Default 14 Karakter `[Asumsi Visual]`
Semua karakter memiliki bounding box normalisasi `viewBox="0 0 200 480"`. Skala tubuh disesuaikan terhadap referensi standar Aryo (172 cm = 1.00):
```
+----+----------------------+---+--------+-------+---------------+---------------+---------------------------------------+
| NO | NAMA KARAKTER        | G | TINGGI | SKALA | DEFAULT X (px)| DEFAULT Y (px)| PERAN SPASIAL DOMINAN                |
+----+----------------------+---+--------+-------+---------------+---------------+---------------------------------------+
| 1  | Aryo Wicaksono       | L | 172 cm | 1.00  | 860 px        | 380 px        | Tengah Meja Preparasi (Mediator)      |
| 2  | Dimas Pratama        | L | 175 cm | 1.02  | 1150 px       | 360 px        | Sayap Kanan (Vektor Dominan/Kapital)  |
| 3  | Bagas Triatmojo      | L | 168 cm | 0.98  | 550 px        | 390 px        | Sayap Kiri (Vektor Kerentanan/Moral)  |
| 4  | Fajar Nurhadi        | L | 170 cm | 0.99  | 1380 px       | 370 px        | Area Mesin Charpy & Dewar (SOP K3L)   |
| 5  | Reza Kurniawan       | L | 173 cm | 1.01  | 680 px        | 375 px        | Dekat Bagas (Juru Bicara Keadilan)    |
| 6  | Hendro Setyawan      | L | 169 cm | 0.98  | 350 px        | 420 px        | Foreground Meja Ragum/Kikir           |
| 7  | Farhan "Kancil" R.   | L | 171 cm | 1.00  | 980 px        | 350 px        | Duduk di Atas Meja (Pragmatis)        |
| 8  | Kevin Tanuwijaya     | L | 176 cm | 1.03  | 1280 px       | 400 px        | Meja Laptop/SIM ITS (Neurotik Data)   |
| 9  | Danang Prasetyo      | L | 170 cm | 0.99  | 250 px        | 360 px        | Pojok Dispenser/Galon Air (Juru Damai)|
| 10 | Zulfikar "Zul" Hakim | L | 178 cm | 1.04  | 1620 px       | 330 px        | Ambang Kusen Pintu Lab (Pengamat Luar)|
| 11 | Nadia Putri Anindya  | P | 162 cm | 0.94  | 780 px        | 370 px        | Meja Tengah / Stopkontak PC (Sains)   |
| 12 | Maya Anggraini       | P | 160 cm | 0.93  | 480 px        | 395 px        | Samping Bagas (Empati Medis)          |
| 13 | Siti Rahma "Rere"    | P | 156 cm | 0.92  | 620 px        | 405 px        | Depan Meja Bundar (Penentang Vokal)   |
| 14 | Kirana Dewi          | P | 165 cm | 0.96  | 1060 px       | 365 px        | Samping Dimas (Koneksi Industri)      |
+----+----------------------+---+--------+-------+---------------+---------------+---------------------------------------+
```

### C. Matriks 10 Ekspresi Wajah & Artikulasi Rigging SVG `[Asumsi Visual]`
Setiap ekspresi diimplementasikan melalui perubahan parameter path SVG pada kelopak mata, pupil, alis, dan sudut bibir:
1. **Normal**: Alis mendatar netral (`y=28`), pupil di tengah (`cx=100`), bibir tertutup lurus.
2. **Happy**: Alis melengkung naik (`y=24`), kelopak mata bawah naik melengkung (*crescent eyes*), sudut bibir melengkung ke atas (`M 88,68 Q 100,78 112,68`).
3. **Sad**: Alis bagian dalam terangkat membentuk sudut atap (`d="M 85,26 Q 95,22 105,28"`), pupil agak mengecil, sudut bibir turun ke bawah (`Q 100,62`).
4. **Angry**: Alis menukik tajam ke arah hidung (`d="M 85,24 L 105,32"`), pupil menyempit tajam, rahang mengeras persegi.
5. **Confused**: Alis asimetris (kiri naik `y=22`, kanan berkerut turun `y=32`), pupil melirik ke sudut kanan atas, bibir bergelombang sedikit miring.
6. **Nervous**: Pupil bergetar mikro (`shake` CSS), alis terangkat tegang mendatar, butiran keringat dingin (`<path class="sweat-drop">`) di pelipis.
7. **Suspicious**: Kelopak mata menyipit tajam (*squint* 40% celah), alis menyatu turun, pupil melirik horizontal ke samping target.
8. **Shocked**: Mata terbuka lebar maksimal (*sclera* putih tampak di sekeliling iris), pupil mengecil dramatis, mulut terbuka lonjong vertikal (`rx=8, ry=14`).
9. **Disappointed**: Kelopak mata atas turun 60% (*half-lidded*), tatapan mengarah ke lantai, helaan nafas bibir sedikit terbuka layu.
10. **Serious**: Alis lurus tegang merapat, tatapan tajam terkunci ke lawan bicara, rahang mengatup rapat tanpa senyum.

### D. Sistem 6 Visem Fonetik Lip-Sync Prosedural `[Interpretasi Produksi]`
Untuk sinkronisasi ucapan dialog verbatim tanpa rekaman mocap, Remotion menggerakkan shape mulut di antara 6 target visem:
- `rest`: Mulut tertutup santai (`d="M 90,68 Q 100,70 110,68"`).
- `A_I`: Mulut terbuka lebar vertikal-horizontal (vokal A, I, Ya).
- `U`: Mulut mencucu kecil bulat (vokal U, W, O sempit).
- `E_O`: Mulut terbuka oval sedang (vokal E, O, R).
- `M_B_P`: Bibir terkatup rapat merata dan sedikit menekan (konsonan bilabial M, B, P).
- `L_D_T`: Lidah menyentuh langit-langit atas, mulut terbuka horizontal (konsonan dental L, D, T, N, S).

---

## 4. KATEGORI 3: TATA CAHAYA, SUHU KELVIN & SHADING (LIGHTING & SHADING)

Naskah skenario menyebut pencahayaan alami/praktis lab (TL 4200K, meja 3000K, selasar 3800K). Seluruh nilai heksadesimal warna, arah sudut jatuh cahaya, koordinat gradien, dan opasitas bayangan cel-shaded di bawah ini adalah **`[Asumsi Visual]`**.

### A. Tabel Parameter Iluminasi Digital Per Fase Adegan `[Asumsi Visual]`
```
+----------+-----------------------------+-------------+------------------+------------------+-----------------------+
| ADEGAN   | NAMA PENCAHAYAAN            | SUHU KELVIN | WARNA KEY LIGHT  | WARNA AMBIENT    | KARAKTERISTIK SHADING |
+----------+-----------------------------+-------------+------------------+------------------+-----------------------+
| Sc. 1,2,3| Institutional Fluorescent   | 4200K Netral| `#F1F5F9` (100%) | `#94A3B8` (40%)  | Cahaya datar atas,    |
| & Sc. 5  | Lab Pengujian Mekanik       |             |                  |                  | bayangan mata panda   |
+----------+-----------------------------+-------------+------------------+------------------+-----------------------+
| Scene 4  | Practical Chiaroscuro       | 3000K Hangat| `#FDE68A` (95%)  | `#09090B` (85%)  | Rembrandt lighting,   |
|          | Meja Bundar Pasca Kabel Off |             |                  |                  | kolam cahaya tajam    |
+----------+-----------------------------+-------------+------------------+------------------+-----------------------+
| Scene 6  | Transition Selasar Koridor  | 3800K Warm  | `#FEF3C7` (85%)  | `#1E293B` (55%)  | Downlight plafon,     |
|          | Gedung W FTIRS ITS          |             |                  |                  | siluet pilar beton    |
+----------+-----------------------------+-------------+------------------+------------------+-----------------------+
| Scene 7  | Outdoor Campustown Sukolilo | 3800K +     | `#FDE047` (70%)  | `#0F172A` (90%)  | Siluet kontemplatif,  |
|          | Tangga Semen & Taman Kampus | Malam Langit|                  |                  | pendar biru malam     |
+----------+-----------------------------+-------------+------------------+------------------+-----------------------+
```

### B. Spesifikasi Gradien Vektor SVG & Bayangan Cel-Shaded `[Asumsi Visual]`
- **Filter Cel-Shading**: Menggunakan `<linearGradient x1="0" y1="0" x2="0" y2="1">` dengan transisi warna tegas (*hard stop*) pada titik 65% untuk memisahkan bidang terkena cahaya langsung (*lit area*) dan bidang bayangan (*shaded area*).
- **Efek Mata Panda & Kelelahan Fisik**: Setiap wajah karakter memiliki path bayangan kelopak mata bawah dengan warna semi-transparan `rgba(51, 65, 85, 0.35)` (`#334155`) untuk menegaskan kerja maraton 14 jam.
- **Efek Chiaroscuro Scene 4**: Menggunakan elemen SVG `<radialGradient id="deskLampLight" cx="50%" cy="50%" r="50%">` dengan stop 0% `#FDE68A` (opasitas 0.95), stop 60% `#D97706` (opasitas 0.4), dan stop 100% `#09090B` (opasitas 0.85).

---

## 5. KATEGORI 4: KARAKTER & PALET WARNA VEKTOR (CHARACTER DESIGN & PALETTES)

Naskah skenario memberikan gambaran usia, karakterisasi sosial, dan deskripsi umum (misal: "Dimas berkemeja rapi, Bagas berhoodie pudar"). Seluruh kode warna heksadesimal spesifik untuk kulit, rambut, pakaian dalam, jas lab, celana, dan sepatu di bawah ini adalah **`[Asumsi Visual]`**.

### A. Katalog Lengkap Palet Vektor 14 Karakter Mahasiswa DTMM ITS `[Asumsi Visual]`

#### 1. ARYO WICAKSONO (Laki-laki, 22 th) — Koordinator Angkatan
- **Tinggi / Skala**: 172 cm / `1.00`.
- **Warna Kulit**: Base `#D4A373`, Shadow `#B07D4F`.
- **Rambut**: Hitam lurus belah samping rapuh `#1E293B`.
- **Pakaian**: Kemeja polo navy `#1E3A8A`, Jas lab putih ITS `#F8FAFC` (Shading `#CBD5E1`), Celana Chino arang `#334155`, Sepatu kanvas hitam `#0F172A`.
- **Atribut Ikonik**: Clipboard kayu cokelat `#B45309` dengan lembar BAP bertanda draf merah.
- *Asumsi Visual Khusus*: Kemeja polo navy berkerah dipilih untuk merepresentasikan wibawa ketua kelompok formal yang tetap membumi di bengkel.

#### 2. DIMAS PRATAMA (Laki-laki, 23 th) — Sang Pragmatis Berbeban Rahasia
- **Tinggi / Skala**: 175 cm / `1.02`.
- **Warna Kulit**: Kuning langsat bersih `#E2B184`, Shadow `#C28B5C`.
- **Rambut**: Pompadour undercut pomade klimis `#0F172A`.
- **Pakaian**: Flanel kotak merah bata-hitam `#991B1B` & `#18181B`, Jas lab dua kancing, Celana katun hitam pekat `#09090B`, Sepatu kasual cokelat mengkilap `#451A03`.
- **Atribut Ikonik**: Jam tangan stainless steel Casio perak `#94A3B8`, Map kulit sintetis hitam, Bukti transfer BCA Rp 4.500.000.
- *Asumsi Visual Khusus*: Kemeja flanel merah tebal melambangkan arogansi visual awal yang menyamarkan kepanikan utang rentenir keluarga.

#### 3. BAGAS TRIATMOJO (Laki-laki, 23 th) — Pejuang Sunyi di Ambang DO
- **Tinggi / Skala**: 168 cm / `0.98`.
- **Warna Kulit**: Sawo matang gelap pekerja fisik `#C68642`, Shadow `#9E5D24`.
- **Rambut**: Hitam kusam menutupi dahi `#1C1917`.
- **Pakaian**: Hoodie HMMT abu-abu pudar basah gerimis `#475569`, Kaos oblong abu kusam `#64748B`, Celana jeans belel pudar `#334155`, Sepatu sneakers usang bertambal `#1E293B`.
- **Atribut Ikonik**: Kwitansi rumah sakit RSUD Blitar merah jambu `#F43F5E` dengan stempel ungu.
- *Asumsi Visual Khusus*: Efek basah rintik hujan pada bahu hoodie di Scene 1 menandakan perjalanan motor jauh dari Blitar/Keputih tanpa jas hujan memadai.

#### 4. FAJAR NURHADI (Laki-laki, 22 th) — Asisten Lab & Penegak K3L
- **Tinggi / Skala**: 170 cm / `0.99`.
- **Warna Kulit**: Kuning langsat netral `#DEB887`, Shadow `#B88E56`.
- **Rambut**: Cepak militer/taruna kaku `#0C0A09`.
- **Pakaian**: Kaos polo putih standar `#FFFFFF`, Jas lab terkancing sempurna hingga kerah atas, Kacamata safety goggle hijau neon `#059669` (Scene 5), Celana drill biru tua `#1E3A8A`, Sepatu safety berkulit baja `#18181B`.
- **Atribut Ikonik**: Stopwatch digital gantung tali leher hitam, Logbook K3L merah marun.
- *Asumsi Visual Khusus*: Postur berdiri kaku 90 derajat dengan stopwatch tergantung mencerminkan integritas kepatuhan prosedur ASTM.

#### 5. REZA KURNIAWAN (Laki-laki, 23 th) — Mantan Aktivis Kampus
- **Tinggi / Skala**: 173 cm / `1.01`.
- **Warna Kulit**: Sawo matang tropis `#CD853F`, Shadow `#A45E20`.
- **Rambut**: Ikal mengembang lebat bervolume `#171717`.
- **Pakaian**: T-shirt hitam sablon grafis pergerakan pudar `#18181B`, Jaket kemeja kanvas zaitun `#3F4E38`, Celana kargo banyak saku `#27272A`, Sandal gunung tali kanvas hitam `#09090B`.
- **Atribut Ikonik**: Tas selempang kanvas lusuh, gelang tali prusik etnik di pergelangan tangan kiri.
- *Asumsi Visual Khusus*: Rambut ikal bervolume dan jaket kargo militer merefleksikan identitas sosiologis mantan juru runding jalanan dan aktivis advokasi mahasiswa.

#### 6. HENDRO SETYAWAN (Laki-laki, 22 th) — Sang Pengrajin Spesimen
- **Tinggi / Skala**: 169 cm / `0.98`.
- **Warna Kulit**: Tembaga kecokelatan berpeluh `#C68642`, Shadow `#9A5920`.
- **Rambut**: Cepak kasar berminyak `#262626`.
- **Pakaian**: Kaus oblong abu-abu pudar bercak oli `#4B5563`, Celemek kerja lab kanvas tebal abu gelap `#374151`, Celana jeans kokoh `#1F2937`, Sepatu boot karet tahan benturan `#111827`.
- **Atribut Ikonik**: Mikrometer sekrup analog Mitutoyo `#94A3B8`, Kikir tangan baja perak, Kotak kayu spesimen beralas beludru merah `#991B1B`.
- *Asumsi Visual Khusus*: Celemek bengkel abu-abu digunakan alih-alih jas lab putih standar karena aktivitas pemolesan intan dan debu kikir logam.

#### 7. FARHAN "KANCIL" RAMADHAN (Laki-laki, 22 th) — Sang Pragmatis Cerdik
- **Tinggi / Skala**: 171 cm / `1.00`.
- **Warna Kulit**: Sawo matang terang `#D2A679`, Shadow `#AB7B4F`.
- **Rambut**: Undercut taper modern `#171717`.
- **Pakaian**: Jaket bomber parasut hitam terbuka `#18181B`, Kaus putih sablon distro `#F8FAFC`, Celana jogger hitam elastis `#27272A`, Sneakers running modern abu-abu `#4B5563`.
- **Atribut Ikonik**: Flashdisk SanDisk merah menyala `#EF4444` berkapasitas script CSV duplikat.
- *Asumsi Visual Khusus*: Duduk bertengger santai di sudut meja preparasi dengan jaket bomber terbuka mencirikan kelincahan jalan pintas pragmatis.

#### 8. KEVIN TANUWIJAYA (Laki-laki, 21 th) — Sang Perfeksionis Neurotik
- **Tinggi / Skala**: 176 cm / `1.03`.
- **Warna Kulit**: Putih oriental cerah `#F3D2B8`, Shadow `#D8A682`.
- **Rambut**: Belah samping klimis berkilau `#0A0A0A`.
- **Pakaian**: Kemeja garis-garis biru muda formal `#60A5FA` & `#EFF6FF`, Jas lab bersih disetrika rapi, Celana formal abu-abu muda `#475569`, Kacamata berbingkai kawat tipis perak `#94A3B8`.
- **Atribut Ikonik**: Laptop Asus ROG abu metalik dengan layar grafik OriginLab dan portal SIM ITS.
- *Asumsi Visual Khusus*: Kacamata perak kawat memantulkan pendaran biru layar laptop secara konstan untuk menggarisbawahi kecemasan angka desimal IPK 3.92.

#### 9. DANANG PRASETYO (Laki-laki, 22 th) — Sang Juru Damai Ramah
- **Tinggi / Skala**: 170 cm / `0.99`.
- **Warna Kulit**: Sawo matang Jawa klasik `#C68B59`, Shadow `#9A6034`.
- **Rambut**: Pendek ikal rapi `#1F2937`.
- **Pakaian**: Kaos polo katun abu-abu melange `#6B7280`, Jas lab longgar tak terkancing, Celana corduroy cokelat gelap `#3F2E23`, Sepatu kets kasual cokelat `#573D26`.
- **Atribut Ikonik**: Botol air mineral biru transparan 1.5 liter `#0284C7` dan renteng gelas plastik.
- *Asumsi Visual Khusus*: Bentuk tubuh lebih lebar dan membulat dengan gestur menengahi menggunakan botol air menegaskan peran penenang tensi kelompok.

#### 10. ZULFIKAR "ZUL" HAKIM (Laki-laki, 24 th) — Sang Senior Pengamat
- **Tinggi / Skala**: 178 cm / `1.04`.
- **Warna Kulit**: Gelap matang khas pesisir Madura `#B87333`, Shadow `#8A4C18`.
- **Rambut**: Belakang gondrong bergelombang diikat karet gelang kecil `#18181B`.
- **Pakaian**: Kemeja safari abu tua kelabu `#78716C`, Jas lab kusam disampirkan di satu bahu, Celana katun kargo pudar `#292524`, Sandal selop kulit cokelat tua `#3E2723`.
- **Atribut Ikonik**: Korek gas hijau Tokai `#16A34A` yang diputar-putar di jemari.
- *Asumsi Visual Khusus*: Tubuh paling jangkung yang selalu bersandar pada tiang atau kusen pintu lab menegaskan posisinya sebagai pengamat di ambang kelulusan semester 12.

#### 11. NADIA PUTRI ANINDYA (Perempuan, 22 th) — Pembela Integritas Sains
- **Tinggi / Skala**: 162 cm / `0.94`.
- **Warna Kulit**: Kuning langsat bersih terawat `#F0D5BA`, Shadow `#CA9E7E`.
- **Rambut / Hijab**: Jilbab paris biru dongker tua simetris rapi tanpa lipatan kusut `#0F172A`.
- **Pakaian**: Blus tunik putih formal berkerah sanghai `#F8FAFC`, Jas lab terkancing rapi dengan peniti simetris, Celana kulot panjang kain hitam longgar `#18181B`, Sepatu flat shoes hitam formal `#09090B`.
- **Atribut Ikonik**: Jangka sorong digital stainless steel berlayar LCD biru `#38BDF8`, stopkontak kabel PC lab.
- *Asumsi Visual Khusus*: Jilbab biru dongker gelap simetris dipadu kacamata frameless menegaskan kepribadian saintifik yang dingin, metodologis, dan tak terbeli.

#### 12. MAYA ANGGRAINI (Perempuan, 22 th) — Sang Penjaga Empati
- **Tinggi / Skala**: 160 cm / `0.93`.
- **Warna Kulit**: Kuning langsat lembut `#EBCBB0`, Shadow `#C49B7D`.
- **Rambut**: Rambut hitam panjang dikuncir kuda rapi ke belakang dengan scrunchie beludru cokelat `#1E293B`.
- **Pakaian**: Kardigan rajut kancing warna merah muda pastel `#FBCFE8`, Jas lab tipis, Celana katun abu-abu lembut `#64748B`, Sepatu slip-on kanvas abu-abu `#475569`.
- **Atribut Ikonik**: Botol minyak kayu putih kecil tutup hijau `#10B981` dan kantong permen jahe.
- *Asumsi Visual Khusus*: Blus merah muda lembut di balik jas lab mencerminkan orientasi keilmuan biomaterial yang berfokus pada perawatan kemanusiaan (*caregiving*).

#### 13. SITI RAHMA "RERE" (Perempuan, 22 th) — Penantang Vokal Berjiwa Kritis
- **Tinggi / Skala**: 156 cm / `0.92`.
- **Warna Kulit**: Sawo matang hangat khas pedesaan `#C68642`, Shadow `#9E5D24`.
- **Rambut / Hijab**: Jilbab bergo instan kaos katun abu-abu arang praktis `#64748B`.
- **Pakaian**: Tunik oranye bata katun combed `#C2410C`, Jas lab yang lengan panjangnya digulung dua lipatan, Celana kulot katun gelap `#1E293B`, Sepatu kets tali hitam `#0F172A`.
- **Atribut Ikonik**: Kartu Tanda Mahasiswa (KTM) bertanda KIP-Kuliah kuning `#FDE047`, telunjuk menantang.
- *Asumsi Visual Khusus*: Postur tubuh paling mungil (156 cm) dengan lipatan lengan jas lab warisan kakak tingkat memperkuat kontras keberanian vokalnya menentang hegemoni modal Dimas.

#### 14. KIRANA DEWI (Perempuan, 22 th) — Sang Penghubung Korporat
- **Tinggi / Skala**: 165 cm / `0.96`.
- **Warna Kulit**: Kuning langsat halus cerah `#F5D6BA`, Shadow `#CE9D7B`.
- **Rambut**: Potongan rambut pendek bob asimetris rapi dengan anting mutiara kecil perak `#0F172A`.
- **Pakaian**: Blus kemeja sutra katun warna lavender muda `#C084FC`, Jas lab pas badan (*tailored fit*), Celana pipa bahan wool abu-abu gelap `#334155`, Sepatu heels kerja pantofel 3 cm hitam mengkilap `#09090B`.
- **Atribut Ikonik**: Map portofolio dokumen kulit sintetis cokelat marun `#451A03`, smartphone berlayar obrolan WhatsApp WhatsApp GM industri pipa baja.
- *Asumsi Visual Khusus*: Penampilan semi-korporat yang paling elegan mencerminkan perannya sebagai jembatan masa depan karir industri rekanan kampus.

---

## 6. KATEGORI 5: TATA SUARA & AKUSTIK (AUDIO DESIGN & SOUNDSCAPES)

Naskah skenario merinci dialog verbatim dan beberapa efek suara praktis (klak mikrometer, bantingan kertas, denting pendulum). Seluruh kode ID audio, level decibel target (dBFS), profil reverberasi ruangan (RT60), dan frekuensi akustik di bawah ini adalah **`[Interpretasi Produksi]`**.

### A. Inventaris Cue Efek Suara Prosedural `[Interpretasi Produksi]`
```
+--------------------+------------------------------+-----------+-------------+------------------------------------+
| CUE ID AUDIO       | NAMA EFEK SUARA (SFX)        | TARGET LVL| FREKUENSI   | KARAKTERISTIK AKUSTIK              |
+--------------------+------------------------------+-----------+-------------+------------------------------------+
| AUD_01_ROOMTONE    | Lab Mechanical Roomtone      | -24 dBFS  | 50 Hz Hum   | Dengung kompresor chiller AC lab   |
| AUD_01_MICROMETER  | Mitutoyo Ratchet Click       | -14 dBFS  | 3.2 kHz     | Klik logam mekanik tajam presisi   |
| AUD_02_DEWAR_HISS  | Cryogenic N2 Vapor Hiss      | -16 dBFS  | White Noise | Desisan uap nitrogen bertekanan    |
| AUD_02_PAPER_SLAM  | BCA Slip Paper Slam on Table | -12 dBFS  | 180 Hz Thud | Hantaman kertas tebal di meja kayu |
| AUD_03_KEYBOARD    | Neurotic Laptop Keystrokes   | -18 dBFS  | 2.5 kHz     | Ketukan cepat keyboard chiclet     |
| AUD_04_POWER_DOWN  | Electrical Cutoff Thump      | -10 dBFS  | 60 Hz Drop  | Pelepasan relay colokan daya PC    |
| AUD_05_CHARPY_SWING| Pendulum 30kg Air Whoosh     | -8 dBFS   | 120-400 Hz  | Desau massa pendulum membelah udara|
| AUD_05_CHARPY_HIT  | ASTM Impact Fracturing Gong  | 0 dBFS    | 850 Hz Ring | CLAAANNNGGG! Denting fraktur logam |
| AUD_06_SUBMIT_CHIME| SIM ITS Portal Success Chime | -14 dBFS  | 1.8 kHz Bel | Nada konfirmasi centang hijau      |
| AUD_07_TAHU_CRUNCH | Crispy Tofu Bite & Paper     | -14 dBFS  | 4.5 kHz     | Renyah gigitan tahu goreng warkop  |
+--------------------+------------------------------+-----------+-------------+------------------------------------+
```

### B. Profil Akustik Ruangan & RT60 `[Interpretasi Produksi]`
1. **Lab Pengujian Mekanik (Scene 1–5)**: RT60 = 0.85 detik. Dinding keramik keras, lantai semen cor industri, dan jendela kaca memantulkan pantulan awal (*early reflections*) yang dingin dan gersang.
2. **Koridor Gedung W (Scene 6)**: RT60 = 1.20 detik. Lorong memanjang semen ekspos menghasilkan gema lorong (*hallway slapback flutter*), memberikan sensasi pelepasan beban yang melegakan.
3. **Tangga Eksterior Gedung W (Scene 7)**: RT60 = 0.15 detik (Open-Air Acoustic). Suara dialog menjadi sangat kering dan intim di latar depan, diselimuti desau angin malam daun pohon ketapang dan suara jangkrik taman berjarak.

---

## 7. KATEGORI 6: PROPERTI, SET DRESSING & GRAFIS ANTARMUKA (PROPS & SETS)

Naskah skenario menyebut adanya mikrometer, jangka sorong, kotak spesimen, laptop, bejana dewar, mesin Charpy, dan tahu goreng. Seluruh detail dimensi, warna label, antarmuka grafis digital, dan kemasan di bawah ini adalah **`[Asumsi Visual]`**.

### A. Inventaris Detail Properti Penting `[Asumsi Visual]`
1. **Kotak Kayu Spesimen ASTM E23**: Kotak mahoni persegi berengsel kuningan (`#78350F`) dengan interior kain beludru merah kirmizi (`#991B1B`). Memiliki 10 slot kupon uji berukuran 10x10x55 mm. 9 slot terisi batang bernoda spidol silang merah X tebal afkir; slot ke-10 di sudut kanan bawah terisi spesimen terakhir yang berkilau bersih dipoles kikir intan.
2. **Mikrometer Sekrup Mitutoyo Analog**: Model 103-137 perak abu-abu (`#94A3B8`) dengan skala vernier thimble hitam bergaris putih presisi 0.01 mm.
3. **Bejana Dewar Nitrogen Cair**: Tabung silinder aluminium cryogenic 10 liter (`#CBD5E1`) dengan label hazard segitiga kuning kusam `CRYOGENIC LIQUID N2 -196°C`. Mulut tabung diselimuti kristal es putih tebal dengan desisan uap dingin mengambang di lantai semen.
4. **Mesin Impak Charpy 300 Joule**: Rangka besi cor raksasa warna hijau industri pudar (`#2E4F4F` / `#065F46`), dial indikator jarum bundar berdiameter 30 cm dengan skala 0–300 Joule warna putih berjarum merah. Pendulum baja 30 kg berayun dari puncak tiang. Batas pengaman di lantai berupa garis lakban silang diagonal kuning-hitam berjarak 1.5 meter dari sumbu ayun.
5. **Laptop & Antarmuka Layar SIM ITS**: Layar 15.6 inci menampilkan browser dengan portal resmi sistem akademik universitas: header biru ITS (`#003366`), nama mahasiswa Bagas Triatmojo & Dimas Pratama, kolom `Nilai Uji Impak Sub-Zero (-40°C)` dengan status bertanda seru oranye berkedip `Data Belum Terunggah - Batas Waktu 23:59:00 WIB`.
6. **Berkas Dokumen Yudisium & Keuangan**:
   - Lembar Bukti Setoran Transfer Bank BCA: Kertas struk putih dengan header biru BCA, tercetak nominal `Rp 4.500.000,00` untuk pembelian billet baja paduan AISI 4340.
   - Kwitansi RSUD Blitar: Kertas NCR tipis warna merah jambu pudar (`#F43F5E`) dengan cap stempel bulat tinta ungu basah dan perincian tagihan ruang ICU ayahnya Bagas.
   - Surat Penawaran Kerja (*Job Offer Letter*): Kertas kop surat resmi kontraktor migas Balikpapan dengan map kulit imitasi hitam Dimas.
7. **Bungkus Tahu Goreng Koran Warkop (Scene 7)**: Bungkusan kertas koran bekas basah minyak goreng dengan 5 potong tahu sumedang kuning kecokelatan hangat (`#D97706`), diselipi segenggam cabai rawit hijau segar (`#16A34A`).

---

## 8. MATRIKS PEMETAAN ASUMSI VS TEKS NASKAH PER ADEGAN (SCENE-BY-SCENE MAPPING)

Tabel berikut memetakan setiap babak, membandingkan fakta teks skenario dengan asumsi visual dan interpretasi produksi yang diterapkan secara konsisten:

```
+-------+-----------------------------+------------------------------------+---------------------------------------+
| ADEGAN| FAKTA SKENARIO RESMI        | ASUMSI VISUAL UTAMA                | INTERPRETASI PRODUKSI & RASIONALISASI |
+-------+-----------------------------+------------------------------------+---------------------------------------+
| SC.01 | - Lab Pengujian Mekanik     | - 9 shot terkalibrasi (ECU ke WS)  | - Lensa 52mm ECU pada takik tak presisi|
| 00:00 | - Hendro ukur takik 55 deg  | - Neon 4200K + lampu meja 3000K    |   menetapkan taruhan kegagalan sejak  |
|   -   | - 9 afkir, 1 lolos          | - Clipboard kayu Aryo jepit seng   |   frame pertama.                      |
| 03:00 | - Kevin ingatkan 2 skripsi  | - Kantung mata panda lelah #334155 | - Sinkronisasi audio klik mikrometer  |
|       | - Dimas & Bagas masuk       | - Hoodie Bagas basah gerimis       |   dengan roomtone chiller -24 dBFS.   |
+-------+-----------------------------+------------------------------------+---------------------------------------+
| SC.02 | - Dewar N2 bocor (sisa 1.5L)| - 8 shot terkalibrasi              | - Two-shot low-angle mempertegas      |
| 03:00 | - Cukup tepat 1 spesimen    | - Pantulan uap es kering di lantai |   hegemoni modal Dimas saat membanting|
|   -   | - Dimas setor bukti transfer| - Struk BCA putih font dot-matrix  |   berkas BCA.                         |
| 05:30 |   Rp 4.5jt & job offer      | - Jas lab Fajar terkancing kaku    | - Audio hantaman kertas -12 dBFS      |
|       | - Kirana dukung Dimas       | - Kacamata Kevin pantulkan Origin  |   menghentikan desisan dewar.         |
+-------+-----------------------------+------------------------------------+---------------------------------------+
| SC.03 | - Debat moral & kemanusiaan | - 9 shot terkalibrasi              | - Dynamic whip-pan menyapu wajah 9    |
| 05:30 | - Rere & Reza bela Bagas    | - Farhan bertengger di atas meja   |   mahasiswa terangkat menyimbolkan    |
|   -   | - Farhan usul duplikasi CSV | - Flashdisk merah SanDisk di meja  |   tirani voting mayoritas instan.     |
| 08:30 | - 9 dari 14 anggota angkat  | - Botol air 1.5L biru Danang       | - Audio ketukan keyboard laptop cepat |
|       |   tangan setujui manipulasi | - Rere julurkan lengan baju lipat  |   menggambarkan kepanikan waktu.      |
+-------+-----------------------------+------------------------------------+---------------------------------------+
| SC.04 | - Nadia cabut kabel PC      | - 9 shot terkalibrasi              | - Transisi mendadak ke Chiaroscuro    |
| 08:30 | - Layar padam seketika      | - Cahaya tunggal meja belajar 3000K|   3000K (Rembrandt lighting) memaksa  |
|   -   | - Dimas menangis: utang ortu| - Bayangan gelap pekat 85% opacity |   fokus intim ke kebenaran batiniah   |
| 11:30 | - Bagas ikhlas serahkan kupon- Kwitansi RSUD Blitar pink ungu    |   kedua tokoh sentral.                |
|       |   beserta kwitansi Blitar   | - Dutch angle miring saat colokan  | - Hening audio dramatis saat kabel PC |
|       |                             |   tercabut dari stopkontak dinding |   terlepas (Power Down Thump -10 dBFS)|
+-------+-----------------------------+------------------------------------+---------------------------------------+
| SC.05 | - Dimas menolak selamatkan  | - 8 shot terkalibrasi              | - Slow-motion ekuivalen pada pendulum |
| 11:30 |   diri, serahkan ke Bagas   | - Kacamata safety goggle hijau K3L |   300J memberikan bobot sakral pada   |
|   -   | - Protokol ASTM E23 -40 deg | - Lakban silang kuning-hitam 1.5m  |   pukulan mekanik penentu nasib.      |
| 13:30 | - Pendulum Charpy 300J diayun- Jarum merah Charpy hentak ke 52.4J | - Puncak level audio film: Denting    |
|       | - Logam patah ulet berserat | - Uap putih mengepul dari kupon es |   CLAAANNNGGG pada 0 dBFS mutlak.     |
+-------+-----------------------------+------------------------------------+---------------------------------------+
| SC.06 | - Koridor Gedung W FTIRS ITS| - 7 shot terkalibrasi              | - Kamera bergerak stabil Ninja-Walk   |
| 13:30 | - Upload BAP sukses 23:46   | - Downlight hangat plafon 3800K    |   memberikan efek pelepasan katarsis. |
|   -   | - Zul puji kejantanan Dimas | - Siluet semen ekspos pilar koridor| - Nada chime centang hijau SIM ITS    |
| 14:45 | - Kirana beri kontak GM baja| - Dimas bersandar di pilar beton   |   menandai kemenangan integritas.     |
+-------+-----------------------------+------------------------------------+---------------------------------------+
| SC.07 | - Tangga selasar luar gedung| - 7 shot terkalibrasi              | - Backward pull-out perlahan membingkai|
| 14:45 | - Seluruh 14 makan tahu warkop- Bungkus koran tahu goreng hangat   |   arsitektur kampus ITS di malam hari.|
|   -   | - Dialog berhenti di 15:15  | - Rona langit malam Sukolilo #0F172A- Dialog hening tepat 45 detik      |
| 16:00 | - Kredit roll 45 detik      | - Komposisi simetris 14 siluet     |   memberikan ruang kontemplasi moral  |
|       | - Fade to black di 15:55    | - Graphic text title-safe 80%      |   sebelum silent lock di 16:00 menit. |
+-------+-----------------------------+------------------------------------+---------------------------------------+
```

---

## 9. RINGKASAN VERIFIKASI INTEGRITAS MILESTONE 1

Dengan diterbitkannya dokumen `analysis/visual_assumptions.md` ini:
1. Seluruh parameter visual, teknis, spasial, dan akustik yang berada di luar teks harfiah skenario telah terdata secara komprehensif tanpa ada asumsi yang tersembunyi (*zero hidden assumptions*).
2. Naskah skenario asli di direktori `screenplay/` tetap 100% utuh tanpa modifikasi (*immutability preserved*).
3. Landasan kerja bagi perancangan aset procedural modular SVG (`animatic/src/components/characters/` & `environments/`) telah memiliki rujukan parameter heksadesimal, skala, dan koordinat yang terstandarisasi.
