import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'standard' | 'glass';
  className?: string;
}

const Input = ({
  label,
  error,
  icon,
  variant = 'standard',
  className = '',
  ...props
}: InputProps) => {
  const id = props.id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  const baseClasses = 'w-full rounded-lg transition-all duration-300 focus:ring-2 focus:outline-none';
  
  const variantClasses = {
    standard: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-primary-500/20',
    glass: 'glass-light dark:glass-dark border border-white/30 dark:border-white/10 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-primary-500/20'
  };
  
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
    : '';
  
  const paddingClasses = icon ? 'pl-10' : 'px-4';
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          className={`${baseClasses} ${variantClasses[variant]} ${errorClasses} ${paddingClasses} py-2.5 ${className}`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input; 