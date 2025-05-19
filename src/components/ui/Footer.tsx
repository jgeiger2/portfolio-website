"use client";

import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/thegeigerux' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thegeigerux/' },
    { name: 'Instagram', url: 'https://www.instagram.com/thegeigerux/' },
  ];

  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-border py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary-200/30 dark:bg-secondary-800/20 rounded-full blur-3xl"></div>
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold gradient-text">
              James Geiger
            </Link>
            <p className="mt-3 text-muted-foreground max-w-md">
              Full-stack developer specializing in modern web applications with a focus on React, NextJS, and Firebase.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3 text-accent-500 dark:text-accent-400">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition duration-200 accent-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition duration-200 accent-underline">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition duration-200 accent-underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition duration-200 accent-underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition duration-200 accent-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3 text-tertiary-500 dark:text-tertiary-400">Connect</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary transition duration-200 accent-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50/10 to-secondary-50/10 dark:from-primary-900/10 dark:to-secondary-900/10"></div>
          <p className="text-sm text-muted-foreground relative">
            © {currentYear} James Geiger. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 relative">
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition duration-200 accent-underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition duration-200 accent-underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
} 