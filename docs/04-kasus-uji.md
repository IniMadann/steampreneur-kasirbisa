# Kasus Uji

Kasus uji ini mengacu pada aturan bisnis di `01-spesifikasi.md`. Kolom status membedakan hasil unit test logika dari uji manual aplikasi. Tangkapan layar `C01`–`C07` adalah bukti reproduksi bug pada kode awal Bug Hunt, bukan bukti hasil akhir yang sudah diperbaiki.

| ID | Kriteria yang diuji | Hasil yang diharapkan | Status retest browser | Test otomatis / bukti |
|---|---|---|---|---|
| U01 | Jumlah produk menerima hanya bilangan bulat 1–99; nilai kosong, nol, negatif, pecahan, dan >99 ditolak | Input tidak valid ditolak; keranjang tidak berubah | Retest browser lulus untuk jumlah negatif (`rangeUnderflow`); [screenshot](./bukti/U01-retest-jumlah-negatif.png) | `jumlah produk harus bilangan bulat dari 1 sampai 99`; reproduksi bug awal: `docs/bukti/C01.png` |
| U02 | Penambahan produk yang sama menjumlahkan kuantitas | Es Teh 2 ditambah 3 menjadi jumlah 5, bukan 23 | Retest browser lulus; jumlah tergabung menjadi 5; [screenshot](./bukti/U02-retest-gabung-jumlah.png) | `penambahan produk yang sama menjumlahkan kuantitas sebagai angka`; reproduksi bug awal: `docs/bukti/C03.png` |
| U03 | Jumlah gabungan produk yang sama tidak melebihi 99 | Penambahan yang membuat jumlah >99 ditolak | Retest browser lulus; jumlah tetap 99 dan pesan batas tampil; [screenshot](./bukti/U03-retest-batas-jumlah.png) | `jumlah gabungan produk yang sama tidak boleh lebih dari 99`; reproduksi bug awal: `docs/bukti/C04.png` |
| U04 | Subtotal dihitung dari harga dikali jumlah semua produk | Subtotal sama dengan penjumlahan seluruh harga x jumlah | Retest browser lulus: subtotal Rp19.000, PPN Rp2.090, total Rp21.090; [screenshot](./bukti/U04-retest-ringkasan.png) | `ringkasan menghitung subtotal, diskon, PPN, dan total sesuai aturan` |
| U05 | Non-member mendapat diskon 5% mulai subtotal Rp100.000 | Rp100.000 menghasilkan diskon Rp5.000; di bawah ambang tidak mendapat diskon | Retest browser lulus: subtotal Rp100.000 menghasilkan diskon Rp5.000; [screenshot](./bukti/U05-retest-ambang-diskon.png) | `non-member mendapat diskon 5 persen mulai subtotal Rp100.000`; reproduksi bug awal: `docs/bukti/C05.png` |
| U06 | Diskon member 10% tidak ditumpuk dengan diskon non-member | Member mendapat diskon 10% saja | Retest browser lulus: subtotal Rp100.000 menghasilkan diskon member Rp10.000; [screenshot](./bukti/U06-retest-diskon-member.png) | `diskon member 10 persen tidak ditumpuk dengan diskon belanja`; reproduksi bug awal: `docs/bukti/C06.png` |
| U07 | PPN 11% dibulatkan ke rupiah terdekat, 0,5 naik | Dasar Rp156.750 menghasilkan PPN Rp17.243 | Retest browser lulus: dasar PPN Rp156.750 menghasilkan Rp17.243; [screenshot](./bukti/U07-retest-ppn-pembulatan.png) | `PPN 11 persen dibulatkan ke rupiah terdekat`; reproduksi bug awal: `docs/bukti/C07.png` |
| U08 | Pembayaran kurang ditolak dan pembayaran cukup menghitung kembalian | Pembayaran kurang menampilkan pesan error; pembayaran cukup memberi kembalian yang benar | Retest browser lulus: pembayaran Rp1.000 ditolak, pembayaran Rp173.993 berhasil dengan kembalian Rp0; [gagal](./bukti/U08-retest-pembayaran-kurang.png), [berhasil](./bukti/U08-retest-pembayaran-berhasil.png) | `pembayaran kurang ditolak dan pembayaran cukup menghitung kembalian`; reproduksi bug awal: `docs/bukti/C02.png` |
| U09 | Transaksi berhasil disimpan dan tetap ada setelah halaman dimuat ulang | Transaksi valid tetap tersedia setelah reload; transaksi yang pembayarannya ditolak tidak disimpan | Retest browser lulus: pembayaran gagal tidak membuat entri, transaksi berhasil tetap ada setelah reload; [screenshot setelah reload](./bukti/U09-retest-setelah-muat-ulang.png) | `transaksi tersimpan dan dapat dibaca kembali` |
| U10 | Halaman rekap menampilkan transaksi tersimpan | Daftar rekap menampilkan transaksi yang berhasil dan tidak menampilkan transaksi gagal | Retest browser lulus: dua transaksi berhasil tampil dengan rincian yang sesuai; memakai screenshot yang sama dengan bukti U09 setelah reload karena kedua file identik: [screenshot](./bukti/U09-retest-setelah-muat-ulang.png) | Halaman `src/rekap.html` |
| U11 | Produk dapat dihapus dan transaksi baru mengosongkan keranjang | Produk terpilih hilang; transaksi baru dimulai dengan keranjang kosong | Retest browser lulus; [setelah hapus](./bukti/U11-retest-hapus-produk.png), [transaksi baru](./bukti/U11-retest-transaksi-baru.png) | Tombol Hapus dan Transaksi Baru |

