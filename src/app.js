let keranjang = [];
let transaksiTersimpan = [];
let transaksiMenunggu = null;
let pesanKesalahanPenyimpanan = "";

const elProduk = document.getElementById("daftar-produk");
const elPencarian = document.getElementById("cari-produk");
const elKategori = document.getElementById("filter-kategori");
const elKeranjang = document.getElementById("daftar-keranjang");
const elBayar = document.getElementById("bayar");
const elMember = document.getElementById("member");
const elDialog = document.getElementById("dialog-transaksi");

function rupiah(angka) {
  return "Rp" + Number(angka).toLocaleString("id-ID");
}

function elemen(tag, className, teks) {
  const hasil = document.createElement(tag);
  if (className) hasil.className = className;
  if (teks !== undefined) hasil.textContent = teks;
  return hasil;
}

function tampilkanPesan(teks, jenis = "") {
  const pesan = document.getElementById("pesan");
  pesan.textContent = teks;
  pesan.className = "notice" + (jenis ? " " + jenis : "");
}

function isiKategori() {
  const kategori = [...new Set(KasirLogic.MENU.map((produk) => produk.kategori))]
    .sort((a, b) => a.localeCompare(b, "id-ID"));
  elKategori.appendChild(new Option("Semua kategori", ""));
  for (const nama of kategori) elKategori.appendChild(new Option(nama, nama));
}

function renderProduk() {
  const daftar = KasirLogic.saringProduk(KasirLogic.MENU, elPencarian.value, elKategori.value);
  elProduk.replaceChildren();
  document.getElementById("jumlah-produk").textContent = `${daftar.length} produk`;
  if (daftar.length === 0) {
    elProduk.appendChild(elemen("p", "empty-products", "Produk tidak ditemukan."));
    return;
  }

  for (const produk of daftar) {
    const kartu = elemen("article", "product-card");
    const gambar = document.createElement("img");
    gambar.src = produk.gambar;
    gambar.alt = produk.nama;
    gambar.loading = "lazy";
    gambar.addEventListener("error", () => {
      gambar.removeAttribute("src");
      gambar.alt = "Gambar tidak tersedia";
      gambar.classList.add("image-unavailable");
    }, { once: true });

    const info = elemen("div", "product-info");
    info.append(
      elemen("span", "product-category", produk.kategori),
      elemen("h3", "", produk.nama),
      elemen("strong", "product-price", rupiah(produk.harga))
    );
    const tambah = elemen("button", "add-button", "Tambah");
    tambah.type = "button";
    tambah.dataset.kode = produk.kode;
    tambah.setAttribute("aria-label", `Tambah ${produk.nama} ke keranjang`);
    kartu.append(gambar, info, tambah);
    elProduk.appendChild(kartu);
  }
}

function renderKeranjang() {
  elKeranjang.replaceChildren();
  const kosong = keranjang.length === 0;
  document.getElementById("keranjang-kosong").hidden = !kosong;
  document.getElementById("kosongkan-keranjang").disabled = kosong;
  document.getElementById("jumlah-keranjang").textContent =
    String(keranjang.reduce((jumlah, item) => jumlah + item.qty, 0));

  for (const item of keranjang) {
    const baris = elemen("article", "cart-item");
    const gambar = document.createElement("img");
    gambar.className = "cart-item-image";
    gambar.src = item.gambar;
    gambar.alt = "";
    gambar.setAttribute("aria-hidden", "true");
    gambar.loading = "lazy";
    gambar.addEventListener("error", () => {
      gambar.hidden = true;
    }, { once: true });

    const rincian = elemen("div", "cart-item-detail");
    rincian.append(
      elemen("strong", "", item.nama),
      elemen("span", "", `${rupiah(item.harga)} × ${item.qty}`)
    );
    const kontrol = elemen("div", "quantity-controls");
    const kurang = elemen("button", "quantity-button", "−");
    kurang.type = "button";
    kurang.dataset.action = "decrease";
    kurang.dataset.kode = item.kode;
    kurang.disabled = item.qty <= 1;
    kurang.setAttribute("aria-label", `Kurangi jumlah ${item.nama}`);
    const jumlah = elemen("span", "quantity-value", String(item.qty));
    const tambah = elemen("button", "quantity-button", "+");
    tambah.type = "button";
    tambah.dataset.action = "increase";
    tambah.dataset.kode = item.kode;
    tambah.disabled = item.qty >= 99;
    tambah.setAttribute("aria-label", `Tambah jumlah ${item.nama}`);
    kontrol.append(kurang, jumlah, tambah);
    const hapus = elemen("button", "remove-button", "Hapus");
    hapus.type = "button";
    hapus.dataset.action = "remove";
    hapus.dataset.kode = item.kode;
    hapus.setAttribute("aria-label", `Hapus ${item.nama} dari keranjang`);
    baris.append(gambar, rincian, kontrol, hapus);
    elKeranjang.appendChild(baris);
  }

  const ringkasan = KasirLogic.hitungRingkasan(keranjang, elMember.checked);
  document.getElementById("subtotal").textContent = rupiah(ringkasan.subtotal);
  document.getElementById("diskon").textContent = "-" + rupiah(ringkasan.diskon);
  document.getElementById("ppn").textContent = rupiah(ringkasan.ppn);
  document.getElementById("total").textContent = rupiah(ringkasan.total);
}

