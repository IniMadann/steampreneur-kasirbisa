# Rencana Kerja

Rencana ini berisi langkah yang akan kami lakukan untuk seluruh challenge: website Kasir Bisa (Tugas 1), Bug Hunt (Tugas 2), change request (Tugas 3), dan penjelasan kode (Tugas 4). Kami mengerjakannya satu per satu, memeriksa hasilnya, dan membuat commit untuk setiap langkah.

**Waktu mulai:** 14 Oktober 2026 (commit pertama repositori, pukul 08.30 WITA)  
**Batas akhir pengumpulan:** Belum dicatat (mengikuti jadwal resmi sayembara; commit `bughunt: kode asli` harus dibuat paling lambat 60 menit sebelum batas ini)

**Teknologi:** HTML, CSS, dan JavaScript biasa tanpa framework; kode website di `src/`, unit test di `tes/` dengan `node --test` (Node.js 18 atau lebih baru). Data disimpan di localStorage.

**Peran:** Kami bekerja dengan cara vibe engineering: anggota tim adalah navigator yang menentukan arah, memberi konteks, dan memeriksa hasil, sedangkan AI adalah driver yang menulis sebagian besar kode. Peran boleh bergantian, dan setiap anggota tetap wajib memahami dan bisa menjelaskan kode.

| Peran | Anggota | Tugas utama |
|---|---|---|
| Navigator utama | Muh. Rizky Ramadhan | Menulis prompt dan mengarahkan AI di setiap langkah |
| Penguji | Ahmad Fadil | Menyusun dan menjalankan kasus uji, mencari kesalahan dalam hasil AI |
| Analis kebutuhan dan dokumentator | Laode Azharil Nur Ibrahim Nunsyah | Menjaga pekerjaan sesuai spesifikasi; mengisi log prompt, catatan review, dan README |

