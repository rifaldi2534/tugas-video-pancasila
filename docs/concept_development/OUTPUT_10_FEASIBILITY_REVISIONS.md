# DOKUMEN OUTPUT 10: LOG REVISI & SOLUSI KELAYAKAN PRODUKSI LAPANGAN (FEASIBILITY REVISIONS)
## Tindakan Korektif & Modifikasi Teknis Zero-Budget untuk Film Pendek *SPESIMEN TERAKHIR*
**Proyek**: Film Pendek Naratif DTMM FTIRS ITS (16:00 Menit)  
**Tujuan**: Memberikan solusi teknis konkret, aman, dan tanpa biaya tambahan atas 6 Titik Rawan Produksi yang teridentifikasi pada Output 09 Feasibility Testing.  
**Prinsip Pelaksanaan**: Mengutamakan Keselamatan Kerja Lab (K3L), Kejelasan Audio Vokal, Disiplin Komposisi Visual, dan Integritas Nol-Biaya Mahasiswa.  

---

## 1. MATRIKS LOG REVISI KELAYAKAN TEKNIS (SUMMARY LOG)

```
+----+------------------------------------+-----------------------------+------------------------------------+-----------------------+
| NO | TITIK RAWAN TERIDENTIFIKASI (O-09) | ADEGAN TERDAMPAK            | STATUS AWAL (O-09)                 | SOLUSI REVISI (O-10)  | STATUS REVISI         |
+----+------------------------------------+-----------------------------+------------------------------------+-----------------------+-----------------------+
| R1 | Bahaya K3L Cryogenic Nitrogen Cair | Adegan 2 & Adegan 5         | BERISIKO FATAL (High Risk)         | Trik Proksi Uap Aman  | TUNTAS (RESOLVED)     |
| R2 | Bahaya K3L Ayunan Pendulum 30 kg   | Adegan 5 (Klimaks)          | BERISIKO TINGGI (High Risk)        | Trik Cutaway & Barikade| TUNTAS (RESOLVED)    |
| R3 | Tabrakan Audio Dialog Bersahutan   | Adegan 3 (Perdebatan Faksi) | BERISIKO TINGGI (High Risk)        | Koreografi Staggered  | TUNTAS (RESOLVED)     |
| R4 | Kepadatan & Komposisi Datar 14 Orang| Adegan 1 & Adegan 4        | BERISIKO (Flagged)                 | Z-Axis 3-Tier Staging | TUNTAS (RESOLVED)     |
| R5 | Belang Suhu Warna (4000K vs 3000K) | Adegan 6 (Transisi Koridor) | BERISIKO (Flagged)                 | Profil Kunci WB Manual| TUNTAS (RESOLVED)     |
| R6 | Lonjakan Audio Peak Dentang Logam  | Adegan 5 (Klimaks Charpy)   | BERISIKO (Flagged)                 | Safety Track & Foley  | TUNTAS (RESOLVED)     |
+----+------------------------------------+-----------------------------+------------------------------------+-----------------------+-----------------------+
```

---

## 2. RINCIAN SOLUSI TEKNIS & PROTOKOL REVISI LAPANGAN

---

### REVISI R1: MITIGASI BAHAYA K3L CRYOGENIC NITROGEN CAIR (ADEGAN 2 & 5)
- **Masalah Lapangan**: Menggunakan nitrogen cair sungguhan (-196°C) dalam volume besar di dalam ruang tertutup ber-AC tanpa ventilasi memicu bahaya hipoksia/asfiksia (penurunan kadar oksigen akibat penguapan gas nitrogen) serta risiko luka bakar dingin (*frostbite*) pada tangan aktor saat memegang spesimen.
- **Solusi Zero-Budget (Trik Proksi Sinematik Aman)**:
  1. **Tabung Dewar Asli Berisi Air Hangat & Es Kering (Dry Ice)**:
     - Tabung dewar laboratorium kampus tetap digunakan sebagai properti visual eksterior yang autentik.
     - Di dalam bejana dewar, tempatkan mangkok stainless steel kecil berisi air hangat yang diberi beberapa bongkah kecil *dry ice* (es kering sisa pengawet es krim yang dibeli patungan Rp 10.000 di Keputih) atau menggunakan semprotan uap ultrasonik / diffuser air kecil milik mahasiswa.
     - Ketika Fajar membuka tutup tabung dewar, kabut uap putih pekat yang dingin akan meluap keluar secara sangat spektakuler dan tampak 100% identik dengan uap nitrogen cair di depan lensa kamera smartphone, namun **100% aman dihirup dan tidak beracun**.
  2. **Proksi Bunga Es pada Spesimen Logam**:
     - Semprotkan sedikit tepung maizena basah atau *hairspray* yang ditaburi bedak bayi pada permukaan kupon baja cadangan sebelum dimasukkan ke dalam penjepit. Di kamera, spesimen akan terlihat membeku dingin dan dilapisi kristal es sub-nol (-40°C) yang sangat meyakinkan.