function renderNominalCepat(total) {
  const pilihan = document.getElementById("nominal-cepat");
  pilihan.replaceChildren();
  for (const nominal of KasirLogic.nominalPembayaranCepat(total)) {
    const tombol = elemen("button", "quick-amount", rupiah(nominal));
    tombol.type = "button";
    tombol.dataset.nominal = nominal;
    pilihan.appendChild(tombol);
  }
}

function renderPembayaran() {
  const total = KasirLogic.hitungRingkasan(keranjang, elMember.checked).total;
  const dibayar = elBayar.value.trim() === "" ? NaN : Number(elBayar.value);
  const valid = Number.isSafeInteger(dibayar) && dibayar >= total;
  document.getElementById("kembalian").textContent =
    valid ? rupiah(dibayar - total) : rupiah(0);
  document.getElementById("tombol-bayar").disabled =
    Boolean(pesanKesalahanPenyimpanan) || keranjang.length === 0;
  renderNominalCepat(total);
}

function renderRiwayat() {
  const ringkasan = KasirLogic.hitungRingkasanPenjualan(transaksiTersimpan);
  document.getElementById("jumlah-transaksi").textContent = String(ringkasan.jumlahTransaksi);
  document.getElementById("total-penjualan").textContent = rupiah(ringkasan.totalPenjualan);
  const daftar = document.getElementById("riwayat-transaksi");
  daftar.replaceChildren();
  if (transaksiTersimpan.length === 0) {
    daftar.appendChild(elemen("p", "history-empty", "Belum ada transaksi tersimpan."));
    return;
  }
  for (const transaksi of transaksiTersimpan.slice(-5).reverse()) {
    const item = elemen("article", "history-item");
    const produk = Array.isArray(transaksi.items) ? transaksi.items : [];
    const waktu = new Date(transaksi.waktu);
    const labelWaktu = Number.isNaN(waktu.getTime()) ? "Waktu tidak tersedia" : waktu.toLocaleString("id-ID");
    const namaProduk = produk.map((barang) => `${barang.nama} × ${barang.qty}`).join(", ");
    item.append(
      elemen("div", "history-detail", `${labelWaktu} · ${namaProduk || "Rincian produk tidak tersedia"}`),
      elemen("strong", "", rupiah(transaksi.total))
    );
    daftar.appendChild(item);
  }
}

function render() {
  renderProduk();
  renderKeranjang();
  renderPembayaran();
  renderRiwayat();
}

function isiRincian(target, transaksi) {
  target.replaceChildren();
  const daftar = transaksi.items.map((item) => `${item.nama} × ${item.qty}`).join(", ");
  target.append(
    elemen("p", "", daftar),
    elemen("p", "", `Subtotal: ${rupiah(transaksi.subtotal)}`),
    elemen("p", "", `Diskon: -${rupiah(transaksi.diskon)}`),
    elemen("p", "", `PPN 11%: ${rupiah(transaksi.ppn)}`),
    elemen("p", "", `Total: ${rupiah(transaksi.total)}`),
    elemen("p", "", `Uang diterima: ${rupiah(transaksi.dibayar)}`),
    elemen("p", "", `Kembalian: ${rupiah(transaksi.kembalian)}`)
  );
}

