"use client";

import React, { createContext, useEffect, useState } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { setUserCookie, removeUserCookie, setAuthCookieListener } from "../firebase/session";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<User>;
  createUser: (email: string, password: string) => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  signInWithEmail: async () => { throw new Error("Not implemented"); },
  createUser: async () => { throw new Error("Not implemented"); },
  resetPassword: async () => {},
  isAdmin: false,
});

// List of admin email addresses
const ADMIN_EMAILS = [
  "thegeigerux@gmail.com", // Replace with your actual admin email
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up the authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAdmin(!!user && ADMIN_EMAILS.includes(user.email || ""));
      setLoading(false);
      
      // Update session cookie
      if (user) {
        setUserCookie(user);
      } else {
        removeUserCookie();
      }
    });

    // Set up token refresh listener
    const tokenListener = setAuthCookieListener();

    return () => {
      unsubscribe();
      tokenListener();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in with email", error);
      throw error;
    }
  };

  const createUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error creating user", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset email", error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await firebaseSignOut(auth);
      // The cookie will be removed via the onAuthStateChanged listener
    } catch (error) {
      console.error("Error signing out", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signInWithGoogle, 
        signOut: signOutUser, 
        signInWithEmail, 
        createUser, 
        resetPassword,
        isAdmin 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
