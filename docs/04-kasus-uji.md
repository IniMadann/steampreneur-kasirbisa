# Kasus Uji

Kasus berikut diturunkan dari aturan bisnis pada `bughunt-kasir/README.md`. Hasil yang diharapkan menyatakan perilaku yang benar menurut aturan tersebut. Hasil sebenarnya mencatat perilaku kode saat ini, sebelum bug Bug Hunt diperbaiki. Kolom **Lulus?** membandingkan hasil aktual dengan hasil yang diharapkan.

| ID | Kriteria yang diuji | Langkah / input | Hasil yang diharapkan | Hasil sebenarnya | Lulus? | Bukti (nama file tangkapan layar) |
|---|---|---|---|---|---|---|
| U01 | Input jumlah tidak valid ditolak | Pilih Es Teh, masukkan jumlah `0`, lalu tekan **Tambah**. | Jumlah ditolak, keranjang tidak berubah, dan pesan kesalahan ditampilkan. | Fungsi menerima jumlah `0` dan menambahkan item dengan jumlah 0 ke keranjang. | Tidak | Belum ada |
| U02 | Penambahan produk yang sama menjumlahkan kuantitas | Tambahkan Es Teh dengan jumlah `2`, lalu tambahkan Es Teh lagi dengan jumlah `3`. | Satu baris Es Teh dengan jumlah 5 dan subtotal Rp20.000. | Pada alur formulir, nilai jumlah dibaca sebagai teks: jumlah menjadi `23`, subtotal Rp92.000. | Tidak | Belum ada |
| U03 | Subtotal beberapa produk berbeda | Tambahkan Es Teh jumlah 2 dan Air Mineral jumlah 1. | Subtotal = (2 x Rp4.000) + (1 x Rp3.500) = Rp11.500. | Subtotal Rp11.500. | Ya | Belum ada |
| U04 | Batas diskon non-member tepat Rp100.000 | Panggil `hitungDiskon(100000, false)` (subtotal tepat Rp100.000, bukan member). | Diskon 5% = Rp5.000 karena aturan menggunakan batas minimal. | Diskon Rp0 karena implementasi hanya memberi diskon jika subtotal lebih dari Rp100.000. | Tidak | Belum ada |
| U05 | Diskon member tidak ditumpuk dengan diskon belanja | Panggil `hitungDiskon(120000, true)` (subtotal Rp120.000, member). | Hanya diskon member 10% = Rp12.000. | Diskon Rp18.000 karena diskon non-member 5% dan diskon member 10% dijumlahkan. | Tidak | Belum ada |
| U06 | PPN dibulatkan ke rupiah terdekat | Panggil `hitungPPN(105)` sebagai nilai dasar setelah diskon. | 11% x Rp105 = Rp11,55, dibulatkan menjadi Rp12. | PPN Rp11 karena implementasi membulatkan ke bawah. | Tidak | Belum ada |
| U07 | Pembayaran kurang ditolak | Dengan total transaksi Rp100, masukkan pembayaran Rp99 lalu tekan **Bayar**. | Transaksi ditolak dan pesan "Uang pembayaran kurang" ditampilkan; kembalian tidak ditampilkan. | Perhitungan menghasilkan kembalian -Rp1 dan tampilan menandai pembayaran berhasil. | Tidak | Belum ada |
| U08 | Pembayaran cukup menampilkan kembalian benar | Tambahkan Es Teh jumlah 2 (total Rp8.880), bayar Rp10.000. | Pembayaran berhasil dan kembalian Rp1.120. | Pembayaran berhasil dan kembalian Rp1.120. | Ya | Belum ada |

Kasus batas aturan diuji pada U04 (tepat Rp100.000). Kasus input salah diuji pada U01 (jumlah nol). Hasil aktual fungsi perhitungan diperiksa menggunakan Node.js; perilaku tombol pembayaran U07 juga dicocokkan dengan alur pada `app.js`. Bukti tangkapan layar belum dibuat.

## Unit test otomatis

Nama file test: `bughunt-kasir/tes/contoh.test.js`  
Perintah: `node --test` (jalankan dari folder `bughunt-kasir`)  
Hasil saat ini: **1 lulus dari 1 test**. Test yang tersedia memeriksa subtotal dua produk berbeda; test belum mencakup kasus U01, U02, dan U04–U07.