| No | Langkah | Penanggung jawab | Cara memeriksa bahwa langkah ini selesai | Estimasi waktu | Waktu sebenarnya | Status |
|---|---|---|---|---|---|---|
| 1 | Pahami kebutuhan: rumuskan masalah dan pengguna dari wawancara kasir kantin | Azharil | Bagian 1 sampai 3 di `01-spesifikasi.md` terisi; wawancara tercatat tanpa data pribadi narasumber | 30 menit | Belum dicatat | Sedang dikerjakan (draf sudah ada) |
| 2 | Tulis spesifikasi: fitur wajib, di luar cakupan, aturan bisnis, dan kriteria selesai yang memenuhi lima syarat minimum website (alur minimal tiga langkah, formulir dengan validasi, perhitungan, data tersimpan, halaman rekap) | Azharil dan Rizky | Setiap kriteria selesai bisa dijawab "ya" atau "tidak"; penyimpanan data dan halaman rekap tidak masuk daftar di luar cakupan | 45 menit | Belum dicatat | Sedang dikerjakan (draf perlu disesuaikan) |
| 3 | Susun kasus uji sebelum membangun; hasil yang diharapkan dihitung sendiri tanpa AI | Fadil | `04-kasus-uji.md` memuat hasil yang diharapkan, minimal satu input salah dan satu nilai batas, serta kasus untuk penyimpanan dan rekap | 45 menit | Belum dicatat | Direncanakan |
| 4 | Selesaikan rencana ini dan buat Checkpoint 1 | Azharil | Spesifikasi, kasus uji, dan rencana lengkap; commit `checkpoint: spesifikasi, kasus uji, dan rencana selesai` sudah di-push dan belum ada commit kode website sebelumnya | 30 menit | Belum dicatat | Direncanakan |
| 5 | Scaffolding: minta AI membuat struktur proyek awal | Rizky | `src/index.html` bisa dibuka di browser; setiap anggota bisa menjelaskan fungsi setiap file dan folder | 30 menit | Belum dicatat | Direncanakan |
| 6 | Logika dan unit test: fungsi perhitungan di file terpisah yang tidak menyentuh tampilan, beserta test | Rizky (arahan ke AI), Fadil (hasil yang diharapkan dihitung manual) | `node --test` lulus untuk semua kasus uji perhitungan, dan hasil yang diharapkan di dalam test sudah dicek ulang manual | 60 menit | Belum dicatat | Direncanakan |
| 7 | Formulir dan alur inti: pilih produk, isi data, lihat rincian dan konfirmasi, dengan validasi dan pesan kesalahan | Rizky | Kasus uji input salah dan alur inti diuji di browser dan sesuai hasil yang diharapkan | 60 menit | Belum dicatat | Direncanakan |
| 8 | Penyimpanan data dan halaman rekap: simpan transaksi di localStorage dan tampilkan kembali | Rizky | Data tetap ada setelah halaman dimuat ulang dan tampil di halaman rekap sesuai kasus uji | 60 menit | Belum dicatat | Direncanakan |
| 9 | Uji alur inti dan buat Checkpoint 2 | Fadil | Semua kasus uji website dijalankan, hasil dan tangkapan layar tersimpan di `docs/bukti/`, kesalahan AI tercatat di `05-kesalahan-ai.md`; commit `checkpoint: versi pertama alur inti berjalan` sudah di-push | 45 menit | Belum dicatat | Direncanakan |
| 10 | Analisis change request sebelum mengubah kode | Azharil (analisis), Fadil (kasus uji baru) | `analisis-change-request.md` menjelaskan dampak pada spesifikasi, kode, test, dan README, serta kasus uji baru untuk setiap kriteria penerimaan; sudah di-commit (`dokumen: analisis change request`) sebelum commit kode change request | 45 menit | Belum dicatat | Direncanakan |
| 11 | Change request bagian 1: pencarian dan filter di halaman rekap | Rizky | Pencarian tidak membedakan huruf besar dan kecil, pencarian dan filter bisa dipakai bersamaan, dan pesan "Data tidak ditemukan" muncul bila tidak ada hasil | 45 menit | Belum dicatat | Direncanakan |
| 12 | Change request bagian 2: tombol Unduh CSV | Rizky | CSV berisi data yang sedang tampil, baris pertama nama kolom, angka tanpa format mata uang atau pemisah ribuan, dan file bisa dibuka di Excel | 45 menit | Belum dicatat | Direncanakan |
| 13 | Uji ulang kasus uji lama dan baru, lalu perbarui spesifikasi, README, dan tangkapan layar | Fadil (uji), Azharil (dokumen) | Semua test dan kasus uji lama dan baru lulus; `01-spesifikasi.md` dan README sesuai fitur baru | 45 menit | Belum dicatat | Direncanakan |
| 14 | Persiapan Bug Hunt: baca aturan bisnis di lembar challenge dan siapkan kasus uji nilai batas dan pembulatan dengan hasil hitung manual (tanpa membuka kode Bug Hunt) | Semua anggota | Kasus uji Bug Hunt tertulis dan hasil yang diharapkan sudah dihitung manual | 30 menit | Belum dicatat | Direncanakan |
| 15 | Bug Hunt: commit `bughunt: kode asli`, cari bug, perbaiki satu per satu, buat test, dan isi `catatan-bug.md` | Semua anggota | Setiap bug punya commit `perbaikan:` sendiri, test gagal pada kode lama dan lulus pada kode baru, `catatan-bug.md` terisi; semua commit dibuat dalam 60 menit sejak commit `bughunt: kode asli` | 60 menit | Belum dicatat | Direncanakan |
| 16 | Review dan pahami kode: code review AI, putuskan saran diterima atau ditolak, lalu refactor bila perlu | Azharil (catatan), semua anggota (keputusan) | `06-catatan-review.md` terisi dengan alasan; semua test dijalankan ulang dan tetap lulus setelah refactor | 45 menit | Belum dicatat | Direncanakan |
| 17 | Penjelasan kode dengan bahasa sendiri | Semua anggota | Setiap anggota menulis minimal dua penjelasan untuk bagian kode yang berbeda, dan lima pertanyaan bersama terjawab di `08-penjelasan-kode.md`; penjelasan di-commit dari akun masing-masing | 60 menit | Belum dicatat | Direncanakan |
| 18 | README lengkap dan komentar kode; uji README dengan clone ulang ke folder lain | Azharil | Orang yang belum pernah menjalankan proyek bisa menjalankan website dan test hanya dengan mengikuti README; tangkapan layar alur inti ada di `docs/bukti/` | 45 menit | Belum dicatat | Direncanakan |
| 19 | Refleksi dan pemeriksaan akhir sebelum batas pengumpulan | Semua anggota | `07-refleksi.md` dan `03-log-prompt.md` terisi; semua pekerjaan sudah di-push ke branch `main`; tidak ada data pribadi, password, atau API key di repositori | 30 menit | Belum dicatat | Direncanakan |

Total estimasi: sekitar 14 jam kerja. Kolom "Waktu sebenarnya" dan "Status" diperbarui selama bekerja, bukan di akhir.
