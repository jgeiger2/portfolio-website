"use client";

import Image from 'next/image';
import { signInWithGoogle } from '@/lib/firebase/firebaseUtils';
import { useRouter } from 'next/navigation';

export default function SignInWithGoogle() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/admin');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center justify-center gap-2 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <div className="relative w-6 h-6">
        <Image
          src="/google.svg"
          alt="Google logo"
          fill
          className="object-contain"
          sizes="24px"
        />
      </div>
      <span>Sign in with Google</span>
    </button>
  );
}
