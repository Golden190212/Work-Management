import {
  getAuth, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { app } from "./firebase_config.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const logout = document.getElementById("logout");

  onAuthStateChanged(auth, (user) => {
    if (!navbar) return;

    // Xóa nút cũ (tránh trùng)
    navbar.querySelectorAll("#signupBtn,#loginBtn,#userBtn").forEach(b => b.remove());

    if (!user) {
      // Nếu chưa đăng nhập → hiện Sign up / Log in
      navbar.innerHTML += `
        <button class="tab" id="signupBtn">Sign up</button>
        <button class="tab" id="loginBtn">Log in</button>
      `;
      if (logout) logout.style.display = "none";

      document.getElementById("signupBtn").onclick = () =>
        (window.location.href = "register.html");
      document.getElementById("loginBtn").onclick = () =>
        (window.location.href = "login.html");
    } else {
      // Nếu đã đăng nhập → hiện username
      const username = user.email.split("@")[0];
      const userBtn = document.createElement("button");
      userBtn.className = "tab user-btn";
      userBtn.id = "userBtn";
      userBtn.textContent = username;
      navbar.appendChild(userBtn);

      if (logout) {
        logout.style.display = "block";
        logout.onclick = async () => {
          await signOut(auth);
          window.location.href = "login.html";
        };
      }
    }
  });
});
