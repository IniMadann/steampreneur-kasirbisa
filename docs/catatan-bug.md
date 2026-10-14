# Catatan Bug Hunt: Kasir Kantin STEAM

**Nama tim:** Kasir Bisa

Buat satu entri untuk setiap bug yang ditemukan. Catatan ini disimpan di folder `docs/` pada repositori tim.

Tangkapan layar bukti awal ada di `docs/bukti/`. Test dapat dijalankan dari folder `bughunt-kasir` dengan perintah `node --test`.

## Bug 1
- **Gejala** (apa yang terlihat salah): Jumlah `0`, `-5`, `1,5`, kosong, atau `100` diterima dan masuk ke keranjang. Dengan `-5`, subtotal menjadi negatif.
-**bukti:** docs/bukti/c01.png
- **Langkah untuk memunculkan bug:** Pilih Es Teh, isi Jumlah dengan `0` (atau `-5`), lalu tekan **Tambah**.
- **Aturan bisnis yang dilanggar** (nomor aturan di README): Aturan 1
- **Penyebab** (file, fungsi, dan penjelasan): `kasir.js`, fungsi `tambahItem`. Sebelumnya fungsi langsung menyimpan nilai jumlah dari kotak input tanpa memastikan jumlah tersebut bilangan bulat antara 1 dan 99.
- **Perbaikan** (apa yang diubah): `tambahItem` mengubah jumlah menjadi angka dan melempar error jika bukan bilangan bulat 1 sampai 99.
- **Test yang membuktikan** (nama test): `jumlah produk harus bilangan bulat dari 1 sampai 99`
- **Commit perbaikan** (pesan commit): Belum dicatat.
- **Ditemukan oleh:** Tim kami

## Bug 2
- **Gejala:** Uang dibayar kurang dari total tetap diterima: tampil pesan hijau "Pembayaran berhasil" dan kembalian negatif (Rp-15.650 saat total Rp16.650 dan dibayar Rp1.000).
- **Langkah untuk memunculkan bug:** Tambahkan Nasi Goreng jumlah `1` (total Rp16.650), isi uang dibayar `1000`, lalu tekan **Bayar**. Bukti: `C02.png`.
- **Aturan bisnis yang dilanggar:** Aturan 7
- **Penyebab:** `kasir.js`, fungsi `hitungKembalian`, sebelumnya langsung mengurangi total dari uang bayar tanpa memeriksa apakah uangnya cukup. Karena tidak ada error, `app.js` menganggap pembayaran berhasil dan menampilkan kembalian negatif.
- **Perbaikan:** `hitungKembalian` sekarang melempar error dengan pesan `"Uang pembayaran kurang"` jika uang bayar kurang dari total. `app.js` menangkap error itu dan menampilkan pesannya, jadi tampilan tidak perlu diubah.
- **Test yang membuktikan:** `pembayaran kurang ditolak dan pembayaran cukup menghitung kembalian`
- **Commit perbaikan:** Belum dicatat.
- **Ditemukan oleh:** AI (Claude); tim mereproduksi di browser (`C02.png`).

## Bug 3
- **Gejala:** Es Teh 2 lalu ditambah Es Teh 3 menjadi jumlah **23** dan subtotal Rp92.000, bukan jumlah 5 dan Rp20.000.
- **Langkah untuk memunculkan bug:** Tambahkan Es Teh jumlah `2`, lalu tambahkan Es Teh jumlah `3`.
- **bukti:** `C03.png` (Nasi Goreng 1 ditambah 1 menjadi 11, subtotal Rp165.000).
- **Aturan bisnis yang dilanggar:** Aturan 2
- **Penyebab:** `app.js` mengirim `elQty.value` yang berupa teks ke fungsi `tambahItem`. Sebelumnya, fungsi menambahkan teks itu langsung ke jumlah lama, sehingga `"2" + "3"` menjadi `"23"`.
- **Perbaikan:** Jumlah diubah menjadi angka dengan `Number(qty)` di awal `tambahItem`, sebelum dijumlahkan.
- **Test yang membuktikan:** `penambahan produk yang sama menjumlahkan kuantitas sebagai angka`
- **Commit perbaikan:** Belum dicatat.
- **Ditemukan oleh:** Tim kami