## Unit test otomatis

Unit test logika berada di `test/kasir.test.js` dan `test/rekap.test.js`, dan dapat dijalankan dari folder utama dengan:

```powershell
node --test test/*.test.js
```

Unit test memeriksa validasi jumlah, penjumlahan kuantitas, batas jumlah gabungan, diskon, pembulatan PPN, ringkasan, kembalian, serta penyimpanan dan pembacaan riwayat. Kelulusan unit test tidak menggantikan uji manual alur pembayaran, reload, dan tampilan halaman rekap.

## Bukti gambar

Salinan C01–C07 berada di `docs/bukti/`; sumber aslinya tetap berada di `bughunt-kasir/catatan bug/bukti/`. Keduanya mendokumentasikan gejala bug awal, bukan hasil retest. Screenshot U01–U11 pada tabel di atas adalah bukti retest browser setelah perbaikan.

## Kasus uji pencarian dan filter rekap

| ID | Langkah / input | Hasil yang diharapkan | Status retest browser / bukti |
|---|---|---|---|
| CR01 | Ketik `ES TEH` pada kolom pencarian. | Transaksi yang memuat Es Teh tampil; pencarian tidak membedakan huruf besar dan kecil. | Lulus; [screenshot](./bukti/CR01-retest-cari-tanpa-kapital.png) |
| CR02 | Ketik nominal yang tampil di rekap, misalnya `173.993`. | Transaksi dengan nominal tersebut tampil. | Lulus; [screenshot](./bukti/CR02-retest-cari-nominal.png) |
| CR03 | Pilih satu nama produk pada filter produk. | Hanya transaksi yang memuat produk tersebut yang tampil. | Lulus; [screenshot](./bukti/CR03-retest-filter-produk.png) |
| CR04 | Terapkan pencarian dan filter produk bersamaan. | Hanya transaksi yang cocok dengan kedua kriteria yang tampil. | Lulus; kombinasi tanpa hasil menampilkan pesan yang benar; [screenshot](./bukti/CR04-retest-kombinasi-tanpa-hasil.png) |
| CR05 | Masukkan kata pencarian yang tidak cocok dengan transaksi mana pun. | Tabel menampilkan pesan `Data tidak ditemukan`. | Lulus; [screenshot](./bukti/CR05-retest-data-tidak-ditemukan.png) |
| CR06 | Klik `Hapus filter`. | Kolom pencarian dan filter produk kembali kosong; semua transaksi tampil. | Lulus; [screenshot](./bukti/CR06-retest-hapus-filter.png) |

Logika pencarian/filter juga diuji otomatis di `test/rekap.test.js`. Retest tampilan browser dan screenshot CR01–CR06 selesai pada 15 Oktober 2026.

## Kasus uji batas jumlah pada formulir

| ID | Langkah / input | Hasil yang diharapkan |
|---|---|---|
| U01-R1 | Masukkan jumlah `-1` atau `-5`, lalu tekan `Tambah`. | Browser menolak jumlah di bawah 1 dan item tidak masuk ke keranjang. Validasi JavaScript juga menolak jumlah negatif jika dipanggil langsung. |

Kasus negatif tercakup dalam `test/kasir.test.js` dan diuji ulang di browser: nilai `-1` memiliki status `rangeUnderflow` dan keranjang tetap kosong. Screenshot: [U01-retest-jumlah-negatif.png](./bukti/U01-retest-jumlah-negatif.png).
