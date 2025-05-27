"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addBlog } from "@/lib/firebase/firebaseUtils";
import dynamic from "next/dynamic";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";

const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-800 rounded-md animate-pulse" />
});

export default function AddBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addBlog({
        title,
        body,
        category,
        datePublished,
      });
      router.push('/admin');
    } catch (err) {
      console.error("Error adding blog:", err);
    }
    setLoading(false);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ padding: 8, borderRadius: 4, border: "1px solid #333", background: "#232b3a", color: "#fff", width: "100%" }}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ padding: 8, borderRadius: 4, border: "1px solid #333", background: "#232b3a", color: "#fff", width: "100%" }}
            required
          />
          <div>
            <TiptapEditor
              content={body}
              onChange={setBody}
              onImageUpload={handleImageUpload}
              placeholder="Write your blog post..."
            />
          </div>
          <input
            type="date"
            placeholder="Date Published"
            value={datePublished}
            onChange={e => setDatePublished(e.target.value)}
            style={{ padding: 8, borderRadius: 4, border: "1px solid #333", background: "#232b3a", color: "#fff", width: "100%" }}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition mt-10"
        >
          {loading ? "Adding..." : "Add Blog Post"}
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