- **Dampak pada Naskah & Produksi**: Aktor dapat berakting bebas tanpa rasa takut terluka; waktu persiapan adegan dipangkas dari 30 menit menjadi 3 menit.

---

### REVISI R2: MITIGASI BAHAYA AYUNAN PENDULUM CHARPY 30 KG (ADEGAN 5)
- **Masalah Lapangan**: Pendulum baja seberat 30 kg berayun dengan energi kinetik hingga 300 Joule pada ketinggian 1.5 meter. Jika seorang aktor atau operator kamera smartphone terpeleset atau berdiri terlalu dekat dengan lintasan ayunan, kecelakaan fisik fatal dapat terjadi.
- **Solusi Zero-Budget (Trik Pemisahan Spasial & Editing Cutaway)**:
  1. **Pemasangan Barikade Garis Merah (Red Safety Line)**:
     - Pasang lakban kain hitam/merah di lantai lab pada radius 1.5 meter dari mesin uji Charpy.
     - Seluruh aktor dilarang keras melangkahi garis tersebut selama syuting ayunan mesin berlangsung.
  2. **Metodologi Pengambilan Gambar Tiga Sudut Terpisah (Three-Shot Cutaway Method)**:
     - *Shot A (Persiapan)*: Bagas meletakkan spesimen dingin ke anvil mesin dengan tangan memakai sarung tangan kulit lab tebal. Mesin dalam kondisi terkunci pasak ganda (*Safety Pin Locked*). Kamera mengambil close-up tangan.
     - *Shot B (Ayunan Mesin Kosong)*: Semua aktor mundur ke belakang pagar pengaman lab. Ruang ayun steril dari manusia. Kamera diletakkan pada tripod statis kokoh di luar radius ayun. Fajar menarik pelatuk: pendulum berayun menghantam udara kosong atau spesimen bekas yang sudah patah sebelumnya.
     - *Shot C (Insert Jarum & Patahan)*: Mesin sudah berhenti total dan terkunci kembali. Kamera mengambil Extreme Close-Up pada jarum dial analog yang digeser manual ke angka 52 Joule, lalu cut ke dua belahan spesimen baja yang tergeletak di wadah penampung.
  3. **Keajaiban Editing**: Dalam perangkat lunak DaVinci Resolve / CapCut, gabungkan ketiga shot tersebut secara ritmis dengan durasi potong cepat: *Shot A (1.5 detik) → Shot B (0.8 detik) → Sound Dentang Logam → Shot C (1.2 detik)*. Penonton akan mempersepsikan benturan tersebut terjadi secara utuh, padahal direkam secara terpisah dengan tingkat keselamatan 100%.

---

