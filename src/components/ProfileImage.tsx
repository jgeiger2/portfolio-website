"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Profile image component with fallback to initials
interface ProfileImageProps {
  containerClassName?: string;
}

export default function ProfileImage({ 
  containerClassName = ""
}: ProfileImageProps) {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const initials = "JG";

  // Use effect to make sure we only attempt to load the image on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`w-full h-full ${containerClassName}`}>
      {mounted && !imgError ? (
        <Image 
          src="/images/5C9FFB1B-4FD1-43F6-8EC0-FC49222D4109_1_105_c.jpeg"
          alt="James Geiger" 
          fill
          sizes="(max-width: 768px) 100vw, 256px"
          priority
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 via-primary-700 to-secondary-500 text-white font-bold text-2xl">
          {initials}
        </div>
      )}
    </div>
  );
} 