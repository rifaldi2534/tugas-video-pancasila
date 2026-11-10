# PANDUAN VISUAL & DESAIN KARAKTER (CHARACTER GUIDE)
## Spesifikasi Visual Prosedural, Rigging SVG, Matriks Siluet, & Dokumentasi Asumsi Visual Eksplisit
**Proyek**: Film Pendek Animatic 2D Sinematik *SPESIMEN TERAKHIR* (The Final Specimen)  
**Afiliasi**: Departemen Teknik Material dan Metalurgi (DTMM), Fakultas Teknologi Industri dan Rekayasa Sistem (FTIRS), Institut Teknologi Sepuluh Nopember (ITS), Surabaya  
**Milestone**: M1 (R1 Screenplay Audit, Structured Scene Data, and Documentation — Binding Directive Gate Review)  
**Status**: Authoritative Procedural Specification & Assumptions Catalog  
**Tanggal**: 2026-11-04  
**Standar Timeline**: 24 FPS Konstan | Resolusi 1920x1080 Full HD (16:9) | Durasi Tepat 16:00 (23.040 Frame)  

---

## 1. PRINSIP DESAIN KARAKTER PROCEDURAL & ZERO-ASSET EKSTERNAL `[Interpretasi Produksi]`

Sesuai mandat proyek, seluruh aset karakter dalam film pendek *Spesimen Terakhir* **100% diproduksi secara prosedural melalui kode** (React, TypeScript, Scalable Vector Graphics / SVG, dan CSS). Tidak ada penggunaan foto stok bitmap, tekstur raster eksternal, atau aset ilustrasi pihak ketiga.

Setiap karakter dari **14 Mahasiswa DTMM FTIRS ITS (10 Laki-laki, 4 Perempuan)** dirancang dengan hierarki visual parametrik dalam ruang koordinat ternormalisasi **`viewBox="0 0 200 480"`** `[Interpretasi Produksi]`. Hal ini menjamin penskalaan tajam tanpa batas (*infinite vector sharpness*) pada resolusi Full HD (1920x1080) maupun 4K, serta mendukung animasi dinamis via Remotion v4.

---

## 2. MATRIKS DIFERENSIASI SILUET 14 KARAKTER `[Asumsi Visual]`

Untuk memastikan keterbacaan instan (*instant visual readability*) pada bidikan lebar (Wide Shot) maupun bidikan sudut malam yang remang, ke-14 karakter memiliki pembeda siluet yang radikal berdasarkan tinggi tubuh, proporsi bahu, gestur khas, dan aksesori kepala `[Asumsi Visual]`:

```
+----+----------------------+---+--------+-------+-------------------------+----------------------------------------------+
| NO | NAMA KARAKTER        | G | TINGGI | SKALA | BENTUK SILUET TUBUH     | IDENTIFIKASI SILUET INSTAN [Asumsi Visual]   |
+----+----------------------+---+--------+-------+-------------------------+----------------------------------------------+
| 1  | Aryo Wicaksono       | L | 172 cm | 1.00  | Agak bungkuk, bahu turun| Memegang clipboard BAP, rambut belah samping |
| 2  | Dimas Pratama        | L | 175 cm | 1.02  | Tegap atletis, dominan  | Bahu bidang, kemeja rapi, melipat tangan/map |
| 3  | Bagas Triatmojo      | L | 168 cm | 0.98  | Kurus layu, menunduk    | Jaket hoodie kebesaran, tangan di saku       |
| 4  | Fajar Nurhadi        | L | 170 cm | 0.99  | Tegap kaku standar K3L  | Jas lab bersih, stopwatch kalung, kacamata   |
| 5  | Reza Kurniawan       | L | 173 cm | 1.01  | Ramping dinamis, vokal  | Rambut ikal bervolume, tas selempang kanvas  |
| 6  | Hendro Setyawan      | L | 169 cm | 0.98  | Gempal berotot, membungk| Celemek lab abu-abu, mikrometer di tangan    |
| 7  | Farhan "Kancil" R.   | L | 171 cm | 1.00  | Kurus lincah, santai    | Duduk di meja, bomber terbuka, rambut taper  |
| 8  | Kevin Tanuwijaya     | L | 176 cm | 1.03  | Jangkung kurus, gelisah | Kacamata tipis, jari mengetuk meja/laptop    |
| 9  | Danang Prasetyo      | L | 170 cm | 0.99  | Gempal bulat, ramah     | Postur lebar santai, memegang botol air 1.5L |
| 10 | Zulfikar "Zul" Hakim | L | 178 cm | 1.04  | Paling tinggi, bersandar| Bersandar di kusen pintu, jas lab terbuka    |
| 11 | Nadia Putri Anindya  | P | 162 cm | 0.94  | Ramping tegak sempurna  | Jilbab dongker simetris, kacamata frameless  |
| 12 | Maya Anggraini       | P | 160 cm | 0.93  | Feminin lembut, empati  | Kuncir kuda rapi, postur mendekat ke korban  |
| 13 | Siti Rahma "Rere"    | P | 156 cm | 0.92  | Paling mungil, menantang| Jilbab bergo abu-abu, menunjuk/menantang     |
| 14 | Kirana Dewi          | P | 165 cm | 0.96  | Semampai anggun korporat| Rambut bob rapi beranting, map industri      |
+----+----------------------+---+--------+-------+-------------------------+----------------------------------------------+
```

