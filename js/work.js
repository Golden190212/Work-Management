import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore, collection, query, where,
  getDocs, setDoc, doc, deleteDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { app, db } from "./firebase_config.js";

const auth = getAuth(app);
const toast = document.getElementById("toast");

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

let currentUID = null;

// Xác thực người dùng
onAuthStateChanged(auth, (user) => {
  if (!user) return (window.location.href = "login.html");
  currentUID = user.uid;
  renderTasks();
});

// Toast thông báo
function showToast(msg, color = "#00eaff") {
  toast.textContent = msg;
  toast.style.background = color;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Hiển thị danh sách công việc
async function renderTasks() {
  unfinishTask.innerHTML = "";
  finishTask.innerHTML = "";
  const q = query(collection(db, "tasks"), where("uid", "==", currentUID));
  const snap = await getDocs(q);
  const tasks = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  if (!tasks.length) {
    unfinishTask.innerHTML = "<p>Chưa có công việc nào.</p>";
    finishTask.innerHTML = "<p>Chưa có công việc nào.</p>";
    return;
  }

  const now = new Date();
  tasks.forEach(t => {
    const item = document.createElement("div");
    item.classList.add("task-item");
    item.innerHTML = `
      <div><b>${t.name}</b><br><small>Hoàn thành trước: ${t.deadline}</small></div>
    `;

    const del = document.createElement("button");
    del.className = "btn delete";
    del.textContent = "Xóa";
    del.onclick = async () => {
      await deleteDoc(doc(db, "tasks", t.id));
      renderTasks();
      showToast("Đã xóa công việc", "#ff5252");
    };

    if (!t.done) {
      const deadline = new Date(t.deadline);
      const isExpired = deadline < now;
      if (isExpired) {
        const expired = document.createElement("span");
        expired.textContent = "⚠️ Đã hết hạn";
        expired.className = "expired-label";
        item.append(expired, del);
      } else {
        const edit = document.createElement("button");
        edit.className = "btn";
        edit.textContent = "Chỉnh sửa";
        edit.onclick = () => editTask(t);

        const done = document.createElement("button");
        done.className = "btn";
        done.textContent = "Hoàn thành";
        done.onclick = async () => {
          await updateDoc(doc(db, "tasks", t.id), { done: true });
          renderTasks();
          showToast("Công việc đã hoàn thành", "#00ff7f");
        };
        item.append(edit, done, del);
      }
      unfinishTask.append(item);
    } else {
      item.append(del);
      finishTask.append(item);
    }
  });
}

// Thêm công việc
taskForm.onsubmit = async (e) => {
  e.preventDefault();
  const name = taskNameInput.value.trim();
  const deadline = taskDeadlineInput.value;
  if (!name || !deadline) return showToast("⚠️ Nhập đầy đủ thông tin!", "#ff9800");

  const id = currentUID + "_" + Date.now();
  await setDoc(doc(db, "tasks", id), { uid: currentUID, name, deadline, done: false });
  taskForm.reset();
  addTaskModal.style.display = "none";
  showToast("Đã thêm công việc mới!");
  renderTasks();
};

// Chỉnh sửa công việc
async function editTask(t) {
  const newName = prompt("Tên mới:", t.name);
  const newDeadline = prompt("Thời hạn mới:", t.deadline);
  if (newName && newDeadline) {
    await updateDoc(doc(db, "tasks", t.id), { name: newName, deadline: newDeadline });
    renderTasks();
    showToast("Đã cập nhật công việc");
  }
}

// Xóa tất cả công việc
confirmDelete.onclick = async () => {
  const q = query(collection(db, "tasks"), where("uid", "==", currentUID));
  const snap = await getDocs(q);
  for (const d of snap.docs) await deleteDoc(d.ref);
  deleteModal.style.display = "none";
  showToast("Đã xóa tất cả công việc", "#ff5252");
  renderTasks();
};

// Nút modal
addTaskBtn.onclick = () => (addTaskModal.style.display = "flex");
deleteAllBtn.onclick = () => (deleteModal.style.display = "flex");
cancelDelete.onclick = () => (deleteModal.style.display = "none");
closeBtns.forEach(btn => btn.onclick = () => (btn.closest(".modal").style.display = "none"));
