# Refleksi Tim

1. Apa yang berjalan baik dalam cara kami bekerja dengan AI?
    > Cara kerja kami cukup efektif karena AI membantu kami merangkum kebutuhan proyek, memecah pekerjaan besar menjadi langkah yang lebih konkret, dan menyusun ide perbaikan untuk masalah yang belum kami lihat sebelumnya. Di tahap bug hunt, AI sangat membantu untuk mengidentifikasi pola masalah seperti validasi input, diskon, dan pembulatan PPN. Yang paling penting, kami tetap memeriksa hasilnya dengan logika bisnis dan bukti pengujian, sehingga keputusan tidak tergantung pada satu output AI saja.

2. Kapan AI paling membantu? Kapan AI justru menyulitkan?
    > AI paling membantu ketika kami membutuhkan struktur awal, daftar tes yang mungkin terlewat, dan penjelasan cepat tentang akar masalah. AI juga membantu menjelaskan penyebab bug yang tampak rumit, terutama pada operasi angka dan pembulatan. AI justru menyulitkan ketika hasilnya terlalu cepat dan terkesan benar, padahal masih perlu dicek terhadap aturan bisnis dan kondisi batas. Dalam kasus seperti penjumlahan string, diskon, atau pembulatan 0,5, kami harus tetap melakukan verifikasi manual agar tidak menerima jawaban yang tampak logis namun belum tentu benar.

3. Kesalahan terbesar yang hampir lolos, dan bagaimana kami menemukannya?
    > Kesalahan terbesar yang hampir lolos adalah pola string concatenation dan pembatasan diskon. Pada awalnya, jumlah produk yang sama mungkin terlihat "bertambah" karena `"2" + "3"` menghasilkan `"23"`, tetapi tanpa pemeriksaan eksplisit kita bisa dengan mudah melewatkan bahwa logika itu salah. Selain itu, aturan diskon member dan diskon belanja yang tidak boleh digabung juga mudah terlewat jika hanya melihat hasil akhirnya. Kami menemukannya lewat kasus uji yang dibuat berdasarkan spesifikasi, lalu dibuktikan dengan tangkapan layar dan pengujian terkait.

4. Apa yang akan kami lakukan berbeda jika mengulang challenge ini?
    > Kami akan menulis kasus uji yang lebih detail sejak awal, terutama untuk nilai batas dan kondisi input tidak valid. Kami juga akan memisahkan pengujian logika dari pengujian tampilan lebih cepat, agar bug di fungsi perhitungan dapat dideteksi sebelum UI. Selain itu, kami akan lebih cepat menilai apakah saran AI sesuai dengan aturan bisnis, bukan hanya dengan kode yang dibuat AI.

5. Bagaimana kami mengatur waktu? Langkah mana yang jauh lebih lama dari estimasi, dan kenapa?
    > Waktu paling lama justru dipakai untuk pemeriksaan bug dan validasi aturan bisnis, bukan untuk menulis kode itu sendiri. Proses pembulatan PPN, diskon, dan pengecekan batas jumlah produk memerlukan pengulangan karena setiap detail harus sesuai dengan angka yang benar. Dalam praktiknya, tahap analisis dan verifikasi lebih lama dari estimasi karena ada banyak kasus batas yang harus diperiksa satu per satu, bukan hanya satu contoh kasus.

6. Bagian mana dari kode yang masih belum kami pahami sepenuhnya? (Jawab dengan jujur.)
    > Kami memahami struktur utama fungsi bisnis dan alur UI dengan cukup baik. Namun, kami masih terus memperhatikan detail implementasi browser seperti cara input teks di `input` diubah menjadi angka, serta bagaimana `localStorage` dan event listener bekerja dalam konteks yang lebih besar. Bagi kami, bagian yang paling rawan adalah interaksi antara validasi di JavaScript dan tampilan di halaman, terutama saat saat input kosong atau saat perubahan status member berpengaruh ke total.