---

## 3. PROFIL LENGKAP 14 KARAKTER & DOKUMENTASI ASUMSI VISUAL `[Asumsi Visual]`

Berikut adalah profil tiga dimensi komprehensif dari setiap karakter, disertai **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`** yang mencatat parameter visual yang tidak disebutkan secara harfiah di naskah skenario asli, namun ditetapkan demi konsistensi visual prosedural:

---

### 1. ARYO WICAKSONO (22 th, Laki-laki) — Sang Koordinator Angkatan
- **Peran Sosiologis `[Fakta Skenario]`**: *The Overburdened Servant Leader*.
- **Laboratorium `[Fakta Skenario]`**: Lab Metalurgi Fisik (Perlakuan Panas Paduan Aluminium).
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 172 cm (Skala Transform: `1.00`).
  - Struktur Wajah: Rahang persegi lembut dengan mata panda lelah (`#334155`).
  - Warna Kulit: Sawo matang khas Jawa Timur (Hex: `#D4A373`, Shadow: `#B07D4F`).
  - Rambut: Hitam lurus belah pinggir sedikit acak-acakan (Hex: `#1E293B`).
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kemeja polo katun biru dongker berkerah (Hex: `#1E3A8A`).
  - Jas Lab: Putih ITS standar (`#F8FAFC`, Shading: `#CBD5E1`), nametag bordir `ARYO W. - DTMM ITS`. Di Scene 7, jas lab dilepas dan disampirkan di paha.
  - Celana: Chino katun abu-abu arang (`#334155`).
  - Sepatu: Sneakers kanvas hitam bersol putih (`#0F172A`).
- **Properti Ikonik `[Asumsi Visual]`**: Clipboard kayu cokelat muda (`#B45309`) berisi Berita Acara Kelulusan (BAP) dan bolpoin Pilot hitam.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Sering menekan pelipis dengan dua jari, menghela napas panjang, memutar bolpoin saat cemas.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Menggunakan kemeja polo biru gelap di balik jas lab untuk mencerminkan kepemimpinan mahasiswa formal yang kelelahan.
  - *Asumsi Visual 2*: Papan ujian kayu memiliki jepitan seng perak di bagian atas dengan stempel draf SIM ITS merah di pojok kanan berkas.

---

### 2. DIMAS PRATAMA (23 th, Laki-laki) — Sang Pragmatis Berbeban Rahasia
- **Peran Sosiologis `[Fakta Skenario]`**: *The Desperate Careerist / Bourgeois Investor*.
- **Laboratorium `[Fakta Skenario]`**: Lab Korosi & Proteksi Katodik Pipa Migas.
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 175 cm (Skala Transform: `1.02`).
  - Struktur Wajah: Rahang tegas, tulang pipi menonjol, tatapan tajam mengintimidasi.
  - Warna Kulit: Kuning langsat bersih terawat (Hex: `#E2B184`, Shadow: `#C28B5C`).
  - Rambut: Potongan *pompadour undercut* rapi bersisir pomade kilap (Hex: `#0F172A`).
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kemeja flanel lengan panjang kotak-kotak merah bata dan hitam (Hex: `#991B1B` & `#18181B`).
  - Jas Lab: Putih bersih terkancing dua kancing, nametag bordir `DIMAS P. - DTMM ITS`.
  - Aksesori Tangan: Jam tangan digital stainless steel Casio perak (Hex: `#94A3B8`).
  - Celana: Katun semi-formal hitam pekat (`#09090B`).
  - Sepatu: Sepatu kulit kasual cokelat tua mengkilap (`#451A03`).
- **Properti Ikonik `[Asumsi Visual]`**: Map kulit sintetis hitam, lembar bukti transfer BCA Rp 4.500.000, surat *Job Offer* PT Borneo Energy Services Balikpapan.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Melipat tangan di dada dengan gestur dominan, mengetukkan jari ke jam tangan, membanting berkas ke meja, terhempas menangis lemas di Scene 4.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Kemeja flanel merah kotak-kotak dipilih untuk menyiratkan ambisi dinamis dan rasa percaya diri semu yang menyembunyikan kerapuhan utang keluarga.
  - *Asumsi Visual 2*: Jam tangan Casio digital selalu menampilkan kedipan detik untuk memperkuat sensasi jam hitung mundur yudisium.

---

