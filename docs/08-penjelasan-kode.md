# Penjelasan Kode

Tidak ada sesi presentasi, jadi dokumen ini menjelaskan kode aplikasi utama yang dijalankan dari `src/index.html`. Keterangan di bawah mengacu pada file di `src/`, bukan salinan latihan Bug Hunt di `bughunt-kasir/`.

---

## Bagian A: Penjelasan per anggota

### Penjelasan 1
- **Ditulis oleh:** Muh. Rizky Ramadhan
- **File dan fungsi:** `src/kasir.js`, fungsi `tambahItem`
- **Apa yang dilakukan:** Fungsi ini mencari produk berdasarkan kode, memvalidasi jumlah, lalu menambahkan produk ke keranjang. Jika produk yang sama sudah ada, jumlah baru ditambahkan sebagai angka ke jumlah lama.
- **Kenapa dibuat seperti ini:** UI saat ini menambahkan satu produk lewat kartu katalog, sedangkan logika juga perlu aman terhadap jumlah yang tidak valid atau pemanggilan dari luar UI. Batas jumlah setiap produk adalah bilangan bulat 1–99.
- **Contoh:** Jika keranjang berisi Air Mineral (`K02`) dengan qty 2 lalu `tambahItem` dipanggil dengan qty 3, hasilnya satu baris dengan qty 5, bukan dua baris atau nilai `"23"`.
- **Jika input salah atau kosong:** Fungsi menolak jumlah di luar rentang atau bukan bilangan bulat, serta menolak kode produk yang tidak dikenal.

### Penjelasan 2
- **Ditulis oleh:** Muh. Rizky Ramadhan
- **File dan fungsi:** `src/kasir.js`, fungsi `hitungDiskon`
- **Apa yang dilakukan:** Fungsi memilih satu diskon berdasarkan subtotal dan status member. Member mendapat 10%; non-member mendapat 5% jika subtotal minimal Rp100.000; selain itu diskon 0.
- **Kenapa dibuat seperti ini:** Aturan bisnis tidak membolehkan diskon member dan non-member ditumpuk. Fungsi mengembalikan hanya satu nilai diskon untuk dipakai `hitungRingkasan`.
- **Contoh:** Subtotal Rp120.000 untuk member menghasilkan diskon Rp12.000, bukan Rp18.000.
- **Jika input salah atau kosong:** Fungsi menerima subtotal yang sudah dihitung dari keranjang. Validasi jumlah dan produk dilakukan lebih dahulu oleh fungsi keranjang.

### Penjelasan 3
- **Ditulis oleh:** Ahmad Fadil
- **File dan fungsi:** `src/kasir.js`, fungsi `hitungPPN`
- **Apa yang dilakukan:** Fungsi menghitung 11% dari dasar pajak, lalu membulatkan ke rupiah terdekat dengan nilai 0,5 dibulatkan naik.
- **Kenapa dibuat seperti ini:** PPN dihitung setelah diskon. Pembulatan yang konsisten menghindari selisih satu rupiah dibanding pemotongan pecahan.
- **Contoh:** Dasar pajak Rp156.750 menghasilkan PPN Rp17.242,5, lalu dibulatkan menjadi Rp17.243.
- **Jika input salah atau kosong:** Fungsi ini mengasumsikan dasar pajak berupa angka yang dihitung dari keranjang. Nilai transaksi dan total kemudian diperiksa pada alur pembayaran.

### Penjelasan 4
- **Ditulis oleh:** Ahmad Fadil
- **File dan fungsi:** `src/kasir.js`, fungsi `hitungKembalian`
- **Apa yang dilakukan:** Fungsi menolak nilai pembayaran yang bukan bilangan bulat non-negatif dan menolak pembayaran yang kurang dari total. Jika cukup, fungsi mengembalikan selisih pembayaran dengan total.
- **Kenapa dibuat seperti ini:** Transaksi tidak boleh dianggap berhasil jika uang yang diterima belum mencukupi; nilai kembalian juga tidak boleh menjadi negatif.
- **Contoh:** Total Rp16.650 dengan pembayaran Rp20.000 menghasilkan kembalian Rp3.350; pembayaran Rp1.000 ditolak dengan pesan `Uang pembayaran kurang`.
- **Jika input salah atau kosong:** Input kosong atau tidak valid ditolak. Pada UI, kolom `#bayar` berada di formulir pembayaran dan harus diisi sebelum konfirmasi.

