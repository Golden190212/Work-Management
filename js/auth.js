// Js/Auth.js
import { auth, db } from "./firebase_config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword }  
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { setDoc, doc, getDoc }  
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
export { auth };


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isStrongPassword(pw) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);
}

// ====== DOM Events ======
document.addEventListener("DOMContentLoaded", () => {
  // --- ĐĂNG KÝ ---
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("signupUsername").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      if (!isValidEmail(email)) return alert("Email không hợp lệ!");
      if (!isStrongPassword(password)) return alert("Mật khẩu phải ít nhất 8 ký tự, có chữ hoa, chữ thường và số!");

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Lưu username vào Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: email,
          username: username,
          createdAt: new Date()
        });

        alert("Đăng ký thành công!");
        window.location.href = "index.html";
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("email-or-email-already-in-use.");
        } else {
          alert("Lỗi đăng ký: " + error.message);
        }
      }
    });
  }

  // --- ĐĂNG NHẬP ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Lấy dữ liệu user trong Firestore để so username
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.username !== username) {
            alert("Sai Username!");
            return;
          }
        }

        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
      } catch (error) {
        alert("Lỗi đăng nhập: " + error.message);
      }
    });
  }
});

