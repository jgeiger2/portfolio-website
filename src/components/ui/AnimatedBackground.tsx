'use client';

import React, { ReactNode } from 'react';

interface AnimatedBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export default function AnimatedBackground({ 
  children, 
  className = "" 
}: AnimatedBackgroundProps) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-primary-100 via-background-light to-secondary-100 dark:from-primary-900/50 dark:via-background-dark dark:to-secondary-900/50 ${className}`}>
      {/* Content with proper z-index */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 