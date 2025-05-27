"use client";

import { useEffect } from 'react';
import BlogContentImage from './BlogContentImage';
import { createRoot } from 'react-dom/client';

export default function HydrateImages() {
  useEffect(() => {
    // Find all blog-content-image elements and replace them with the React component
    const elements = document.getElementsByTagName('blog-content-image');
    Array.from(elements).forEach(element => {
      const src = element.getAttribute('data-src') || '';
      const alt = element.getAttribute('data-alt') || '';
      const title = element.getAttribute('data-title') || '';
      const className = element.getAttribute('class') || '';

      const root = createRoot(element);
      root.render(
        <BlogContentImage 
          src={src} 
          alt={alt} 
          title={title} 
          className={className}
        />
      );
    });
  }, []);

  return null;
}
