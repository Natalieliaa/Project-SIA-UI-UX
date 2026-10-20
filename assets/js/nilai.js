
// ======================================
// DATA NILAI AKADEMIK
// ======================================

const academicSummary = {
  ipk: 3.01,
  totalCredits: 129,
  passedCredits: 119
};

// Format course:
// [kode, nama, sks, nilai, REPA, REPK]

const semesters = [
  {
    number: 1,
    period: "2023/2024 Gasal",
    ips: 2.99,
    sks: 20,
    courses: [
      ["PPKMB 001", "Pendampingan Mahasiswa Baru 1", 0, null, null, null],
      ["MATE101", "Logika Matematika", 2, "B-", null, null],
      ["INFO103", "Informatika dan Dampak Sosialnya", 2, "B+", null, null],
      ["MATE102", "Matematika Diskret", 3, "C", null, null],
      ["INFO102", "Sistem Digital", 2, "C+", null, null],
      ["INFO101", "Algoritma dan Pemrograman", 3, "B-", null, null],
      ["TEOL 101", "Pendidikan Agama", 2, "A", 3.71, 3.39],
      ["BIND 101", "Bahasa Indonesia", 3, "A-", 3.53, 3.31],
      ["BING 101", "Bahasa Inggris", 3, "B+", 3.47, 3.52]
    ]
  },
  {
    number: 2,
    period: "2023/2024 Genap",
    ips: 3.09,
    sks: 21,
    courses: [
      ["MATE103", "Kalkulus", 3, "A-", 2.88, 2.92],
      ["INFO105", "Pemrograman Berorientasi Objek", 3, "B", 3.00, 3.52],
      ["PPKMB002", "Pendampingan Mahasiswa Baru 2", 0, null, 3.00, 3.32],
      ["INFO107", "Dasar Komputer dan Sistem Operasi", 3, "B+", 3.00, 3.34],
      ["INFO106", "Pemrograman Analisis Data", 2, "A", 3.00, 3.10],
      ["INFO108", "Dasar Komunikasi Komputer dan Jaringan", 2, "B", 3.00, 3.22],
      ["MATE104", "Statistika dan Probabilitas", 3, "A", 3.00, 3.33],
      ["INFO104", "Struktur Data Linier", 3, "C+", 3.00, 3.39],
      ["FITE 107", "Teologi Moral", 2, "D", 2.00, 3.14]
    ]
  },
  {
    number: 3,
    period: "2024/2025 Gasal",
    ips: 3.19,
    sks: 23,
    courses: [
      ["INFO109", "Struktur Data Non Linier", 3, "A-", 4.00, 3.40],
      ["INFO110", "Pemrograman Berorientasi Objek Lanjut", 3, "C+", 3.00, 2.83],
      ["INFO111", "Sistem Cerdas", 3, "B+", 3.00, 3.26],
      ["MATE105", "Aljabar Linier", 3, "A-", 3.00, 3.31],
      ["INFO112", "Internet dan Aplikasinya", 3, "B", 3.00, 3.27],
      ["RPLN102", "Bahasa Query", 1, "B+", 3.00, 3.31],
      ["RPLN101", "Konsep dan Desain Basis Data", 3, "B-", 3.00, 3.47],
      ["KEBN 102", "Pendidikan Kewarganegaraan", 2, "A", 3.00, 3.26],
      ["KEBN 101", "Pendidikan Pancasila", 2, "B", 3.59, 3.24]
    ]
  },
  {
    number: 4,
    period: "2024/2025 Genap",
    ips: 3.67,
    sks: 18,
    courses: [
      ["INFO113", "Analisis dan Strategi Algoritma", 3, "B", 3.00, 3.27],
      ["INFO116", "Manajemen Informasi", 2, "A", 3.00, 3.26],
      ["INFO114", "Komputasi Paralel dan Terdistribusi", 2, "A", 4.00, 3.27],
      ["RPLN105", "Interaksi Manusia dan Komputer", 2, "A", 4.00, 3.44],
      ["RPLN103", "Pemrograman Berbasis Platform", 3, "B+", 4.00, 3.27],
      ["INFO115", "Pembelajaran Mesin", 3, "A-", 3.00, 3.24],
      ["RPLN104", "Rekayasa Perangkat Lunak", 3, "A", 4.00, 3.39],
      ["WPSB 042", "Workshop Pengembangan Sarana Pembelajaran Biologi", 2, null, 3.00, 3.26]
    ]
  },
  {
    number: 5,
    period: "2025/2026 Gasal",
    ips: 2.45,
    sks: 24,
    courses: [
      ["KEWR101", "Kewirausahaan", 2, "B+", 3.00, 3.27],
      ["KBTE 053", "Kajian Budidaya Tumbuhan Eksotis", 2, "E", 2.00, 3.50],
      ["INFO118", "Proyek Informatika", 2, "B", 3.00, 3.44],
      ["INTS209", "Gudang Data", 3, "E", 1.00, 2.99],
      ["INTS202", "Pemerolehan Informasi", 3, "B+", 3.00, 3.38],
      ["INTS201", "Penambangan Data", 3, "A-", 3.00, 3.64],
      ["SDEV204", "Algoritma Optimisasi", 3, "B-", 2.00, 3.26],
      ["INFO117", "Kriptografi", 3, "C", 3.00, 3.32],
      ["SDEV203", "Sistem Pendukung Pengambilan Keputusan", 3, "A-", 3.00, 3.40]
    ]
  },
  {
    number: 6,
    period: "2025/2026 Genap",
    ips: 2.86,
    sks: 21,
    courses: [
      ["COM 543", "Augmented Reality", 3, "B-", 3.00, 3.45],
      ["STDL101", "Kuliah Kerja Nyata", 3, "A", 3.00, 3.27],
      ["INTS110", "Sistem Rekomendasi", 3, "C+", 3.00, 3.47],
      ["INTS204", "Pemrosesan Bahasa Alami (NLP)", 3, "B", 3.00, 3.35],
      ["INMA109", "Analisis Proses Bisnis", 3, "A", 4.00, 3.28],
      ["INTS203", "Pemrosesan Citra", 3, "A", 3.00, 3.54],
      ["INMA108", "Kecerdasan Bisnis", 3, "E", 3.00, 3.52]
    ]
  },
  {
    number: 7,
    period: "2026/2027 Gasal",
    ips: 0.00,
    sks: 0,
    courses: [
      ["INTS205", "Komputer Pelihat", 3, null, null, null],
      ["SDEV207", "Desain UI/UX", 3, null, null, null],
      ["MATS31W", "Metode Numerik", 2, null, null, null],
      ["GEAI51P", "AI Generatif", 3, null, null, null],
      ["PENL101", "Metodologi Penelitian", 4, null, null, null],
      ["MATS21W", "Probabilitas Lanjut", 2, null, null, null],
      ["NUTR054", "Neutrasetika", 2, null, null, null],
      ["GRLE51P", "Pembelajaran Mesin Berbasis Graph", 3, null, null, null]
    ]
  }
];

