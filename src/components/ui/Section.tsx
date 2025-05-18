"use client";

import React from 'react';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: 'light' | 'dark' | 'gradient' | 'glass' | 'none';
}

export const Section = ({ 
  children, 
  className = '', 
  containerSize = 'lg',
  background = 'none'
}: SectionProps) => {
  const backgroundClasses = {
    light: 'bg-background-light text-gray-900',
    dark: 'bg-background-dark text-white',
    gradient: 'bg-gradient-to-b from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950',
    glass: 'glass-light dark:glass-dark',
    none: ''
  };

  return (
    <section className={`py-12 md:py-16 ${backgroundClasses[background]} ${className}`}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
};

export default Section; 