/*
 * Kasir Kantin STEAM: logika perhitungan
 *
 * File ini berisi seluruh aturan bisnis kasir (menu, keranjang, diskon,
 * PPN, total, dan kembalian). Tampilan ada di app.js.
 * Fungsi-fungsi di sini bisa diuji langsung dengan Node.js (lihat folder tes/).
 */

const MENU = [
  { kode: "K01", nama: "Nasi Goreng", harga: 15000 },
  { kode: "K02", nama: "Mie Ayam", harga: 13500 },
  { kode: "K03", nama: "Soto Ayam", harga: 14000 },
  { kode: "K04", nama: "Es Teh", harga: 4000 },
  { kode: "K05", nama: "Jus Jeruk", harga: 8500 },
  { kode: "K06", nama: "Roti Bakar", harga: 10500 },
  { kode: "K07", nama: "Air Mineral", harga: 3500 },
];

function cariProduk(kode) {
  return MENU.find((p) => p.kode === kode);
}

// Menambahkan produk ke keranjang.
// Jika produk sudah ada di keranjang, jumlahnya ditambahkan.
// Aturan 1: jumlah harus bilangan bulat 1 sampai 99.
// Aturan 2: total jumlah per produk juga tidak boleh lebih dari 99.
function tambahItem(keranjang, kode, qty) {
  const produk = cariProduk(kode);
  if (!produk) {
    throw new Error("Produk tidak ditemukan");
  }

  // Nilai dari kotak input berupa teks, jadi diubah menjadi angka dulu.
  // Teks kosong atau spasi harus ditolak (Number("") bernilai 0, yang juga ditolak di bawah).
  const jumlah = typeof qty === "string" && qty.trim() === "" ? NaN : Number(qty);
  if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 99) {
    throw new Error("Jumlah harus bilangan bulat dari 1 sampai 99");
  }

  const itemLama = keranjang.find((i) => i.kode === kode);
  if (itemLama) {
    if (itemLama.qty + jumlah > 99) {
      throw new Error("Total jumlah per produk tidak boleh lebih dari 99");
    }
    itemLama.qty += jumlah;
  } else {
    keranjang.push({
      kode: produk.kode,
      nama: produk.nama,
      harga: produk.harga,
      qty: jumlah,
    });
  }
  return keranjang;
}

function hapusItem(keranjang, kode) {
  return keranjang.filter((i) => i.kode !== kode);
}

function hitungSubtotal(keranjang) {
  let subtotal = 0;
  for (const item of keranjang) {
    subtotal += item.harga * item.qty;
  }
  return subtotal;
}

// Diskon member dan diskon belanja. Tidak boleh digabung: hanya satu yang berlaku.
// Pembulatan ke rupiah terdekat memakai aritmetika bilangan bulat agar tidak
// terpengaruh galat bilangan desimal.
function hitungDiskon(subtotal, member) {
  if (member) {
    return Math.floor((subtotal * 10 + 50) / 100);
  }
  if (subtotal >= 100000) {
    return Math.floor((subtotal * 5 + 50) / 100);
  }
  return 0;
}

// PPN 11% dari dasar pengenaan pajak (subtotal setelah diskon),
// dibulatkan ke rupiah terdekat (0,5 ke atas dibulatkan naik).
function hitungPPN(dasar) {
  return Math.floor((dasar * 11 + 50) / 100);
}

function hitungRingkasan(keranjang, member) {
  const subtotal = hitungSubtotal(keranjang);
  const diskon = hitungDiskon(subtotal, member);
  const dasarPajak = subtotal - diskon;
  const ppn = hitungPPN(dasarPajak);
  const total = dasarPajak + ppn;
  return { subtotal, diskon, ppn, total };
}

function hitungKembalian(total, bayar) {
  if (!Number.isFinite(bayar) || bayar < total) {
    throw new Error("Uang pembayaran kurang");
  }
  return bayar - total;
}

// Agar bisa dipakai di Node.js untuk pengujian.
if (typeof module !== "undefined") {
  module.exports = {
    MENU,
    cariProduk,
    tambahItem,
    hapusItem,
    hitungSubtotal,
    hitungDiskon,
    hitungPPN,
    hitungRingkasan,
    hitungKembalian,
  };
}
