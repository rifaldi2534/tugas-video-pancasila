# PEDOMAN GAYA VISUAL SINEMATIK 2D (VISUAL STYLE GUIDE)
## Desain Prosedural Modular SVG, Teori Warna, Pencahayaan Praktis, Tipografi, Tata Gerak Remotion, & Dokumentasi Asumsi Visual
**Proyek**: Film Pendek Animatic 2D Sinematik *SPESIMEN TERAKHIR* (The Final Specimen)  
**Afiliasi**: Departemen Teknik Material dan Metalurgi (DTMM), Fakultas Teknologi Industri dan Rekayasa Sistem (FTIRS), Institut Teknologi Sepuluh Nopember (ITS), Surabaya  
**Milestone**: M1 (R1 Screenplay Audit, Structured Scene Data, and Documentation — Binding Directive Gate Review)  
**Status**: Authoritative Procedural Design System  
**Tanggal**: 2026-11-04  
**Standar Timeline**: 24 FPS Konstan | Resolusi 1920x1080 Full HD (16:9) | Durasi Tepat 16:00 (23.040 Frame)  

---

## 1. FILOSOFI SENI VEKTOR SINEMATIK 2D (PROCEDURAL VECTOR REALISM) `[Interpretasi Produksi]`

Film animatik *Spesimen Terakhir* mengadopsi estetika **Realisme Vektor 2D Berbobot Teknik (*Parametric Technical Vector Realism*)** `[Interpretasi Produksi]`. Prinsip visual didasarkan pada mandat mutlak: **Zero External Stock Assets**. Seluruh elemen visual (karakter mahasiswa, mesin industri Charpy, bejana cryogenic, dokumen kampus, dan lanskap arsitektur Gedung W ITS) dirender secara murni menggunakan kode SVG dan CSS di dalam ekosistem React dan Remotion.

### A. Pilar Estetika Visual `[Asumsi Visual]`:
1. **Bukan Kartun Anak-Anak / Anti-Chibi `[Asumsi Visual]`**: Proporsi anatomi manusia mematuhi rasio realistis (tinggi 7.5 hingga 8 kepala), dengan artikulasi sendi yang natural dan struktur postur yang mencerminkan beban fisik dan psikologis mahasiswa tingkat akhir.
2. **Shading Cel-Shaded Berlapis Tipis `[Asumsi Visual]`**: Shading tidak menggunakan tekstur noise bitmap buram, melainkan kombinasi gradien linier/radial (`<linearGradient>`, `<radialGradient>`) dan path bayangan cel-shaded tegas (*hard drop shadow vectors*) untuk menciptakan volume kedalaman tanpa membebani performa render browser Chromium.
3. **Penyelarasan Skala Vektor Ternormalisasi `[Interpretasi Produksi]`**: Seluruh komponen karakter dirender di dalam ruang koordinat lokal ternormalisasi **`viewBox="0 0 200 480"`**, sementara latar belakang panggung menggunakan **`viewBox="0 0 1920 1080"`**. Hal ini menjamin penskalaan tajam tanpa artefak pikselasi pada resolusi Full HD maupun 4K.

---

## 2. SISTEM TEORI WARNA & PENCAHAYAAN LINGKUNGAN (LIGHTING & COLOR ENGINE) `[Asumsi Visual]`

Pencahayaan dalam film ini berfungsi sebagai instrumen dramaturgis yang merefleksikan pergeseran kondisi psikologis karakter: dari kepanikan dingin teknikal, keruntuhan kerapuhan batin, ketegangan benturan mekanik, hingga kehangatan rekonsiliasi persaudaraan. Setiap suhu Kelvin dan kode warna heksadesimal di bawah ini merupakan **`[Asumsi Visual]`** yang diturunkan dari interpretasi terhadap nuansa naskah skenario:

```
+-------------------------------------------------------------------------------------------------------+
| TABEL TATA CAHAYA & SUHU KELVIN LINGKUNGAN (ENVIRONMENTAL LIGHTING ENGINE) [Asumsi Visual]            |
+--------------------------+-------------+------------------+------------------+------------------------+
| LOKASI & FASE NARRATIVE  | SUHU KELVIN | WARNA KEY LIGHT  | WARNA AMBIENT    | SUASANA DRAMATURGIS    |
+--------------------------+-------------+------------------+------------------+------------------------+
| Lab Pengujian Mekanik    | 4200K       | Neon TL Netral   | Abu-abu Dingin   | Kelelahan kerja 14 jam,|
| (Scene 1, 2, 3, 5)       | Netral      | `#F1F5F9`        | `#94A3B8`        | tekanan hitung mundur  |
+--------------------------+-------------+------------------+------------------+------------------------+
| Meja Bundar Chiaroscuro  | 3000K       | Warm Tungsten    | Hitam Bayangan   | Titik nadir kerapuhan, |
| (Scene 4: Kabel Dicabut) | Hangat      | `#FDE68A`        | `#09090B` (85%)  | pengakuan utang renten |
+--------------------------+-------------+------------------+------------------+------------------------+
| Koridor Selasar Gedung W | 3800K       | Downlight Warm   | Biru Redup Luar  | Pelepasan katarsis,    |
| (Scene 6: Pasca BAP)     | Transisi    | `#FEF3C7`        | `#1E293B`        | penghormatan moral     |
+--------------------------+-------------+------------------+------------------+------------------------+
| Tangga Luar & Taman ITS  | 3800K +     | Sorot Taman      | Biru Malam Pekat | Damai kontemplatif,    |
| (Scene 7: Komuni Tahu)   | Malam Sky   | `#FDE047`        | `#0F172A`        | persaudaraan sejati    |
+--------------------------+-------------+------------------+------------------+------------------------+
```

### A. Lab Pengujian Mekanik: Pencahayaan Fluorescent 4200K `[Asumsi Visual]`
- **Dominasi Ruang**: Dinding keramik lab putih keabuan (`#E2E8F0`), lantai semen industri (`#64748B`), dan rangka baja mesin Charpy (`#334155`).
- **Pencahayaan Utama**: Dua baris tabung neon TL di langit-langit yang memancarkan cahaya datar tanpa ampun (*unforgiving institutional light*), mempertegas kantung mata hitam dan pelipis berminyak para mahasiswa (`rgba(51, 65, 85, 0.35)`).

### B. Meja Bundar: Practical Chiaroscuro 3000K (Scene 4) `[Asumsi Visual]`
- **Konsep Seni**: Begitu Nadia mencabut kabel komputer lab, layar PC padam seketika. Satu-satunya sumber penerangan adalah lampu meja belajar fleksibel 3000K berleher angsa yang diletakkan di tengah meja bundar kayu.
- **Efek Visual**: Menghasilkan **kolam cahaya hangat (*pool of light*)** dengan radius tajam (`<radialGradient>` stop 0% `#FDE68A`, stop 100% `#09090B` pada opasitas 85%). Karakter di luar meja bundar tenggelam dalam siluet gelap pekat. Setengah wajah Dimas berada dalam bayangan kontras (*Rembrandt lighting*) saat menangis membongkar utang rentenirnya, sementara Bagas bermandikan cahaya teduh saat menyodorkan kwitansi RSUD Blitar.

### C. Koridor & Tangga Selasar Gedung W: Kehangatan 3800K & Malam Sukolilo (Scene 6 & 7) `[Asumsi Visual]`
- **Pencahayaan Koridor (3800K)**: Lampu downlight plafon koridor selasar Gedung W (`#FEF3C7`) menyinari pilar beton semen ekspos, menetralkan kepenatan dingin lab sebelumnya.
- **Pencahayaan Tangga Eksterior**: Siluet arsitektur Gedung W FTIRS ITS yang kokoh berpadu dengan temaram langit malam Sukolilo (`#0F172A` ke `#1E293B`), diselingi rimbun dedaunan pohon ketapang taman kampus yang bergoyang lembut tertiup angin sejuk.

---

## 3. PALET WARNA KARAKTER & AKSESORI (CHARACTER COLOR SYSTEMS) `[Asumsi Visual]`

Setiap karakter memiliki kode warna heksadesimal terdefinisi yang merupakan **`[Asumsi Visual]`** terstandardisasi untuk menjamin konsistensi render di Remotion:

