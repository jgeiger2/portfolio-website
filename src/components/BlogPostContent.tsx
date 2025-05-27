'use client';

import { useEffect, useState } from 'react';
import { fetchBlogs } from '@/lib/firebase/firebaseUtils';
import { Blog } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostContent({ id }: { id: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlog() {
      try {
        const blogs = await fetchBlogs();
        const foundBlog = blogs.find(blog => blog.id === id);
        
        if (!foundBlog) {
          setError('Blog post not found');
        } else {
          setBlog(foundBlog);
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error loading blog:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!blog) {
    return null;
  }

  // Use content if available, otherwise fall back to body
  const postContent = blog.content || blog.body || '';

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postContent }} />
    </article>
  );
}
