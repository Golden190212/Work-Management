import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAl6JAHTgFCSV6FJCHvL7YgvhmLon-9gCI",
  authDomain: "checkpoint-27178.firebaseapp.com",
  projectId: "checkpoint-27178",
  storageBucket: "checkpoint-27178.firebasestorage.app",
  messagingSenderId: "651780565815",
  appId: "1:651780565815:web:b458a463c7ddff799ec8b2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lấy userId từ URL (?user=user1)
const params = new URLSearchParams(window.location.search);
const userId = params.get("user");

// Lấy dữ liệu Firestore
async function loadProfile() {
  if (!userId) {
    console.error("❌ Không tìm thấy userId trong URL!");
    return;
  }

  const docRef = doc(db, "profiles", userId);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    const data = snap.data();
    document.getElementById("name").innerText = data.name;
    document.getElementById("job").innerText = data.job;
    document.getElementById("bio").innerText = data.bio;
    document.getElementById("avatar").src = data.photoURL || "default.png";
  } else {
    console.warn("❌ Không có dữ liệu cho user:", userId);
  }
}


loadProfile();
