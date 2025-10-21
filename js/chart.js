document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const totalEl = document.getElementById("totalTasks");
  const doneEl = document.getElementById("doneTasks");
  const pendingEl = document.getElementById("pendingTasks");
  const percentEl = document.getElementById("percent");
  const filterSelect = document.getElementById("filterType");

  // === CẬP NHẬT THỐNG KÊ ===
  const doneCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;
  const pendingCount = totalCount - doneCount;
  const percent = totalCount ? ((doneCount / totalCount) * 100).toFixed(1) : 0;

  totalEl.textContent = totalCount;
  doneEl.textContent = doneCount;
  pendingEl.textContent = pendingCount;
  percentEl.textContent = percent + "%";

  // === BIỂU ĐỒ TRÒN ===
  const pieCtx = document.getElementById("pieChart").getContext("2d");
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

  // === BIỂU ĐỒ CỘT (lọc theo thời gian) ===
  const barCtx = document.getElementById("barChart").getContext("2d");
  let barChart;

  function updateBarChart() {
    const type = filterSelect.value;
    const groups = {};

    tasks.forEach(t => {
      if (!t.deadline) return;
      const d = new Date(t.deadline);
      let key =
        type === "day" ? d.toISOString().split("T")[0] :
        type === "month" ? `${d.getFullYear()}-${d.getMonth() + 1}` :
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
            ticks: { color: "#fff", stepSize: 1 }, // ✅ số nguyên, không thập phân
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
});
