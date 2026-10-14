# Spesifikasi Produk

**Nama tim:** Kasir Bisa  
**Nama produk:** Kasir Bisa 
**Alur inti yang dibangun:** Kasir memilih produk dan jumlahnya, memeriksa rincian serta total belanja, lalu mencatat pembayaran dan melihat kembalian.

## 1. Masalah

Kasir kantin melayani banyak siswa sambil menyiapkan makanan dan minuman. Dalam kondisi sibuk, transaksi manual mudah terlewat atau sulit diperiksa kembali. Narasumber juga menceritakan kejadian siswa mengambil barang lalu mengaku sudah membayar, sehingga kasir memerlukan cara sederhana untuk menghitung transaksi dengan jelas.

## 2. Pengguna

Pengguna utama adalah kasir atau penjaga kantin sekolah. Mereka membutuhkan aplikasi yang mudah digunakan untuk memilih barang, memasukkan jumlah, melihat rincian dan total pembayaran, serta menghitung kembalian tanpa memperlambat pelayanan. Aplikasi ini tidak memerlukan akun.

## 3. Hasil wawancara calon pengguna

**Narasumber:** penjaga/kasir kantin sekolah  
**Cara wawancara:** percakapan langsung (berdasarkan transkrip percakapan)  
**Tanggal:** 05-10-2026

| Pertanyaan kami | Jawaban narasumber |
|---|---|
| Apa kegiatan saat menjaga kantin? | Menjual dan melayani siswa, termasuk membungkus nasi serta menyiapkan minuman. |
| Bagaimana proses siswa membeli? | Siswa menyebutkan barang yang dibeli dan apakah akan makan di tempat atau dibungkus. |
| Bagaimana transaksi dan penjualan dicatat? | Masih dilakukan secara manual; narasumber belum menggunakan alat pencatatan khusus. |
| Apa yang memakan waktu saat ramai? | Membungkus nasi dan menyiapkan Pop Mie karena perlu beberapa langkah. |
| Apakah pernah ada masalah transaksi? | Narasumber menyebut kejadian siswa mengaku sudah membayar atau mengambil barang saat kasir sedang sibuk. |

Ringkasan di atas diparafrasekan dari `Hasil transkripsi wawancara.md`; tanggal dan identitas pribadi tidak tersedia dan tidak ditambahkan.

## 4. Fitur wajib (hanya untuk alur inti)

1. Menampilkan daftar produk dengan harga dan memungkinkan kasir menambahkan produk beserta jumlahnya ke keranjang.
2. Menggabungkan jumlah jika produk yang sama ditambahkan lagi, menampilkan subtotal, dan mengizinkan kasir menghapus produk dari keranjang.
3. Menghitung diskon, PPN, dan total sesuai aturan bisnis; menerima jumlah uang yang dibayarkan; menolak pembayaran yang kurang; serta menampilkan kembalian jika pembayaran cukup.
4. Menyediakan tindakan untuk memulai transaksi baru dan mengosongkan keranjang.

## 5. Di luar cakupan (tidak dikerjakan dalam challenge ini)

- Login, akun kasir, dan pengelolaan hak akses.
- Penyimpanan transaksi permanen, basis data, laporan penjualan, atau ekspor struk.
- Integrasi pembayaran digital, printer, stok, dan pemesanan daring.
- Pengelolaan katalog/harga melalui halaman administrasi.
- Pencatatan transaksi atau identitas siswa.

## 6. Aturan bisnis dan perhitungan

1. Jumlah tiap produk harus bilangan bulat dari 1 sampai 99. Nilai kosong, nol, negatif, pecahan, atau jumlah gabungan di atas 99 ditolak dengan pesan kesalahan.
2. Jika produk yang sudah ada di keranjang ditambahkan lagi, jumlahnya dijumlahkan.
3. **Subtotal** adalah jumlah dari harga setiap produk dikalikan jumlahnya.
4. Hanya satu diskon yang berlaku:
   - Pelanggan member mendapat diskon 10% dari subtotal.
   - Pelanggan bukan member mendapat diskon 5% jika subtotal minimal Rp100.000.
   - Selain kondisi tersebut, tidak ada diskon.
   - Diskon dibulatkan ke rupiah terdekat.
5. **PPN** adalah 11% dari subtotal setelah diskon dan dibulatkan ke rupiah terdekat (nilai 0,5 dibulatkan naik).
6. **Total** = subtotal - diskon + PPN.
7. Jika uang dibayar kurang dari total, pembayaran ditolak dengan pesan "Uang pembayaran kurang". Jika cukup, kembalian = uang dibayar - total.

Aturan ini mengikuti bagian **Aturan bisnis (spesifikasi resmi)** pada `bughunt-kasir/README.md`.

## 7. Data yang disimpan

| Data | Contoh isi | Disimpan di mana |
|---|---|---|
| Katalog produk contoh | K01, Nasi Goreng, Rp15.000 | Konstanta `MENU` di `bughunt-kasir/kasir.js`; bukan data kantin yang telah diverifikasi |
| Isi keranjang aktif | K04, Es Teh, jumlah 2 | Memori halaman selama transaksi berlangsung |
| Pilihan member dan uang dibayar | Member aktif; Rp20.000 | Kontrol pada halaman selama halaman digunakan |
| Data wawancara | Ringkasan jawaban penjaga kantin | Dokumen proyek `Hasil transkripsi wawancara.md`; bukan data aplikasi |

Aplikasi tidak menyimpan riwayat transaksi secara permanen. Keranjang dan isian transaksi hilang ketika halaman dimuat ulang atau transaksi baru dimulai.

## 8. Kriteria "selesai"

- ☑ Kasir dapat menambahkan produk; penambahan produk yang sama menggabungkan jumlah dan keranjang menampilkan subtotal yang sesuai.
- ☑ Jumlah kosong, nol, negatif, pecahan, atau jumlah gabungan di atas 99 ditolak dengan pesan kesalahan.
- ☑ Member memperoleh satu diskon 10%; non-member memperoleh satu diskon 5% hanya pada subtotal minimal Rp100.000; diskon lain tidak ditumpuk.
- ☑ PPN 11% dihitung dari subtotal setelah diskon dengan pembulatan ke rupiah terdekat; total sama dengan subtotal - diskon + PPN.
- ☑ Pembayaran di bawah total ditolak dengan pesan "Uang pembayaran kurang"; pembayaran yang cukup menampilkan kembalian yang benar.
- ☑ Kasir dapat menghapus produk dan memulai transaksi baru sehingga keranjang transaksi sebelumnya kosong.