```
+----+-------------------+---------------------+---------------------+---------------------+---------------------+
| NO | KARAKTER          | WARNA KULIT (BASE)  | RAMBUT / HIJAB      | BUSANA DALAM        | AKSEN / PROPERTI    |
+----+-------------------+---------------------+---------------------+---------------------+---------------------+
| 1  | Aryo Wicaksono    | Sawo: `#D4A373`     | Hitam: `#1E293B`    | Polo Navy: `#1E3A8A`| Map Kayu: `#B45309` |
| 2  | Dimas Pratama     | Langsat: `#E2B184`  | Pomade: `#0F172A`   | Flanel: `#991B1B`   | Casio: `#94A3B8`    |
| 3  | Bagas Triatmojo   | Gelap: `#C68642`    | Kusam: `#1C1917`    | Hoodie: `#475569`   | Kwitansi: `#F43F5E` |
| 4  | Fajar Nurhadi     | Netral: `#DEB887`   | Cepak: `#0C0A09`    | Putih: `#FFFFFF`    | Stopwatch: `#059669`|
| 5  | Reza Kurniawan    | Tropis: `#CD853F`   | Ikal: `#171717`     | Kaus: `#18181B`     | Cargo: `#3F4E38`    |
| 6  | Hendro Setyawan   | Tembaga: `#C68642`  | Pendek: `#262626`   | Celemek: `#374151`  | Beludru: `#991B1B`  |
| 7  | Farhan "Kancil"   | Terang: `#D2A679`   | Fade: `#171717`     | Bomber: `#18181B`   | Flashdisk: `#EF4444`|
| 8  | Kevin Tanuwijaya  | Oriental: `#F3D2B8` | Klimis: `#0A0A0A`   | Garis: `#60A5FA`    | Kacamata: `#94A3B8` |
| 9  | Danang Prasetyo   | Jawa: `#C68B59`     | Ikal Rapi: `#1F2937`| Polo: `#6B7280`     | Botol Air: `#0284C7`|
| 10 | Zulfikar "Zul" H. | Gelap: `#B87333`    | Gondrong: `#18181B` | Safari: `#78716C`   | Korek Gas: `#16A34A`|
| 11 | Nadia Putri A.    | Langsat: `#F0D5BA`  | Hijab: `#0F172A`    | Putih: `#F8FAFC`    | Caliper: `#38BDF8`  |
| 12 | Maya Anggraini    | Lembut: `#EBCBB0`   | Kuncir: `#1E293B`   | Pink: `#FBCFE8`     | Minyak: `#10B981`   |
| 13 | Siti Rahma "Rere" | Hangat: `#C68642`   | Bergo: `#64748B`    | Oranye: `#C2410C`   | KTM KIP: `#FDE047`  |
| 14 | Kirana Dewi       | Langsat: `#F5D6BA`  | Bob: `#0F172A`      | Lilac: `#C084FC`    | Map Kulit: `#451A03`|
+----+-------------------+---------------------+---------------------+---------------------+---------------------+
```

---

## 4. SISTEM TIPOGRAFI & SUBTITLE SINEMATIK (TITLE-SAFE SUBTITLES) `[Interpretasi Produksi]`

Keterbacaan teks (*high readability*) adalah syarat mutlak bagi penonton festival film dan presentasi akademik. Subtitle dirancang mematuhi standar penyiaran **SMPTE Title-Safe Zone** (batas margin 10% dari tepi frame) `[Interpretasi Produksi]`.

```
+-------------------------------------------------------------------------------+
| RESOLUSI FRAME MASTER: 1920 x 1080 [Interpretasi Produksi]                    |
|                                                                               |
|   +-----------------------------------------------------------------------+   |
|   | SMPTE ACTION-SAFE ZONE (90% - Margin 96px kiri/kanan, 54px atas/bawah)|   |
|   |                                                                       |   |
|   |   +---------------------------------------------------------------+   |   |
|   |   | SMPTE TITLE-SAFE ZONE (80% - Margin 192px kiri/kanan, 108px)  |   |   |
|   |   |                                                               |   |   |
|   |   |   +-------------------------------------------------------+   |   |   |
|   |   |   | CONTAINER SUBTITLE: Translucent Pill Box (80% Black)  |   |   |   |
|   |   |   | [DIMAS] "Secara hak kepemilikan materiil...!"         |   |   |   |
|   |   |   +-------------------------------------------------------+   |   |   |
|   |   +---------------------------------------------------------------+   |   |
|   +-----------------------------------------------------------------------+   |
+-------------------------------------------------------------------------------+
```

### A. Spesifikasi Teknis Komponen Subtitle `[Interpretasi Produksi]`:
- **Font Family**: Sans-serif netral dengan keterbacaan tinggi (`system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif`).
- **Ukuran Huruf (Font Size)**:
  - Layar Desktop / TV Full HD: `32px` (Line height: `1.35`).
  - Mobile / Small Screen: `26px`.
- **Warna Teks & Penanda Pembicara**:
  - Teks Dialog: Putih Murni (`#FFFFFF`) atau Kuning Mentega Lembut (`#FDE047`) untuk dialog bertekanan tinggi.
  - Tag Nama Pembicara: Ditampilkan dalam kurung siku dengan warna aksen karakter (misal: `[DIMAS]` dalam `#DC2626`, `[BAGAS]` dalam `#F59E0B`, `[NADIA]` dalam `#38BDF8`).
- **Container Kotak Subtitle (Pill Container)**:
  - Background: Hitam transparan 80% (`rgba(15, 23, 42, 0.85)`).
  - Border: Garis tepi halus 1px abu-abu transparan (`rgba(255, 255, 255, 0.15)`).
  - Border Radius: `12px` melengkung modern.
  - Padding: `12px 28px`.
  - Drop Shadow: `drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))`.
- **Posisi Layar**: Terletak di bagian bawah tengah frame, tepat `80px` di atas batas bawah frame (di dalam Title-Safe Zone).

