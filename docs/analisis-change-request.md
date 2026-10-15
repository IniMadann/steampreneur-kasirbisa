# Analisis Change Request

**Change request:** Menambahkan pencarian transaksi, filter produk, dan ekspor CSV pada halaman rekap transaksi.

**Ruang lingkup kode:** Change request diterapkan pada halaman rekap aplikasi utama: `src/rekap.html` dan `src/rekap.js`. Perilaku tersebut berbeda dari halaman kasir di `src/index.html`; transaksi yang direkap dibaca dari localStorage melalui `src/transaksi.js`.

**Status:** Pencarian, filter produk, dan ekspor CSV tersedia. Unit test di `test/rekap.test.js` memeriksa pencarian, filter, hasil kosong, format, dan isi CSV. Screenshot rekap yang tersimpan saat ini berasal dari antarmuka sebelumnya dan belum menjadi bukti retest final untuk versi `src/` yang sekarang.

## 1. Dampak

| Bagian yang terdampak | File / fungsi | Perubahan yang diperlukan |
|---|---|---|
| Spesifikasi | `01-spesifikasi.md` | Mencatat pencarian teks, filter produk, penggabungan kriteria, keadaan tanpa hasil, dan format ekspor. |
| Halaman rekap | `src/rekap.html` | Menyediakan kolom pencarian, filter produk, tombol hapus filter, tabel transaksi, dan tombol unduh CSV. |
| Logika rekap | `src/rekap.js` | Menyaring transaksi yang ditampilkan dan membuat CSV dari hasil pencarian/filter yang aktif. |
| Pengujian | `test/rekap.test.js` | Menguji kapitalisasi pencarian, pencarian nominal, filter produk, hasil gabungan/kosong, escaping CSV, dan pembatasan unduh. |
| Dokumentasi | `04-kasus-uji.md` dan `README.md` | Menjelaskan cara menguji dan menggunakan halaman rekap; bukti screenshot harus sesuai dengan halaman saat ini. |

## 2. Kasus uji

| ID | Langkah / input | Hasil yang diharapkan |
|---|---|---|
| CR01 | Cari teks yang cocok dengan transaksi, dengan huruf besar/kecil berbeda. | Transaksi cocok tampil karena pencarian tidak membedakan kapitalisasi. |
| CR02 | Cari sebagian nominal yang terlihat pada rekap. | Transaksi dengan nominal tersebut tampil. |
| CR03 | Pilih nama produk pada filter produk. | Hanya transaksi yang memuat produk tersebut tampil. |
| CR04 | Terapkan kata kunci dan filter produk bersamaan. | Hanya transaksi yang memenuhi kedua kriteria tampil. |
| CR05 | Masukkan kata kunci yang tidak cocok dengan transaksi mana pun. | Tabel menampilkan `Data tidak ditemukan`. |
| CR06 | Klik `Hapus filter`. | Kolom pencarian dan filter produk kembali kosong; semua transaksi tampil. |
| CR07 | Unduh CSV setelah pencarian/filter menghasilkan data. | CSV hanya berisi transaksi yang tampil, memiliki header, meng-escape isi sel, dan memakai angka nominal tanpa format mata uang/pemisah ribuan. |

Kasus dan status pengujian rinci berada di `04-kasus-uji.md`. Fixture `Es Teh` pada unit test rekap adalah data uji historis; produk tersebut bukan bagian dari katalog aplikasi saat ini.

## 3. Status verifikasi

- Unit test pencarian, filter, hasil kosong, CSV, dan pencegahan ekspor tanpa hasil tersedia di `test/rekap.test.js` dan lulus pada pengujian proyek.
- Implementasi ekspor menggunakan hasil yang sama dengan pencarian/filter aktif, bukan seluruh transaksi tanpa penyaringan.
- Pemeriksaan browser pada halaman rekap versi saat ini telah memastikan transaksi yang tersimpan tampil sesudah pemuatan ulang.
- Screenshot rekap lama menggunakan antarmuka/data dari iterasi sebelumnya. Screenshot itu perlu diganti sebelum digunakan sebagai bukti final change request; status ini juga dicatat di `04-kasus-uji.md`.

