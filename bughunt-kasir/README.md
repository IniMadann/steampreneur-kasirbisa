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

Aplikasi tidak memerlukan instalasi paket. Jalankan melalui server web lokal agar penyimpanan browser dapat digunakan secara konsisten.

### Menggunakan XAMPP

1. Letakkan folder proyek di dalam direktori `htdocs` XAMPP.
2. Jalankan Apache dari XAMPP Control Panel.
3. Buka `src/index.html` melalui alamat lokal proyek, misalnya `http://localhost/nama-folder-proyek/src/`.
4. Pilih **Lihat rekap transaksi** untuk membuka halaman rekap.

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