function ajukanPembayaran() {
  try {
    transaksiMenunggu = KasirLogic.buatTransaksi(
      keranjang,
      Number(elBayar.value),
      elMember.checked
    );
    isiRincian(document.getElementById("ringkasan-konfirmasi"), transaksiMenunggu);
    document.getElementById("langkah-konfirmasi").hidden = false;
    document.getElementById("langkah-struk").hidden = true;
    elDialog.showModal();
  } catch (error) {
    tampilkanPesan(error.message, "error");
  }
}

function konfirmasiPembayaran() {
  if (!transaksiMenunggu) {
    tampilkanPesan("Tidak ada transaksi untuk dikonfirmasi.", "error");
    return;
  }
  try {
    const transaksiBaru = [...transaksiTersimpan, transaksiMenunggu];
    KasirTransaksi.simpanTransaksi(transaksiBaru);
    transaksiTersimpan = transaksiBaru;
    isiRincian(document.getElementById("rincian-struk"), transaksiMenunggu);
    transaksiMenunggu = null;
    keranjang = [];
    elBayar.value = "";
    elMember.checked = false;
    document.getElementById("langkah-konfirmasi").hidden = true;
    document.getElementById("langkah-struk").hidden = false;
    tampilkanPesan("Pembayaran berhasil dan transaksi tersimpan.", "success");
    render();
  } catch (error) {
    tampilkanPesan(`Transaksi tidak dapat disimpan: ${error.message}`, "error");
  }
}

elProduk.addEventListener("click", (event) => {
  const tombol = event.target.closest("[data-kode]");
  if (!tombol) return;
  try {
    KasirLogic.tambahItem(keranjang, tombol.dataset.kode);
    tampilkanPesan(`${KasirLogic.cariProduk(tombol.dataset.kode).nama} ditambahkan ke keranjang.`, "success");
    render();
  } catch (error) {
    tampilkanPesan(error.message, "error");
  }
});

elKeranjang.addEventListener("click", (event) => {
  const tombol = event.target.closest("[data-action]");
  if (!tombol) return;
  try {
    const item = keranjang.find((produk) => produk.kode === tombol.dataset.kode);
    if (tombol.dataset.action === "remove") {
      keranjang = KasirLogic.hapusItem(keranjang, tombol.dataset.kode);
    } else {
      const jumlah = item.qty + (tombol.dataset.action === "increase" ? 1 : -1);
      KasirLogic.ubahJumlah(keranjang, tombol.dataset.kode, jumlah);
    }
    render();
  } catch (error) {
    tampilkanPesan(error.message, "error");
  }
});

elPencarian.addEventListener("input", renderProduk);
elKategori.addEventListener("change", renderProduk);
elMember.addEventListener("change", () => {
  renderKeranjang();
  renderPembayaran();
});
elBayar.addEventListener("input", renderPembayaran);
document.getElementById("nominal-cepat").addEventListener("click", (event) => {
  const tombol = event.target.closest("[data-nominal]");
  if (!tombol) return;
  elBayar.value = tombol.dataset.nominal;
  renderPembayaran();
});
document.getElementById("form-pembayaran").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  ajukanPembayaran();
});
document.getElementById("konfirmasi-pembayaran").addEventListener("click", konfirmasiPembayaran);
document.getElementById("batal-konfirmasi").addEventListener("click", () => {
  transaksiMenunggu = null;
  elDialog.close();
});
document.getElementById("tutup-struk").addEventListener("click", () => elDialog.close());
document.getElementById("kosongkan-keranjang").addEventListener("click", () => {
  keranjang = [];
  elBayar.value = "";
  tampilkanPesan("Keranjang dikosongkan.", "success");
  render();
});
document.getElementById("tombol-baru").addEventListener("click", () => {
  keranjang = [];
  elBayar.value = "";
  elMember.checked = false;
  tampilkanPesan("Siap memulai transaksi baru.", "success");
  render();
});
elDialog.addEventListener("close", () => {
  transaksiMenunggu = null;
});

isiKategori();
try {
  transaksiTersimpan = KasirTransaksi.bacaTransaksi();
  KasirLogic.hitungRingkasanPenjualan(transaksiTersimpan);
} catch (error) {
  pesanKesalahanPenyimpanan = error.message;
  tampilkanPesan(`Riwayat transaksi tidak dapat dibaca: ${error.message}`, "error");
}
render();
