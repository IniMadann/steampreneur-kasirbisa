# Kasus Uji

Kasus uji ini mengacu pada aturan di `01-spesifikasi.md` dan antarmuka aplikasi utama di `src/index.html`. Unit test logika berada di `test/`; uji browser memeriksa alur yang benar-benar terlihat pada halaman.

> **Catatan bukti:** beberapa screenshot U dan CR yang sebelumnya tercatat di `docs/bukti/` menampilkan antarmuka lama dengan formulir **Tambah Pesanan**. Antarmuka saat ini di `src/index.html` menggunakan katalog bergambar dan kontrol kuantitas di keranjang. Screenshot lama tersebut tidak membuktikan tampilan atau retest versi saat ini; berkasnya tidak diubah dan perlu diganti sebelum dipakai sebagai bukti final. Berkas C01–C07 tetap merupakan bukti historis Bug Hunt, bukan bukti aplikasi utama.

| ID | Kriteria yang diuji | Hasil yang diharapkan | Status test / retest saat ini |
|---|---|---|---|
| U01 | Jumlah produk harus bilangan bulat 1–99; jumlah gabungan juga tidak boleh melebihi 99. | Tombol `−`/`+` di `#daftar-keranjang` tidak melewati batas. Logika menolak nilai kosong, nol, negatif, pecahan, dan nilai di atas batas. | Unit test lulus. UI memakai tombol, bukan kolom jumlah bebas; screenshot jumlah negatif dari antarmuka lama bukan bukti untuk `src/index.html` saat ini. |
| U02 | Menambahkan produk yang sama lebih dari sekali. | Kuantitas bertambah sebagai angka dan baris produk tetap satu. | Unit test lulus; alur browser saat ini telah diperiksa dengan menambahkan Nasi kuning berulang. Screenshot lama perlu diganti. |
| U03 | Menambahkan produk yang akan membuat jumlah gabungan melebihi 99. | Perubahan yang melewati batas ditolak; jumlah tetap valid dan tombol `+` nonaktif pada 99. | Unit test lulus. Screenshot lama perlu diganti untuk membuktikan keadaan tombol pada UI saat ini. |
| U04 | Subtotal, diskon, PPN, dan total. | Subtotal = harga × jumlah; diskon mengikuti status member/ambang; PPN 11% dihitung setelah diskon dan 0,5 dibulatkan naik; total = subtotal − diskon + PPN. | Unit test lulus. Browser saat ini menampilkan contoh member: subtotal Rp21.000, diskon Rp2.100, PPN Rp2.079, total Rp20.979. |
| U05 | Diskon non-member pada batas Rp100.000. | Subtotal Rp100.000 mendapat diskon Rp5.000; subtotal di bawah batas tidak mendapat diskon. | Unit test lulus; screenshot retest browser untuk antarmuka saat ini belum tersedia. |
| U06 | Diskon member tidak digabung dengan diskon non-member. | Member mendapat 10% saja, termasuk saat subtotal mencapai ambang diskon non-member. | Unit test lulus; contoh hitung member pada alur browser saat ini juga diperiksa. Screenshot lama perlu diganti. |
| U07 | Pembulatan PPN. | Dasar pajak Rp156.750 menghasilkan PPN Rp17.243. | Unit test lulus; screenshot retest browser untuk antarmuka saat ini belum tersedia. |
| U08 | Pembayaran kurang dan pembayaran cukup. | Pembayaran kurang ditolak dan tidak disimpan; pembayaran cukup menampilkan kembalian yang benar sebelum konfirmasi. | Unit test lulus. Browser saat ini telah memeriksa konfirmasi dan struk untuk pembayaran cukup; kasus pembayaran kurang di browser belum direkam dengan screenshot final. |
| U09 | Penyimpanan transaksi berhasil dan pemuatan ulang halaman. | Transaksi yang telah dikonfirmasi tetap tersimpan di localStorage setelah reload; transaksi gagal tidak tersimpan. | Unit test lulus. Browser saat ini telah memeriksa penyimpanan dan pemuatan ulang; data transaksi uji dibersihkan setelah verifikasi. Screenshot lama perlu diganti. |
| U10 | Halaman `src/rekap.html` menampilkan transaksi yang tersimpan. | Baris rekap berisi waktu, produk, subtotal, diskon, PPN, total, pembayaran, dan kembalian yang sama dengan struk. | Browser saat ini menampilkan transaksi uji yang sama setelah reload. Screenshot lama perlu diganti. |
| U11 | Menghapus produk dan memulai transaksi baru. | Produk yang dihapus hilang dari keranjang; **Transaksi baru** mengosongkan keranjang dan status member/pembayaran. | Unit test memeriksa perubahan dan penghapusan item; screenshot retest untuk antarmuka saat ini belum tersedia. |

