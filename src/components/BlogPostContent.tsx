'use client';

import { use } from 'react';
import { fetchBlogs, Blog } from '@/lib/firebase/firebaseUtils';
import { Blog as BlogType } from '@/types';

export default async function BlogPostContent({ id }: { id: string }) {
  const blogs = await fetchBlogs();
  const blog = blogs.find(blog => blog.id === id);

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  // Use content if available, otherwise fall back to body
  const postContent = blog.content || blog.body || '';

  return (
    <article>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postContent }} />
    </article>
  );
}
