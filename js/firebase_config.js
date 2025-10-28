// Js/FirebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Cấu hình Firebase (copy từ Project settings)
const firebaseConfig = {
  apiKey: "AIzaSyAKAhlU9CcOGvw959jiDYBQTLvWlSkJ14I",
  authDomain: "work-mangement.firebaseapp.com",
  projectId: "work-mangement",
  storageBucket: "work-mangement.appspot.com",
  messagingSenderId: "651336775402",
  appId: "1:651336775402:web:94ae5a047b6449e5a08993"
};


// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Các service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export ra ngoài
export { auth, db, storage };
export {app};

