/*
 * Pengujian perbaikan bug pada kasir.js.
 * Jalankan dari folder bughunt-kasir dengan perintah: node --test
 */

const test = require("node:test");
const assert = require("node:assert");
const kasir = require("../kasir.js");

test("jumlah produk harus bilangan bulat dari 1 sampai 99", () => {
  for (const salah of [0, -5, 1.5, "1,5", "", " ", "abc", 100, "100", NaN, undefined]) {
    const keranjang = [];
    assert.throws(() => kasir.tambahItem(keranjang, "K04", salah), Error);
    assert.strictEqual(keranjang.length, 0);
  }
  for (const benar of [1, 99, "1", "99"]) {
    const keranjang = [];
    kasir.tambahItem(keranjang, "K04", benar);
    assert.strictEqual(keranjang[0].qty, Number(benar));
  }
});

test("pembayaran kurang ditolak dan pembayaran cukup menghitung kembalian", () => {
  assert.throws(() => kasir.hitungKembalian(16650, 1000), /Uang pembayaran kurang/);
  assert.throws(() => kasir.hitungKembalian(16650, 16649), /Uang pembayaran kurang/);
  assert.throws(() => kasir.hitungKembalian(16650, NaN), /Uang pembayaran kurang/);
  assert.strictEqual(kasir.hitungKembalian(16650, 16650), 0);
  assert.strictEqual(kasir.hitungKembalian(16650, 20000), 3350);
});

test("penambahan produk yang sama menjumlahkan kuantitas sebagai angka", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", "2");
  kasir.tambahItem(keranjang, "K04", "3");
  assert.strictEqual(keranjang.length, 1);
  assert.strictEqual(keranjang[0].qty, 5);
  assert.strictEqual(kasir.hitungSubtotal(keranjang), 20000);

  const keranjangLain = [];
  kasir.tambahItem(keranjangLain, "K01", "1");
  kasir.tambahItem(keranjangLain, "K01", "1");
  assert.strictEqual(keranjangLain[0].qty, 2);
});

test("jumlah gabungan produk yang sama tidak boleh lebih dari 99", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", "99");
  assert.throws(() => kasir.tambahItem(keranjang, "K04", "1"), Error);
  assert.strictEqual(keranjang[0].qty, 99);

  const keranjangLain = [];
  kasir.tambahItem(keranjangLain, "K04", 98);
  kasir.tambahItem(keranjangLain, "K04", 1);
  assert.strictEqual(keranjangLain[0].qty, 99);
});

test("non-member mendapat diskon 5 persen mulai subtotal Rp100.000", () => {
  assert.strictEqual(kasir.hitungDiskon(99999, false), 0);
  assert.strictEqual(kasir.hitungDiskon(100000, false), 5000);
  assert.strictEqual(kasir.hitungDiskon(120000, false), 6000);
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", 25);
  assert.deepStrictEqual(kasir.hitungRingkasan(keranjang, false), {
    subtotal: 100000,
    diskon: 5000,
    ppn: 10450,
    total: 105450,
  });
});

test("diskon member 10 persen tidak ditumpuk dengan diskon belanja", () => {
  assert.strictEqual(kasir.hitungDiskon(120000, true), 12000);
  assert.strictEqual(kasir.hitungDiskon(50000, true), 5000);
  assert.strictEqual(kasir.hitungDiskon(100000, true), 10000);
});

test("PPN 11 persen dibulatkan ke rupiah terdekat", () => {
  assert.strictEqual(kasir.hitungPPN(156750), 17243);
  assert.strictEqual(kasir.hitungPPN(100), 11);
  assert.strictEqual(kasir.hitungPPN(0), 0);
  const keranjang = [];
  kasir.tambahItem(keranjang, "K01", 11);
  assert.deepStrictEqual(kasir.hitungRingkasan(keranjang, false), {
    subtotal: 165000,
    diskon: 8250,
    ppn: 17243,
    total: 173993,
  });
});

test("subtotal dua produk berbeda dihitung dari harga x jumlah", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", 2);
  kasir.tambahItem(keranjang, "K07", 1);
  assert.strictEqual(kasir.hitungSubtotal(keranjang), 11500);
});
  
