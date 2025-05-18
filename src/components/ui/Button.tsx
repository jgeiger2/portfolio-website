"use client";

import React from 'react';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'tertiary' | 'glass' | 'outline' | 'playful';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  asChild = false,
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-500 text-white focus:ring-primary-500 shadow-sm hover:shadow',
    secondary: 'bg-secondary-600 hover:bg-secondary-500 text-white focus:ring-secondary-500 shadow-sm hover:shadow',
    accent: 'bg-accent-500 hover:bg-accent-400 text-white focus:ring-accent-500 shadow-sm hover:shadow',
    tertiary: 'bg-tertiary-500 hover:bg-tertiary-400 text-white focus:ring-tertiary-500 shadow-sm hover:shadow',
    glass: 'glass-button glass-light dark:glass-dark hover:bg-white/10 focus:ring-primary-500',
    outline: 'border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-primary-500',
    playful: 'btn-playful bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-400 hover:to-secondary-400 text-white shadow-playful-sm shadow-secondary-900/20 hover:shadow-playful-md hover:shadow-secondary-900/30 rounded-playful focus:ring-secondary-500',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  
  const loadingClasses = isLoading ? 'opacity-70 cursor-not-allowed' : '';
  
  // If asChild is true, we clone the children instead of rendering a button
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...props,
      className: `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loadingClasses} ${className} ${(children as any).props.className || ''}`,
      ref,
    });
  }
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loadingClasses} ${className}`}
      disabled={isLoading || props.disabled}
      ref={ref}
      {...props}
    >
      {isLoading && (
        <svg 
          className="w-4 h-4 mr-2 text-current animate-spin" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button; 