### 3. BAGAS TRIATMOJO (23 th, Laki-laki) — Pejuang Sunyi di Ujung Tanduk
- **Peran Sosiologis `[Fakta Skenario]`**: *The Stoic Underdog / The Selfless Altruist*.
- **Laboratorium `[Fakta Skenario]`**: Lab Pengecoran dan Pengolahan Logam.
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 168 cm (Skala Transform: `0.98`).
  - Struktur Wajah: Wajah tirus, mata cekung dengan kantung mata lelah kehitaman, bibir kering pucat.
  - Warna Kulit: Sawo matang gelap terbakar matahari (Hex: `#C68642`, Shadow: `#9E6226`).
  - Rambut: Hitam agak ikal berantakan, menutupi sebagian kening (Hex: `#1C1917`).
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Jaket hoodie usang HMMT abu-abu tua pudar (Hex: `#475569`, tali kusam).
  - Jas Lab: Putih kusam keabuan dengan lipatan kusut, nametag sablon `BAGAS T.`.
  - Celana: Jeans denim lusuh bertambal di lutut kanan (Hex: `#334155`).
  - Sepatu: Kets kanvas hitam dengan sol samping robek kecil (Hex: `#1E293B`).
- **Properti Ikonik `[Asumsi Visual]`**: Kwitansi merah muda RSUD Blitar tunggakan Rp 14.800.000, kartu Bidikmisi retak, wadah kupon baja Hendro.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Menundukkan pandangan, menyembunyikan kedua tangan di kantung hoodie, tersenyum tipis tanpa dendam, bersujud syukur di Scene 6.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Hoodie HMMT abu-abu pudar basah oleh gerimis malam di Scene 1 menandakan perjalanan jauh menggunakan sepeda motor tua dari Blitar/kost Keputih.
  - *Asumsi Visual 2*: Kwitansi RSUD Blitar memiliki aksen stempel tinta ungu pudar di pojok bawah.

---

### 4. FAJAR NURHADI (22 th, Laki-laki) — Penjaga Protokol yang Terjepit
- **Peran Sosiologis `[Fakta Skenario]`**: *The Rule-Bound Bureaucrat with a Conscience*.
- **Laboratorium `[Fakta Skenario]`**: Lab Pengujian Mekanik (Asisten Resmi Mesin Uji Tarik & Impak).
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 170 cm (Skala Transform: `0.99`).
  - Struktur Wajah: Rahang simetris tegas, postur tegak siaga SOP.
  - Warna Kulit: Kuning langsat netral (Hex: `#DEB887`, Shadow: `#BD9665`).
  - Rambut: Potongan cepak rapi formal militer/instansi (Hex: `#0C0A09`).
  - Kacamata: Kacamata bingkai hitam persegi tegas (Hex: `#09090B`).
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kemeja putih berkerah terkancing rapi hingga leher (`#FFFFFF`).
  - Jas Lab: Jas lab paling bersih dan rapi dengan badge nama bordir resmi asisten lab `FAJAR N. - ASISTEN UJI MEKANIK DTMM`.
  - Aksesori Leher: Tali lanyard hitam dengan stopwatch digital Casio tergantung di dada.
  - Celana: Celana bahan formal hitam (`#18181B`).
  - Sepatu: Pantofel kulit hitam bertali (`#0A0A0A`).
- **Properti Ikonik `[Asumsi Visual]`**: Stopwatch digital, jangka sorong vernier analog, kunci gembok mesin Charpy, sarung tangan kulit lab tebal, kacamata goggle keselamatan K3L.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Memeriksa stopwatch dengan presisi, berdiri tegak di samping mesin Charpy, aba-aba tangan lantang saat pengujian.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Mengenakan kacamata safety goggle bening berbingkai hijau neon khusus di Scene 5 saat memimpin pengujian Charpy sub-nol.

---

### 5. REZA KURNIAWAN (23 th, Laki-laki) — Sang Idealis Kerakyatan
- **Peran Sosiologis `[Fakta Skenario]`**: *The Passionate Moral Crusader*.
- **Laboratorium `[Fakta Skenario]`**: Lab Material Energi (Baterai & Elektrokimia).
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 173 cm (Skala Transform: `1.01`).
  - Struktur Wajah: Garis rahang tirus tajam, tatapan mata berapi-api menantang.
  - Warna Kulit: Sawo matang tropis (Hex: `#CD853F`, Shadow: `#A0522D`).
  - Rambut: Ikal tebal bervolume sebahu yang diikat sebagian ke belakang (Hex: `#171717`).
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kaus oblong katun hitam bertema pergerakan buruh (`#18181B`).
  - Jas Lab: Jas lab terbuka tidak dikancingkan, nametag tulisan tangan `REZA K.`.
  - Aksesori Tangan: Gelang anyaman tali etnik cokelat-hitam di pergelangan tangan kiri.
  - Celana: Celana cargo hijau lumut tua dengan banyak saku samping (`#3F4E38`).
  - Sepatu: Sepatu gunung boot kanvas bertali cokelat (`#78350F`).
