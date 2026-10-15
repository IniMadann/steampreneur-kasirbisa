function rupiah(angka) {
  return "Rp" + Number(angka).toLocaleString("id-ID");
}

function saringTransaksi(transaksi, kataKunci, produkTerpilih) {
  const kata = String(kataKunci || "").trim().toLocaleLowerCase("id-ID");

  return transaksi.filter((item) => {
    const produk = Array.isArray(item.items) ? item.items : [];
    if (produkTerpilih && !produk.some((barang) => barang.nama === produkTerpilih)) {
      return false;
    }
    if (!kata) return true;

    const teks = [
      new Date(item.waktu).toLocaleString("id-ID"),
      ...produk.map((barang) => `${barang.nama} x ${barang.qty}`),
      rupiah(item.subtotal),
      "-" + rupiah(item.diskon),
      rupiah(item.ppn),
      rupiah(item.total),
      rupiah(item.dibayar),
      rupiah(item.kembalian),
    ].join(" ").toLocaleLowerCase("id-ID");
    return teks.includes(kata);
  });
}

function transaksiYangDapatDiekspor(transaksi, kataKunci = "", produkTerpilih = "") {
  return saringTransaksi(transaksi, kataKunci, produkTerpilih);
}

function transaksiTerlihat(transaksi) {
  return transaksiYangDapatDiekspor(
    transaksi,
    document.getElementById("cari-transaksi").value,
    document.getElementById("filter-produk").value
  );
}

function bisaUnduhCsv(transaksiTersimpan, kataKunci = "", produkTerpilih = "") {
  return Array.isArray(transaksiTersimpan)
    && transaksiTersimpan.length > 0
    && transaksiYangDapatDiekspor(transaksiTersimpan, kataKunci, produkTerpilih).length > 0;
}

function isiPilihanProduk(transaksi) {
  const pilihan = document.getElementById("filter-produk");
  const produkTerpilih = pilihan.value;
  const namaProduk = [...new Set(transaksi.flatMap((item) =>
    Array.isArray(item.items) ? item.items.map((barang) => barang.nama) : []
  ))].sort((a, b) => a.localeCompare(b, "id-ID"));

  pilihan.innerHTML = "";
  const semua = document.createElement("option");
  semua.value = "";
  semua.textContent = "Semua produk";
  pilihan.appendChild(semua);

  for (const nama of namaProduk) {
    const opsi = document.createElement("option");
    opsi.value = nama;
    opsi.textContent = nama;
    pilihan.appendChild(opsi);
  }
  pilihan.value = namaProduk.includes(produkTerpilih) ? produkTerpilih : "";
}

function tampilkanPesan(target, teks) {
  const baris = document.createElement("tr");
  const sel = document.createElement("td");
  sel.colSpan = 8;
  sel.className = "kosong";
  sel.textContent = teks;
  baris.appendChild(sel);
  target.appendChild(baris);
}

function renderRekap(transaksiTersimpan, pesanError) {
  const target = document.getElementById("rekap-transaksi");
  target.innerHTML = "";

  if (pesanError) {
    tampilkanPesan(target, pesanError);
    return;
  }
  if (transaksiTersimpan.length === 0) {
    tampilkanPesan(target, "Belum ada transaksi tersimpan");
    return;
  }

  const transaksi = transaksiTerlihat(transaksiTersimpan);
  if (transaksi.length === 0) {
    tampilkanPesan(target, "Data tidak ditemukan");
    return;
  }

  for (const item of transaksi) {
    const baris = document.createElement("tr");
    const nilai = [
      new Date(item.waktu).toLocaleString("id-ID"),
      item.items.map((produk) => produk.nama + " x " + produk.qty).join(", "),
      rupiah(item.subtotal),
      "-" + rupiah(item.diskon),
      rupiah(item.ppn),
      rupiah(item.total),
      rupiah(item.dibayar),
      rupiah(item.kembalian),
    ];

    for (const teks of nilai) {
      const sel = document.createElement("td");
      sel.textContent = teks;
      baris.appendChild(sel);
    }
    target.appendChild(baris);
  }
}

function selCsv(nilai) {
  let teks = String(nilai ?? "");
  if (/^[=+\-@\t\r]/.test(teks)) teks = "'" + teks;
  return '"' + teks.replace(/"/g, '""') + '"';
}

function buatCsv(transaksi) {
  const kolom = ["Waktu", "Produk", "Subtotal", "Diskon", "PPN", "Total", "Dibayar", "Kembalian"];
  const baris = [kolom.map(selCsv).join(",")];

  for (const item of transaksi) {
    const produk = (Array.isArray(item.items) ? item.items : [])
      .map((barang) => `${barang.nama} x ${barang.qty}`)
      .join(", ");
    const nilai = [
      new Date(item.waktu).toLocaleString("id-ID"),
      produk,
      Number(item.subtotal),
      Number(item.diskon),
      Number(item.ppn),
      Number(item.total),
      Number(item.dibayar),
      Number(item.kembalian),
    ];
    baris.push(nilai.map(selCsv).join(","));
  }

  return "\uFEFF" + baris.join("\r\n");
}

function unduhCsv(transaksiTersimpan) {
  const kataKunci = document.getElementById("cari-transaksi").value;
  const produkTerpilih = document.getElementById("filter-produk").value;
  const transaksi = transaksiYangDapatDiekspor(transaksiTersimpan, kataKunci, produkTerpilih);

  if (!bisaUnduhCsv(transaksiTersimpan, kataKunci, produkTerpilih)) {
    alert("Tidak ada data yang dapat diekspor untuk tampilan saat ini.");
    return;
  }

  const berkas = new Blob([buatCsv(transaksi)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(berkas);
  const tautan = document.createElement("a");
  const tanggal = new Date().toISOString().slice(0, 10);
  tautan.href = url;
  tautan.download = `rekap-transaksi-${tanggal}.csv`;
  document.body.appendChild(tautan);
  tautan.click();
  tautan.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function mulaiRekap() {
  let transaksiTersimpan = [];
  let pesanError = "";
  try {
    transaksiTersimpan = KasirTransaksi.bacaTransaksi();
    isiPilihanProduk(transaksiTersimpan);
  } catch (error) {
    pesanError = error.message;
  }

  const render = () => {
    renderRekap(transaksiTersimpan, pesanError);

    const tombolUnduh = document.getElementById("unduh-csv");
    const kataKunci = document.getElementById("cari-transaksi").value;
    const produkTerpilih = document.getElementById("filter-produk").value;
    tombolUnduh.disabled = Boolean(pesanError) || !bisaUnduhCsv(transaksiTersimpan, kataKunci, produkTerpilih);
  };

  document.getElementById("cari-transaksi").addEventListener("input", render);
  document.getElementById("filter-produk").addEventListener("change", render);
  document.getElementById("reset-filter").addEventListener("click", () => {
    document.getElementById("cari-transaksi").value = "";
    document.getElementById("filter-produk").value = "";
    render();
  });
  document.getElementById("unduh-csv").addEventListener("click", () => {
    if (pesanError) {
      alert("Rekap tidak dapat dibaca: " + pesanError);
      return;
    }
    if (!bisaUnduhCsv(transaksiTersimpan, document.getElementById("cari-transaksi").value, document.getElementById("filter-produk").value)) {
      alert("Tidak ada data yang dapat diekspor untuk tampilan saat ini.");
      return;
    }
    unduhCsv(transaksiTersimpan);
  });
  render();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { saringTransaksi, buatCsv, selCsv, transaksiYangDapatDiekspor, bisaUnduhCsv };
}
if (typeof document !== "undefined") mulaiRekap();
