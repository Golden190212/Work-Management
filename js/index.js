// index.js — hiển thị danh sách công việc (chỉ đọc)
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length === 0) {
    container.innerHTML = "<p>Chưa có công việc nào.</p>";
    return;
  }

  const list = document.createElement("ul");
  list.style.listStyle = "none";
  list.style.padding = "0";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.style.background = "rgba(255,255,255,0.08)";
    li.style.padding = "12px 16px";
    li.style.marginBottom = "10px";
    li.style.borderRadius = "8px";
    li.style.display = "flex";
    li.style.flexDirection = "column";
    li.style.gap = "6px";

    li.innerHTML = `
    <span>
      <strong>${task.name}</strong><br>
      <small>Hoàn thành trước: ${task.deadline}</small>
    </span>
    <span style="
      align-self: flex-end;
      font-weight: 600;
      color: ${task.done ? "#00ff7f" : "#ff5252"};
    ">
      ${task.done ? "Đã hoàn thành" : "Chưa hoàn thành"}
    </span>
  `;

    list.appendChild(li);
  });

  container.innerHTML = "<h2>Công việc</h2>";
  container.appendChild(list);
});
