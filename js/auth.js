// Import Firebase Auth từ file index.js
import { auth } from "./FirebaseConfig.js";

import { 
  updateProfile,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider, 
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Đăng nhập bằng google
const provider = new GoogleAuthProvider();

// Hàm đăng nhập với Google
function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      alert("Đăng nhập Google thành công: " + name);

      // Chuyển về trang chính nếu cần
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Lỗi đăng nhập Google:", error);
      alert("Lỗi: " + error.message);
    });
}


// Gắn hàm vào window để HTML gọi được
window.loginWithGoogle = loginWithGoogle;


// Xác thực
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
}

// Đăng kí
const signupForm = document.getElementById("SignupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!isValidEmail(email)) {
      alert("Email không hợp lệ! Phải chứa '@'.");
      return;
    }
    if (!isValidPassword(password)) {
      alert("Mật khẩu phải >= 6 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường và 1 số.");
      return;
    }
// D:\ONL-JSI37\SPCK
    try {
      const userCredential= await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user,{
        displayName: user
      })
      alert(email + " đã đăng kí thành công!");
      window.location.href = "Home.html";
      signupForm.reset();
    } catch (error) {
      alert("Lỗi: " + error.message);
    }
  });
}

// Đăng nhập
const loginForm = document.getElementById("LoginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!isValidEmail(email)) {
      alert("Email không hợp lệ! Phải chứa '@'.");
      return;
    }
    if (!isValidPassword(password)) {
      alert("Mật khẩu phải >= 6 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường và 1 số.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert(email + " đã đăng nhập thành công!");
      window.location.href = "Home.html";
      loginForm.reset();
    } catch (error) {
      alert("Lỗi: " + error.message);
    }
  });
}

const LogOutBtn = document.getElementById("logout")
    if(LogOutBtn) {
        LogOutBtn.addEventListener("click", async() => {
            await signOut(auth);
            alert("Bạn đã đăng xuất")
        } )
}
    