- **Properti Ikonik `[Asumsi Visual]`**: Tas kanvas selempang lusuh penuh pin orasi pergerakan, buku saku cokelat catatan riset baterai.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Melipat tangan di dada menatap tajam lawan bicara, mengacungkan telunjuk saat berbicara keadilan sosial, mundur terdiam malu di Scene 4.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Rambut ikal tebal yang diikat ke belakang mencerminkan karakter mantan aktivis BEM yang tetap mempertahankan idealisme di lingkungan lab.

---

### 6. HENDRO SETYAWAN (22 th, Laki-laki) — Sang Pengrajin Hening
- **Peran Sosiologis `[Fakta Skenario]`**: *The Unsung Craftsperson*.
- **Laboratorium `[Fakta Skenario]`**: Lab Metalografi & Preparasi Sampel Logam.
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 169 cm (Skala Transform: `0.98`).
  - Struktur Wajah: Wajah bulat teduh, dahi berkerut fokus, mata lelah begadang.
  - Warna Kulit: Cokelat tembaga khas pekerja bengkel (Hex: `#C68642`, Shadow: `#9C5B23`).
  - Rambut: Pendek praktis, berminyak di pelipis karena keringat dan uap mesin (Hex: `#262626`).
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kaus oblong abu-abu tua kusam (`#374151`).
  - Atribut Utama: Celemek lab (apron) kain kanvas abu-abu kusam dengan noda pelumas mesin.
  - Celana: Jeans belel warna biru pudar bertabur serbuk besi (`#475569`).
  - Aksesori Saku: Kain majun lap oli tersembul di saku celana belakang.
  - Sepatu: Sepatu kets tahan gesek sol tebal (`#1F2937`).
- **Properti Ikonik `[Asumsi Visual]`**: Mikrometer sekrup analog Mitutoyo 0–25 mm, kikir segitiga presisi Swiss-pattern, kotak beludru merah tempat spesimen terakhir, bungkusan koran tahu goreng.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Selalu membungkuk di atas meja preparasi, memutar mikrometer dengan sentuhan rasa halus, berbicara pelan dengan suara parau.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Selalu mengenakan celemek lab abu-abu alih-alih jas lab putih standar di Scene 1–5 karena pekerjaannya berurusan langsung dengan pasta poles intan dan oli mesin grinding.

---

### 7. FARHAN "KANCIL" RAMADHAN (22 th, Laki-laki) — Sang Pencari Jalan Pintas
- **Peran Sosiologis `[Fakta Skenario]`**: *The Street-Smart Hustler*.
- **Laboratorium `[Fakta Skenario]`**: Lab Pengelasan (Welding & Non-Destructive Testing).
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 171 cm (Skala Transform: `1.00`).
  - Struktur Wajah: Wajah tirus lincah, seringai cerdik khas, mata berbinar menangkap peluang.
  - Warna Kulit: Sawo matang terang (Hex: `#D2A679`, Shadow: `#A87C52`).
  - Rambut: Potongan modern *taper fade* dengan sedikit jambul tekstur atas (Hex: `#171717`).
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Jaket bomber parasut hitam dengan ritsleting terbuka (`#18181B`).
  - Jas Lab: Putih terpasang longgar tanpa kancing seperti jubah, nametag `FARHAN R.`.
  - Celana: Jeans slim-fit hitam elastis (`#27272A`).
  - Sepatu: Sneakers modern putih-abu-abu bertali neon (`#E4E4E7`).
- **Properti Ikonik `[Asumsi Visual]`**: Flashdisk SanDisk warna merah menyala pada gantungan kunci motor, smartphone aktif WhatsApp di tangan, kunci motor Honda Beat.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Melompat duduk di atas meja komputer lab, merangkul pundak kawan saat membujuk, mengayunkan tangan santai.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Jaket bomber parasut hitam di balik jas lab longgar menegaskan kebiasaannya yang selalu siap meluncur keluar lab untuk nongkrong di warkop Keputih.

---

### 8. KEVIN TANUWIJAYA (21 th, Laki-laki) — Sang Perfeksionis Neurotik
- **Peran Sosiologis `[Fakta Skenario]`**: *The Anxious Overachiever*.
- **Laboratorium `[Fakta Skenario]`**: Lab Karakterisasi Lanjut (Nanomaterial).
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 176 cm (Skala Transform: `1.03`).
  - Struktur Wajah: Wajah oval panjang, ekspresi cemas konstan, alis berkerut tegang.
  - Warna Kulit: Putih oriental langsat bersih (Hex: `#F3D2B8`, Shadow: `#D1A589`).
  - Rambut: Belah samping rapi klimis bersisir air (Hex: `#0A0A0A`).
  - Kacamata: Kacamata berbingkai kawat logam tipis bulat perak (`#94A3B8`).
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kemeja katun bergaris halus biru-putih lengan panjang digulung rapi di siku.
  - Jas Lab: Jas lab putih berpotongan pas badan (*slim-fit*), nametag `KEVIN T. - IPK 3.92` (tulisan spidol halus di bawah bordir).
  - Aksesori Tangan: Smartwatch digital hitam di pergelangan tangan kiri.
  - Celana: Celana bahan semi-formal abu-abu muda (`#64748B`).
  - Sepatu: Sepatu pantofel kulit Oxford bersih tanpa debu (`#18181B`).
