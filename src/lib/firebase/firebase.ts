import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Check for missing Firebase config
const missingVars = [];
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) missingVars.push('NEXT_PUBLIC_FIREBASE_API_KEY');
if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) missingVars.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) missingVars.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');

// Log warning if variables are missing
if (missingVars.length > 0) {
  console.warn(`Firebase config is missing these variables: ${missingVars.join(', ')}`);
}

// Use dummy values for static building if env vars are missing
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-api-key-for-static-build",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy-domain.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Initialize Firebase if possible
let app;
let auth;
let db;
let storage;

try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
  // Provide mock objects for SSG/static builds
  app = null;
  auth = null;
  db = null;
  storage = null;
}

export { app, auth, db, storage };
