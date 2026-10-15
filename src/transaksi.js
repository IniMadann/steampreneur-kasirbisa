(function (global) {
  const KUNCI_TRANSAKSI = "kasir-bisa-transaksi";

  function bacaTransaksi(storage = global.localStorage) {
    const tersimpan = storage.getItem(KUNCI_TRANSAKSI);
    if (tersimpan === null) {
      return [];
    }

    let transaksi;
    try {
      transaksi = JSON.parse(tersimpan);
    } catch {
      throw new Error("Data rekap rusak dan tidak dapat dibaca");
    }

    if (!Array.isArray(transaksi)) {
      throw new Error("Data rekap tidak valid");
    }
    return transaksi;
  }

  function simpanTransaksi(transaksi, storage = global.localStorage) {
    storage.setItem(KUNCI_TRANSAKSI, JSON.stringify(transaksi));
  }

  const api = { bacaTransaksi, simpanTransaksi };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  global.KasirTransaksi = api;
})(typeof window !== "undefined" ? window : globalThis);
