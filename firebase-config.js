// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB7RJVXyCPuuy7KOMZbnsxzivQvD4zoVc",
  authDomain: "aerolinea-3d642.firebaseapp.com",
  projectId: "aerolinea-3d642",
  storageBucket: "aerolinea-3d642.firebasestorage.app",
  messagingSenderId: "196978942129",
  appId: "1:196978942129:web:aee1faea763d62f14a4290",
  measurementId: "G-0EG2CBCLMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
