# Spesifikasi Produk

**Nama tim:** Kasir Bisa
**Nama produk:** Kasir Bisa (website kasir kantin sekolah)
**Alur inti yang akan dibangun:** Kasir memilih produk dan jumlahnya, memeriksa rincian dan total belanja, membayar dan melihat kembalian, lalu transaksi tersimpan dan dapat dilihat kembali di halaman rekap.

**Status dokumen:** spesifikasi awal. Status verifikasi tiap kriteria dicatat di `04-kasus-uji.md`.

## 1. Masalah

Kasir kantin melayani banyak siswa sambil menyiapkan makanan dan minuman. Dalam kondisi sibuk, transaksi manual mudah terlewat atau sulit diperiksa kembali. Narasumber menceritakan kejadian siswa mengaku sudah membayar padahal belum, atau mengambil barang saat kasir sedang sibuk. Kasir memerlukan cara sederhana untuk menghitung transaksi dengan jelas dan menyimpan catatannya agar bisa diperiksa kembali.

## 2. Pengguna

Pengguna utama adalah kasir atau penjaga kantin sekolah. Mereka membutuhkan aplikasi yang mudah digunakan untuk memilih barang, memasukkan jumlah, melihat rincian dan total pembayaran, menghitung kembalian, dan melihat kembali transaksi yang sudah terjadi, tanpa memperlambat pelayanan. Aplikasi ini tidak memerlukan akun.

## 3. Hasil wawancara calon pengguna

**Narasumber:** penjaga/kasir kantin sekolah
**Cara wawancara:** percakapan langsung (berdasarkan transkrip percakapan)
**Tanggal:** tidak tercatat pada transkrip

| Pertanyaan kami | Jawaban narasumber |
|---|---|
| Apa kegiatan saat menjaga kantin? | Menjual dan melayani siswa, termasuk membungkus nasi serta menyiapkan minuman. |
| Bagaimana proses siswa membeli? | Siswa menyebutkan barang yang dibeli dan apakah akan makan di tempat atau dibungkus. |
| Bagaimana transaksi dan penjualan dicatat? | Masih dilakukan secara manual; narasumber belum menggunakan alat pencatatan khusus. |
| Apa yang memakan waktu saat ramai? | Membungkus nasi dan menyiapkan Pop Mie karena perlu beberapa langkah. |
| Apakah pernah ada masalah transaksi? | Narasumber menyebut kejadian siswa mengaku sudah membayar atau mengambil barang saat kasir sedang sibuk. |

Ringkasan di atas diparafrasekan dari `Hasil transkripsi wawancara.md`; tanggal dan identitas pribadi tidak tersedia dan tidak ditambahkan.

## 4. Fitur wajib (hanya untuk alur inti)

1. Menampilkan katalog produk dengan gambar, kategori, harga, pencarian, dan filter kategori; menyediakan tindakan untuk menambahkan produk ke keranjang.
2. Menggabungkan jumlah produk yang sama; menyediakan kontrol untuk menambah atau mengurangi jumlah (1–99) dan menghapus produk; serta menampilkan subtotal.
3. Menghitung diskon, PPN, dan total sesuai aturan bisnis; menerima jumlah uang melalui formulir pembayaran dengan validasi; menolak pembayaran yang kurang; meminta konfirmasi sebelum menyimpan; serta menampilkan rincian transaksi dan kembalian.
4. Menyimpan setiap transaksi yang berhasil dibayar ke penyimpanan browser (localStorage) sehingga tetap ada setelah halaman dimuat ulang.
5. Menyediakan halaman rekap yang menampilkan kembali daftar transaksi yang sudah tersimpan.
6. Menyediakan ringkasan penjualan, riwayat transaksi terbaru, dan tindakan untuk memulai transaksi baru atau mengosongkan keranjang.

### Pemetaan fitur ke antarmuka dan kode

Pemetaan berikut merujuk pada antarmuka aplikasi utama di `src/index.html`, bukan halaman Bug Hunt di `bughunt-kasir/`.

