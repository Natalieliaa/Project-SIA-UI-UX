const studyData = {
  "2026-gasal": {
    label: "Semester Gasal 2026/2027",
    courses: [
      {
        code: "MATS21W",
        name: "Probabilitas Lanjut",
        sks: 2,
        className: "B",
        lecturer: "Dosen Pengampu",
        status: "Disetujui"
      },
      {
        code: "NUTR054",
        name: "Neurasetika",
        sks: 2,
        className: "A",
        lecturer: "Dosen Pengampu",
        status: "Disetujui"
      },
      {
        code: "SDEV207",
        name: "Desain UI/UX",
        sks: 3,
        className: "A",
        lecturer: "Dosen Pengampu",
        status: "Disetujui"
      },
      {
        code: "GRLE51P",
        name: "PMBG",
        sks: 3,
        className: "A",
        lecturer: "Dosen Pengampu",
        status: "Disetujui"
      },
      {
        code: "MATS31W",
        name: "Metode Numerik",
        sks: 2,
        className: "A",
        lecturer: "Dosen Pengampu",
        status: "Disetujui"
      },
      {
        code: "GEA151P",
        name: "AI Generatif",
        sks: 3,
        className: "A",
        lecturer: "Dosen Pengampu",
        status: "Menunggu"
      },
      {
        code: "PENL101",
        name: "Metodologi Penelitian",
        sks: 2,
        className: "B",
        lecturer: "Dosen Pengampu",
        status: "Disetujui"
      },
      {
        code: "INTS205",
        name: "Computer Vision",
        sks: 3,
        className: "B",
        lecturer: "Dosen Pengampu",
        status: "Menunggu"
      }
    ]
  },

  "2025-genap": {
    label: "Semester Genap 2025/2026",
    courses: [
      {
        code: "IF201",
        name: "Basis Data",
        sks: 3,
        className: "A",
        lecturer: "Dosen Pengampu",
        status: "Disetujui"
      },
      {
        code: "IF202",
        name: "Rekayasa Perangkat Lunak",
        sks: 3,
        className: "A",
        lecturer: "Dosen Pengampu",
        status: "Disetujui"
      }
    ]
  },

  "2025-gasal": {
    label: "Semester Gasal 2025/2026",
    courses: [
      {
        code: "IF101",
        name: "Pemrograman Web",
        sks: 3,
        className: "A",
        lecturer: "Dosen Pengampu",
        status: "Disetujui"
      },
      {
        code: "IF102",
        name: "Struktur Data",
        sks: 3,
        className: "B",
        lecturer: "Dosen Pengampu",
        status: "Disetujui"
      }
    ]
  }
};

// ========================================
// AMBIL ELEMENT
// ========================================

const $ = (selector) => document.querySelector(selector);

const semesterFilter = $("#semesterFilter");
const courseSearch = $("#courseSearch");
const courseTableBody = $("#courseTableBody");
const courseDialog = $("#courseDialog");
const courseDetail = $("#courseDetail");

function element(tag, className = "", text = "") {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = text;
  return el;
}

function selectedSemester() {
  return studyData[semesterFilter.value];
}

// ========================================
// RENDER DATA
// ========================================

function renderDRS() {
  const data = selectedSemester();
  const query = courseSearch.value.trim().toLowerCase();

  const allCourses = data.courses;

  const filtered = allCourses.filter(course => {
    return (
      course.code.toLowerCase().includes(query) ||
      course.name.toLowerCase().includes(query) ||
      course.className.toLowerCase().includes(query)
    );
  });

  // Statistik berdasarkan seluruh semester
  const totalSKS = allCourses.reduce(
    (sum, course) => sum + course.sks, 0
  );

  const approved = allCourses.filter(
    course => course.status === "Disetujui"
  ).length;

  $("#totalCourses").textContent = allCourses.length;
  $("#totalSKS").textContent = totalSKS;
  $("#approvedCourses").textContent = approved;
  $("#semesterLabel").textContent = data.label;

  // Bersihkan baris tabel
  courseTableBody.replaceChildren();

  if (filtered.length === 0) {
    const row = element("tr");
    const cell = element(
      "td",
      "drs-empty",
      "Tidak ada mata kuliah yang ditemukan."
    );
    cell.colSpan = 7;
    row.appendChild(cell);
    courseTableBody.appendChild(row);
  }

  filtered.forEach((course, index) => {
    const row = element("tr");

    row.appendChild(element("td", "", String(index + 1)));
    row.appendChild(element("td", "drs-course-code", course.code));
    row.appendChild(element("td", "drs-course-name", course.name));
    row.appendChild(element("td", "", String(course.sks)));
    row.appendChild(element("td", "", course.className));

    const statusCell = element("td");
    const statusClass =
      course.status === "Disetujui"
        ? "drs-status drs-approved"
        : "drs-status drs-pending";

    statusCell.appendChild(
      element("span", statusClass, course.status)
    );

    row.appendChild(statusCell);

    const actionCell = element("td");
    const button = element("button", "drs-detail-btn", "Detail");
    button.type = "button";

    button.addEventListener("click", () => {
      showDetail(course);
    });

    actionCell.appendChild(button);
    row.appendChild(actionCell);

    courseTableBody.appendChild(row);
  });

  const visibleSKS = filtered.reduce(
    (sum, course) => sum + course.sks, 0
  );

  $("#courseCount").textContent = `${filtered.length} Mata Kuliah`;
  $("#tableInfo").textContent =
    `Menampilkan ${filtered.length} dari ${allCourses.length} mata kuliah`;

  $("#footerSKS").textContent =
    `Total ditampilkan: ${visibleSKS} SKS`;
}

// ========================================
// DETAIL MATA KULIAH
// ========================================

function showDetail(course) {
  courseDetail.replaceChildren();

  const fields = [
    ["Kode Mata Kuliah", course.code],
    ["Nama Mata Kuliah", course.name],
    ["Jumlah SKS", `${course.sks} SKS`],
    ["Kelas", course.className],
    ["Dosen", course.lecturer],
    ["Status", course.status],
    ["Semester", selectedSemester().label]
  ];

  fields.forEach(([label, value]) => {
    const row = element("div", "drs-detail-row");
    row.appendChild(element("span", "", label));
    row.appendChild(element("strong", "", value));
    courseDetail.appendChild(row);
  });

  courseDialog.showModal();
}

function closeDetail() {
  courseDialog.close();
}

$("#closeDialog").addEventListener("click", closeDetail);
$("#closeDialogFooter").addEventListener("click", closeDetail);

courseDialog.addEventListener("click", event => {
  if (event.target === courseDialog) closeDetail();
});

// ========================================
// EVENT HANDLER
// ========================================

semesterFilter.addEventListener("change", () => {
  courseSearch.value = "";
  renderDRS();
});

courseSearch.addEventListener("input", renderDRS);

$("#resetFilter").addEventListener("click", () => {
  semesterFilter.value = "2026-gasal";
  courseSearch.value = "";
  renderDRS();
});

$("#printDRS").addEventListener("click", () => {
  window.print();
});

// Sidebar mobile
const sidebar = $("#sidebar");
const menuButton = $("#menuButton");

menuButton.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

// ========================================
// INITIAL RENDER
// ========================================

renderDRS();
