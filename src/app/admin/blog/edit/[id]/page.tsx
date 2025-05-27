"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchBlogs, updateBlog } from "@/lib/firebase/firebaseUtils";
import dynamic from "next/dynamic";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";

const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-800 rounded-md animate-pulse" />
});

interface Blog {
  id?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  category?: string;
  datePublished?: string;
  importedFromMedium?: boolean;
  featuredImage?: string;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load blog data
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blogs = await fetchBlogs();
        const found = blogs.find(b => b.id === id);
        if (found) {
          setBlog(found);
        }
      } catch (err) {
        console.error("Error loading blog:", err);
      }
      setIsLoading(false);
    };

    loadBlog();
  }, [id]);

  const handleImageUpload = async (file: File): Promise<string> => {
    // Use the Firebase storage directly
    const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  if (isLoading) return <div className="max-w-4xl mx-auto py-10">Loading...</div>;
  if (!blog) return <div className="max-w-4xl mx-auto py-10">Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <form onSubmit={async (e) => {
        e.preventDefault();
        if (!blog) return;
        setSaving(true);
        try {
          await updateBlog(blog.id, blog);
          router.push('/admin');
        } catch (err) {
          console.error('Error updating blog:', err);
        }
        setSaving(false);
      }}>
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={blog.title || ''}
            onChange={e => setBlog(prev => ({ ...prev!, title: e.target.value }))}
            style={{ padding: 8, borderRadius: 4, border: "1px solid #333", background: "#232b3a", color: "#fff", width: "100%" }}
          />
          <input
            type="text"
            placeholder="Category"
            value={blog.category || ''}
            onChange={e => setBlog(prev => ({ ...prev!, category: e.target.value }))}
            style={{ padding: 8, borderRadius: 4, border: "1px solid #333", background: "#232b3a", color: "#fff", width: "100%" }}
          />
          <div>
            <TiptapEditor
              content={blog.body || ''}
              onChange={content => setBlog(prev => ({ ...prev!, body: content }))}
              onImageUpload={handleImageUpload}
              placeholder="Write your blog post..."
            />
          </div>
          <input
            type="date"
            value={blog.datePublished || ''}
            onChange={e => setBlog(prev => ({ ...prev!, datePublished: e.target.value }))}
            style={{ padding: 8, borderRadius: 4, border: "1px solid #333", background: "#232b3a", color: "#fff", width: "100%" }}
          />
        </div>
        <button 
          type="submit" 
          disabled={saving} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition mt-10"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
      <style jsx global>{`
        /* Make date picker icon white */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
}