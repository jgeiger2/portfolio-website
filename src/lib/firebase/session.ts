"use client";

import { auth } from './firebase';
import { User } from 'firebase/auth';
import cookies from 'js-cookie';

/**
 * Set session cookie when user logs in
 */
export const setUserCookie = async (user: User) => {
  if (user) {
    try {
      // Get the ID token from Firebase
      const token = await user.getIdToken(true);
      
      // Set the token in a cookie - increased from 14 to 30 days
      // Removed secure flag for local development (can be conditionally set based on environment)
      cookies.set('session', token, { 
        expires: 30, 
        path: '/',
        sameSite: 'lax' // Changed from strict to lax to work better with redirects
      });
      
      console.log("Session cookie set successfully");
    } catch (error) {
      console.error("Error setting session cookie:", error);
    }
  }
};

/**
 * Remove session cookie when user logs out
 */
export const removeUserCookie = () => {
  cookies.remove('session', { path: '/' });
};

/**
 * Listen for auth state changes and update cookie accordingly
 * This should be called in the AuthContext
 */
export const setAuthCookieListener = () => {
  // Return no-op if auth is not available (for static builds)
  if (!auth) {
    console.warn("Firebase auth not initialized - token refresh disabled");
    return () => {};
  }
  
  // Set up token refresh every 30 minutes
  const refreshInterval = setInterval(async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await setUserCookie(currentUser);
      } catch (err) {
        console.error("Failed to refresh token:", err);
      }
    }
  }, 30 * 60 * 1000); // 30 minutes
  
  // Clear interval on cleanup
  const tokenListener = auth.onIdTokenChanged(async (user) => {
    if (user) {
      await setUserCookie(user);
    } else {
      removeUserCookie();
    }
  });
  
  return () => {
    tokenListener();
    clearInterval(refreshInterval);
  };
}; 