- **Properti Ikonik `[Asumsi Visual]`**: Laptop Asus Zenbook tipis dengan stiker ASTM & Mendeley, kalkulator grafik Casio saintifik, botol tetes mata steril.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Mengetuk-ngetukkan jari secara ritmis ke meja laptop, membetulkan letak kacamata saat panik, menatap layar dengan mata membelalak cemas.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Kacamata kawat tipisnya memantulkan rona kebiruan pendar monitor laptop di Scene 1 dan 3.

---

### 9. DANANG PRASETYO (22 th, Laki-laki) — Sang Penjaga Harmoni Semu
- **Peran Sosiologis `[Fakta Skenario]`**: *The Conflict-Avoidant Peacemaker*.
- **Laboratorium `[Fakta Skenario]`**: Lab Komposit Polimer & Material Serat Alam.
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 170 cm (Skala Transform: `0.99`).
  - Struktur Wajah: Wajah membulat ramah, senyum tulus menenangkan, pipi berisi.
  - Warna Kulit: Sawo matang Jawa klasik (Hex: `#C68B59`, Shadow: `#9E6738`).
  - Rambut: Ikal pendek terpotong rapi mengikuti bentuk kepala (Hex: `#1F2937`).
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kaus polo katun warna abu-abu misty lembut (`#6B7280`).
  - Jas Lab: Jas lab ukuran longgar (XL) putih bersih terbuka (`#F1F5F9`).
  - Celana: Celana kain longgar berpinggang karet warna hitam santai (`#1E293B`).
  - Sepatu: Sandal selop kulit santai atau sepatu slip-on kanvas cokelat (`#52525B`).
- **Properti Ikonik `[Asumsi Visual]`**: Botol air mineral Club/Aqua 1.5 Liter, tumpukan gelas plastik sekali pakai, kardus air mineral di pojok lab.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Selalu berdiri di antara dua pihak yang bersitegang, merentangkan kedua tangan ke bawah meredam emosi, menyodorkan air minum sambil beristighfar.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Membawa botol air mineral 1.5 liter yang tutup birunya sering dibuka-tutup secara gugup saat ketegangan memuncak di Scene 3.

---

### 10. ZULFIKAR "ZUL" HAKIM (24 th, Laki-laki) — Sang Veteran Sinis yang Terluka
- **Peran Sosiologis `[Fakta Skenario]`**: *The Cynical Elder / The Realistic Survivor*.
- **Laboratorium `[Fakta Skenario]`**: Lab Ekstraksi Metalurgi (Pengolahan Nikel Laterit).
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 178 cm (Skala Transform: `1.04` — Paling Tinggi).
  - Struktur Wajah: Wajah letih dengan rahang kokoh, kumis dan janggut tipis tak dicukur dua hari, tatapan mata berat berpengalaman.
  - Warna Kulit: Sawo matang gelap pekat (Hex: `#B87333`, Shadow: `#8B4513`).
  - Rambut: Agak gondrong diikat kuncir kecil di belakang tengkuk (Hex: `#18181B`).
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kemeja safari lapangan berkancing dua warna cokelat khaki usang (`#78716C`).
  - Jas Lab: Jas lab tua berwarna broken white kekuningan yang tak pernah dikancingkan, kancing hilang satu di dada kiri, nametag bordir usang `ZULFIKAR H.`.
  - Celana: Celana kanvas drill hitam tebal lusuh (`#292524`).
  - Sepatu: Sepatu boot kulit kerja proyek kusam bertali debu (`#44403C`).
- **Properti Ikonik `[Asumsi Visual]`**: Korek api gas putar merek Tokai hijau di jari saku, tas ransel tua bertali peniti, draf skripsi tebal berdebu.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Selalu bersandar santai di kusen pintu selasar atau tiang pilar lab, melipat tangan di dada, berbicara hemat namun berbobot mutlak, menepuk pundak Dimas di Scene 6.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Sosoknya selalu berada di batas ambang pintu (liminal space) antara interior lab dan eksterior koridor, menyimbolkan posisinya yang berada di ambang batas kelulusan (Semester 12).

---

