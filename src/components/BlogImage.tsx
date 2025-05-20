"use client";

import Image from 'next/image';
import { useState } from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  title?: string;
}

export default function BlogImage({ src, alt, title }: BlogImageProps) {
  const [imageError, setImageError] = useState(false);
  
  // Generate initials for fallback display
  const getInitials = (title: string) => {
    if (!title) return 'JG';
    const words = title.split(' ');
    if (words.length === 1) return title.substring(0, 2).toUpperCase();
    return (words[0][0] + (words.length > 1 ? words[1][0] : '')).toUpperCase();
  };

  // If image fails to load, show a fallback
  if (imageError) {
    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900">
        <span className="text-3xl font-semibold text-primary-700 dark:text-primary-300">
          {getInitials(title || alt)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
      unoptimized={true}
      onError={() => {
        console.error(`Failed to load image for "${title || alt}"`);
        setImageError(true);
      }}
    />
  );
} 