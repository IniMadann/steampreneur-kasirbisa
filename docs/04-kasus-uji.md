# Kasus Uji

<!-- HAPUS KOMENTAR INI SETELAH SEMUA TANDA ___ TERISI DARI HITUNGAN MANUAL TIM (TANPA AI). Jangan commit selama masih ada ___. -->

Kasus berikut diturunkan dari `01-spesifikasi.md` (aturan bisnis bagian 6 dan kriteria selesai bagian 8) dan diuji pada website Kasir Bisa. Kasus disusun **sebelum website dibuat**. Hasil yang diharapkan dihitung manual oleh tim dengan kalkulator, bukan oleh AI.

Kolom **Hasil sebenarnya**, **Lulus?**, dan **Bukti** belum diisi karena website belum dibuat. Kolom itu diisi pada tahap uji (langkah 9 di `02-rencana.md`).

| ID | Kriteria yang diuji | Langkah / input | Hasil yang diharapkan | Hasil sebenarnya | Lulus? | Bukti (nama file tangkapan layar) |
|---|---|---|---|---|---|---|
| U01 | Input jumlah tidak valid ditolak (input salah) | Pilih Es Teh, isi jumlah `0`, lalu tekan **Tambah**. Ulangi dengan `-5`, `1,5`, kosong, dan `100`. | Setiap input ditolak dengan pesan kesalahan; keranjang tidak berubah. | Belum diuji | Belum diuji | Belum ada |
| U02 | Penambahan produk yang sama menjumlahkan kuantitas | Tambahkan Es Teh jumlah `2`, lalu Es Teh jumlah `3`. | Satu baris Es Teh jumlah 5, subtotal Rp20.000. | Belum diuji | Belum diuji | Belum ada |
| U03 | Batas jumlah gabungan 99 (nilai batas) | Tambahkan Es Teh jumlah `99`, lalu Es Teh jumlah `1`. | Penambahan kedua ditolak dengan pesan kesalahan; jumlah Es Teh tetap 99. | Belum diuji | Belum diuji | Belum ada |
| U04 | Subtotal beberapa produk berbeda | Tambahkan Es Teh jumlah 2 dan Air Mineral jumlah 1. | Subtotal Rp11.500. | Belum diuji | Belum diuji | Belum ada |
| U05 | Batas diskon non-member tepat Rp100.000 (nilai batas) | Tambahkan Es Teh jumlah `25`, bukan member. | Subtotal Rp100.000, diskon Rp5.000, PPN ___, total ___. | Belum diuji | Belum diuji | Belum ada |
| U06 | Di bawah batas diskon non-member | Tambahkan Es Teh jumlah `24` dan Air Mineral jumlah `1`, bukan member. | Subtotal ___, diskon Rp0, PPN ___, total ___. | Belum diuji | Belum diuji | Belum ada |
| U07 | Diskon member tidak ditumpuk dengan diskon belanja | Tambahkan Es Teh jumlah `30`, centang **Pelanggan member**. | Subtotal Rp120.000, hanya diskon member Rp12.000, PPN ___, total ___. | Belum diuji | Belum diuji | Belum ada |
| U08 | PPN dibulatkan ke rupiah terdekat (unit) | Hitung PPN untuk dasar pajak Rp105. | PPN Rp12 (11% x Rp105 = Rp11,55). | Belum diuji | Belum diuji | Belum ada |
| U09 | Pembulatan PPN tepat 0,5 (nilai batas) | Tambahkan Nasi Goreng jumlah `11`, bukan member. | PPN Rp17.243 (pecahan 0,5 dibulatkan naik), total Rp173.993. | Belum diuji | Belum diuji | Belum ada |
| U10 | Pembayaran kurang ditolak (input salah) | Tambahkan Nasi Goreng jumlah 1 (total Rp16.650), isi uang dibayar `1000`, tekan **Bayar**. | Ditolak dengan pesan "Uang pembayaran kurang"; kembalian tidak tampil; transaksi tidak tersimpan di rekap. | Belum diuji | Belum diuji | Belum ada |
| U11 | Uang dibayar kosong atau bukan angka ditolak (input salah) | Tambahkan produk, biarkan uang dibayar kosong, tekan **Bayar**. | Ditolak dengan pesan kesalahan; transaksi tidak tersimpan di rekap. | Belum diuji | Belum diuji | Belum ada |
| U12 | Pembayaran cukup menampilkan kembalian benar | Tambahkan Es Teh jumlah 2 (total Rp8.880), bayar Rp10.000. | Pembayaran berhasil, kembalian Rp1.120. | Belum diuji | Belum diuji | Belum ada |
| U13 | Data tersimpan setelah halaman dimuat ulang | Selesaikan U12, lalu muat ulang halaman dan buka halaman rekap. | Transaksi U12 masih ada di rekap dengan total dan kembalian yang sama. | Belum diuji | Belum diuji | Belum ada |
| U14 | Halaman rekap menampilkan transaksi tersimpan | Selesaikan dua transaksi yang berhasil (misalnya U12 dan satu lagi), lalu buka halaman rekap. | Kedua transaksi tampil; transaksi yang ditolak pada U10 tidak tampil. | Belum diuji | Belum diuji | Belum ada |
| U15 | Hapus produk dan transaksi baru | Tambahkan dua produk, hapus satu, lalu tekan **Transaksi Baru**. | Produk yang dihapus hilang dari keranjang; setelah **Transaksi Baru** keranjang kosong. | Belum diuji | Belum diuji | Belum ada |

Kasus nilai batas: U03, U05, U06, U09. Kasus input salah: U01, U10, U11.

## Unit test otomatis

Belum ada. Unit test untuk fungsi perhitungan website dibuat di folder `tes/` pada langkah 6 di `02-rencana.md`, dan dijalankan dengan `node --test`. Hasilnya dicatat di sini setelah test ada dan dijalankan.
