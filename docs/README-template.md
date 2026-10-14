# Kasir Kantin STEAM

Kasir Kantin STEAM adalah aplikasi kasir sederhana berbasis browser untuk membantu kasir kantin sekolah mencatat pesanan dan menghitung pembayaran. Aplikasi dibuat oleh tim Kasir Bisa untuk alur transaksi dasar; menu yang tersedia saat ini adalah data contoh.

## Alur Inti

1. Pilih produk dan jumlahnya, lalu tekan **Tambah** untuk memasukkannya ke keranjang.
2. Periksa rincian pesanan dan total; hapus produk jika perlu dan pilih status member bila sesuai.
3. Masukkan uang yang dibayarkan lalu tekan **Bayar** untuk melihat kembalian, atau tekan **Transaksi Baru** untuk mengosongkan transaksi.

## Cara Menjalankan (How to Run)

Aplikasi berjalan sebagai halaman web statis dan tidak memerlukan server, instalasi paket, atau koneksi internet setelah file tersedia.

### Prasyarat

- Browser modern, misalnya Chrome, Edge, atau Firefox.
- Node.js versi 18 atau lebih baru hanya jika ingin menjalankan pengujian otomatis.
- Git hanya jika akan meng-clone repositori.

### Langkah

1. Jika repositori tim sudah tersedia, clone dengan URL yang diberikan tim:
   ```
   git clone <URL-repositori-tim>
   ```
2. Masuk ke folder aplikasi:
   ```
   cd <folder-repositori>\bughunt-kasir
   ```
   Jika folder proyek sudah tersedia di komputer, cukup buka folder `bughunt-kasir`.
3. Buka `index.html` dengan browser (klik dua kali file tersebut). Tidak ada langkah `npm install` atau perintah `npm run dev`.

URL repositori tim belum tersedia pada bahan proyek yang diberikan; ganti teks `<URL-repositori-tim>` dengan URL sebenarnya sebelum membagikan README ini kepada juri.

### Akun atau data contoh

Tidak ada login atau akun. Katalog contoh ditulis langsung di `kasir.js`:

| Kode | Produk | Harga contoh |
|---|---|---:|
| K01 | Nasi Goreng | Rp15.000 |
| K02 | Mie Ayam | Rp13.500 |
| K03 | Soto Ayam | Rp14.000 |
| K04 | Es Teh | Rp4.000 |
| K05 | Jus Jeruk | Rp8.500 |
| K06 | Roti Bakar | Rp10.500 |
| K07 | Air Mineral | Rp3.500 |

Harga dan nama produk tersebut adalah data contoh aplikasi, bukan daftar harga kantin yang telah dikonfirmasi melalui wawancara.

### Jika terjadi masalah

- **Halaman kosong atau produk tidak muncul:** pastikan `index.html`, `app.js`, dan `kasir.js` berada dalam folder yang sama; muat ulang halaman.
- **Pengujian tidak dapat dijalankan:** periksa bahwa Node.js versi 18 atau lebih baru telah terpasang dan perintah dijalankan dari folder `bughunt-kasir`.
- **Perubahan kode tidak terlihat:** muat ulang halaman. Aplikasi tidak menyimpan data transaksi, sehingga memuat ulang juga mengosongkan keranjang.

## Tangkapan Layar Alur Inti

Tangkapan layar belum tersedia pada bahan proyek. Setelah aplikasi diuji, simpan gambar bukti di `bughunt-kasir/docs/bukti/` dan cantumkan di sini. Sertakan sekurang-kurangnya bukti memilih/menambahkan produk, hasil ringkasan atau pembayaran, dan hasil change request jika change request sudah ditetapkan. Jangan mencantumkan gambar yang belum dibuat.

## Cara Menjalankan Pengujian

Dari folder `bughunt-kasir`, jalankan:

```
node --test
```

Hasil yang diharapkan: semua pengujian yang tersedia lulus. Pengujian otomatis menggunakan test bawaan Node.js dan file dengan akhiran `.test.js` di folder `tes/`.

## Fitur

- Menampilkan katalog contoh dan harga produk.
- Menambahkan produk ke keranjang, menampilkan subtotal, dan menghapus produk.
- Menyediakan pilihan member, ringkasan diskon/PPN/total, input pembayaran, serta tombol transaksi baru.
- Menjalankan logika kasir secara lokal di browser tanpa akun atau server.

## Batasan yang Diketahui

- Data menu dan harga masih contoh; belum dikonfirmasi sebagai katalog/harga kantin dari wawancara.
- Transaksi hanya berada di memori halaman. Tidak ada penyimpanan riwayat, basis data, struk, atau laporan.
- Kode awal Bug Hunt masih perlu diperbaiki dan dibuktikan dengan test: validasi jumlah, penjumlahan jumlah produk yang sama, aturan diskon yang tidak boleh ditumpuk dan batas minimal Rp100.000, pembulatan PPN, serta penolakan pembayaran yang kurang. Perilaku tersebut harus sesuai dengan aturan resmi di `bughunt-kasir/README.md` sebelum aplikasi dinyatakan memenuhi spesifikasi.
- Tangkapan layar dan detail change request belum tersedia pada bahan proyek.

## Struktur Folder

| File / folder | Isi |
|---|---|
| `bughunt-kasir/index.html` | Halaman kasir dan tampilan aplikasi |
| `bughunt-kasir/app.js` | Penghubung antarmuka dan logika transaksi |
| `bughunt-kasir/kasir.js` | Katalog contoh dan fungsi perhitungan |
| `bughunt-kasir/tes/` | Pengujian otomatis Node.js |
| `template-dokumen/` | Spesifikasi, rencana, kasus uji, dan dokumen proses |
| `Hasil transkripsi wawancara.md` | Transkrip wawancara penjaga kantin |
| `Proposal STEAMPreneur SMKN 6 KDI Tahun 2026.pdf` | Proposal proyek |

## Link Demo (opsional)

Belum ada tautan demo yang di-host.

## Sumber dan Lisensi

| Nama | Sumber (link) | Lisensi |
|---|---|---|
| Kode aplikasi dan data menu contoh | Berkas proyek ini | Lisensi proyek belum dicantumkan |
| Node.js test runner | Bawaan Node.js, https://nodejs.org/ | Lisensi Node.js |

Tidak ada library, ikon, font, atau gambar pihak ketiga yang digunakan oleh aplikasi.

## Tim

Nama anggota dan pembagian peran belum dicantumkan pada bahan yang tersedia.

| Nama | Peran |
|---|---|
| Tim Kasir Bisa | Pengembangan aplikasi kasir |
