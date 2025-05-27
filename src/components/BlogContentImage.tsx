"use client";

import { useState } from 'react';

interface BlogContentImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export default function BlogContentImage({ src, alt, title, className = '' }: BlogContentImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center rounded-lg">
        <span className="text-sm text-muted-foreground">Image failed to load</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      title={title}
      loading="lazy"
      className={`max-w-full h-auto rounded-lg ${className}`}
      onError={() => setError(true)}
    />
  );
}
