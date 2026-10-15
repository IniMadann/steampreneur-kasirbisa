# Catatan Code Review

## Tujuan review

AI digunakan sebagai alat bantu untuk memeriksa kemungkinan bug, menjelaskan penyebab masalah pada kode, dan membantu menilai kesesuaian implementasi dengan ketentuan proyek. Hasil review tidak langsung dianggap benar tanpa pemeriksaan lebih lanjut.

**Prompt review yang digunakan (ringkasan):**

> Periksa kode berdasarkan aturan bisnis dan ketentuan challenge. Cari kemungkinan bug, kondisi input yang belum divalidasi, kesalahan perhitungan, serta ketidaksesuaian antara perilaku program dan hasil yang diharapkan. Jelaskan alasan setiap temuan dan sarankan perbaikan yang relevan.

Prompt di atas merupakan ringkasan tujuan review, bukan kutipan persis dari riwayat percakapan.

| No | Saran dari AI | Diterima / ditolak | Alasan | Bagian kode yang berubah |
|---|---|---|---|---|
| 1 | Validasi jumlah produk di `tambahItem` agar hanya menerima bilangan bulat 1 sampai 99 dan menolak 0, negatif, pecahan, serta kosong. | Diterima | Ini sesuai dengan Aturan 1. Tanpa validasi, input seperti `0`, `-5`, `1.5`, atau `100` bisa masuk ke keranjang dan mengacaukan subtotal. | `bughunt-kasir/kasir.js` pada fungsi `tambahItem` |
| 2 | Tolak pembayaran jika uang yang dibayarkan kurang dari total dan tampilkan pesan `Uang pembayaran kurang`. | Diterima | Ini sesuai dengan Aturan 7. Kode awal mengembalikan kembalian negatif tanpa memeriksa kelayakan pembayaran, sehingga transaksi yang salah tetap dianggap berhasil. | `bughunt-kasir/kasir.js` pada fungsi `hitungKembalian` |
| 3 | Saat menambahkan produk yang sudah ada di keranjang, jumlahnya harus dijumlahkan sebagai angka, bukan string. | Diterima | Ini sesuai dengan Aturan 2. Kode awal memperlakukan string seperti `"2" + "3"` menjadi `"23"`, sehingga kuantitas melewati logika penjumlahan numerik yang benar. | `bughunt-kasir/kasir.js` pada fungsi `tambahItem` |
| 4 | Batasi total jumlah produk yang sama agar tidak lebih dari 99 saat menambahkan item baru. | Diterima | Ini sesuai dengan Aturan 2. Tanpa batas ini, jumlah gabungan bisa melebihi syarat yang diizinkan dan menggagalkan validasi bisnis. | `bughunt-kasir/kasir.js` pada fungsi `tambahItem` |
| 5 | Syarat diskon non-member harus berlaku saat subtotal minimal Rp100.000, termasuk nilai tepat Rp100.000. | Diterima | Ini sesuai dengan Aturan 4. Kode awal memakai `> 100000`, sehingga subtotal tepat Rp100.000 tidak mendapat diskon yang seharusnya. | `bughunt-kasir/kasir.js` pada fungsi `hitungDiskon` |
| 6 | Diskon member dan diskon belanja tidak boleh digabung; hanya satu yang berlaku. | Diterima | Ini sesuai dengan Aturan 4. Kode awal menambahkan dua diskon sekaligus saat pelanggan member dan subtotal tetap di atas ambang diskon. | `bughunt-kasir/kasir.js` pada fungsi `hitungDiskon` |
| 7 | Pembulatan PPN harus menggunakan aturan pembulatan ke rupiah terdekat, bukan `Math.floor`. | Diterima | Ini sesuai dengan Aturan 5 dan 6. Kode awal membulatkan ke bawah, sehingga PPN 11% pada dasar tertentu turun satu rupiah lebih rendah dari nilai yang seharusnya. | `bughunt-kasir/kasir.js` pada fungsi `hitungPPN` dan `hitungRingkasan` |

## Catatan pemeriksaan Bug Hunt

Tabel di atas membahas program latihan Bug Hunt (`bughunt-kasir/`), bukan antarmuka aplikasi utama. Keduanya menggunakan sebagian aturan bisnis yang sama, tetapi kode dan bukti pengujiannya tidak boleh dianggap sebagai satu aplikasi.

Catatan Bug Hunt menunjukkan bahwa kode awal memiliki tujuh masalah yang didokumentasikan, disertai gejala, penyebab, aturan bisnis terkait, dan nama pengujian. Saran review di atas merupakan bagian dari pemeriksaan yang dapat diverifikasi dari hasil bug hunt dan perbaikan yang kemudian diterapkan pada kode. Keputusan menerima setiap saran didasarkan pada kesesuaian dengan spesifikasi dan bukti pengujian di `test/kasir.test.js`, serta dokumentasi di `bughunt-kasir/catatan-bug.md`.

Catatan tambahan: keluaran awal AI pada pengerjaan Bug Hunt belum menyelesaikan validasi jumlah dan aturan diskon dengan benar. Pada aplikasi utama, `src/index.html` menggunakan tombol tambah/kurang alih-alih kolom jumlah bebas; `src/app.js` membatasi tombol pada jumlah 1–99 dan `src/kasir.js` memvalidasi perubahan jumlah serta perhitungan diskon. Rincian kesalahan AI dan perbedaan antarmuka awal/final dicatat di `05-kesalahan-ai.md`; status bukti retest antarmuka utama dicatat di `04-kasus-uji.md`.
