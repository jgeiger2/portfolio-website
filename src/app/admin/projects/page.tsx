"use client";
import React, { useEffect, useState } from "react";
import { fetchProjects, deleteDocument } from "@/lib/firebase/firebaseUtils";
import Link from "next/link";

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDocument("projects", id);
      loadProjects();
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
      <Link href="/admin/projects/add">
        <button className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
          + Add New Project
        </button>
      </Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="bg-gray-800 p-4 rounded-md flex justify-between items-center">
              <div>
                <div className="font-semibold">{project.title}</div>
                <div className="text-sm text-gray-400">{project.description}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/projects/edit/${project.id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md">Edit</button>
                </Link>
                <button onClick={() => handleDelete(project.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 