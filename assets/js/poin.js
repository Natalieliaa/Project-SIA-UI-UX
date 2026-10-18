
// =====================================
// DATA POIN KEMAHASISWAAN
// =====================================

// Contoh data dari screenshot SIA asli.
// Y = terverifikasi
// N = belum diverifikasi

const poinData = [
  {
    id: 1,
    category: "FCH 4 - Global Competence",
    type: "Kepanitiaan",
    role: "Anggota Panitia tingkat Fakultas/Jurusan/Prodi lebih dari tiga bulan",
    points: 15,
    verified: false
  },
  {
    id: 2,
    category: "Seminar, Pelatihan, Lokakarya",
    type: "Seminar, Pelatihan, Lokakarya",
    role: "Peserta di tingkat internasional",
    points: 15,
    verified: false
  },
  {
    id: 3,
    category: "FCH 4 - Global Competence",
    type: "Kepanitiaan",
    role: "Koordinator Seksi/Divisi tingkat Fakultas/Jurusan/Prodi lebih dari tiga bulan",
    points: 20,
    verified: false
  },
  {
    id: 4,
    category: "FCH 4 - Global Competence",
    type: "Kepanitiaan",
    role: "Koordinator Seksi/Divisi tingkat Fakultas/Jurusan/Prodi lebih dari tiga bulan",
    points: 20,
    verified: true
  },
  {
    id: 5,
    category: "FCH 2 - Local & Global Citizenship",
    type: "FCH 2 - Local & Global Citizenship",
    role: "Peserta kegiatan Local & Global Citizenship",
    points: 5,
    verified: true
  },
  {
    id: 6,
    category: "FCH 1 - Integral Personality Development",
    type: "FCH 1 - Integral Personality Development",
    role: "Peserta kegiatan Integral Personality Development",
    points: 5,
    verified: true
  },
  {
    id: 7,
    category: "INISADHA",
    type: "Inisiasi Universitas",
    role: "Peserta Inisiasi Universitas (INSADHA)",
    points: 0,
    verified: true
  },
  {
    id: 8,
    category: "FCH 4 - Global Competence",
    type: "Kepanitiaan",
    role: "Anggota Panitia tingkat Fakultas/Jurusan/Prodi satu sampai tiga bulan",
    points: 10,
    verified: true
  },
  {
    id: 9,
    category: "FCH 4 - Global Competence",
    type: "Kepanitiaan",
    role: "Koordinator Seksi/Divisi tingkat Fakultas/Jurusan/Prodi satu sampai tiga bulan",
    points: 15,
    verified: true
  },
  {
    id: 10,
    category: "FCH 3 - Self-Actualization",
    type: "Gelar Gagasan Kritis",
    role: "Peserta Gelar Gagasan Kritis (GiSi - Get It Share It!)",
    points: 5,
    verified: true
  }
];

// Status persyaratan wajib dari screenshot
const requiredActivities = [
  { name: "INISADHA", completed: true },
  { name: "FCH 1", completed: true },
  { name: "FCH 2", completed: true },
  { name: "FCH 3", completed: true },
  { name: "FCH 4", completed: true }
];

// =====================================
// ELEMENT DOM
// =====================================

const $ = selector => document.querySelector(selector);

const categoryFilter = $("#categoryFilter");
const typeFilter = $("#typeFilter");
const roleFilter = $("#roleFilter");
const searchInput = $("#searchPoin");

const tableBody = $("#poinTableBody");
const dialog = $("#poinDialog");
const detailContainer = $("#poinDetail");

function createElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

// =====================================
// PERHITUNGAN TOTAL POIN
// =====================================

function calculateStats() {
  const total = poinData.reduce(
    (sum, item) => sum + item.points, 0
  );

  const verified = poinData
    .filter(item => item.verified)
    .reduce((sum, item) => sum + item.points, 0);

  const pending = poinData
    .filter(item => !item.verified)
    .reduce((sum, item) => sum + item.points, 0);

  $("#totalPoints").textContent = total;
  $("#verifiedPoints").textContent = verified;
  $("#pendingPoints").textContent = pending;
}

// =====================================
// FILTER DROPDOWN
// =====================================

function setOptions(select, values, defaultLabel) {
  const previousValue = select.value;
  select.replaceChildren();

  const allOption = createElement(
    "option",
    "",
    defaultLabel
  );
  allOption.value = "";
  select.appendChild(allOption);

  const uniqueValues = [...new Set(values)].sort();

  uniqueValues.forEach(value => {
    const option = createElement("option", "", value);
    option.value = value;
    select.appendChild(option);
  });

  if (uniqueValues.includes(previousValue)) {
    select.value = previousValue;
  }
}

function updateCategoryOptions() {
  setOptions(
    categoryFilter,
    poinData.map(item => item.category),
    "Semua Kategori"
  );
}

function updateTypeOptions() {
  const items = poinData.filter(item =>
    !categoryFilter.value ||
    item.category === categoryFilter.value
  );

  setOptions(
    typeFilter,
    items.map(item => item.type),
    "Semua Jenis"
  );
}