## Unit test otomatis

Jalankan dari direktori utama proyek:

```powershell
node --test test/*.test.js
```

Test kasir berada di `test/kasir.test.js`, test penyimpanan di `test/transaksi.test.js`, dan test pencarian/filter/CSV di `test/rekap.test.js`. Hasil terakhir untuk direktori proyek ini: 23 test lulus. Kelulusan unit test tidak menggantikan uji tampilan dan alur di browser.

## Bukti gambar

- `C01.png`–`C07.png` menunjukkan gejala kode awal pada tugas Bug Hunt di `bughunt-kasir/`.
- Screenshot U dan CR yang menampilkan formulir **Tambah Pesanan** berasal dari versi antarmuka sebelumnya. Karena tidak sama dengan katalog dan keranjang pada `src/index.html` saat ini, screenshot tersebut tidak boleh dipakai sebagai bukti retest final.
- Uji browser terhadap alur saat ini telah dilakukan, tetapi screenshot baru yang cocok dengan halaman `src/index.html` belum disimpan di `docs/bukti/`.

## Kasus uji pencarian, filter, dan CSV

| ID | Langkah / input | Hasil yang diharapkan | Status test / bukti |
|---|---|---|---|
| CR01 | Cari nama produk pada transaksi yang tersimpan, dengan kapitalisasi berbeda. | Hasil yang cocok tampil; pencarian tidak membedakan huruf besar dan kecil. | Unit test lulus. Contoh fixture `Es Teh` di `test/rekap.test.js` adalah data uji, bukan produk katalog saat ini. Screenshot lama bukan bukti final. |
| CR02 | Cari sebagian nominal yang terlihat pada baris rekap. | Transaksi dengan nominal tersebut tampil. | Unit test pencarian nominal lulus; screenshot untuk antarmuka saat ini belum tersedia. |
| CR03 | Pilih satu produk pada **Filter produk**. | Hanya transaksi yang memuat produk itu yang tampil. | Unit test filter lulus; screenshot untuk antarmuka saat ini belum tersedia. |
| CR04 | Terapkan pencarian dan filter produk bersamaan. | Hanya transaksi yang memenuhi kedua kriteria tampil; jika tidak ada yang cocok, tampil `Data tidak ditemukan`. | Unit test kombinasi dan hasil kosong lulus; screenshot lama bukan bukti final. |
| CR05 | Masukkan kata kunci yang tidak cocok. | Tabel menampilkan `Data tidak ditemukan`. | Unit test hasil kosong lulus; screenshot untuk antarmuka saat ini belum tersedia. |
| CR06 | Klik **Hapus filter** setelah pencarian/filter digunakan. | Kolom pencarian dan filter kembali kosong; semua transaksi tampil. | Logika UI tersedia; retest browser dengan screenshot antarmuka saat ini belum direkam. |
| CR07 | Unduh CSV saat ada hasil yang tampil setelah pencarian/filter. | CSV hanya berisi hasil yang terlihat, memiliki header, dan menyimpan nominal sebagai angka tanpa simbol mata uang/pemisah ribuan. | Unit test format, escaping, dan filter CSV lulus. Retest unduhan browser beserta screenshot yang sesuai dengan antarmuka saat ini belum direkam. |

