
// ========================================
// DATA JUDUL TUGAS AKHIR
// ========================================

// Data contoh diambil dari screenshot SIA.
// Bukan database resmi dan belum terhubung API.

const titles = [
  {
    nim: "135314089",
    name: "FREDERICUS AWAN GEMILANG",
    prodi: "Informatika",
    title: "PREDIKSI HARGA PENUTUPAN SAHAM MENGGUNAKAN FUZZY TIME SERIES"
  },
  {
    nim: "205314066",
    name: "NAURAH PERONIKA",
    prodi: "Informatika",
    title: "METODE FUZZY TIME SERIES UNTUK MEMPREDIKSI PERGERAKAN HARGA SAHAM"
  },
  {
    nim: "215314057",
    name: "SEPTIAN RENDY PADANGOAN",
    prodi: "Informatika",
    title: "IDENTIFIKASI TREND MENGGUNAKAN PENDEKATAN MULTIVARIATE TIME SERIES: STUDI PERBANDINGAN TRANSFORMER ENCODER ONLY DENGAN MODEL RECURRENT DAN VARIANT TRANSFORMER"
  },
  {
    nim: "215314087",
    name: "LUSIA JULIANA SILABAN",
    prodi: "Informatika",
    title: "MULTIVARIATE TIME SERIES FORECASTING MENGGUNAKAN METODE LONG-SHORT TERM MEMORY-CONVOLUTIONAL NEURAL NETWORK PADA PRODUKTIVITAS PADI DI JAWA BARAT"
  },
  {
    nim: "215314158",
    name: "VICTORIA ALYSHA FERNANDO SUWARTO",
    prodi: "Informatika",
    title: 'LONG SHORT-TERM MEMORY UNTUK PREDIKSI DATA TIME SERIES (STUDI KASUS: PERMINTAAN BAKPAO TOKO "XYZ")'
  },
  {
    nim: "215314201",
    name: "MARIA YOHANESIA TAI",
    prodi: "Informatika",
    title: "PREDIKSI MULTI-STEP AHEAD PADA MULTIVARIATE TIME SERIES MENGGUNAKAN FEATURES EXTRACTION DAN ENCODER-ONLY"
  }
];

// ========================================
// DOM
// ========================================

const $ = selector => document.querySelector(selector);

const searchForm = $("#searchForm");
const keywordInput = $("#keywordInput");
const prodiFilter = $("#prodiFilter");
const tableBody = $("#judulTableBody");
const dialog = $("#judulDialog");
const detailContainer = $("#judulDetail");

const PAGE_SIZE = 5;

let currentPage = 1;
let filteredTitles = [];

function createElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

// ========================================
// PENCARIAN
// ========================================

function searchTitles() {
  const keyword = keywordInput.value.trim().toLowerCase();
  const prodi = prodiFilter.value;

  if (keyword === "") {
    filteredTitles = [];
    currentPage = 1;
    renderTable();
    return;
  }

  filteredTitles = titles.filter(item => {
    const matchesProdi =
      prodi === "Semua" || item.prodi === prodi;

    const matchesKeyword =
      item.title.toLowerCase().includes(keyword) ||
      item.name.toLowerCase().includes(keyword) ||
      item.nim.includes(keyword);

    return matchesProdi && matchesKeyword;
  });

  currentPage = 1;
  renderTable();
}

// ========================================
// TABEL DAN PAGINATION
// ========================================

function renderTable() {
  tableBody.replaceChildren();

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTitles.length / PAGE_SIZE)
  );

  currentPage = Math.min(currentPage, totalPages);

  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filteredTitles.slice(
    start,
    start + PAGE_SIZE
  );

  if (visible.length === 0) {
    const row = createElement("tr");

    const message = keywordInput.value.trim() === ""
      ? "🔍 Masukkan kata kunci lalu klik Cari Judul untuk menampilkan hasil."
      : "Tidak ditemukan judul tugas akhir yang sesuai.";

    const cell = createElement("td", "judulta-empty", message);

    cell.colSpan = 5;
    row.appendChild(cell);
    tableBody.appendChild(row);
  }

  visible.forEach((item, index) => {
    const row = createElement("tr");

    row.appendChild(
      createElement("td", "", String(start + index + 1))
    );

    row.appendChild(
      createElement("td", "judulta-nim", item.nim)
    );

    row.appendChild(
      createElement("td", "judulta-name", item.name)
    );

    row.appendChild(
      createElement("td", "judulta-title", item.title)
    );

    const actionCell = createElement("td");
    const button = createElement(
      "button",
      "judulta-detail-btn",
      "Detail"
    );

    button.type = "button";
    button.addEventListener("click", () => showDetail(item));

    actionCell.appendChild(button);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });

  $("#totalTitles").textContent = titles.length;
  $("#searchResults").textContent = filteredTitles.length;

  $("#resultCount").textContent =
    `${filteredTitles.length} Judul`;

  $("#tableSummary").textContent =
    `Menampilkan ${visible.length} dari ` +
    `${filteredTitles.length} judul`;

  $("#pageInfo").textContent =
    `${currentPage} / ${totalPages}`;

  $("#prevPage").disabled = currentPage === 1;
  $("#nextPage").disabled = currentPage === totalPages;
}

function showDetail(item) {
  detailContainer.replaceChildren();

  const fields = [
    ["NIM", item.nim],
    ["Nama Mahasiswa", item.name],
    ["Program Studi", item.prodi],
    ["Judul Tugas Akhir", item.title]
  ];

  fields.forEach(([label, value]) => {
    const row = createElement("div", "judulta-detail-row");

    row.appendChild(createElement("span", "", label));
    row.appendChild(createElement("strong", "", value));

    detailContainer.appendChild(row);
  });

  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

$("#closeDialog").addEventListener("click", closeDialog);
$("#closeDialogFooter").addEventListener("click", closeDialog);

// ========================================
// EVENT LISTENER
// ========================================

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  searchTitles();
});

document.getElementById("resetSearch")
  .addEventListener("click", () => {
    keywordInput.value = "";
    prodiFilter.value = "Informatika";

    filteredTitles = [];
    currentPage = 1;

    renderTable();
  });


$("#prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderTable();
  }
});

$("#nextPage").addEventListener("click", () => {
  if (currentPage * PAGE_SIZE < filteredTitles.length) {
    currentPage += 1;
    renderTable();
  }
});

// ========================================
// SIDEBAR MOBILE
// ========================================

const sidebar = $("#sidebar");
const menuButton = $("#menuButton");

menuButton.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

keywordInput.value = "";
filteredTitles = [];
currentPage = 1;

renderTable();