### REVISI R3: MITIGASI TABRAKAN AUDIO DIALOG BERSAHUT-SAHUTAN (ADEGAN 3)
- **Masalah Lapangan**: Ketika Rere, Dimas, Reza, dan Farhan berdebat panas, para aktor mahasiswa cenderung berbicara bersamaan (*overlapping*). Pada sistem perekaman mikrofon smartphone tunggal atau ganda, frekuensi suara mereka saling menabrak (*phase cancellation & distortion*), menghasilkan audio bising yang tidak dapat dipisahkan saat editing dialog.
- **Solusi Zero-Budget (Koreografi Percakapan Bertingkat / Staggered Cues)**:
  1. **Aturan "Satu Mulut Satu Waktu" (Staggered Dialogue Choreography)**:
     - Skenario direvisi untuk membagi perdebatan ke dalam **pola estafet vokal yang terstruktur**:
       - *Detik 01–15*: Rere melancarkan serangan verbal pembuka; Dimas menatap diam dan mendengarkan.
       - *Detik 16–30*: Dimas membalas dengan nada dingin dan keras; Rere merespons hanya dengan bahasa tubuh (mata melotot, menggeleng geram).
       - *Detik 31–45*: Farhan memotong di tengah jeda napas Dimas untuk menawarkan jalan pintas rekayasa data.
     - Karakter diizinkan menunjukkan kemarahan melalui **bahasa tubuh non-verbal** (menggebrak meja, berdiri mendadak, menarik napas kasar) tanpa harus menumpuk suara dialog aktor utama.
  2. **Strategi Penempatan Mikrofon Ganda Terisolasi**:
     - *HP Audio 1*: Dipasang di saku kemeja Dimas (fokus menangkap faksi pragmatis).
     - *HP Audio 2*: Dipasang di balik kerah jilbab Rere (fokus menangkap faksi keadilan).
     - *HP Audio 3 (Plant Mic)*: Disembunyikan di bawah meja lab tepat di antara kedua pihak untuk menangkap suara pukulan meja, gemersik kertas, dan napas ruangan.
     - Dalam penyuntingan audio, editor cukup menaikkan trek HP 1 saat Dimas bicara dan mematikan (*mute*) trek HP 2, lalu bergantian sebaliknya. Audio dijamin jernih dan bebas bocor.

---

### REVISI R4: MITIGASI KEPADATAN & BLOCKING DATAR 14 AKTOR (ADEGAN 1 & 4)
- **Masalah Lapangan**: Menempatkan 14 orang dalam ruang lab yang sempit rawan membuat kamera smartphone hanya menangkap deretan kepala yang sejajar horizontal seperti foto angkatan, memicu kebosanan visual.
- **Solusi Zero-Budget (Koreografi Spasial Tiga Lapis Z-Axis & Elevasi Vertikal)**:
  1. **Diferensiasi Ketinggian Vertikal (Tiered Vertical Levels)**:
     - *Level Rendah (Duduk di bangku pendek lab)*: Hendro (mengikir), Bagas (tertegun di pojok).
     - *Level Menengah (Duduk di kursi putar / bersandar di bibir meja)*: Aryo (tengah meja), Nadia (depan PC), Dimas (kursi putar), Kevin (laptop).
     - *Level Tinggi (Berdiri tegak / mondar-mandir)*: Reza (berdiri di samping papan tulis), Rere (berdiri tegak di samping meja), Fajar (berdiri di dekat mesin Charpy), Zul (berdiri bersandar di kusen pintu selasar).
  2. **Prinsip Pembagian Tiga Lapisan Kedalaman Ruang (Z-Axis Depth)**:
     - *Latar Depan (Foreground - 3 Orang)*: Aktor yang sedang aktif berbicara (Aryo, Dimas, Bagas) diposisikan paling dekat dengan kamera.
     - *Latar Tengah (Midground - 4 Orang)*: Aktor reaktif (Nadia, Rere, Fajar, Maya) yang merespons dengan ekspresi wajah dan perubahan gestur.
     - *Latar Belakang (Background - 7 Orang)*: Aktor pendukung (Farhan, Kevin, Hendro, Danang, Zul, Reza, Kirana) yang melakukan aktivitas laboratorium nyata yang termotivasi (menulis data di papan tulis, membuka jurnal, membersihkan gelas ukur di wastafel). Kehadiran mereka menghidupkan dunia nyata lab tanpa mengaburkan fokus cerita.

---