// ======================================
// DOM & HELPERS
// ======================================

const $ = selector => document.querySelector(selector);

const semesterTabs = $("#semesterTabs");
const nilaiTableBody = $("#nilaiTableBody");
const dialog = $("#nilaiDialog");

let currentSemester = 1;

function createElement(tag, className = "", text = "") {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = text;
  return node;
}

function formatNumber(value) {
  return value === null || value === undefined
    ? "—"
    : Number(value).toFixed(2);
}

function getSemester(number) {
  return semesters.find(item => item.number === number);
}

function gradeClass(grade) {
  if (grade === null) return "pending";

  if (["A", "A-", "B+"].includes(grade)) {
    return "high";
  }

  if (["B", "B-", "C+"].includes(grade)) {
    return "medium";
  }

  return "low";
}

// ======================================
// SUMMARY
// ======================================

function renderSummary() {
  $("#ipkValue").textContent =
    formatNumber(academicSummary.ipk);

  $("#totalCredits").textContent =
    academicSummary.totalCredits;

  $("#passedCredits").textContent =
    academicSummary.passedCredits;
}

// ======================================
// SEMESTER TABS
// ======================================

function renderTabs() {
  semesterTabs.replaceChildren();

  semesters.forEach(semester => {
    const button = createElement(
      "button",
      "nilai-semester-btn",
      `Semester ${semester.number}`
    );

    button.type = "button";

    const isActive = semester.number === currentSemester;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));

    button.addEventListener("click", () => {
      currentSemester = semester.number;
      renderTabs();
      renderSemester();
    });

    semesterTabs.appendChild(button);
  });
}

// ======================================
// SURVEI DAN EVALUASI
// ======================================

function showMessage(type, course) {
  $("#dialogTitle").textContent = type;

  $("#dialogMessage").textContent =
    `Fitur ${type} untuk mata kuliah "${course}" ` +
    "belum terhubung dengan sistem kampus. " +
    "Ini merupakan simulasi interaksi untuk tugas UI/UX.";

  dialog.showModal();
}

$("#closeDialog").addEventListener("click", () => {
  dialog.close();
});

$("#closeDialogFooter").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    dialog.close();
  }
});

// ======================================
// TABLE
// ======================================

function createActionCell(type, courseName) {
  const cell = createElement("td");

  const button = createElement(
    "button",
    "nilai-action",
    "Isi →"
  );

  button.type = "button";

  button.addEventListener("click", () => {
    showMessage(type, courseName);
  });

  cell.appendChild(button);
  return cell;
}

