document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("addTaskBtn");
  const deleteAllBtn = document.getElementById("deleteAllBtn");
  const addTaskModal = document.getElementById("addTaskModal");
  const deleteModal = document.getElementById("deleteModal");
  const closeBtns = document.querySelectorAll(".close");
  const taskForm = document.getElementById("taskForm");
  const taskNameInput = document.getElementById("taskName");
  const taskDeadlineInput = document.getElementById("taskDeadline");
  const unfinishTask = document.getElementById("unfinish_task");
  const finishTask = document.getElementById("finish_task");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //  Reset modal về trạng thái ẩn khi load trang
  addTaskModal.style.display = "none";
  deleteModal.style.display = "none";

  function renderTasks() {
    unfinishTask.innerHTML = "";
    finishTask.innerHTML = "";

    if (tasks.length === 0) {
      unfinishTask.innerHTML = "<p>Chưa có công việc nào.</p>";
      finishTask.innerHTML = "<p>Chưa có công việc nào.</p>";
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
    `;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn delete";
      deleteBtn.textContent = "Xóa";
      deleteBtn.onclick = () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      };

      if (!task.done) {
        const editBtn = document.createElement("button");
        editBtn.className = "btn";
        editBtn.textContent = "Chỉnh sửa";
        editBtn.onclick = () => editTask(index);

        const completeBtn = document.createElement("button");
        completeBtn.className = "btn";
        completeBtn.textContent = "Hoàn thành";
        completeBtn.onclick = () => {
          tasks[index].done = true;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          renderTasks();
        };

        item.append(editBtn, completeBtn, deleteBtn);
        unfinishTask.appendChild(item);
      } else {
        item.append(deleteBtn);
        finishTask.appendChild(item);
      }
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

  closeBtns.forEach((btn) => {
    btn.onclick = () => closeModal(btn.closest(".modal"));
  });

  window.onclick = (e) => {
    if (e.target.classList.contains("modal")) closeModal(e.target);
  };

  taskForm.onsubmit = (e) => {
    e.preventDefault();
    const name = taskNameInput.value.trim();
    const deadline = taskDeadlineInput.value;
    if (!name || !deadline) return alert("Vui lòng nhập đầy đủ thông tin!");

    tasks.push({ name, deadline, done: false });
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
