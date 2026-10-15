# Kasir Bisa

Kasir Bisa adalah aplikasi kasir berbasis web untuk membantu kasir kantin sekolah mencatat pesanan, menghitung pembayaran, dan melihat riwayat transaksi. Aplikasi ini dibuat oleh tim Kasir Bisa untuk Sayembara STEAMpreneur.

## Fitur

- Memilih produk dari katalog bergambar, mencari nama produk, dan memfilter kategori.
- Menambahkan produk ke keranjang, mengubah jumlah dengan tombol tambah/kurang, dan menghapus item. Jumlah per produk dibatasi 1–99.
- Menghitung subtotal, diskon, PPN 11%, total, dan kembalian.
- Menerapkan diskon member 10%, atau diskon non-member 5% jika subtotal minimal Rp100.000. Diskon tidak ditumpuk.
- Menolak jumlah dan pembayaran yang tidak valid, lalu meminta konfirmasi sebelum menyimpan transaksi.
- Menampilkan rincian pembayaran/struk di layar, ringkasan penjualan, dan riwayat transaksi terbaru.
- Menyimpan transaksi berhasil di `localStorage` browser.
- Menampilkan rekap transaksi dengan pencarian waktu, produk, atau nominal; filter produk; serta ekspor CSV mengikuti hasil filter.

## Alur Inti

1. Kasir mencari atau memfilter katalog, lalu memilih produk untuk menambahkannya ke keranjang. Tekan `+` atau `−` untuk mengatur jumlah, dan `Hapus` untuk menghapus item.
2. Kasir memeriksa rincian belanja: subtotal, diskon, PPN, dan total.
3. Kasir memilih status member, memasukkan uang pembayaran (atau memilih nominal cepat), lalu memeriksa konfirmasi. Transaksi disimpan setelah pembayaran dikonfirmasi dan mencukupi; aplikasi menampilkan kembalian serta rincian transaksi.
4. Kasir dapat membuka halaman rekap untuk melihat transaksi tersimpan, mencari atau memfilter transaksi, dan mengunduh hasilnya sebagai CSV.

## Cara Menjalankan

Aplikasi ini adalah website statis. Anda tidak perlu memasang XAMPP, server, atau paket tambahan.

### Menyiapkan dan Membuka Aplikasi

1. Unduh ZIP proyek dari halaman GitHub dengan memilih **Code** lalu **Download ZIP**.
2. Setelah unduhan selesai, buka folder **Downloads/Unduhan**, klik kanan file ZIP, lalu pilih **Extract All... / Ekstrak Semua...**. Anda boleh mengekstraknya ke folder lain yang mudah ditemukan.
3. Buka folder hasil ekstrak. Masuk ke folder `steampreneur-kasirbisa-main`, lalu buka folder `src`.
4. Klik dua kali `index.html`. Jika diminta memilih aplikasi, pilih browser seperti Google Chrome, Microsoft Edge, atau browser bawaan laptop.

   Contoh lokasi file di Windows:

   ```text
   C:\Users\HP\Downloads\steampreneur-kasirbisa-main\src\index.html
   ```

   Nama folder dapat berbeda, misalnya ditambahkan angka `(1)` jika folder dengan nama yang sama sudah ada. Yang penting, buka `src\index.html` di dalam folder hasil ekstrak.

### Menggunakan Kasir dan Melihat Rekap

