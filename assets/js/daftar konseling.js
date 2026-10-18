
// ================================
// DATA KONSELING
// ================================

const STORAGE_KEY = "sia_konseling_demo_v1";

const initialData = [
  {
    id: 1,
    topic: "Konsultasi Rencana Studi",
    lecturer: "Dosen Pembimbing Akademik",
    date: "2026-10-21",
    time: "09:00",
    description: "Diskusi pengambilan mata kuliah semester ini.",
    status: "Terjadwal"
  },
  {
    id: 2,
    topic: "Konsultasi Tugas Akhir",
    lecturer: "Dosen Pembimbing TA",
    date: "2026-10-15",
    time: "10:00",
    description: "Diskusi mengenai topik penelitian.",
    status: "Selesai"
  },
  {
    id: 3,
    topic: "Konsultasi Akademik",
    lecturer: "Dosen Pembimbing Akademik",
    date: "2026-10-25",
    time: "13:00",
    description: "Konsultasi mengenai perkembangan akademik.",
    status: "Menunggu"
  }
];

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.warn("Gagal membaca data konseling:", error);
  }

  return initialData.map(item => ({ ...item }));
}

let counselingData = loadData();

function saveData() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(counselingData)
    );
  } catch (error) {
    console.warn("Gagal menyimpan data konseling:", error);
    alert("Penyimpanan browser tidak tersedia.");
  }
}

// ================================
// DOM
// ================================

const $ = selector => document.querySelector(selector);

const tableBody = $("#counselingTableBody");
const searchInput = $("#searchCounseling");
const statusFilter = $("#statusFilter");

const formDialog = $("#formDialog");
const detailDialog = $("#detailDialog");
const counselingForm = $("#counselingForm");

function createElement(tag, className = "", text = "") {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = text;
  return el;
}

function formatDate(value) {
  if (!value) return "-";

  const parts = value.split("-").map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// ================================
// RINGKASAN
// ================================

function updateStats() {
  $("#totalCounseling").textContent = counselingData.length;

  $("#upcomingCounseling").textContent =
    counselingData.filter(item => {
      return item.status === "Terjadwal" &&
        `${item.date}T${item.time}` >=
        localDateTimeString();
    }).length;

  $("#completedCounseling").textContent =
    counselingData.filter(
      item => item.status === "Selesai"
    ).length;
}

function localDateTimeString() {
  const date = new Date();

  const local = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );

  return local.toISOString().slice(0, 16);
}

// ================================
// TAMPILKAN TABEL
// ================================

function renderTable() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;

  const filtered = counselingData
    .filter(item => {
      const matchesSearch =
        item.topic.toLowerCase().includes(query) ||
        item.lecturer.toLowerCase().includes(query);

      const matchesStatus =
        selectedStatus === "Semua" ||
        item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      return b.date.localeCompare(a.date);
    });

  tableBody.replaceChildren();

  if (filtered.length === 0) {
    const row = createElement("tr");
    const cell = createElement(
      "td",
      "konseling-empty",
      "Tidak ada data konseling yang ditemukan."
    );

    cell.colSpan = 6;
    row.appendChild(cell);
    tableBody.appendChild(row);
  }

  filtered.forEach((item, index) => {
    const row = createElement("tr");

    row.appendChild(
      createElement("td", "", String(index + 1))
    );

    row.appendChild(
      createElement("td", "konseling-topic", item.topic)
    );

    row.appendChild(
      createElement("td", "", item.lecturer)
    );

    row.appendChild(
      createElement(
        "td",
        "",
        `${formatDate(item.date)} • ${item.time}`
      )
    );

    const statusCell = createElement("td");
    const status = createElement(
      "span",
      `konseling-status ${item.status.toLowerCase()}`,
      item.status
    );

    statusCell.appendChild(status);
    row.appendChild(statusCell);

    const actionCell = createElement("td");
    const detailButton = createElement(
      "button",
      "konseling-detail-btn",
      "Detail"
    );

    detailButton.type = "button";

    detailButton.addEventListener("click", () => {
      showDetail(item);
    });

    actionCell.appendChild(detailButton);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });

  $("#counselingCount").textContent =
    `Menampilkan ${filtered.length} dari ` +
    `${counselingData.length} konseling`;

  updateStats();
}

// ================================
// DETAIL KONSELING
// ================================

function showDetail(item) {
  const container = $("#counselingDetail");
  container.replaceChildren();

  const fields = [
    ["Topik", item.topic],
    ["Dosen Pembimbing", item.lecturer],
    ["Tanggal", formatDate(item.date)],
    ["Waktu", item.time],
    ["Status", item.status],
    ["Keterangan", item.description]
  ];

  fields.forEach(([label, value]) => {
    const row = createElement("div", "konseling-detail-row");

    row.appendChild(createElement("span", "", label));
    row.appendChild(createElement("strong", "", value));

    container.appendChild(row);
  });

  detailDialog.showModal();
}

// ================================
// FORM PENGAJUAN
// ================================

$("#addCounseling").addEventListener("click", () => {
  counselingForm.reset();
  $("#date").min = localDateTimeString().slice(0, 10);
  formDialog.showModal();
});

counselingForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!counselingForm.reportValidity()) return;

  const topic = $("#topic").value.trim();
  const lecturer = $("#lecturer").value.trim();
  const date = $("#date").value;
  const time = $("#time").value;
  const description = $("#description").value.trim();

  if (!topic || !lecturer || !date || !time || !description) {
    alert("Semua kolom wajib diisi.");
    return;
  }

  if (`${date}T${time}` < localDateTimeString()) {
    alert("Pilih tanggal dan waktu yang belum berlalu.");
    return;
  }

  const newCounseling = {
    id: Date.now(),
    topic,
    lecturer,
    date,
    time,
    description,
    status: "Menunggu"
  };

  counselingData.push(newCounseling);

  saveData();
  renderTable();

  formDialog.close();
  counselingForm.reset();

  alert("Pengajuan konseling berhasil ditambahkan ke prototype.");
});

// ================================
// MODAL CLOSE
// ================================

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(
      button.dataset.close
    );

    if (dialog) dialog.close();
  });
});

// ================================
// FILTER
// ================================

searchInput.addEventListener("input", renderTable);
statusFilter.addEventListener("change", renderTable);

// ================================
// SIDEBAR MOBILE
// ================================

const sidebar = $("#sidebar");
const menuButton = $("#menuButton");

menuButton.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});

// ================================
// INITIALIZE
// ================================

renderTable();
