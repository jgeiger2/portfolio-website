'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchBlogs, updateBlog } from '@/lib/firebase/firebaseUtils';
import { Blog } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function EditBlogForm({ id }: { id: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Blog>>({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    datePublished: new Date().toISOString(),
  });

  useEffect(() => {
    async function loadBlog() {
      try {
        const blogs = await fetchBlogs();
        const blog = blogs.find(blog => blog.id === id);
        
        if (!blog) {
          setError('Blog post not found');
          return;
        }
        
        setFormData({
          title: blog.title || '',
          content: blog.content || blog.body || '',
          excerpt: blog.excerpt || '',
          featuredImage: blog.featuredImage || '',
          datePublished: blog.datePublished || new Date().toISOString(),
        });
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error loading blog:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateBlog(id, formData);
      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      setError('Failed to update blog post');
      console.error('Error updating blog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="min-h-[200px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="featuredImage">Featured Image URL</Label>
        <Input
          id="featuredImage"
          name="featuredImage"
          value={formData.featuredImage}
          onChange={handleChange}
          type="url"
          disabled={isLoading}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
} 