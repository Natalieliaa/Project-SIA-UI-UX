
// SIDEBAR MOBILE
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");

menuButton.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

// DATA JADWAL KULIAH
const schedules = {
  Senin: [
    {
      time: "10:00 - 12:00",
      name: "Probabilitas",
      code: "MATS21W",
      room: "Lab Jaringan Komputer",
      className: "B"
    }
  ],

  Selasa: [
    {
      time: "11:00 - 13:00",
      name: "Nutrisi",
      code: "NUTR054",
      room: "L.PBIO 1",
      className: "A"
    },
    {
      time: "13:00 - 16:00",
      name: "UI/UX",
      code: "SDEV207",
      room: "K.205",
      className: "A"
    }
  ],

  Rabu: [
    {
      time: "10:00 - 13:00",
      name: "PMBG",
      code: "GRLE51P",
      room: "K.205",
      className: "A"
    }
  ],

  Kamis: [
    {
      time: "07:00 - 09:00",
      name: "Metode Numerik",
      code: "MATS31W",
      room: "K.207",
      className: "A"
    },
    {
      time: "13:00 - 16:00",
      name: "Algoritma dan Pemrograman Komputer",
      code: "GEA151P",
      room: "Lab Jaringan Komputer",
      className: "A"
    }
  ],

  Jumat: [
    {
      time: "07:00 - 11:00",
      name: "Metopen",
      code: "PENL101",
      room: "K.205",
      className: "B"
    },
    {
      time: "13:00 - 16:00",
      name: "CompVIS",
      code: "INTS205",
      room: "Lab Basis Data B",
      className: "B"
    }
  ],

  Sabtu: []
};


// RENDER JADWAL
const scheduleList = document.getElementById("scheduleList");
const dayTabs = document.querySelectorAll("[data-day]");

function renderSchedule(day) {
  const classes = schedules[day] || [];
  scheduleList.replaceChildren();

  if (classes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Tidak ada jadwal kuliah.";
    scheduleList.appendChild(empty);
    return;
  }

  classes.forEach((course) => {
    const item = document.createElement("article");
    item.className = "schedule-item";

    const time = document.createElement("div");
    time.className = "schedule-time";
    time.textContent = course.time;

    const detail = document.createElement("div");
    detail.className = "schedule-detail";

    const title = document.createElement("h3");
    title.textContent = course.name;

    const description = document.createElement("p");
    description.textContent =
      `${course.code} • ${course.room} • Kelas ${course.className}`;

    detail.append(title, description);
    item.append(time, detail);
    scheduleList.appendChild(item);
  });
}


// INTERAKSI TAB HARI
dayTabs.forEach((button) => {
  button.addEventListener("click", () => {

    dayTabs.forEach((tab) => {
      tab.classList.remove("selected");
    });

    button.classList.add("selected");
    renderSchedule(button.dataset.day);

  });
});

// DEFAULT SENIN
renderSchedule("Senin");
