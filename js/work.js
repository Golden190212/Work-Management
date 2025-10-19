document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("addTaskBtn");
  const deleteAllBtn = document.getElementById("deleteAllBtn");
  const addTaskModal = document.getElementById("addTaskModal");
  const deleteModal = document.getElementById("deleteModal");
  const closeBtns = document.querySelectorAll(".close");
  const taskForm = document.getElementById("taskForm");
  const taskNameInput = document.getElementById("taskName");
  const taskDeadlineInput = document.getElementById("taskDeadline");
  const taskList = document.getElementById("taskList");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    taskList.innerHTML = "";
    if (tasks.length === 0) {
      taskList.innerHTML = "<p>Chưa có công việc nào.</p>";
      return;
    }

    tasks.forEach((task, index) => {
      const item = document.createElement("div");
      item.classList.add("task-item");
      item.innerHTML = `
        <div>
          <strong>${task.name}</strong><br>
          <small>Hoàn thành trước: ${task.deadline}</small>
        </div>
        <button class="btn edit-btn" data-index="${index}">Chỉnh sửa</button>
      `;
      taskList.appendChild(item);
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.onclick = () => editTask(btn.dataset.index);
    });
  }

  function openModal(modal) {
    modal.style.display = "flex";
  }

  function closeModal(modal) {
    modal.style.display = "none";
  }

  addTaskBtn.onclick = () => openModal(addTaskModal);
  deleteAllBtn.onclick = () => openModal(deleteModal);

  closeBtns.forEach(btn => {
    btn.onclick = () => closeModal(btn.closest(".modal"));
  });

  window.onclick = e => {
    if (e.target.classList.contains("modal")) closeModal(e.target);
  };

  taskForm.onsubmit = e => {
    e.preventDefault();
    const name = taskNameInput.value.trim();
    const deadline = taskDeadlineInput.value;
    if (!name || !deadline) return alert("Vui lòng nhập đầy đủ thông tin!");

    tasks.push({ name, deadline });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskForm.reset();
    closeModal(addTaskModal);
  };

  confirmDelete.onclick = () => {
    tasks = [];
    localStorage.removeItem("tasks");
    renderTasks();
    closeModal(deleteModal);
  };

  cancelDelete.onclick = () => closeModal(deleteModal);

  function editTask(index) {
    const task = tasks[index];
    const newName = prompt("Tên mới:", task.name);
    const newDeadline = prompt("Thời hạn mới:", task.deadline);
    if (newName && newDeadline) {
      tasks[index] = { name: newName, deadline: newDeadline };
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  }

  renderTasks();
});
