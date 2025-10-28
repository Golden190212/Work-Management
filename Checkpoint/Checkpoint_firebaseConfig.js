// Import Firebase v9 modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAl6JAHTgFCSV6FJCHvL7YgvhmLon-9gCI",
  authDomain: "checkpoint-27178.firebaseapp.com",
  projectId: "checkpoint-27178",
  storageBucket: "checkpoint-27178.firebasestorage.app",
  messagingSenderId: "651780565815",
  appId: "1:651780565815:web:b458a463c7ddff799ec8b2"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth
export const auth = getAuth(app);
