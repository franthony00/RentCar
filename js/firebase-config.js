// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0Yss1GzZKpa6e_PHjfDi_g8sytUZG4_U",
  authDomain: "rentcar-5c7f4.firebaseapp.com",
  projectId: "rentcar-5c7f4",
  storageBucket: "rentcar-5c7f4.firebasestorage.app",
  messagingSenderId: "549483981054",
  appId: "1:549483981054:web:d5ace14fc1626d3eb15daf",
  measurementId: "G-KLERDRSLPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
