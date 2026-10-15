const test = require("node:test");
const assert = require("node:assert/strict");
const transaksi = require("../src/transaksi.js");

function buatStorage() {
  const data = new Map();
  return {
    getItem(kunci) {
      return data.has(kunci) ? data.get(kunci) : null;
    },
    setItem(kunci, nilai) {
      data.set(kunci, String(nilai));
    },
  };
}

test("riwayat transaksi kosong dapat dibaca dan transaksi tetap tersimpan", () => {
  const storage = buatStorage();
  const daftar = [{
    waktu: "2026-10-16T00:00:00.000Z",
    items: [{ nama: "Nasi kuning", qty: 1 }],
    subtotal: 8000,
    diskon: 0,
    ppn: 880,
    total: 8880,
    dibayar: 10000,
    kembalian: 1120,
  }];

  assert.deepEqual(transaksi.bacaTransaksi(storage), []);
  transaksi.simpanTransaksi(daftar, storage);
  assert.deepEqual(transaksi.bacaTransaksi(storage), daftar);
});

test("data rekap yang rusak ditolak dengan pesan yang jelas", () => {
  const storage = buatStorage();
  storage.setItem("kasir-bisa-transaksi", "{");
  assert.throws(() => transaksi.bacaTransaksi(storage), /Data rekap rusak/);

  storage.setItem("kasir-bisa-transaksi", JSON.stringify({}));
  assert.throws(() => transaksi.bacaTransaksi(storage), /Data rekap tidak valid/);
});
