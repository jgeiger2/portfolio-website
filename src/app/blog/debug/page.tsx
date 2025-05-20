import { fetchBlogs } from '@/lib/firebase/firebaseUtils';
import Link from 'next/link';

// Add Blog type
export type Blog = {
  id: string;
  title?: string;
  subtitle?: string;
  body?: string;
  category?: string;
  datePublished?: string;
};

export default async function BlogDebugPage() {
  // Fetch blog posts
  const blogs: Blog[] = await fetchBlogs();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Blog Debug Page</h1>
      <p className="mb-4">Found {blogs.length} blog posts</p>
      
      <ul className="space-y-4">
        {blogs.map(post => (
          <li key={post.id} className="border p-4 rounded">
            <p className="font-bold">ID: {post.id}</p>
            <p>Title: {post.title}</p>
            <div className="mt-2">
              <Link 
                href={`/blog/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                View Post
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 