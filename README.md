# Kasir Bisa

Kasir Bisa adalah aplikasi kasir berbasis web untuk membantu kasir kantin sekolah mencatat pesanan, menghitung pembayaran, dan melihat riwayat transaksi. Aplikasi ini dibuat oleh tim Kasir Bisa untuk Sayembara STEAMpreneur.

## Fitur

- Memilih produk dari katalog contoh dan menambahkannya ke keranjang.
- Menggabungkan jumlah saat produk yang sama ditambahkan kembali, dengan batas 1–99 per produk.
- Menghitung subtotal, diskon, PPN 11%, total, dan kembalian.
- Menerapkan diskon member 10%, atau diskon non-member 5% jika subtotal minimal Rp100.000. Diskon tidak ditumpuk.
- Menolak jumlah yang tidak valid dan pembayaran yang kurang.
- Menyimpan transaksi berhasil di `localStorage` browser.
- Menampilkan rekap transaksi dengan pencarian waktu, produk, atau nominal; filter produk; serta ekspor CSV mengikuti hasil filter.

## Alur Inti

1. Kasir memilih produk dan jumlahnya, lalu menambahkannya ke keranjang.
2. Kasir memeriksa rincian belanja: subtotal, diskon, PPN, dan total.
3. Kasir memasukkan uang pembayaran. Jika pembayaran cukup, aplikasi menghitung kembalian dan menyimpan transaksi.
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

1. Pada halaman kasir, pilih produk dari daftar **Produk**.
2. Masukkan jumlah pada kolom **Jumlah**, lalu tekan **Tambah**. Ulangi untuk memasukkan produk lain. Produk yang sama akan digabungkan jumlahnya.
3. Periksa keranjang serta nilai subtotal, diskon, PPN, dan total.
4. Jika pembeli adalah member, centang **Pelanggan member** sebelum membayar. Jika bukan member, biarkan kotak itu tidak dicentang. Diskon dan total akan menyesuaikan.
5. Masukkan jumlah uang pada kolom **Uang dibayar (Rp)**. Pastikan nilainya sama dengan atau lebih besar dari total, lalu tekan **Bayar**. Pembayaran yang kurang akan ditolak dan tidak disimpan sebagai transaksi.
6. Untuk transaksi berikutnya, pilih produk dan jumlah lagi; keranjang akan mulai kosong setelah pembayaran berhasil. Anda juga dapat memakai **Transaksi Baru** untuk mengosongkan keranjang yang belum dibayar.
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

Pengujian menggunakan test runner bawaan Node.js, tanpa paket tambahan. Kasus uji dan bukti pengujian manual tersedia di `docs/04-kasus-uji.md` dan `docs/bukti/`.

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
| `src/` | Aplikasi web kasir, halaman rekap, logika transaksi, dan stylesheet |
| `test/` | Pengujian otomatis untuk logika kasir dan rekap |
| `docs/` | Spesifikasi, rencana, dokumentasi proses, kasus uji, dan bukti |
| `bughunt-kasir/` | Berkas dan dokumentasi untuk kegiatan Bug Hunt |

## Repositori

[steampreneur-kasirbisa](https://github.com/IniMadann/steampreneur-kasirbisa)

## Tim

| Nama | Peran |
|---|---|
| Laode Azharil Nur Ibrahim Nunsyah | Navigator utama |
| Ahmad Fadil | Penguji |
| Muh. Rizky Ramadhan | Dokumentator |
