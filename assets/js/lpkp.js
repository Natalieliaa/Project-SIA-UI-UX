
// =======================================
// DATA LPKP - PROTOTYPE
// =======================================

const lpkpData = {
  "2026-Gasal": [
    {
      prodi: "Informatika",
      code: "GEA151P",
      name: "AI Generatif",
      className: "A",
      meetings: 16,
      attendance: 15
    },
    {
      prodi: "Informatika",
      code: "SDEV207",
      name: "Desain UI/UX",
      className: "A",
      meetings: 6,
      attendance: 4
    },
    {
      prodi: "Informatika",
      code: "INTS205",
      name: "Komputer Pelihat",
      className: "B",
      meetings: 16,
      attendance: 16
    },
    {
      prodi: "Informatika",
      code: "MATS31W",
      name: "Metode Numerik",
      className: "A",
      meetings: 7,
      attendance: 6
    },
    {
      prodi: "Informatika",
      code: "PENL101",
      name: "Metodologi Penelitian",
      className: "B",
      meetings: 16,
      attendance: 15
    },
    {
      prodi: "Pendidikan Biologi",
      code: "NUTR054",
      name: "Neutrase­tika",
      className: "A",
      meetings: 0,
      attendance: 0
    },
    {
      prodi: "Informatika",
      code: "GRLE51P",
      name: "Pembelajaran Mesin Berbasis Graph",
      className: "A",
      meetings: 16,
      attendance: 16
    },
    {
      prodi: "Informatika",
      code: "MATS21W",
      name: "Probabilitas Lanjut",
      className: "D",
      meetings: 0,
      attendance: 0
    }
  ]
};

// =======================================
// ELEMENT
// =======================================

const $ = selector => document.querySelector(selector);

const form = $("#lpkpForm");
const yearSelect = $("#academicYear");
const semesterSelect = $("#semester");
const tableBody = $("#lpkpTableBody");
const reportContent = $("#reportContent");
const emptyState = $("#emptyState");
const printButton = $("#printLPKP");

function makeElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function percentage(attendance, meetings) {
  if (meetings === 0) return 0;
  return (attendance / meetings) * 100;
}

function formatPercentage(value) {
  return `${parseFloat(value.toFixed(2))}%`;
}

function attendanceClass(value, meetings) {
  if (meetings === 0) return "lpkp-not-started";
  if (value >= 75) return "lpkp-good";
  if (value >= 50) return "lpkp-warning";
  return "lpkp-low";
}

// =======================================
// MEMBUAT KOLOM PERSENTASE
// =======================================

function createAttendanceCell(course) {
  const cell = makeElement("td", "lpkp-attendance");

  const value = percentage(
    course.attendance,
    course.meetings
  );

  const wrapper = makeElement(
    "div",
    `lpkp-percentage ${attendanceClass(value, course.meetings)}`
  );

  const label = makeElement(
    "strong",
    "",
    formatPercentage(value)
  );

  const progress = makeElement("div", "lpkp-progress");
  const fill = makeElement("div", "lpkp-progress-fill");

  fill.style.width = `${Math.max(0, Math.min(100, value))}%`;

  progress.appendChild(fill);
  wrapper.append(label, progress);
  cell.appendChild(wrapper);

  return cell;
}

// =======================================
// RENDER TABEL
// =======================================

function renderTable(courses) {
  tableBody.replaceChildren();

  if (courses.length === 0) {
    const row = makeElement("tr");
    const cell = makeElement(
      "td",
      "",
      "Belum tersedia data LPKP pada periode ini."
    );

    cell.colSpan = 8;
    cell.style.padding = "40px";
    cell.style.textAlign = "center";
    cell.style.color = "#64748b";

    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }

  courses.forEach((course, index) => {
    const row = makeElement("tr");

    row.appendChild(
      makeElement("td", "", String(index + 1))
    );

    row.appendChild(
      makeElement("td", "", course.prodi)
    );

    row.appendChild(
      makeElement("td", "lpkp-course-code", course.code)
    );

    row.appendChild(
      makeElement("td", "lpkp-course-name", course.name)
    );

    row.appendChild(
      makeElement("td", "lpkp-number", course.className)
    );

    row.appendChild(
      makeElement("td", "lpkp-number", String(course.meetings))
    );

    row.appendChild(
      makeElement("td", "lpkp-number", String(course.attendance))
    );

    row.appendChild(createAttendanceCell(course));
    tableBody.appendChild(row);
  });
}

// =======================================
// UPDATE RINGKASAN
// =======================================

function updateStats(courses) {
  const totalMeetings = courses.reduce(
    (sum, course) => sum + course.meetings,
    0
  );

  const totalAttendance = courses.reduce(
    (sum, course) => sum + course.attendance,
    0
  );

  const average = percentage(
    totalAttendance,
    totalMeetings
  );

  $("#totalCourses").textContent = courses.length;
  $("#averageAttendance").textContent =
    formatPercentage(average);

  $("#totalAttendance").textContent = totalAttendance;

  $("#attendanceSubtitle").textContent =
    `Dari ${totalMeetings} pertemuan selesai`;

  $("#courseCount").textContent =
    `${courses.length} Mata Kuliah`;

  $("#tableInfo").textContent =
    `Menampilkan ${courses.length} mata kuliah`;
}

// =======================================
// TAMPILKAN LAPORAN
// =======================================

function showReport() {
  const year = yearSelect.value;
  const semester = semesterSelect.value;
  const key = `${year}-${semester}`;

  const courses = lpkpData[key] || [];

  reportContent.hidden = false;
  emptyState.hidden = true;

  $("#reportPeriod").textContent =
    `Tahun Akademik ${year}/${Number(year) + 1} - ${semester}`;

  $("#reportSummary").textContent =
    `LPKP Semester ${semester}`;

  renderTable(courses);
  updateStats(courses);

  printButton.disabled = courses.length === 0;
}

// =======================================
// EVENT LISTENERS
// =======================================

form.addEventListener("submit", event => {
  event.preventDefault();
  showReport();
});

printButton.addEventListener("click", () => {
  if (!printButton.disabled) {
    window.print();
  }
});

// Jika periode diubah, laporan lama disembunyikan
[yearSelect, semesterSelect].forEach(select => {
  select.addEventListener("change", () => {
    reportContent.hidden = true;
    emptyState.hidden = false;
    printButton.disabled = true;
  });
});

// Sidebar mobile
const sidebar = $("#sidebar");
const menuButton = $("#menuButton");

menuButton.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

// =======================================
// INITIALIZE
// =======================================

printButton.disabled = true;
