const test = require("node:test");
const assert = require("node:assert/strict");
const kasir = require("../src/kasir.js");

test("katalog produk memuat nama, kategori, harga, dan aset KASIR BISA", () => {
  assert.equal(kasir.MENU.length, 14);
  assert.deepEqual(
    kasir.cariProduk("K01"),
    {
      kode: "K01",
      id: 1,
      nama: "Nasi kuning",
      kategori: "Makanan",
      harga: 8000,
      gambar: "gambar/nasikuning.png",
    }
  );
  assert.equal(kasir.cariProduk("K13").nama, "Bakwan");
  assert.equal(kasir.cariProduk("tidak-ada"), undefined);
});

test("pencarian produk tanpa membedakan kapital dan filter kategori dapat digabung", () => {
  assert.deepEqual(
    kasir.saringProduk(kasir.MENU, "NASI", "Makanan").map((produk) => produk.nama),
    ["Nasi kuning", "Nasi Goreng"]
  );
  assert.deepEqual(
    kasir.saringProduk(kasir.MENU, "", "Minuman").map((produk) => produk.nama),
    ["Air Mineral", "Susu Kotak"]
  );
  assert.deepEqual(kasir.saringProduk(kasir.MENU, "tidak ada"), []);
});

test("produk masuk ke keranjang dan subtotal menghitung harga kali jumlah", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K01", 2);
  kasir.tambahItem(keranjang, "K13", 3);
  assert.equal(keranjang.length, 2);
  assert.equal(kasir.hitungSubtotal(keranjang), 22000);
});

test("penambahan produk yang sama menggabungkan jumlah secara numerik", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K02", "2");
  kasir.tambahItem(keranjang, "K02", "3");
  assert.equal(keranjang.length, 1);
  assert.equal(keranjang[0].qty, 5);
  assert.equal(kasir.hitungSubtotal(keranjang), 25000);
});

test("jumlah dan perubahan jumlah dibatasi ke bilangan bulat 1 sampai 99", () => {
  for (const salah of [0, -1, 1.5, "1,5", "", " ", "abc", 100, NaN]) {
    assert.throws(() => kasir.tambahItem([], "K01", salah), /Jumlah harus bilangan bulat/);
  }
  for (const benar of [1, 99, "1", "99"]) {
    assert.equal(kasir.tambahItem([], "K01", benar)[0].qty, Number(benar));
  }
  assert.throws(
    () => kasir.ubahJumlah([{ kode: "K01", qty: 1 }], "K01", 0),
    /Jumlah harus bilangan bulat/
  );
  assert.throws(
    () => kasir.ubahJumlah([{ kode: "K01", qty: 1 }], "K01", undefined),
    /Jumlah harus bilangan bulat/
  );
  assert.throws(() => kasir.tambahItem([], "tidak-ada", 1), /Produk tidak ditemukan/);
});

test("jumlah produk yang sama tidak dapat melebihi 99 dan tetap tidak berubah saat ditolak", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K13", 99);
  assert.throws(() => kasir.tambahItem(keranjang, "K13", 1), /tidak boleh lebih dari 99/);
  assert.equal(keranjang[0].qty, 99);
  kasir.ubahJumlah(keranjang, "K13", 98);
  kasir.tambahItem(keranjang, "K13", 1);
  assert.equal(keranjang[0].qty, 99);
});

test("produk dalam keranjang dapat diubah dan dihapus", () => {
  let keranjang = [];
  kasir.tambahItem(keranjang, "K01", 1);
  kasir.ubahJumlah(keranjang, "K01", 4);
  assert.equal(keranjang[0].qty, 4);
  keranjang = kasir.hapusItem(keranjang, "K01");
  assert.deepEqual(keranjang, []);
});

test("diskon member dan diskon non-member tidak ditumpuk", () => {
  assert.equal(kasir.hitungDiskon(99999, false), 0);
  assert.equal(kasir.hitungDiskon(100000, false), 5000);
  assert.equal(kasir.hitungDiskon(120000, false), 6000);
  assert.equal(kasir.hitungDiskon(120000, true), 12000);
  assert.equal(kasir.hitungDiskon(100000, true), 10000);
});

test("PPN 11 persen dihitung setelah diskon dan 0,5 dibulatkan naik", () => {
  assert.equal(kasir.hitungPPN(156750), 17243);
  const keranjang = [];
  kasir.tambahItem(keranjang, "K01", 13);
  assert.deepEqual(kasir.hitungRingkasan(keranjang, false), {
    subtotal: 104000,
    diskon: 5200,
    ppn: 10868,
    total: 109668,
  });
  assert.deepEqual(kasir.hitungRingkasan(keranjang, true), {
    subtotal: 104000,
    diskon: 10400,
    ppn: 10296,
    total: 103896,
  });
});

test("pembayaran kurang ditolak dan pembayaran cukup menghitung kembalian", () => {
  assert.throws(() => kasir.hitungKembalian(16650, 1000), /Uang pembayaran kurang/);
  assert.throws(() => kasir.hitungKembalian(16650, 16649), /Uang pembayaran kurang/);
  assert.throws(() => kasir.hitungKembalian(16650, NaN), /jumlah uang yang valid/);
  assert.throws(() => kasir.hitungKembalian(16650, 16650.5), /jumlah uang yang valid/);
  assert.equal(kasir.hitungKembalian(16650, 16650), 0);
  assert.equal(kasir.hitungKembalian(16650, 20000), 3350);
});

test("transaksi hanya dibuat jika total cukup dan menyimpan rincian lengkap", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K01", 13);
  const transaksi = kasir.buatTransaksi(keranjang, 110000, false, "2026-10-16T00:00:00.000Z");
  assert.deepEqual(transaksi, {
    waktu: "2026-10-16T00:00:00.000Z",
    items: [{ kode: "K01", nama: "Nasi kuning", harga: 8000, qty: 13 }],
    subtotal: 104000,
    diskon: 5200,
    ppn: 10868,
    total: 109668,
    dibayar: 110000,
    kembalian: 332,
    member: false,
  });
  assert.throws(() => kasir.buatTransaksi([], 0), /Keranjang masih kosong/);
  assert.throws(() => kasir.buatTransaksi(keranjang, 109667), /Uang pembayaran kurang/);
});

test("ringkasan penjualan dan nominal pembayaran cepat dihitung", () => {
  assert.deepEqual(
    kasir.hitungRingkasanPenjualan([
      { total: 18000, items: [{ nama: "Bakwan", qty: 2 }] },
      { total: 8000, items: [{ nama: "Nasi kuning", qty: 1 }] },
    ]),
    { jumlahTransaksi: 2, totalPenjualan: 26000, totalProduk: 3 }
  );
  assert.deepEqual(kasir.nominalPembayaranCepat(8880), [8880, 10000, 20000, 50000]);
  assert.deepEqual(kasir.nominalPembayaranCepat(0), []);
});
