"use client";

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/thegeigerux' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thegeigerux/' },
    { name: 'Instagram', url: 'https://www.instagram.com/thegeigerux/' },
  ];

  return (
    <footer className="bg-[#0a101f] border-t border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & description */}
          <div>
            <Link href="/" className="inline-block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              James Geiger
            </Link>
            <p className="mt-3 text-gray-400">
              Full-stack developer specializing in modern web applications with a focus on React, NextJS, and Firebase.
            </p>
          </div>
          
          {/* Navigation links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition duration-150 ease-in-out">Home</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-white transition duration-150 ease-in-out">Projects</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition duration-150 ease-in-out">Blog</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition duration-150 ease-in-out">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition duration-150 ease-in-out">Contact</Link></li>
            </ul>
          </div>
          
          {/* Social links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-3">
              {socialLinks.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom row */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {currentYear} James Geiger. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-400">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-400">Terms</Link>
            <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-400">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 