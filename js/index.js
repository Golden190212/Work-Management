import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  collection, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { app, db } from "./firebase_config.js";

const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) return; // navbar đã xử lý login/logout trong user_navbar.js
  loadTasks(user.uid);
});

// Hiển thị danh sách công việc
async function loadTasks(uid) {
  const c = document.querySelector(".container");
  c.innerHTML = "Đang tải...";
  const q = query(collection(db, "tasks"), where("uid", "==", uid));
  const s = await getDocs(q);
  const tasks = s.docs.map(d => d.data());

  if (!tasks.length) return (c.innerHTML = "<p>Chưa có công việc nào.</p>");

  const unfinish = document.createElement("div");
  unfinish.className = "unfinish_work";
  unfinish.innerHTML = "<h2>Công việc chưa hoàn thành</h2>";

  const finish = document.createElement("div");
  finish.className = "finish_work";
  finish.innerHTML = "<h2>Công việc đã hoàn thành</h2>";

  const now = new Date();
  for (let t of tasks) {
    const d = new Date(t.deadline);
    let txt = "", cls = "";
    if (t.done) (txt = "✅ Đã hoàn thành", cls = "done");
    else if (d < now) (txt = "⚠️ Đã hết hạn", cls = "expired");
    else if (d - now <= 86400000) (txt = "⏰ Gần hết hạn!", cls = "near");
    else (txt = "🕒 Chưa hoàn thành", cls = "undone");

    const item = document.createElement("div");
    item.className = "task-item";
    item.innerHTML = `
      <div>
        <b>${t.name}</b><br>
        <small>Trước: ${t.deadline}</small>
      </div>
      <span class="${cls}">${txt}</span>
    `;
    (t.done ? finish : unfinish).appendChild(item);
  }

  c.innerHTML = "";
  c.append(unfinish, finish);
}
