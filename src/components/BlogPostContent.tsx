'use client';

import { use } from 'react';
import { fetchBlogs, Blog } from '@/lib/firebase/firebaseUtils';

export default function BlogPostContent({ id }: { id: string }) {
  const blogs = use(fetchBlogs());
  
  // Debug logs
  console.log("Looking for blog with ID:", id);
  console.log("All blog IDs:", blogs.map(blog => blog.id));

  const blog = blogs.find((b: Blog) => b.id === id);
  if (!blog) {
    throw new Error('Blog post not found');
  }

  return (
    <article>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </article>
  );
}