1. Pada halaman kasir, cari nama produk atau pilih kategori di bagian **Katalog**, lalu tekan **Tambah** pada kartu produk.
2. Pada **Keranjang**, atur kuantitas dengan tombol `+` dan `−`. Produk yang sama digabungkan; jumlah per produk dibatasi 1–99. Tekan **Hapus** untuk mengeluarkan produk dari keranjang.
3. Periksa keranjang serta nilai subtotal, diskon, PPN, dan total.
4. Jika pembeli adalah member, centang **Pelanggan member**. Jika bukan member, biarkan kotak itu tidak dicentang. Diskon dan total akan menyesuaikan.
5. Masukkan jumlah uang pada kolom **Uang diterima**, atau pilih salah satu nominal cepat. Pastikan nilainya cukup, lalu tekan **Bayar** dan periksa konfirmasi sebelum memilih **Konfirmasi & bayar**. Pembayaran yang kurang tidak dapat dikonfirmasi atau disimpan.
6. Setelah pembayaran berhasil, aplikasi menampilkan rincian transaksi. Tekan **Selesai**. Untuk membatalkan pesanan yang belum dibayar, gunakan **Transaksi baru** atau **Kosongkan**.
7. Tekan **Lihat rekap transaksi** di bagian atas halaman kasir untuk membuka daftar transaksi yang berhasil disimpan.
8. Di halaman rekap, cari transaksi melalui kolom **Cari transaksi** dan/atau pilih produk pada **Filter produk**. Tekan **Hapus filter** untuk menampilkan semua transaksi kembali.
9. Tekan **Unduh CSV** untuk mengunduh transaksi yang sedang tampil setelah pencarian dan filter diterapkan. Buka berkas CSV hasil unduhan dengan aplikasi spreadsheet seperti Microsoft Excel.

### Prasyarat

- Browser modern seperti Chrome, Edge, atau Firefox.
- Node.js versi 18 atau lebih baru untuk menjalankan pengujian.

Tidak ada login atau akun. Produk dan harga yang tersedia merupakan data contoh, bukan katalog harga kantin yang telah dikonfirmasi.

## Menjalankan Pengujian

Dari direktori utama proyek, jalankan:

```sh
node --test test/*.test.js
```

Pengujian menggunakan test runner bawaan Node.js, tanpa paket tambahan. Kasus uji tersedia di `docs/04-kasus-uji.md`. Sebagian screenshot di `docs/bukti/` berasal dari antarmuka iterasi sebelumnya dan tidak boleh dianggap sebagai bukti retest untuk katalog final yang dijalankan dari `src/index.html`; status bukti dicatat pada dokumen kasus uji.

## Perhitungan

- **Subtotal** adalah jumlah harga produk dikalikan kuantitasnya.
- **Diskon**: member mendapat 10%; non-member mendapat 5% jika subtotal minimal Rp100.000. Hanya satu jenis diskon yang berlaku.
- **PPN** sebesar 11% dihitung dari subtotal setelah diskon dan dibulatkan ke rupiah terdekat.
- **Total** adalah subtotal dikurangi diskon, ditambah PPN.
- Transaksi hanya disimpan setelah pembayaran mencukupi. Kembalian adalah jumlah dibayar dikurangi total.

## Penyimpanan dan Batasan

Riwayat transaksi disimpan di `localStorage`, sehingga tersedia kembali setelah halaman dimuat ulang pada browser dan perangkat yang sama. Data tidak disinkronkan ke server atau perangkat lain. Keranjang yang belum dibayar hanya tersimpan selama halaman kasir aktif.

Aplikasi ini tidak mencakup login, basis data server, sinkronisasi antarperangkat, pembayaran digital, printer struk, pengelolaan stok, atau pengelolaan katalog melalui halaman administrasi.

## Struktur Proyek

| Lokasi | Isi |
|---|---|
| `src/` | Aplikasi web kasir bergambar, halaman rekap, logika transaksi, dan stylesheet |
| `test/` | Pengujian otomatis untuk logika kasir dan rekap |
| `docs/` | Spesifikasi, rencana, dokumentasi proses, kasus uji, dan bukti |
| `bughunt-kasir/` | Berkas dan dokumentasi untuk kegiatan Bug Hunt |

Foto katalog menggunakan berkas lokal di `src/gambar/`; halaman kasir dan logikanya berada di `src/`. Tidak perlu membuka atau menjalankan berkas aplikasi lain untuk menampilkan katalog.

Dokumentasi antarmuka dipetakan ke elemen `src/index.html` di `docs/01-spesifikasi.md`. Perbedaan antara bukti Bug Hunt, screenshot antarmuka lama, dan status retest aplikasi utama dijelaskan di `docs/04-kasus-uji.md`.

## Repositori

[steampreneur-kasirbisa](https://github.com/IniMadann/steampreneur-kasirbisa)

## Tim

| Nama | Peran |
|---|---|
| Laode Azharil Nur Ibrahim Nunsyah | Navigator utama |
| Ahmad Fadil | Penguji |
| Muh. Rizky Ramadhan | Dokumentator |
