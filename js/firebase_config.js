// Import Firebase v9 modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAKAhlU9CcOGvw959jiDYBQTLvWlSkJ14I",
  authDomain: "work-mangement.firebaseapp.com",
  projectId: "work-mangement",
  storageBucket: "work-mangement.firebasestorage.app",
  messagingSenderId: "651336775402",
  appId: "1:651336775402:web:94ae5a047b6449e5a08993"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth
export const auth = getAuth(app);
