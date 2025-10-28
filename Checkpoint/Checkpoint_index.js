import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

// Cấu hình Firebase
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
const storage = getStorage(app);

// DOM
const saveBtn = document.getElementById("saveBtn");
const avatarInput = document.getElementById("avatar");

saveBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;
  const bio = document.getElementById("bio").value;

  const file = avatarInput.files[0];
  let photoURL = "";

  if (file) {
    const storageRef = ref(storage, "avatars/" + file.name);
    await uploadBytes(storageRef, file);
    photoURL = await getDownloadURL(storageRef);
  }

  // Giả sử userId = "user1"
  await setDoc(doc(db, "profiles", "user1"), {
    name,
    job,
    bio,
    photoURL
  });

  // ✅ Lưu xong -> chuyển trang hiển thị profile
window.location.href = "Checkpoint_Profile.html?user=user1";

});