## Bug 4
- **Gejala:** Jumlah gabungan di atas 99 tidak ditolak. Es Teh 99 lalu ditambah 1 menjadi 991 (di kode asli, karena teks digabung) dan menjadi 100 setelah Bug 2 diperbaiki.
- **bukti:** `C04.png`
- **Langkah untuk memunculkan bug:** Tambahkan Es Teh jumlah `99`, lalu tambahkan Es Teh jumlah `1`.
- **Aturan bisnis yang dilanggar:** Aturan 2 (total jumlah per produk tidak boleh lebih dari 99)
- **Penyebab:** `kasir.js`, fungsi `tambahItem`, sebelumnya tidak memeriksa batas jumlah setelah menambahkan barang ke jumlah yang sudah ada di keranjang.
- **Perbaikan:** Sebelum menjumlahkan, `tambahItem` memeriksa apakah jumlah lama ditambah jumlah baru lebih dari 99, dan melempar error jika ya.
- **Test yang membuktikan:** `jumlah gabungan produk yang sama tidak boleh lebih dari 99`
- **Commit perbaikan:** Belum dicatat.
- **Ditemukan oleh:** Tim kami

## Bug 5
- **Gejala:** Bukan member dengan subtotal tepat Rp100.000 tidak mendapat diskon (tampil -Rp0, total Rp111.000), padahal seharusnya diskon Rp5.000 (total Rp105.450).
- **bukti:** `C05.png`
- **Langkah untuk memunculkan bug:** Tambahkan Es Teh jumlah `25` (subtotal Rp100.000), jangan centang member.
- **Aturan bisnis yang dilanggar:** Aturan 4 (subtotal *minimal* Rp100.000)
- **Penyebab:** `kasir.js`, fungsi `hitungDiskon`, sebelumnya memakai tanda `>` sehingga subtotal harus lebih dari Rp100.000. Nilai tepat Rp100.000 tidak memenuhi syarat itu.
- **Perbaikan:** Syarat non-member sekarang menggunakan `subtotal >= 100000`, sehingga nilai tepat Rp100.000 juga mendapat diskon 5%.
- **Test yang membuktikan:** `non-member mendapat diskon 5 persen mulai subtotal Rp100.000`
- **Commit perbaikan:** Belum dicatat.
- **Ditemukan oleh:** AI (Claude)

## Bug 6
- **Gejala:** Member dengan subtotal di atas Rp100.000 mendapat dua diskon sekaligus. Subtotal Rp120.000 mendapat diskon Rp18.000 (15%), bukan Rp12.000 (10%).
- **bukti:** `C06.png`
- **Langkah untuk memunculkan bug:** Tambahkan Es Teh jumlah `30` (subtotal Rp120.000), lalu centang **Pelanggan member**.
- **Aturan bisnis yang dilanggar:** Aturan 4 (diskon tidak boleh digabung)
- **Penyebab:** `kasir.js`, fungsi `hitungDiskon`, sebelumnya menghitung diskon belanja dan diskon member dengan dua kondisi terpisah. Jika pelanggan member dan subtotal melewati Rp100.000, kedua diskon ditambahkan.
- **Perbaikan:** Fungsi sekarang memeriksa member terlebih dahulu dan langsung mengembalikan diskon 10%; diskon non-member 5% hanya dihitung jika pelanggan bukan member.
- **Test yang membuktikan:** `diskon member 10 persen tidak ditumpuk dengan diskon belanja`
- **Commit perbaikan:** Belum dicatat.
- **Ditemukan oleh:** AI (Claude).

## Bug 7
- **Gejala:** PPN dibulatkan ke bawah. Dasar pajak Rp156.750 menghasilkan PPN Rp17.242 (total Rp173.992), padahal 11% x 156.750 = 17.242,5 dan seharusnya dibulatkan naik menjadi Rp17.243 (total Rp173.993).
- **Langkah untuk memunculkan bug:** Tambahkan Nasi Goreng jumlah `11` (subtotal Rp165.000), tanpa member.
- **bukti:** `C07.png`
- **Aturan bisnis yang dilanggar:** Aturan 5
- **Penyebab:** `kasir.js`, fungsi `hitungPPN`, sebelumnya menggunakan `Math.floor` yang selalu membuang angka pecahan ke bawah.
- **Perbaikan:** Pembulatan PPN sekarang menggunakan `Math.round`, sehingga pecahan 0,5 dibulatkan naik ke rupiah berikutnya.
- **Test yang membuktikan:** `PPN 11 persen dibulatkan ke rupiah terdekat`
- **Commit perbaikan:** Belum dicatat.
- **Ditemukan oleh:** AI (Claude).

