"use client";

import { auth } from './firebase';
import { User } from 'firebase/auth';
import cookies from 'js-cookie';

/**
 * Set session cookie when user logs in
 */
export const setUserCookie = async (user: User) => {
  if (user) {
    // Get the ID token from Firebase
    const token = await user.getIdToken(true);
    
    // Set the token in a cookie - expires in 14 days (Firebase session default)
    cookies.set('session', token, { expires: 14, secure: true, sameSite: 'strict' });
  }
};

/**
 * Remove session cookie when user logs out
 */
export const removeUserCookie = () => {
  cookies.remove('session');
};

/**
 * Listen for auth state changes and update cookie accordingly
 * This should be called in the AuthContext
 */
export const setAuthCookieListener = () => {
  return auth.onIdTokenChanged(async (user) => {
    if (user) {
      await setUserCookie(user);
    } else {
      removeUserCookie();
    }
  });
}; 