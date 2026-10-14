[README.md](https://github.com/user-attachments/files/33435088/README.md)
# Kasir Bisa

Kasir Bisa adalah website kasir sederhana untuk membantu kasir kantin sekolah menghitung transaksi dan melihat kembali catatan transaksinya. Dikerjakan oleh tim Kasir Bisa untuk Sayembara STEAMpreneur.

**Status: dalam pengerjaan.** Saat ini repositori berisi dokumen perencanaan (spesifikasi, kasus uji, rencana). Kode website belum dibuat. Bagian di bawah yang belum tersedia ditandai jelas dan akan dilengkapi seiring pekerjaan.

## Alur Inti

Rencana alur inti (belum dibangun):

1. Kasir memilih produk dan jumlahnya, lalu menambahkannya ke keranjang.
2. Kasir memeriksa rincian: subtotal, diskon, PPN, dan total.
3. Kasir memasukkan uang yang dibayarkan dan melihat kembalian.
4. Transaksi yang berhasil tersimpan dan dapat dilihat di halaman rekap.

Rincian lengkap ada di `docs/01-spesifikasi.md`.

## Cara Menjalankan (How to Run)

Belum tersedia karena website belum dibuat. Bagian ini diisi setelah versi pertama alur inti berjalan.

### Prasyarat (rencana)

- Browser modern (Chrome, Edge, atau Firefox).
- Node.js versi 18 atau lebih baru untuk menjalankan pengujian otomatis.
- Git untuk meng-clone repositori.

### Mengambil repositori

```
git clone https://github.com/IniMadann/steampreneur-kasirbisa.git
cd steampreneur-kasirbisa
```

### Akun atau data contoh

Tidak ada login atau akun. Katalog produk yang dipakai adalah data contoh, bukan daftar harga kantin yang sudah dikonfirmasi.

## Tangkapan Layar Alur Inti

Belum tersedia. Akan disimpan di `docs/bukti/` setelah website berjalan dan diuji.

## Cara Menjalankan Pengujian

Belum tersedia. Pengujian otomatis direncanakan di folder `tes/` dan dijalankan dengan `node --test`. Kasus uji yang sudah disusun ada di `docs/04-kasus-uji.md` (belum dijalankan).

## Fitur

Belum ada fitur yang selesai. Fitur yang direncanakan ada di bagian 4 `docs/01-spesifikasi.md`.

## Batasan yang Diketahui

- Website belum dibangun.
- Data produk yang direncanakan hanya data contoh.
- Data transaksi direncanakan disimpan di browser (localStorage), sehingga hanya tersedia di browser dan perangkat yang sama.

## Struktur Folder

| File / folder | Isi |
|---|---|
| `docs/` | Dokumen proses kerja: spesifikasi, rencana, kasus uji, dan dokumen lain yang ditambahkan seiring pekerjaan |
| `src/` | Kode website (belum dibuat) |
| `tes/` | Unit test (belum dibuat) |
| `bughunt-kasir/` | Hasil Bug Hunt (akan ditambahkan pada tahap Bug Hunt) |

## Link Demo (opsional)

Belum ada.

## Sumber dan Lisensi

Belum ada library, template, gambar, ikon, atau font pihak ketiga yang dipakai. Daftar ini diperbarui jika ada yang ditambahkan.

## Tim

| Nama | Peran |
|---|---|
| Muh. Rizky Ramadhan | Navigator utama |
| Ahmad Fadil | Penguji |
| Laode Azharil Nur Ibrahim Nunsyah | Analis kebutuhan dan dokumentator |
