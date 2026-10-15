/*
 * Kasir Kantin STEAM: tampilan
 * Menghubungkan halaman (index.html) dengan logika di kasir.js.
 */

let keranjang = [];

const elProduk = document.getElementById("produk");
const elQty = document.getElementById("qty");
const elMember = document.getElementById("member");
const elIsiKeranjang = document.getElementById("isi-keranjang");
const elBayar = document.getElementById("bayar");
const elPesan = document.getElementById("pesan");
const elHasilBayar = document.getElementById("hasil-bayar");

function rupiah(angka) {
  return "Rp" + Number(angka).toLocaleString("id-ID");
}

function tampilkanPesan(teks, jenis) {
  elPesan.textContent = teks;
  elPesan.className = "pesan " + (jenis || "");
}

function isiPilihanMenu() {
  for (const p of MENU) {
    const opsi = document.createElement("option");
    opsi.value = p.kode;
    opsi.textContent = p.nama + " (" + rupiah(p.harga) + ")";
    elProduk.appendChild(opsi);
  }
}

function render() {
  elIsiKeranjang.innerHTML = "";

  if (keranjang.length === 0) {
    const baris = document.createElement("tr");
    baris.innerHTML = '<td colspan="5" class="kosong">Keranjang masih kosong</td>';
    elIsiKeranjang.appendChild(baris);
  }

  for (const item of keranjang) {
    const baris = document.createElement("tr");
    baris.innerHTML =
      "<td>" + item.nama + "</td>" +
      '<td class="angka">' + rupiah(item.harga) + "</td>" +
      '<td class="angka">' + item.qty + "</td>" +
      '<td class="angka">' + rupiah(item.harga * item.qty) + "</td>" +
      '<td><button class="hapus" data-kode="' + item.kode + '">Hapus</button></td>';
    elIsiKeranjang.appendChild(baris);
  }

  const r = hitungRingkasan(keranjang, elMember.checked);
  document.getElementById("subtotal").textContent = rupiah(r.subtotal);
  document.getElementById("diskon").textContent = "-" + rupiah(r.diskon);
  document.getElementById("ppn").textContent = rupiah(r.ppn);
  document.getElementById("total").textContent = rupiah(r.total);
  elHasilBayar.textContent = "";
}

function buatTransaksi(ringkasan, dibayar, kembalian) {
  return {
    waktu: new Date().toISOString(),
    items: keranjang.map((item) => ({ ...item })),
    subtotal: ringkasan.subtotal,
    diskon: ringkasan.diskon,
    ppn: ringkasan.ppn,
    total: ringkasan.total,
    dibayar,
    kembalian,
    member: elMember.checked,
  };
}

document.getElementById("form-tambah").addEventListener("submit", function (e) {
  e.preventDefault();
  try {
    tambahItem(keranjang, elProduk.value, elQty.value);
    tampilkanPesan("", "");
    elQty.value = 1;
    render();
  } catch (err) {
    tampilkanPesan(err.message, "error");
  }
});

elIsiKeranjang.addEventListener("click", function (e) {
  if (e.target.classList.contains("hapus")) {
    keranjang = hapusItem(keranjang, e.target.dataset.kode);
    render();
  }
});

elMember.addEventListener("change", render);

document.getElementById("tombol-bayar").addEventListener("click", function () {
  if (keranjang.length === 0) {
    tampilkanPesan("Keranjang masih kosong", "error");
    return;
  }
  try {
    if (elBayar.value.trim() === "" || !Number.isFinite(Number(elBayar.value))) {
      throw new Error("Masukkan uang pembayaran yang valid");
    }
    const r = hitungRingkasan(keranjang, elMember.checked);
    const dibayar = Number(elBayar.value);
    const kembalian = hitungKembalian(r.total, dibayar);
    const transaksi = KasirTransaksi.bacaTransaksi();
    transaksi.push(buatTransaksi(r, dibayar, kembalian));
    KasirTransaksi.simpanTransaksi(transaksi);
    keranjang = [];
    elBayar.value = "";
    elMember.checked = false;
    render();
    elHasilBayar.textContent = "Kembalian: " + rupiah(kembalian);
    tampilkanPesan("Pembayaran berhasil", "sukses");
  } catch (err) {
    elHasilBayar.textContent = "";
    tampilkanPesan(err.message, "error");
  }
});

document.getElementById("tombol-baru").addEventListener("click", function () {
  keranjang = [];
  elBayar.value = "";
  elMember.checked = false;
  tampilkanPesan("", "");
  render();
});

isiPilihanMenu();
render();