| Bagian di `src/index.html` | Elemen antarmuka | Implementasi |
|---|---|---|
| Katalog | `#daftar-produk`, `#cari-produk`, `#filter-kategori` | `src/app.js` merender katalog dan menyaring produk; aturan katalog berada di `src/kasir.js`. |
| Keranjang | `#daftar-keranjang`, tombol `+`, `−`, dan `Hapus` | `src/app.js` menangani tindakan; `tambahItem`, `ubahJumlah`, dan `hapusItem` di `src/kasir.js` memperbarui data. |
| Ringkasan belanja | `#subtotal`, `#diskon`, `#ppn`, `#total` | `hitungRingkasan` di `src/kasir.js` menjadi sumber nilai subtotal, diskon, PPN, dan total. |
| Pembayaran | `#member`, `#bayar`, `#nominal-cepat`, `#form-pembayaran` | `src/app.js` memvalidasi formulir, menghitung kembalian, dan meminta konfirmasi sebelum pembayaran disimpan. |
| Konfirmasi dan struk | `#dialog-transaksi`, `#ringkasan-konfirmasi`, `#rincian-struk` | `ajukanPembayaran` dan `konfirmasiPembayaran` di `src/app.js` mengatur dialog dan hasil pembayaran. |
| Ringkasan dan riwayat | `#jumlah-transaksi`, `#total-penjualan`, `#riwayat-transaksi` | `renderRiwayat` di `src/app.js` menampilkan ringkasan dan transaksi terbaru. |
| Rekap transaksi | Tautan ke `src/rekap.html` | `src/rekap.js` membaca transaksi, menyediakan pencarian/filter, dan mengekspor hasil yang tampil ke CSV. |

## Change request: pencarian, filter, dan ekspor rekap

- Kolom pencarian menyaring transaksi langsung berdasarkan teks yang terlihat pada rekap, termasuk waktu, produk, dan nominal; pencarian tidak membedakan huruf besar dan kecil.
- Filter produk menampilkan transaksi yang memuat produk terpilih.
- Pencarian dan filter produk dapat digunakan bersamaan.
- Jika tidak ada transaksi yang cocok, halaman menampilkan pesan `Data tidak ditemukan`.
- Tombol `Hapus filter` mengosongkan pencarian dan mengembalikan semua transaksi.
- Tombol `Unduh CSV` mengekspor transaksi yang sedang tampil setelah pencarian dan filter diterapkan.
- Baris pertama CSV berisi nama kolom; nominal diekspor sebagai angka tanpa simbol mata uang atau pemisah ribuan, dan file dapat dibuka di Excel.

## 5. Di luar cakupan (tidak dikerjakan dalam challenge ini)

- Login, akun kasir, dan pengelolaan hak akses.
- Basis data server, sinkronisasi antarperangkat, dan ekspor struk.
- Integrasi pembayaran digital, printer, stok, dan pemesanan daring.
- Pengelolaan katalog/harga melalui halaman administrasi.
- Pencatatan identitas siswa.

Pencarian, filter produk, dan ekspor CSV di halaman rekap ditambahkan sebagai change request.

## 6. Aturan bisnis dan perhitungan

1. Jumlah tiap produk harus bilangan bulat dari 1 sampai 99. Tombol tambah/nonaktif dan kurangi/nonaktif membatasi kontrol antarmuka ke rentang ini; validasi `tambahItem` dan `ubahJumlah` tetap menolak nilai kosong, nol, negatif, pecahan, atau jumlah gabungan di atas 99.
2. Jika produk yang sudah ada di keranjang ditambahkan lagi, jumlahnya dijumlahkan; kontrol tambah jumlah juga tidak boleh melewati 99.
3. **Subtotal** adalah jumlah dari harga setiap produk dikalikan jumlahnya.
4. Hanya satu diskon yang berlaku:
   - Pelanggan member mendapat diskon 10% dari subtotal.
   - Pelanggan bukan member mendapat diskon 5% jika subtotal minimal Rp100.000.
   - Selain kondisi tersebut, tidak ada diskon.
   - Diskon dibulatkan ke rupiah terdekat.
