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
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent-500 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-tertiary-500 blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-primary-500 blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>
      
      {/* Content with proper z-index */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 