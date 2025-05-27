'use client';

import { use } from 'react';
import { fetchBlogs } from '@/lib/firebase/firebaseUtils';
import { Blog } from '@/types';

export default function BlogPostContent({ id }: { id: string }) {
  const blogs = use(fetchBlogs());
  const blog = blogs.find(blog => blog.id === id);

  if (!blog) {
    return <div>Blog post not found</div>;
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
