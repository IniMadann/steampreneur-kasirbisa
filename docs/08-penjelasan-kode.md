# Penjelasan Kode

Tidak ada sesi presentasi, jadi dokumen ini adalah bukti utama bahwa tim memahami kode yang dihasilkan AI.

---

## Bagian A: Penjelasan per anggota

### Penjelasan 1
- **Ditulis oleh:** Muh. Rizky Ramadhan
- **File dan fungsi:** `bughunt-kasir/kasir.js`, fungsi `tambahItem`
- **Apa yang dilakukan:** Fungsi ini menambahkan produk ke keranjang. Jika produk sudah ada, jumlahnya ditambahkan ke item yang sudah ada. Fungsi ini juga memvalidasi kode produk, jumlah barang, dan batas maksimal per produk.
- **Kenapa dibuat seperti ini:** Aturan bisnis menegaskan bahwa jumlah barang harus bilangan bulat 1 sampai 99 dan total per produk tidak boleh melebihi 99. Karena input dari form biasanya berupa teks, fungsi harus mengubah nilai menjadi angka dan memeriksa formatnya sebelum masuk ke keranjang.
- **Contoh:** jika keranjang berisi Es Teh dengan qty 2 dan kita tambah `3`, maka hasilnya qty menjadi 5, bukan `23`.
- **Jika input salah atau kosong:** fungsi akan melempar error, misalnya `Jumlah harus bilangan bulat dari 1 sampai 99` atau `Total jumlah per produk tidak boleh lebih dari 99`.

### Penjelasan 2
- **Ditulis oleh:** Muh. Rizky Ramadhan
- **File dan fungsi:** `bughunt-kasir/kasir.js`, fungsi `hitungDiskon`
- **Apa yang dilakukan:** Fungsi ini menentukan diskon yang berlaku berdasarkan status member dan subtotal. Aturannya tidak boleh digabung: member mendapat 10%, non-member mendapat 5% jika subtotal minimal Rp100.000, dan kalau tidak memenuhi syarat maka diskon 0.
- **Kenapa dibuat seperti ini:** Logika diskon harus mengikuti aturan bisnis dengan jelas. Karena ada dua jenis diskon dan hanya satu yang berlaku, fungsi harus memeriksa member terlebih dahulu agar tidak terjadi penjumlahan diskon ganda.
- **Contoh:** subtotal Rp120.000 dan member aktif menghasilkan diskon 10% = Rp12.000, bukan 15% dari dua kombinasi diskon.
- **Jika input salah atau kosong:** fungsi belum menerima input yang tidak valid; ia mengandalkan subtotal yang sudah dihitung dari keranjang, sehingga input yang salah sudah harus ditolak di tahap sebelumnya.

### Penjelasan 3
- **Ditulis oleh:** Ahmad Fadil
- **File dan fungsi:** `bughunt-kasir/kasir.js`, fungsi `hitungPPN`
- **Apa yang dilakukan:** Fungsi ini menghitung PPN 11% dari dasar pajak lalu membulatkan ke rupiah terdekat. Pembulatan dilakukan dengan cara yang tepat agar `0,5` dibulatkan naik.
- **Kenapa dibuat seperti ini:** Aturan bisnis mengharuskan PPN dibulatkan ke rupiah terdekat, bukan dibuang ke bawah. Jika menggunakan `Math.floor`, maka nilai 17.242,5 menjadi 17.242, padahal seharusnya 17.243.
- **Contoh:** dasar pajak Rp156.750 x 11% = Rp17.242,5. Karena 0,5 dibulatkan naik, hasil akhirnya adalah Rp17.243.
- **Jika input salah atau kosong:** fungsi mengasumsikan dasar pajak sudah valid dan berbentuk angka. Jika dasar pajak tidak valid, maka fungsi harus dipanggil setelah data sudah melalui pengecekan sebelumnya.

### Penjelasan 4
- **Ditulis oleh:** Ahmad Fadil
- **File dan fungsi:** `bughunt-kasir/kasir.js`, fungsi `hitungKembalian`
- **Apa yang dilakukan:** Fungsi ini memastikan pembayaran cukup dan menghitung selisih antara uang bayar dan total transaksi. Jika uang bayar lebih kecil dari total, fungsi akan menolak transaksi.
- **Kenapa dibuat seperti ini:** Ini penting agar kasir tidak menerima transaksi dengan uang kurang, lalu membiarkan kembalian negatif atau menyatakan pembayaran berhasil. Aturan bisnis mengharuskan pesan `Uang pembayaran kurang` saat kondisi itu terjadi.
- **Contoh:** total Rp16.650 dan bayar Rp1.000 akan otomatis ditolak karena pembayaran tidak mencukupi.
- **Jika input salah atau kosong:** fungsi akan memeriksa data numerik sebelum menghitung. Jika nilai tidak valid, hasilnya akan ditolak dengan pesan kesalahan yang jelas.

