const test = require("node:test");
const assert = require("node:assert/strict");
const { saringTransaksi, buatCsv, selCsv, transaksiYangDapatDiekspor, bisaUnduhCsv } = require("../src/rekap.js");

const transaksi = [
  {
    waktu: "2026-10-15T06:00:00.000Z",
    items: [{ nama: "Es Teh", qty: 2 }],
    subtotal: 8000,
    diskon: 0,
    ppn: 880,
    total: 8880,
    dibayar: 10000,
    kembalian: 1120,
  },
  {
    waktu: "2026-10-15T06:05:00.000Z",
    items: [{ nama: "Nasi Goreng", qty: 1 }],
    subtotal: 15000,
    diskon: 0,
    ppn: 1650,
    total: 16650,
    dibayar: 20000,
    kembalian: 3350,
  },
];

test("pencarian transaksi tidak membedakan huruf besar dan kecil", () => {
  assert.deepEqual(saringTransaksi(transaksi, "ES TEH", ""), [transaksi[0]]);
});

test("pencarian dapat menemukan nominal transaksi", () => {
  assert.deepEqual(saringTransaksi(transaksi, "16.650", ""), [transaksi[1]]);
});

test("filter produk hanya menampilkan transaksi yang memuat produk itu", () => {
  assert.deepEqual(saringTransaksi(transaksi, "", "Nasi Goreng"), [transaksi[1]]);
});

test("pencarian dan filter produk dapat digunakan bersamaan", () => {
  assert.deepEqual(saringTransaksi(transaksi, "nasi", "Nasi Goreng"), [transaksi[1]]);
  assert.deepEqual(saringTransaksi(transaksi, "es teh", "Nasi Goreng"), []);
});

test("pencarian yang tidak cocok menghasilkan daftar kosong", () => {
  assert.deepEqual(saringTransaksi(transaksi, "tidak ada", ""), []);
});

test("CSV memiliki header dan angka transaksi tanpa format mata uang", () => {
  const csv = buatCsv([transaksi[0]]).replace(/^\uFEFF/, "");
  const [header, row] = csv.split("\r\n");

  assert.equal(header, '"Waktu","Produk","Subtotal","Diskon","PPN","Total","Dibayar","Kembalian"');
  assert.match(row, /"Es Teh x 2","8000","0","880","8880","10000","1120"$/);
  assert.doesNotMatch(row, /Rp|8\.000/);
});

test("CSV hanya memuat transaksi yang lolos pencarian dan filter", () => {
  const terlihat = saringTransaksi(transaksi, "16.650", "");
  const csv = buatCsv(terlihat);

  assert.match(csv, /Nasi Goreng x 1/);
  assert.doesNotMatch(csv, /Es Teh/);
});

test("CSV menangani pemisah, kutip, baris baru, dan nama seperti formula", () => {
  assert.equal(selCsv('=SUM("a,b")'), `"'=SUM(""a,b"")"`);
  assert.equal(selCsv("produk, spesial"), '"produk, spesial"');
  assert.equal(selCsv("baris 1\nbaris 2"), '"baris 1\nbaris 2"');
});

test("CSV hanya dapat diekspor saat ada data yang tampil", () => {
  assert.deepEqual(transaksiYangDapatDiekspor(transaksi, "tidak ada", ""), []);
  assert.equal(bisaUnduhCsv(transaksi, "tidak ada", ""), false);
  assert.equal(bisaUnduhCsv(transaksi, "es teh", "Nasi Goreng"), false);
  assert.equal(bisaUnduhCsv(transaksi, "16.650", ""), true);
});