### REVISI R5: MITIGASI BELANG SUHU WARNA CAHAYA (ADEGAN 6)
- **Masalah Lapangan**: Interior Lab Pengujian Mekanik menggunakan lampu neon TL berkarakter dingin (4000K–4300K), sementara koridor luar Gedung W diterangi lampu pijar/downlight kekuningan (3000K–3200K). Jika kamera smartphone menggunakan mode otomatis (*Auto White Balance*), gambar akan mengalami pergeseran warna drastis (*color shifting*) yang merusak kesinambungan sinematik.
- **Solusi Zero-Budget (Penguncian Profil Manual & Motivasi Estetika Kontras)**:
  1. **Penguncian Profil White Balance Manual per Setup**:
     - *Setup Interior Lab*: Kunci White Balance pada aplikasi Open Camera / Blackmagic Camera pada angka **4200K**. Ini mempertahankan warna netral baja, jas lab putih, dan warna kulit aktor yang sehat.
     - *Setup Selasar Koridor*: Sebelum tombol rekam ditekan, ubah dan kunci White Balance manual pada angka **3800K**. Trik ini akan menetralisir cahaya lampu kuning selasar agar tidak tampak terlalu oranye menyala, sekaligus mempertahankan nuansa malam yang hangat.
  2. **Gradasi Warna Sederhana di Pasca-Produksi (DaVinci Resolve Free)**:
     - Terapkan kurva kontras standar Rec.709 pada kedua adegan.
     - Berikan sedikit sentuhan rona biru dingin (*cool tint*) pada bayangan interior lab untuk menguatkan nuansa tekanan akademik, dan biarkan selasar luar sedikit lebih hangat sebagai simbol dimulainya pembebasan moral karakter.

---

### REVISI R6: MITIGASI LONJAKAN AUDIO PEAK DENTANG CHARPY (ADEGAN 5)
- **Masalah Lapangan**: Dentang benturan pendulum baja 30 kg pada batang spesimen kupon logam menghasilkan tekanan suara akustik sesaat yang sangat keras (>100 dB SPL). Hal ini akan langsung membuat mikrofon kondensor smartphone mengalami *digital clipping/harsh distortion* yang merusak trek audio.
- **Solusi Zero-Budget (Dual-Gain Recording Buffer & Foley Organik Terpisah)**:
  1. **Pengaturan Sensitivitas Audio Aman (Safety Gain Buffer)**:
     - Pada smartphone HP perekam cadangan yang diletakkan di dekat mesin uji (jarak 2 meter), atur level input rekaman ke **-6 dB hingga -10 dB** (menggunakan aplikasi perekam yang memiliki *gain slider* seperti *Dolby On* atau *RecForge II*). Ini memberikan ruang ambang aman (*headroom*) sehingga dentang benturan tidak terpotong (*no clipping*).
  2. **Perekaman Foley Terpisah (Wild Track Foley Recording)**:
     - Setelah adegan utama selesai, lakukan pengambilan suara khusus (*wild track*): Fajar menjatuhkan sebatang besi sisa praktikum ke atas landasan anvil dari jarak 20 cm, direkam dengan smartphone dari jarak 1 meter di ruang lab yang hening total.
     - Di software editing audio, ganti audio benturan yang terdistorsi dengan track foley organik ini, lalu tambahkan sedikit *reverb* ruang alami. Hasilnya adalah suara dentang logam yang tebal, jernih, menggelegar, dan sinematik.

---

## 3. CHECKLIST VERIFIKASI AKHIR STATUS KELAYAKAN (POST-REVISION)

```
[x] PROSEDUR K3L NITROGEN CAIR: Digantikan oleh proksi dry ice/air hangat aman di dewar flask.
[x] PROSEDUR K3L PENDULUM CHARPY: Sterilisasi zona ayun, garis batas lakban, dan teknik cutaway 3-shot.
[x] KEJERNIHAN AUDIO PERDEBATAN: Pola dialog bergiliran (staggered) dan isolasi multi-HP per saku.
[x] DINAMIKA VISUAL 14 AKTOR: Diterapkan 3-tier Z-axis staging dan diferensiasi ketinggian vertikal.
[x] KONSISTENSI WARNA CAHAYA: Kunci White Balance manual 4200K (lab) dan 3800K (selasar).
[x] KEAMANAN AUDIO DENTANG BENTURAN: Pengaturan -6 dB safety headroom dan perekaman foley terpisah.

KESIMPULAN AUDIT:
SELURUH SCENE DALAM NASKAH *SPESIMEN TERAKHIR* TELAH DINYATAKAN 100% LAYAK PRODUKSI (FEASIBLE)
PADA STANDAR ZERO-BUDGET MAHASISWA DAN AMAN DILAKSANAKAN DI KAMPUS DTMM FTIRS ITS.
```

---
*Dokumen ini merupakan Output 10 resmi untuk Milestone 1. Tahap selanjutnya: Pengujian Anti-Kebosanan dan Audit Pacing pada Dokumen Output 11.*