### Penjelasan 5
- **Ditulis oleh:** Laode Azharil Nur Ibrahim Nunsyah
- **File dan fungsi:** `bughunt-kasir/app.js`, fungsi `render` dan `document.getElementById("tombol-bayar")`
- **Apa yang dilakukan:** Fungsi `render` menampilkan isi keranjang serta subtotal, diskon, PPN, dan total di layar. Saat pengguna menekan tombol bayar, kode ini mengambil total yang dihitung dari logika bisnis lalu menampilkan kembalian atau pesan error.
- **Kenapa dibuat seperti ini:** Tampilan harus selalu sinkron dengan data yang sedang aktif. Jadi, ketika keranjang berubah, fungsi render dijalankan kembali agar semua nilai yang muncul di layar selalu sesuai dengan kondisi transaksi yang benar.
- **Contoh:** jika keranjang berisi produk dengan subtotal Rp100.000 dan member aktif, `render` akan memperbarui nilai diskon dan total secara otomatis sesuai hitungannya.
- **Jika input salah atau kosong:** event handler membuang error ke `tampilkanPesan`, lalu menampilkan pesan yang sesuai di bagian notifikasi tanpa membuat transaksi dianggap sukses.

### Penjelasan 6
- **Ditulis oleh:** Laode Azharil Nur Ibrahim Nunsyah
- **File dan fungsi:** `bughunt-kasir/app.js`, fungsi `tampilkanPesan` dan `rupiah`
- **Apa yang dilakukan:** Fungsi `rupiah` memformat angka menjadi format mata uang Indonesia, misalnya `15000` menjadi `Rp15.000`. Fungsi `tampilkanPesan` mengubah teks dan kelas pesan agar app bisa menampilkan status sukses, error, atau keadaan normal.
- **Kenapa dibuat seperti ini:** Antarmuka kasir harus mudah dibaca dan konsisten. Dengan format uang yang sama, kasir tidak bingung membedakan angka biasa dengan nominal duit. Pesan error juga harus mudah dibaca agar pengguna tahu alasan transaksi ditolak.
- **Contoh:** `rupiah(12000)` menghasilkan `Rp12.000`; status error seperti `Uang pembayaran kurang` ditampilkan dengan kelas `error`.
- **Jika input salah atau kosong:** pesan error bisa muncul tanpa merusak state program, sehingga pengguna masih bisa memperbaiki input dengan cepat.

---

## Bagian B: Pertanyaan yang dijawab bersama

1. Jika aturan bisnis utama di spesifikasi berubah (tuliskan contoh perubahannya), file dan fungsi mana yang harus diubah? Jelaskan alasannya.
   > Contoh perubahan: diskon non-member menjadi 7% dan berlaku di bawah Rp100.000. Fungsi yang harus diubah adalah `hitungDiskon` di `bughunt-kasir/kasir.js`, karena seluruh perhitungan diskon ada di sana. Jika perubahan ini memengaruhi tampilan, maka `app.js` juga perlu disesuaikan agar nilai yang ditampilkan sesuai hasil baru.

2. Bagaimana data mengalir dari saat pengguna mengisi form sampai hasilnya tampil di layar? Sebutkan file dan fungsi yang dilewati secara berurutan.
   > Data dimulai dari elemen form di `app.js`, lalu event submit memanggil `tambahItem` di `kasir.js`, kemudian `render` menghitung ringkasan melalui `hitungRingkasan`, dan hasilnya tampil ke elemen seperti `subtotal`, `diskon`, `ppn`, dan `total`. Saat pembayaran diproses, fungsi `hitungKembalian` dipanggil dan hasilnya ditampilkan di `elHasilBayar`.

3. Pilih satu unit test. Apa yang diuji, dan dalam kondisi apa test itu akan gagal?
   > Test `penambahan produk yang sama menjumlahkan kuantitas sebagai angka` akan gagal jika kode menambahkan string langsung, misalnya `"2" + "3"` menjadi `"23"` tanpa konversi numerik. Kondisi gagal terjadi saat input qty diambil dari form dan belum diubah ke angka.

4. Pilih satu saran AI yang kalian tolak. Apa sarannya dan kenapa kalian menolaknya?
   > Saran yang kami tolak adalah bila ada usulan untuk menebak hasil diskon tanpa memeriksa aturan yang jelas. AI bisa memberi jawaban cepat, tetapi kalau tidak sesuai spesifikasi atau tidak dibuktikan melalui test, saran itu tidak bisa diterima. Kami tetap menilai berdasarkan aturan bisnis dan hasil pengujian.

5. Bagian kode mana yang paling sulit dipahami, dan bagaimana kalian akhirnya memahaminya?
   > Bagian yang paling sulit adalah pembulatan PPN dan validasi input karena ada banyak edge case. Kami akhirnya memahaminya dengan menulis kasus uji khusus untuk nilai batas seperti `0,5` dan kelipatan 99, lalu membandingkan hasil hitung dengan aturan yang tertulis di challenge.
