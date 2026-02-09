import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debug: Log config to check if env variables are loading
console.log('🔍 Firebase Config Check:', {
  hasApiKey: !!firebaseConfig.apiKey,
  hasProjectId: !!firebaseConfig.projectId,
  hasAuthDomain: !!firebaseConfig.authDomain
});

// If env variables aren't loading, use direct values (for development)
const finalConfig = firebaseConfig.projectId ? firebaseConfig : {
  apiKey: "AIzaSyASEUgbu1hUMNiDylowS8tl7pm2IYCdF-8",
  authDomain: "university-tracker-95639.firebaseapp.com",
  projectId: "university-tracker-95639",
  storageBucket: "university-tracker-95639.firebasestorage.app",
  messagingSenderId: "909077695457",
  appId: "1:909077695457:web:0a1f5b4c0c9cf97654a0a0",
  measurementId: "G-90V2XEQF8R"
};

console.log('✅ Using Firebase config with projectId:', finalConfig.projectId);

// Initialize Firebase
const app = initializeApp(finalConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);