function updateRoleOptions() {
  const items = poinData.filter(item =>
    (!categoryFilter.value ||
      item.category === categoryFilter.value) &&
    (!typeFilter.value ||
      item.type === typeFilter.value)
  );

  setOptions(
    roleFilter,
    items.map(item => item.role),
    "Semua Peran"
  );
}

// =====================================
// PENCARIAN
// =====================================

function getFilteredData() {
  const category = categoryFilter.value;
  const type = typeFilter.value;
  const role = roleFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  return poinData.filter(item => {
    const matchesCategory =
      !category || item.category === category;

    const matchesType =
      !type || item.type === type;

    const matchesRole =
      !role || item.role === role;

    const matchesSearch =
      !query ||
      item.category.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.role.toLowerCase().includes(query);

    return (
      matchesCategory &&
      matchesType &&
      matchesRole &&
      matchesSearch
    );
  });
}

// =====================================
// RENDER TABEL
// =====================================

function renderTable(items) {
  tableBody.replaceChildren();

  if (items.length === 0) {
    const row = createElement("tr");
    const cell = createElement(
      "td",
      "poin-empty",
      "Tidak ada kegiatan yang sesuai dengan pencarian."
    );

    cell.colSpan = 7;
    row.appendChild(cell);
    tableBody.appendChild(row);
  }

  items.forEach((item, index) => {
    const row = createElement("tr");

    row.appendChild(
      createElement("td", "", String(index + 1))
    );

    row.appendChild(
      createElement("td", "poin-category", item.category)
    );

    row.appendChild(
      createElement("td", "", item.type)
    );

    row.appendChild(
      createElement("td", "poin-role", item.role)
    );

    row.appendChild(
      createElement("td", "poin-number", String(item.points))
    );

    const statusCell = createElement("td");

    statusCell.appendChild(
      createElement(
        "span",
        item.verified
          ? "poin-status verified"
          : "poin-status pending",
        item.verified ? "Terverifikasi" : "Menunggu"
      )
    );

    row.appendChild(statusCell);

    const actionCell = createElement("td");

    const button = createElement(
      "button",
      "poin-detail-btn",
      "Detail"
    );
    button.type = "button";

    button.addEventListener("click", () => {
      showDetail(item);
    });

    actionCell.appendChild(button);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });

  const displayedPoints = items.reduce(
    (sum, item) => sum + item.points, 0
  );

  $("#activityCount").textContent =
    `${items.length} Kegiatan`;

  $("#tableInfo").textContent =
    `Menampilkan ${items.length} dari ${poinData.length} kegiatan`;

  $("#filteredPoints").textContent =
    `${displayedPoints} poin ditampilkan`;
}

// =====================================
// RENDER KEGIATAN WAJIB
// =====================================

function renderRequiredActivities() {
  const container = $("#requiredList");
  container.replaceChildren();

  requiredActivities.forEach(item => {
    const card = createElement(
      "article",
      "poin-required-item"
    );

    const icon = createElement(
      "span",
      "poin-required-icon",
      item.completed ? "✓" : "!"
    );

    const name = createElement(
      "strong",
      "",
      item.name
    );

    const status = createElement(
      "small",
      "",
      item.completed ? "SUDAH" : "BELUM"
    );

    card.append(icon, name, status);
    container.appendChild(card);
  });

  const completed = requiredActivities.filter(
    item => item.completed
  ).length;

  $("#requiredCount").textContent =
    `${completed}/${requiredActivities.length} Terpenuhi`;
}

// =====================================
// MODAL DETAIL
// =====================================

function showDetail(item) {
  detailContainer.replaceChildren();

  const fields = [
    ["Kategori", item.category],
    ["Jenis", item.type],
    ["Peran", item.role],
    ["Jumlah Poin", `${item.points} Poin`],
    [
      "Status Verifikasi",
      item.verified ? "Terverifikasi" : "Belum Diverifikasi"
    ]
  ];

  fields.forEach(([label, value]) => {
    const row = createElement("div", "poin-detail-row");

    row.appendChild(createElement("span", "", label));
    row.appendChild(createElement("strong", "", value));

    detailContainer.appendChild(row);
  });

  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

$("#closePoinDialog").addEventListener("click", closeDialog);
$("#closePoinDialogFooter").addEventListener("click", closeDialog);

// =====================================
// EVENT LISTENERS
// =====================================

$("#poinFilterForm").addEventListener("submit", event => {
  event.preventDefault();
  renderTable(getFilteredData());
});

$("#resetPoin").addEventListener("click", () => {
  searchInput.value = "";

  categoryFilter.value = "";
  updateTypeOptions();

  typeFilter.value = "";
  updateRoleOptions();

  roleFilter.value = "";

  renderTable(poinData);
});

categoryFilter.addEventListener("change", () => {
  updateTypeOptions();
  updateRoleOptions();
});

typeFilter.addEventListener("change", () => {
  updateRoleOptions();
});

// =====================================
// SIDEBAR MOBILE
// =====================================

const sidebar = $("#sidebar");
const menuButton = $("#menuButton");

menuButton.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});

// =====================================
// INITIALIZE
// =====================================

updateCategoryOptions();
updateTypeOptions();
updateRoleOptions();

calculateStats();
renderRequiredActivities();
renderTable(poinData);