### B. Tipografi Kredit Akhir (*Closing Credits Roll*) `[Interpretasi Produksi]`:
- **Gaya**: Teks putih bersih monokrom (`#F8FAFC`) berformat sans-serif elegan dengan tracking huruf lebar (`letterSpacing: '0.15em'`).
- **Durasi Tampil**: 45 Detik (Timecode 15:15 hingga 16:00 / Frame 21960 hingga 23040).
- **Posisi**: Sebelah kanan frame (Right 15%) berdampingan dengan siluet para mahasiswa di sisi kiri dan tengah.

---

## 5. PRINSIP ANIMASI MIKRO & TATA GERAK KAMERA REMOTION `[Interpretasi Produksi]`

Animasi animatik 2D ini mengedepankan **kedalaman sinematik tenang (*subtle cinematic realism*)**, menghindari animasi melompat-lompat atau transisi kilat yang tidak sesuai dengan nada dramatis skenario.

### A. Animasi Mikro Prosedural (Procedural Micro-Motions) `[Asumsi Visual]`:
1. **Pernapasan Dada Halus (*Subtle Chest Breathing*) `[Asumsi Visual]`**:
   - Frekuensi: 1 siklus tiap 72 frame (3 detik pada 24 FPS).
   - Implementasi: Transformasi sumbu Y `Math.sin((frame / 72) * Math.PI * 2) * 1.5px` pada kelompok torso SVG. Memberikan kesan karakter hidup dan berbobot tanpa mengganggu dialog.
2. **Kedipan Mata Acak (*Pseudorandom Eye Blinking*) `[Asumsi Visual]`**:
   - Frekuensi: Kedipan mata berlangsung selama 4 frame setiap interval 72 hingga 120 frame secara deterministik berbasis `charId` dan `frame`.
   - Implementasi: Kelopak mata menutup dari 0% ke 100% dan kembali membuka secara mulus via fungsi `interpolate()`.
3. **Gerakan Emosional Spesifik `[Asumsi Visual]`**:
   - Gemetar Tangan Bagas: Tremor frekuensi tinggi `Math.sin(frame * 1.2) * 0.8px` pada layer pergelangan tangan saat memegang capit spesimen di Scene 5.
   - Angin Malam Eksterior: Simpul hijab Rere dan helai rambut Maya berayun lembut 2 derajat dengan periode 96 frame di Scene 7.

### B. Tata Gerak Kamera Remotion (`<CinematicCamera />`) `[Interpretasi Produksi]`:
Kamera digital Remotion dikontrol melalui komponen pembungkus (*wrapper component*) yang memanipulasi properti CSS 3D Transforms (`transform: perspective(1000px) scale(...) translate3d(...) rotate(...)`):
1. **Peredaman Mekanik Tubuh Alami (*Passive Ninja-Walk & Body Bracing*) `[Interpretasi Produksi]`**:
   - Untuk merefleksikan estetika syuting smartphone tanpa gimbal stabilizer mahal, pergerakan handheld bracing disimulasikan menggunakan getaran mikro frekuensi rendah acak (*perlin / low-frequency noise*): deviasi translasi maksimum ±2.0 piksel dan rotasi ±0.15 derajat.
2. **Kurva Transisi Halus (Smooth Interpolation & Spring) `[Interpretasi Produksi]`**:
   - Gerakan dorong (*slow push-in*) pada Scene 4 dan gerakan tarik mundur (*slow backward pull-out*) pada Scene 7 menggunakan kurva perlambatan `interpolate(frame, [start, end], [1.0, 1.25], { extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1.0) })`.
3. **Paralaks Multi-Layer `[Asumsi Visual]`**:
   - Saat kamera bergerak lateral (*slow pan*), layer Foreground bergeser 1.3x lebih cepat dari panggung utama, sementara layer Far Background bergeser hanya 0.2x, menghasilkan ilusi spasial 2.5D yang memikat.

---

## 6. DOKUMENTASI RINGKAS ASUMSI GAYA & INTEGRITAS VISUAL `[Interpretasi Produksi]`

Pedoman gaya visual ini menjadi acuan otoritatif bagi perancangan karakter prosedural SVG (`animatic/src/components/characters/`), background panggung (`environments/`), dan tata kamera Remotion (`camera/`).
1. Seluruh palet heksadesimal, suhu Kelvin, dan kurva gerak mikro telah dicatat sebagai **`[Asumsi Visual]`** atau **`[Interpretasi Produksi]`** untuk menjamin transparansi penuh terhadap naskah skenario asli.
2. Naskah skenario di direktori `screenplay/` tetap 100% terjaga dan tidak dimodifikasi.
3. Rujukan katalog lengkap seluruh asumsi visual terdokumentasi di `analysis/visual_assumptions.md`.
