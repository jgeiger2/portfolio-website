"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Please check your inbox.");
      // Clear the email field after successful submission
      setEmail("");
    } catch (error: any) {
      console.error("Reset password error:", error);
      if (error.message === "Authentication not available") {
        setError("Authentication service is not available right now. Please try again later.");
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email address.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-5 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        
        {error && (
          <div className="bg-red-500 bg-opacity-20 text-red-200 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {message && (
          <div className="bg-green-500 bg-opacity-20 text-green-200 p-3 rounded-md mb-4">
            {message}
          </div>
        )}
        
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 bg-white bg-opacity-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Reset Email"
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link 
            href="/admin/login" 
            className="text-blue-400 hover:text-blue-300 transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
} 