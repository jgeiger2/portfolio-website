"use client";

import Image from 'next/image';
import { useState } from 'react';

interface TiptapImageProps {
  src: string;
  alt?: string;
  title?: string;
  className?: string;
}

export default function TiptapImage({ src, alt = '', title, className = '' }: TiptapImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  if (error) {
    return <div className="text-red-500">Failed to load image</div>;
  }

  return (
    <div className={`relative w-full aspect-video my-4 ${className}`}>
      <Image
        src={src}
        alt={alt}
        title={title}
        fill
        className={`object-cover rounded-lg transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
      )}
    </div>
  );
}
