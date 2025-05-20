"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBlogs, deleteBlog } from "@/lib/firebase/firebaseUtils";

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (err) {
      setError("Failed to load blog posts");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await deleteBlog(id);
      loadBlogs();
    } catch (err) {
      alert("Failed to delete blog post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Blog</h1>
      <div className="flex mb-6 gap-3">
        <Link href="/admin/blog/add">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
            + Add New Blog
          </button>
        </Link>
        <Link href="/admin/import-medium">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition">
            Import from Medium
          </button>
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog.id} className="bg-gray-800 p-4 rounded-md flex justify-between items-center">
              <div>
                <div className="font-semibold">{blog.title}</div>
                <div className="text-sm text-gray-400">{blog.date ? new Date(blog.date).toLocaleDateString() : ''}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/blog/edit/${blog.id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md">Edit</button>
                </Link>
                <button onClick={() => handleDelete(blog.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 