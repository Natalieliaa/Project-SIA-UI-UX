
// ====================================
// JADWAL KULIAH STATIS PER SEMESTER
// ====================================

const courses = [
  {
    day: 0,
    start: 10,
    end: 12,
    code: "MATS21W",
    name: "Probabilitas Lanjut",
    room: "Lab Jaringan Komputer",
    className: "B",
    color: "blue"
  },
  {
    day: 1,
    start: 11,
    end: 13,
    code: "NUTR054",
    name: "Neurasetika",
    room: "L.PBIO 1",
    className: "A",
    color: "green"
  },
  {
    day: 1,
    start: 13,
    end: 16,
    code: "SDEV207",
    name: "UI/UX",
    room: "K.205",
    className: "A",
    color: "purple"
  },
  {
    day: 2,
    start: 10,
    end: 13,
    code: "GRLE51P",
    name: "PMBG",
    room: "K.205",
    className: "A",
    color: "orange"
  },
  {
    day: 3,
    start: 7,
    end: 9,
    code: "MATS31W",
    name: "Metode Numerik",
    room: "K.207",
    className: "A",
    color: "pink"
  },
  {
    day: 3,
    start: 13,
    end: 16,
    code: "GEA151P",
    name: "AI Generatif",
    room: "Lab Jaringan Komputer",
    className: "A",
    color: "teal"
  },
  {
    day: 4,
    start: 7,
    end: 11,
    code: "PENL101",
    name: "Metopen",
    room: "K.205",
    className: "B",
    color: "indigo"
  },
  {
    day: 4,
    start: 13,
    end: 16,
    code: "INTS205",
    name: "CompVIS",
    room: "Lab Basis Data B",
    className: "B",
    color: "blue"
  }
];

const days = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu"
];

const calendarGrid = document.getElementById("calendarGrid");
const calendarView = document.getElementById("calendarView");
const listView = document.getElementById("listView");

function formatHour(hour) {
  return `${String(hour).padStart(2, "0")}:00`;
}

function createElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

// ====================================
// TAMPILAN KALENDER
// ====================================

function renderCalendar() {
  calendarGrid.replaceChildren();

  const corner = createElement("div", "calendar-corner", "Jam");
  corner.style.gridColumn = "1";
  corner.style.gridRow = "1";
  calendarGrid.appendChild(corner);

  // Header nama hari tanpa tanggal
  days.forEach((day, index) => {
    const header = createElement("div", "calendar-day", day);
    header.style.gridColumn = String(index + 2);
    header.style.gridRow = "1";
    calendarGrid.appendChild(header);
  });

  // Grid waktu 07:00 - 19:00
  for (let hour = 7; hour < 19; hour++) {
    const row = hour - 7 + 2;

    const time = createElement(
      "div",
      "calendar-time",
      formatHour(hour)
    );

    time.style.gridColumn = "1";
    time.style.gridRow = String(row);
    calendarGrid.appendChild(time);

    for (let day = 0; day < 6; day++) {
      const cell = createElement("div", "calendar-cell");
      cell.style.gridColumn = String(day + 2);
      cell.style.gridRow = String(row);
      calendarGrid.appendChild(cell);
    }
  }

  // Mata kuliah
  courses.forEach((course) => {
    const event = createElement(
      "article",
      `course-event ${course.color}`
    );

    event.appendChild(
      createElement("strong", "", course.name)
    );

    event.appendChild(
      createElement(
        "small",
        "",
        `${formatHour(course.start)} - ${formatHour(course.end)}`
      )
    );

    event.appendChild(
      createElement(
        "small",
        "",
        `${course.code} • ${course.room}`
      )
    );

    event.appendChild(
      createElement("small", "", `Kelas ${course.className}`)
    );

    event.style.gridColumn = String(course.day + 2);
    event.style.gridRow =
      `${course.start - 7 + 2} / ${course.end - 7 + 2}`;

    calendarGrid.appendChild(event);
  });
}

// ====================================
// TAMPILAN DAFTAR
// ====================================

function renderList() {
  listView.replaceChildren();

  days.forEach((day, index) => {
    const wrapper = createElement("section", "list-day");

    wrapper.appendChild(
      createElement("h3", "", day)
    );

    const dayCourses = courses
      .filter(course => course.day === index)
      .sort((a, b) => a.start - b.start);

    if (dayCourses.length === 0) {
      wrapper.appendChild(
        createElement(
          "p",
          "no-course",
          "Tidak ada jadwal kuliah."
        )
      );
    }

    dayCourses.forEach((course) => {
      const row = createElement("div", "list-course");

      row.appendChild(
        createElement(
          "div",
          "list-course-time",
          `${formatHour(course.start)} - ${formatHour(course.end)}`
        )
      );

      const detail = createElement("div");

      detail.appendChild(
        createElement("strong", "", course.name)
      );

      detail.appendChild(
        createElement(
          "p",
          "",
          `${course.code} • ${course.room} • Kelas ${course.className}`
        )
      );

      row.appendChild(detail);
      wrapper.appendChild(row);
    });

    listView.appendChild(wrapper);
  });
}

// ====================================
// GANTI TAMPILAN
// ====================================

document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;

    document.querySelectorAll("[data-view]").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    calendarView.hidden = view !== "calendar";
    listView.hidden = view !== "list";
  });
});

// Cetak jadwal
document.getElementById("printSchedule")
  .addEventListener("click", () => window.print());

// Sidebar mobile
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");

menuButton.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

// Jalankan
renderCalendar();
renderList();
