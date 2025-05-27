import { notFound } from 'next/navigation';
import { Container, Section, Badge } from '@/components/ui';
import { fetchBlogs } from '@/lib/firebase/firebaseUtils';
import BlogContentImage from '@/components/BlogContentImage';
import HydrateImages from '@/components/HydrateImages';
import { Suspense } from 'react';
import BlogPostContent from '@/components/BlogPostContent';

// Add Blog type
export type Blog = {
  id: string;
  title?: string;
  subtitle?: string;
  body?: string;
  category?: string;
  datePublished?: string;
  // Add any other fields as needed
};

// Generate metadata for the blog post page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const blogs: Blog[] = await fetchBlogs();
  const blog = blogs.find(blog => blog.id === params.id);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog.title} | James Geiger's Blog`,
    description: blog.body ? blog.body.replace(/<[^>]*>/g, '').substring(0, 160) : '',
  };
}

// Page configuration for Next.js 15
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';
export const revalidate = 0;
export const fetchCache = 'auto';

// This type helps TypeScript understand the shape of the page's props
export interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function BlogPostPage({ params, searchParams }: { params: { id: string }, searchParams?: { [key: string]: string | string[] | undefined } }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPostContent id={params.id} />
      </Suspense>
    </div>
  );
} 