### Penjelasan 5
- **Ditulis oleh:** Laode Azharil Nur Ibrahim Nunsyah
- **File dan fungsi:** `src/app.js`, fungsi `renderKeranjang`, `renderPembayaran`, dan `ajukanPembayaran`
- **Apa yang dilakukan:** Fungsi render menampilkan isi keranjang serta subtotal, diskon, PPN, total, dan kembalian. `ajukanPembayaran` membuat transaksi sementara dan menampilkan dialog konfirmasi; transaksi belum disimpan pada tahap ini.
- **Kenapa dibuat seperti ini:** Nilai tampilan berasal dari perhitungan `KasirLogic` agar ringkasan dan transaksi memakai aturan yang sama. Pemisahan dialog memberi kesempatan untuk memeriksa rincian sebelum menyimpan pembayaran.
- **Contoh:** Dengan Nasi kuning dua buah dan Air Mineral satu buah sebagai member, subtotal Rp21.000, diskon Rp2.100, PPN Rp2.079, dan total Rp20.979.
- **Jika input salah atau kosong:** Formulir menjalankan `reportValidity`; `buatTransaksi` menolak pembayaran kosong/tidak cukup dan pesan ditampilkan tanpa membuat transaksi berhasil.

### Penjelasan 6
- **Ditulis oleh:** Laode Azharil Nur Ibrahim Nunsyah
- **File dan fungsi:** `src/app.js`, fungsi `tampilkanPesan` dan `rupiah`
- **Apa yang dilakukan:** `rupiah` menampilkan nominal dalam format Indonesia, misalnya `15000` menjadi `Rp15.000`. `tampilkanPesan` menampilkan status berhasil atau kesalahan pada area notifikasi.
- **Kenapa dibuat seperti ini:** Format angka yang konsisten memudahkan kasir membaca nominal, sedangkan pesan status membantu pengguna mengetahui hasil tindakannya.
- **Contoh:** Setelah transaksi dikonfirmasi, `tampilkanPesan` menunjukkan bahwa pembayaran berhasil dan transaksi tersimpan. Jika pembayaran ditolak, pesan kesalahan ditampilkan tanpa menyatakan sukses.
- **Jika input salah atau kosong:** Fungsi pemformatan tidak melakukan validasi bisnis; validasi pembayaran berada pada `src/kasir.js` dan alur formulir di `src/app.js`.

---

## Bagian B: Pertanyaan yang dijawab bersama

1. Jika aturan bisnis utama di spesifikasi berubah (tuliskan contoh perubahannya), file dan fungsi mana yang harus diubah? Jelaskan alasannya.
   > Contoh perubahan: diskon non-member menjadi 7% dan berlaku di bawah Rp100.000. Aturan perhitungan harus diubah pada `hitungDiskon` di `src/kasir.js`, lalu kasus batas yang terkait diperbarui di `test/kasir.test.js` dan `docs/04-kasus-uji.md`. Jika label atau keterangan yang tampil berubah, bagian terkait di `src/index.html` dan dokumentasi juga perlu disesuaikan.

2. Bagaimana data mengalir dari saat pengguna memilih produk sampai transaksi tersimpan?
   > Kartu produk dibuat pada `renderProduk` di `src/app.js` berdasarkan data `src/kasir.js`; klik pada `#daftar-produk` memanggil `tambahItem`, lalu `render` memperbarui keranjang dan ringkasan. Form `#form-pembayaran` memeriksa validitas lalu memanggil `ajukanPembayaran`, yang membuat transaksi sementara. Setelah pengguna memilih **Konfirmasi & bayar**, `konfirmasiPembayaran` memanggil `KasirTransaksi.simpanTransaksi` dari `src/transaksi.js`, lalu memperbarui riwayat. Halaman `src/rekap.html` menggunakan `src/rekap.js` untuk membaca, mencari, memfilter, dan mengekspor transaksi yang tersimpan.

3. Pilih satu unit test. Apa yang diuji, dan dalam kondisi apa test itu akan gagal?
   > Test `penambahan produk yang sama menggabungkan jumlah secara numerik` di `test/kasir.test.js` memastikan qty `"2"` dan `"3"` untuk produk sama menjadi angka 5. Test akan gagal jika kode menggabungkan kedua string menjadi `"23"` atau membuat baris keranjang kedua.

4. Pilih satu saran AI yang kalian tolak. Apa sarannya dan kenapa kalian menolaknya?
   > Saran yang kami tolak adalah menebak hasil diskon tanpa mencocokkannya dengan aturan tertulis. Saran harus diperiksa terhadap spesifikasi dan hasil test; jawaban AI saja tidak cukup untuk menetapkan hasil transaksi.

5. Bagian kode mana yang paling sulit dipahami, dan bagaimana kalian akhirnya memahaminya?
   > Bagian yang paling sulit adalah pembulatan PPN dan validasi input pembayaran/jumlah. Kami memeriksanya dengan kasus batas di `test/kasir.test.js`, menghitung hasil yang diharapkan secara manual, lalu mencocokkan nilai yang muncul pada ringkasan dan konfirmasi di browser.