### 11. NADIA PUTRI ANINDYA (22 th, Perempuan) — Sang Penjaga Kebenaran Empiris
- **Peran Sosiologis `[Fakta Skenario]`**: *The Uncompromising Moral Zealot*.
- **Laboratorium `[Fakta Skenario]`**: Lab Karakterisasi Struktur Kristal (XRD & Analisis Rietveld).
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 162 cm (Skala Transform: `0.94`).
  - Struktur Wajah: Wajah oval simetris sempurna, tatapan mata lurus tak berkedip, rahang tegak percaya diri.
  - Warna Kulit: Kuning langsat bersih cerah (Hex: `#F0D5BA`, Shadow: `#C9AA8F`).
  - Hijab: Jilbab segi empat katun voal warna biru dongker gelap (`#0F172A`), disematkan peniti rapi di dagu tanpa kerutan miring.
  - Kacamata: Kacamata tanpa bingkai (*rimless / frameless*) dengan tangkai perak tipis.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kemeja katun lengan panjang warna putih tulang bersih (`#F8FAFC`).
  - Jas Lab: Putih bersih berkancing rapi hingga batas dada atas, nametag bordir presisi `NADIA P. A. - DTMM ITS`.
  - Celana: Celana panjang bahan kain katun warna hitam rapi (`#09090B`).
  - Sepatu: Sepatu pantofel flat kulit hitam bertali halus (`#18181B`).
- **Properti Ikonik `[Asumsi Visual]`**: Jangka sorong digital Mitutoyo LCD, kaca pembesar saku, kabel colokan stopkontak PC hitam tebal, buku catatan lab bergaris hitam rapi.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Berdiri tegak lurus dengan postur prima, tangan mantap mencabut kabel komputer dinding lab, artikulasi vokal tegas tanpa kata-kata kotor.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Hijab biru dongker gelap dipadukan dengan kacamata tanpa bingkai memberi kesan ilmuwan riset yang dingin, analitis, dan tak dapat disuap.

---

### 12. MAYA ANGGRAINI (22 th, Perempuan) — Sang Perawat Nurani
- **Peran Sosiologis `[Fakta Skenario]`**: *The Empathetic Anchor / The Caregiver*.
- **Laboratorium `[Fakta Skenario]`**: Lab Biomaterial Medis (Implan Tulang & Hidroksiapatit).
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 160 cm (Skala Transform: `0.93`).
  - Struktur Wajah: Wajah bulat telur teduh, tatapan mata lembut sarat empati, senyum hangat menenangkan.
  - Warna Kulit: Kuning langsat lembut (Hex: `#EBCBB0`, Shadow: `#C4A489`).
  - Rambut: Rambut hitam lurus diikat kuncir kuda (*ponytail*) rapi ke belakang dengan ikat rambut kain hitam (Hex: `#1E293B`).
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Blus katun rajut lembut warna merah muda pastel (`#FBCFE8`).
  - Jas Lab: Jas lab putih bersih dengan lengan digulung satu lipatan rapi di pergelangan tangan, nametag `MAYA A.`.
  - Celana: Celana kulot kain katun abu-abu lembut (`#64748B`).
  - Sepatu: Sepatu sneakers kanvas putih bersih bertali lembut (`#F1F5F9`).
- **Properti Ikonik `[Asumsi Visual]`**: Botol minyak kayu putih kecil di saku jas lab, kotak tisu kering dan tisu basah, gelas air minum hangat.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Merangkul bahu Bagas yang gemetar, menyodorkan tisu, berdiri mendampingi mereka yang lemah, memeluk Rere di Scene 6.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Blus merah muda pastel di balik jas lab mencerminkan orientasi keilmuan biomaterial medis yang sarat nilai perawatan kemanusiaan (*caregiving*).

---

### 13. SITI RAHMA "RERE" (22 th, Perempuan) — Sang Pejuang Akar Rumput
- **Peran Sosiologis `[Fakta Skenario]`**: *The Fierce Class Warrior*.
- **Laboratorium `[Fakta Skenario]`**: Lab Korosi Lingkungan & Pelapisan Pelindung.
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 156 cm (Skala Transform: `0.92` — Paling Mungil).
  - Struktur Wajah: Wajah mungil dengan dagu lancip, mata bulat menyala penuh daya juang, bibir terkatup rapat siap membantah.
  - Warna Kulit: Sawo matang hangat khas gadis pedesaan (Hex: `#C68642`, Shadow: `#9E6226`).
  - Hijab: Jilbab bergo instan kain kaos warna abu-abu muda sederhana (`#64748B`), dengan jarum pentul terlihat di bawah dagu.
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kaus lengan panjang katun warna oranye bata gelap (`#C2410C`).
  - Jas Lab: Jas lab putih yang kedua ujung lengannya dilipat dua kali karena agak kebesaran, nametag sablon `SITI RAHMA`.
  - Celana: Celana jeans gelap dengan jahitan dobel kuat (`#1E293B`).
  - Sepatu: Sepatu kets kanvas bertali usang dengan sol karet yang tampak dilem ulang rapi (`#334155`).
- **Properti Ikonik `[Asumsi Visual]`**: Kartu Tanda Mahasiswa KIP-Kuliah terlaminating plastik tebal, map folio berkas angkatan, tas ransel seminar kain murah.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Berbicara cepat dengan intonasi lantang berdialek Jawa Timur pedalaman, menudingkan jari pada berkas transfer modal Dimas, berdiri tegak di garis depan.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Ujung lengan jas lab dilipat dua kali untuk menegaskan tubuhnya yang mungil serta jas lab yang kemungkinan merupakan warisan kakak tingkat angkatan sebelumnya.

