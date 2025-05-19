// Script to create an admin user for Firebase Authentication
// Run with: node src/scripts/create-admin.js

const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const readline = require("readline");

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

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
      console.log("This email is already registered. Please try to log in or reset your password.");
    } else if (error.code === "auth/weak-password") {
      console.log("The password is too weak. Please use a stronger password.");
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
