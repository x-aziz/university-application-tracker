

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyASEUgbu1hUMNiDylowS8tl7pm2IYCdF-8",
  authDomain: "university-tracker-95639.firebaseapp.com",
  projectId: "university-tracker-95639",
  storageBucket: "university-tracker-95639.firebasestorage.app",
  messagingSenderId: "909077695457",
  appId: "1:909077695457:web:0a1f5b4c0c9cf97654a0a0",
  measurementId: "G-90V2XEQF8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);