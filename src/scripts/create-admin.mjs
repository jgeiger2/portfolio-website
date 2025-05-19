// Script to create an admin user for Firebase Authentication
// Run with: npm run create-admin

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import readline from "readline";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..", "..");
const envPath = resolve(rootDir, ".env.local");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("Loaded environment from .env.local");
} else {
  dotenv.config();
  console.log("No .env.local found, using default environment variables");
}

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Display the config for debugging (excluding sensitive values)
console.log("Firebase configuration:");
console.log("- apiKey:", firebaseConfig.apiKey ? "✓ Found" : "❌ Missing");
console.log("- authDomain:", firebaseConfig.authDomain ? "✓ Found" : "❌ Missing");
console.log("- projectId:", firebaseConfig.projectId ? "✓ Found" : "❌ Missing");
console.log("- appId:", firebaseConfig.appId ? "✓ Found" : "❌ Missing");

// Create readline interface for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to create admin user
async function createAdminUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(`✅ Admin user created successfully: ${userCredential.user.email}`);
    console.log("You can now log in with these credentials at /admin/login");
    return userCredential.user;
  } catch (error) {
    console.error("❌ Error creating user:", error.code, error.message);
    if (error.code === "auth/email-already-in-use") {
      console.log(
        "This email is already registered. Try using the password reset at /admin/reset-password"
      );
    } else if (error.code === "auth/weak-password") {
      console.log(
        "The password is too weak. Please use a stronger password (at least 6 characters)."
      );
    } else if (error.code === "auth/invalid-api-key") {
      console.log("Invalid Firebase API key. Check your .env.local file.");
    }
  }
}

// Prompt for email and password
rl.question("Enter admin email (thegeigerux@gmail.com): ", (email) => {
  // Default to the admin email if none provided
  email = email || "thegeigerux@gmail.com";

  rl.question("Enter password (min 6 characters): ", async (password) => {
    if (password.length < 6) {
      console.log("❌ Password must be at least 6 characters.");
      rl.close();
      return;
    }

    await createAdminUser(email, password);
    rl.close();
  });
});
