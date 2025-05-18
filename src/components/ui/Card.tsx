"use client";

import React from 'react';

interface CardProps {
  className?: string;
  variant?: 'glass' | 'solid' | 'playful' | 'gradient' | 'accent';
  children: React.ReactNode;
  hover?: boolean;
  highlight?: boolean;
}

export const Card = ({ 
  className = '', 
  variant = 'glass',
  hover = true,
  highlight = false,
  children 
}: CardProps) => {
  const baseClasses = 'overflow-hidden';

  const variantClasses = {
    glass: 'glass-card glass-light dark:glass-dark',
    solid: 'bg-white dark:bg-gray-800 shadow-md rounded-xl p-4',
    playful: 'card-playful bg-white dark:bg-gray-800 shadow-playful-sm shadow-secondary-800/20 dark:shadow-secondary-900/20 rounded-playful p-4 border-2 border-secondary-200 dark:border-secondary-800',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900 dark:to-secondary-900 shadow-md rounded-xl p-4 border border-primary-100 dark:border-primary-800',
    accent: 'bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 border-l-4 border-accent-500'
  };
  
  const hoverClasses = hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : '';
  const highlightClasses = highlight ? 'card-highlight' : '';

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${highlightClasses} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  className = '', 
  children 
}: { 
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`pb-3 border-b border-gray-200 dark:border-gray-700 mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ 
  className = '', 
  children,
  gradient = false
}: { 
  className?: string;
  children: React.ReactNode;
  gradient?: boolean;
}) => {
  const gradientClasses = gradient ? 'gradient-text' : 'text-gray-900 dark:text-white';
  
  return (
    <h3 className={`text-xl font-bold ${gradientClasses} ${className}`}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ 
  className = '', 
  children 
}: { 
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p className={`text-sm text-muted-foreground mt-1 ${className}`}>
      {children}
    </p>
  );
};

export const CardContent = ({ 
  className = '', 
  children 
}: { 
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const CardFooter = ({ 
  className = '', 
  children 
}: { 
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`pt-3 mt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export const CardActions = ({ 
  className = '', 
  children 
}: { 
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`flex justify-end space-x-2 ${className}`}>
      {children}
    </div>
  );
};

export default Card; 