5. **PPN** adalah 11% dari subtotal setelah diskon dan dibulatkan ke rupiah terdekat (nilai 0,5 dibulatkan naik).
6. **Total** = subtotal - diskon + PPN.
7. Uang dibayar yang kosong atau bukan angka ditolak dengan pesan kesalahan. Jika uang dibayar kurang dari total, pembayaran ditolak dengan pesan "Uang pembayaran kurang". Jika cukup, kembalian = uang dibayar - total.
8. Transaksi hanya disimpan ke rekap jika pembayaran berhasil. Pembayaran yang ditolak tidak disimpan.

## 7. Data yang disimpan

| Data | Contoh isi | Disimpan di mana |
|---|---|---|
| Katalog produk contoh | Nasi kuning, Rp8.000, kategori Makanan, gambar katalog | Berkas kode website di `src/` dan aset lokal; bukan data kantin yang telah diverifikasi |
| Isi keranjang aktif | Nasi kuning, jumlah 2 | Memori halaman selama transaksi berlangsung |
| Riwayat transaksi | Waktu, daftar produk, subtotal, diskon, PPN, total, uang dibayar, kembalian | localStorage browser; tetap ada setelah halaman dimuat ulang, hanya pada browser dan perangkat yang sama |
| Data wawancara | Ringkasan jawaban penjaga kantin | Dokumen proyek `Hasil transkripsi wawancara.md`; bukan data aplikasi |

Keranjang aktif hilang ketika halaman dimuat ulang atau transaksi baru dimulai. Riwayat transaksi tidak ikut hilang.

## 8. Kriteria "selesai"

Kotak dicentang hanya jika kriteria telah diuji; status dan bukti dicatat di `04-kasus-uji.md`.

- ☑ Kasir dapat menambahkan produk; penambahan produk yang sama menggabungkan jumlah dan keranjang menampilkan subtotal yang sesuai.
- ☑ Jumlah kosong, nol, negatif, pecahan, atau jumlah gabungan di atas 99 ditolak dengan pesan kesalahan.
- ☑ Member memperoleh satu diskon 10%; non-member memperoleh satu diskon 5% hanya pada subtotal minimal Rp100.000; diskon lain tidak ditumpuk.
- ☑ PPN 11% dihitung dari subtotal setelah diskon dengan pembulatan ke rupiah terdekat; total sama dengan subtotal - diskon + PPN.
- ☑ Uang dibayar yang kosong atau kurang dari total ditolak dengan pesan kesalahan; pembayaran yang cukup menampilkan kembalian yang benar.
- ☑ Transaksi yang berhasil dibayar tersimpan dan tetap ada setelah halaman dimuat ulang. (Uji browser dicatat di `04-kasus-uji.md`.)
- ☑ Halaman rekap menampilkan semua transaksi yang tersimpan. (Uji browser dicatat di `04-kasus-uji.md`.)
- ☑ Kasir dapat menghapus produk dan memulai transaksi baru sehingga keranjang transaksi sebelumnya kosong.

## 9. Pemetaan ke syarat minimum website

| Syarat minimum | Dipenuhi oleh |
|---|---|
| Alur inti minimal tiga langkah | Pilih produk, periksa rincian dan total, bayar dan lihat kembalian, lalu transaksi tersimpan (fitur 1 sampai 4) |
| Formulir dengan validasi | Formulir pembayaran (uang dibayar), validasi jumlah dan batas keranjang di logika kasir, aturan 1 dan 7 |
| Perhitungan yang bisa diuji | Subtotal, diskon, PPN, total, dan kembalian, aturan 3 sampai 7 |
| Data tersimpan | Riwayat transaksi di localStorage (fitur 4) |
| Halaman daftar atau rekap | Halaman rekap transaksi (fitur 5) |