---

### 14. KIRANA DEWI (22 th, Perempuan) — Sang Realis Korporat
- **Peran Sosiologis `[Fakta Skenario]`**: *The Pragmatic Industrial Liaison*.
- **Laboratorium `[Fakta Skenario]`**: Lab Analisis Kegagalan & Forensik Material.
- **Spesifikasi Fisik `[Asumsi Visual]`**:
  - Tinggi / Skala: 165 cm (Skala Transform: `0.96`).
  - Struktur Wajah: Wajah tegas elegan, hidung mancung, postur tubuh tegap proporsional dan anggun.
  - Warna Kulit: Putih langsat bersih terawat (Hex: `#F5D6BA`, Shadow: `#CEAFA3`).
  - Rambut: Rambut hitam lurus sebahu dipotong bob rapi yang diselipkan rapi di belakang daun telinga (Hex: `#0F172A`).
  - Kacamata: Tidak memakai kacamata.
- **Pakaian & Atribut (SVG Attire) `[Asumsi Visual]`**:
  - Lapisan Dalam: Kemeja blus kerja formal sutra katun berkerah warna ungu lavender lembut (`#C084FC`).
  - Jas Lab: Jas lab berpotongan desainer resmi (*tailored fit*) putih cemerlang, nametag logam kuningan tersemat rapi `KIRANA D. - DTMM FTIRS ITS`.
  - Aksesori Tangan: Jam tangan rantai stainless steel perak feminin di pergelangan tangan kiri.
  - Celana: Celana kain formal pipa lurus hitam anggun (`#0F172A`).
  - Sepatu: Sepatu flat kulit hitam resmi mengkilap (`#18181B`).
- **Properti Ikonik `[Asumsi Visual]`**: Map kulit dokumen berlogo mitra industri migas/baja, smartphone ber-cover kulit resmi, berkas kontak relasi konsorsium pabrik pipa baja.
- **Bahasa Tubuh & Pose Khas `[Asumsi Visual]`**: Berbicara dengan nada teratur dan tenang, tidak mudah terprovokasi emosi drama, membuka map dan menghubungi General Manager pabrik pipa di Scene 6.
- **Dokumentasi Asumsi Eksplisit `[Asumsi Visual]`**:
  - *Asumsi Visual 1*: Blus lavender sutra katun dan nametag logam kuningan mencerminkan posisinya sebagai asisten riset yang sering berinteraksi langsung dengan mitra industri korporasi luar kampus.

---

## 4. MATRIKS STATE POSE TUBUH (BODY POSE ENGINE) `[Interpretasi Produksi]` & `[Asumsi Visual]`

Sistem animasi 2D animatik mendukung 8 pose parametrik standar mandatori (sesuai Section 8 Prompt Kepatuhan) serta variasi gestur kontekstual laboratorium yang dikonfigurasi melalui transformasi sendi SVG:

### A. 8 Required Character Poses / Actions (Standar Section 8) `[Interpretasi Produksi]`:
1. **`idle`**: Posisi berdiri santai natural, tulang belakang netral (0°), kedua lengan relaks di samping tubuh (±5°), tatapan rileks.
2. **`walking`**: Animasi siklus langkah kaki (stride cycle), lengan berayun berlawanan arah dengan tungkai kaki, bobbing vertikal ±2px.
3. **`sitting`**: Paha menekuk 90°, betis turun 90°, lengan di atas meja atau memangku dokumen/laptop (kursi lab / anak tangga semen).
4. **`standing`**: Sikap berdiri tegak formal, dada membusung siap siaga SOP, berat tubuh bertumpu seimbang pada kedua telapak kaki.
5. **`head_movement`**: Rotasi mikro kepala (-15° s/d +15°) untuk merespons lawan bicara atau panggilan nama di tengah ruangan.
6. **`looking_left`**: Kepala dan pupil mata menoleh ke kiri (-20°), leher sedikit tertekuk ke arah subjek di sayap kiri frame.
7. **`looking_right`**: Kepala dan pupil mata menoleh ke kanan (+20°), leher sedikit tertekuk ke arah subjek di sayap kanan frame.
8. **`talking`**: Sinkronisasi artikulasi mulut (viseme cycling) dipadukan dengan gerakan gestur tangan halus mengikuti intonasi vokal.

