# Analisis Change Request

**Change request:** Menambahkan pencarian dan filter produk pada halaman rekap transaksi, serta ekspor CSV dari hasil yang sedang ditampilkan.

**Status:** Pencarian, filter produk, dan ekspor CSV sudah diimplementasikan. Pencarian/filter telah diretest di browser dengan screenshot bukti; format CSV diuji lewat unit test dan unduhan browser.

## 1. Dampak

| Bagian yang terdampak | File / fungsi | Perubahan yang diperlukan |
|---|---|---|
| Spesifikasi | `01-spesifikasi.md` | Mencatat kriteria pencarian dan filter produk yang sudah dipilih; ekspor CSV tetap terpisah. |
| Kode | `src/rekap.html` dan `src/rekap.js` | Kolom pencarian transaksi dan filter berdasarkan produk; keduanya dapat digunakan bersamaan. |
| Kasus uji / test | `04-kasus-uji.md` dan `test/rekap.test.js` | Menguji pencarian tanpa membedakan kapital, pencarian nominal, filter produk, kombinasi filter, dan hasil kosong. |
| Ekspor CSV | `src/rekap.html`, `src/rekap.js`, dan `test/rekap.test.js` | Tombol mengunduh transaksi yang sedang tampil setelah filter; kolom dan angka memakai format CSV yang dapat dibuka di Excel. |
| README | `README.md` | Menjelaskan pencarian dan filter yang tersedia serta status ekspor CSV. |

## 2. Kasus uji baru

| ID | Langkah / input | Hasil yang diharapkan |
|---|---|---|
| CR01 | Masukkan kata kunci yang cocok pada kolom pencarian. | Transaksi yang sesuai tampil; pencarian tidak membedakan huruf besar dan kecil. |
| CR02 | Masukkan kata kunci yang tidak cocok dengan transaksi mana pun. | Tabel menampilkan pesan `Data tidak ditemukan`. |
| CR03 | Pilih nama produk pada filter produk. | Hanya transaksi yang memuat produk itu yang tampil. |
| CR04 | Terapkan kata kunci dan filter produk bersamaan. | Hanya transaksi yang memenuhi kedua kriteria yang tampil. |
| CR05 | Klik `Hapus filter` setelah pencarian/filter digunakan. | Kolom pencarian dan filter kembali kosong dan seluruh transaksi tampil. |

**Catatan:** Filter yang dipilih untuk rekap adalah filter berdasarkan produk, karena transaksi berisi daftar produk yang dibeli. Pencarian mencocokkan teks yang terlihat pada rekap (waktu, nama/kuantitas produk, dan nominal). CSV pada salinan patch masih mengekspor semua transaksi tersimpan.

## 3. Setelah selesai

- [x] Unit test logika pencarian dan filter sudah ditambahkan.
- [x] Spesifikasi diperbarui untuk pencarian dan filter produk.
- [x] Kasus uji pencarian/filter CR01–CR06 sudah dijalankan dan dibuktikan dengan screenshot di browser.
- [x] Ekspor CSV telah diintegrasikan; header, angka mentah, escaping, dan unduhan browser telah diuji.
- [x] README diperbarui dengan petunjuk pencarian/filter dan status CSV.
- [x] Analisis perubahan dicatat sebelum perubahan kode dilakukan.
- [ ] Commit dan push dilakukan sesuai aturan pengumpulan.

**Status akhir:** Pencarian, filter produk, dan ekspor CSV tersedia di halaman rekap. Unit test lulus; retest browser CR01–CR06 dan unduhan CSV telah dijalankan. Screenshot pencarian/filter tersimpan di `docs/bukti/`.
