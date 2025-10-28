import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  collection, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { app, db } from "./firebase_config.js";

const auth = getAuth(app);

const totalEl = document.getElementById("totalTasks");
const doneEl = document.getElementById("doneTasks");
const pendingEl = document.getElementById("pendingTasks");
const percentEl = document.getElementById("percent");
const filterSelect = document.getElementById("filterType");

const pieCtx = document.getElementById("pieChart").getContext("2d");
const barCtx = document.getElementById("barChart").getContext("2d");
let barChart;

onAuthStateChanged(auth, async (user) => {
  if (!user) return (window.location.href = "login.html");
  await loadUserTasks(user.uid);
});

async function loadUserTasks(uid) {
  const q = query(collection(db, "tasks"), where("uid", "==", uid));
  const snap = await getDocs(q);
  const tasks = snap.docs.map(d => d.data());
  updateCharts(tasks);
}

function updateCharts(tasks) {
  const doneCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;
  const pendingCount = totalCount - doneCount;
  const percent = totalCount ? ((doneCount / totalCount) * 100).toFixed(1) : 0;

  totalEl.textContent = totalCount;
  doneEl.textContent = doneCount;
  pendingEl.textContent = pendingCount;
  percentEl.textContent = percent + "%";

  new Chart(pieCtx, {
    type: "doughnut",
    data: {
      labels: ["Đã hoàn thành", "Chưa hoàn thành"],
      datasets: [{
        data: [doneCount, pendingCount],
        backgroundColor: ["#4CAF50", "#FF5252"],
        borderWidth: 2,
        borderColor: "#111",
      }],
    },
    options: {
      plugins: {
        legend: { labels: { color: "#fff" } },
        title: {
          display: true,
          text: "Tỷ lệ công việc hoàn thành",
          color: "#00eaff",
          font: { size: 18 },
        },
      },
    },
  });

  function updateBarChart() {
    const type = filterSelect.value;
    const groups = {};

    tasks.forEach(t => {
      if (!t.deadline) return;
      const d = new Date(t.deadline);
      let key =
        type === "day" ? d.toISOString().split("T")[0] :
        type === "month" ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` :
        `${d.getFullYear()}`;
      if (!groups[key]) groups[key] = { done: 0, total: 0 };
      groups[key].total++;
      if (t.done) groups[key].done++;
    });

    const labels = Object.keys(groups);
    const doneData = labels.map(k => groups[k].done);
    const totalData = labels.map(k => groups[k].total);

    if (barChart) barChart.destroy();
    barChart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: "Đã hoàn thành", data: doneData, backgroundColor: "#4CAF50" },
          { label: "Tổng công việc", data: totalData, backgroundColor: "#FF5252" },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
          y: {
            ticks: { color: "#fff", stepSize: 1 },
            grid: { color: "rgba(255,255,255,0.1)" },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: { labels: { color: "#fff" } },
          title: {
            display: true,
            text: `Hiệu suất công việc theo ${type === "day" ? "ngày" : type === "month" ? "tháng" : "năm"}`,
            color: "#00eaff",
            font: { size: 18 },
          },
        },
      },
    });
  }

  filterSelect.onchange = updateBarChart;
  updateBarChart();
}