### B. Gestur Kontekstual Laboratorium Metalurgi `[Asumsi Visual]`:
- **`idle_standing`**: Menunggu, mendengarkan di background (Aryo, Zul, Danang, Fajar).
- **`idle_sitting`**: Duduk di bangku lab atau kursi putar (Kevin di laptop, Nadia di meja).
- **`slouched_exhausted`**: Punggung membungkuk (25°), kepala terkulai turun, bahu condong ke depan, tangan menggantung lemas (Hendro, Bagas, Dimas Sc 4).
- **`leaning_doorframe`**: Tubuh miring 8° bersandar ke kusen pintu/pilar, lengan bersidekap di dada (45°), satu kaki silang (Zul di pintu).
- **`gesturing_aggressive`**: Dada membusung, satu lengan terangkat menuding (75°), telapak tangan membanting berkas ke meja (Dimas, Rere, Reza).
- **`raising_hand_voting`**: Satu lengan terangkat lurus ke atas (80°) menyetujui opsi voting manipulasi data digital (Scene 3).
- **`pulling_cable`**: Kedua tangan menyentak kabel colokan listrik hitam PC dari stopkontak dinding lab (Nadia di Scene 4).
- **`operating_machine`**: Menarik tuas pelatuk Charpy 300J atau mengunci spesimen di anvil (Fajar & Bagas di Scene 5).
- **`prostrating_gratitude`**: Lutut dan dahi menempel di lantai keramik lab, kedua telapak tangan terbuka di samping kepala (Bagas di Scene 6).
- **`eating_snack`**: Duduk di tangga semen, satu tangan memegang tahu goreng ke arah mulut, bahu rileks bersentuhan (Seluruh 14 mahasiswa di Scene 7).

---

## 5. MATRIKS EKSPRESI WAJAH (10 DRAMATURGICAL EMOTIONAL STATES) `[Asumsi Visual]`

Sesuai direktif kepatuhan Section 8, sistem visual prosedural mengimplementasikan **10 Emotional Expressions Mandatori** (didukung dalam format TitleCase standar dan snake_case/lowercase alias) yang dikontrol melalui kurva alis (*eyebrows*), bentuk mata (*eyes*), kelopak mata, dan pupil `[Asumsi Visual]`:

```
+----+---------------+-------------------------+-------------------------+----------------------------------------------+
| NO | EMOTION STATE | BENTUK ALIS (BROWS)     | KELOPAK & BENTUK MATA   | KONDISI DRAMATURGIS DALAM NASKAH [Asumsi]    |
+----+---------------+-------------------------+-------------------------+----------------------------------------------+
| 1  | Normal        | Lurus horizontal netral | Terbuka 30%, pupil rilek| Kondisi baseline santai (Aryo/Danang Sc 1/7) |
| 2  | Happy         | Melengkung rileks santai| Menyipit ceria (crow's) | Kelulusan Bagas, komuni tahu goreng (Sc 6-7) |
| 3  | Sad           | Naik di tengah (pedih)  | Terpejam rapat / basah  | Dimas mengakui utang renten, Bagas ikhlas    |
| 4  | Angry         | Menukik tajam (-25°)    | Membelalak tegang       | Dimas membanting berkas, Rere & Reza di Sc 3 |
| 5  | Confused      | Satu alis terangkat (+15| Mata menyipit heran     | Fajar melihat kebocoran dewar, Aryo bingung  |
| 6  | Nervous       | Melengkung cemas tinggi | Pupil mengecil, peluh   | Kevin memantau countdown SIM ITS, takut DO   |
| 7  | Suspicious    | Menurun tajam menyipit  | Mata menyipit miring    | Zul mengamati tawaran voting curang Farhan   |
| 8  | Shocked       | Terangkat tinggi meleng | Mata membelalak bundar  | Farhan saat Nadia mencabut kabel komputer lab|
| 9  | Disappointed  | Terkulai turun lemas    | Tatapan kosong menunduk | Bagas melihat sembilan kawan angkat tangan   |
| 10 | Serious       | Datar tegas merapat     | Tatapan tajam fokus     | Nadia bicara etika insinyur, Fajar pimpin K3L|
+----+---------------+-------------------------+-------------------------+----------------------------------------------+
```

### Konvensi Pemetaan Alias Emosi `[Interpretasi Produksi]`:
Sistem parser dan skema TypeScript menerima kedua format secara ekuivalen:
- `Normal` == `normal` == `neutral`
- `Happy` == `happy` == `smiling` == `relieved`
- `Sad` == `sad` == `weeping`
- `Angry` == `angry`
- `Confused` == `confused`
- `Nervous` == `nervous` == `panicked`
- `Suspicious` == `suspicious`
- `Shocked` == `shocked`
- `Disappointed` == `disappointed` == `exhausted`
- `Serious` == `serious`

---

## 6. BENTUK MULUT BICARA (PHONEME / VISEME SHAPES) `[Interpretasi Produksi]`

Sinkronisasi gerak bibir (*lip sync*) dengan dialog vokal naskah menggunakan 4 visem utama `[Interpretasi Produksi]`:
- **`rest`**: Mulut terkatup rapat, garis bibir datar (konsonan M, B, P, atau jeda diam).
- **`slight_open`**: Mulut terbuka sedikit membentuk celah horizontal tipis (vokal E, konsonan S, T, D, N, K, L).
- **`wide_open`**: Mulut terbuka lebar oval vertikal (vokal A, I).
- **`rounded`**: Mulut mengerucut membulat ke depan (vokal O, U, W).