function renderSemester() {
  const semester = getSemester(currentSemester);

  $("#selectedSemester").textContent =
    `Semester ${semester.number}`;

  $("#selectedPeriod").textContent = semester.period;

  $("#selectedIPS").textContent =
    formatNumber(semester.ips);

  $("#selectedSKS").textContent =
    semester.sks ?? "—";

  nilaiTableBody.replaceChildren();

  if (semester.courses.length === 0) {
    const row = createElement("tr");
    const cell = createElement(
      "td",
      "nilai-empty",
      "Data nilai semester ini belum tersedia pada prototype."
    );

    cell.colSpan = 8;
    row.appendChild(cell);
    nilaiTableBody.appendChild(row);

    $("#tableInfo").textContent =
      "Belum ada data mata kuliah";

    $("#footerSKS").textContent =
      "Total SKS: —";

    return;
  }

  semester.courses.forEach(course => {
    const [code, name, sks, grade, repa, repk] = course;

    const row = createElement("tr");

    row.appendChild(
      createElement("td", "nilai-code", code)
    );

    row.appendChild(
      createElement("td", "nilai-course-name", name)
    );

    row.appendChild(
      createElement("td", "", String(sks))
    );

    const gradeCell = createElement("td");
    gradeCell.appendChild(
      createElement(
        "span",
        `nilai-grade ${gradeClass(grade)}`,
        grade ?? "—"
      )
    );

    row.appendChild(gradeCell);

    row.appendChild(createActionCell("SWTS", name));
    row.appendChild(createActionCell("Evaluasi", name));

    row.appendChild(
      createElement("td", "", formatNumber(repa))
    );

    row.appendChild(
      createElement("td", "", formatNumber(repk))
    );

    nilaiTableBody.appendChild(row);
  });

  $("#tableInfo").textContent =
    `${semester.courses.length} mata kuliah terdaftar`;

  $("#footerSKS").textContent =
    `Total SKS: ${semester.sks ?? "—"}`;
}

// ======================================
// GRAFIK IPS SVG
// ======================================

function svgNode(tag, attributes = {}, text = "") {
  const node = document.createElementNS(
    "http://www.w3.org/2000/svg",
    tag
  );

  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, String(value));
  });

  if (text) node.textContent = text;

  return node;
}

function renderChart() {
  const chart = $("#ipsChart");
  chart.replaceChildren();

  const data = semesters.filter(
    semester => typeof semester.ips === "number"
  );

  if (data.length === 0) {
    chart.textContent = "Belum ada data IPS.";
    return;
  }

  const width = 800;
  const height = 260;

  const left = 55;
  const right = 30;
  const top = 30;
  const bottom = 55;

  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  const minValue = 0;
  const maxValue = 4;

  const svg = svgNode("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": "Grafik IPS semester 1 hingga 3",
    preserveAspectRatio: "xMidYMid meet"
  });

  // Garis horizontal dan label
  [0, 1, 2, 3, 4].forEach(value => {
    const y = top +
      ((maxValue - value) / (maxValue - minValue)) *
      plotHeight;

    svg.appendChild(svgNode("line", {
      x1: left,
      y1: y,
      x2: width - right,
      y2: y,
      stroke: "#e2e8f0",
      "stroke-width": 1
    }));

    svg.appendChild(svgNode("text", {
      x: left - 12,
      y: y + 4,
      fill: "#64748b",
      "font-size": 12,
      "text-anchor": "end"
    }, value.toFixed(1)));
  });

  // Gunakan posisi semester sebenarnya.
  const xFor = number =>
    left + ((number - 1) / 7) * plotWidth;

  const yFor = ips =>
    top + ((maxValue - ips) / 4) * plotHeight;

  const points = data.map(item => ({
    x: xFor(item.number),
    y: yFor(item.ips),
    item
  }));

  const linePoints = points
    .map(point => `${point.x},${point.y}`)
    .join(" ");

  svg.appendChild(svgNode("polyline", {
    points: linePoints,
    fill: "none",
    stroke: "#2563eb",
    "stroke-width": 3,
    "stroke-linejoin": "round",
    "stroke-linecap": "round"
  }));

  // Label sumbu semester
  semesters.forEach(item => {
    svg.appendChild(svgNode("text", {
      x: xFor(item.number),
      y: height - 22,
      fill: "#64748b",
      "font-size": 12,
      "text-anchor": "middle"
    }, `S${item.number}`));
  });

  // Titik IPS
  points.forEach(point => {
    svg.appendChild(svgNode("circle", {
      cx: point.x,
      cy: point.y,
      r: 6,
      fill: "#2563eb",
      stroke: "#ffffff",
      "stroke-width": 2
    }));

    svg.appendChild(svgNode("text", {
      x: point.x,
      y: point.y - 15,
      fill: "#172554",
      "font-size": 13,
      "font-weight": "bold",
      "text-anchor": "middle"
    }, formatNumber(point.item.ips)));
  });

  chart.appendChild(svg);

  $("#chartNote").textContent =
    "Grafik menampilkan rekap semester dari data";
}

// ======================================
// PRINT
// ======================================

$("#printNilai").addEventListener("click", () => {
  window.print();
});

// ======================================
// SIDEBAR MOBILE
// ======================================

const sidebar = $("#sidebar");
const menuButton = $("#menuButton");

menuButton.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});

// ======================================
// INITIALIZE
// ======================================

renderSummary();
renderTabs();
renderSemester();
renderChart();