"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Container } from './Container';
import { Button } from './Button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-200">
            James Geiger
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="accent-underline text-foreground hover:text-primary transition duration-200">
              Home
            </Link>
            <Link href="/about" className="accent-underline text-foreground hover:text-primary transition duration-200">
              About
            </Link>
            <Link href="/blog" className="accent-underline text-foreground hover:text-primary transition duration-200">
              Blog
            </Link>
            <Link href="/projects" className="accent-underline text-foreground hover:text-primary transition duration-200">
              Projects
            </Link>
            <Link href="/resume" className="accent-underline text-foreground hover:text-primary transition duration-200">
              Resume
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="sm" className="shadow-glow-accent">Contact</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground btn-playful"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden flex flex-col space-y-4 animate-float">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition duration-200 py-2 pl-4 border-l-2 border-primary-300 dark:border-primary-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition duration-200 py-2 pl-4 border-l-2 border-tertiary-300 dark:border-tertiary-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-primary transition duration-200 py-2 pl-4 border-l-2 border-accent-300 dark:border-accent-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="text-foreground hover:text-primary transition duration-200 py-2 pl-4 border-l-2 border-secondary-300 dark:border-secondary-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/resume"
              className="text-foreground hover:text-primary transition duration-200 py-2 pl-4 border-l-2 border-primary-400 dark:border-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Resume
            </Link>
            <Link
              href="/contact"
              className="inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="outline" size="sm" className="shadow-glow-accent">Contact</Button>
            </Link>
          </nav>
        )}
      </Container>
    </header>
  );
} 