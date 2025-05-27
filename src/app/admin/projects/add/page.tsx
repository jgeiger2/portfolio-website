"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addDocument } from "@/lib/firebase/firebaseUtils";
import dynamic from "next/dynamic";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";
import Image from "next/image";

const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-800 rounded-md animate-pulse" />
});

interface ProjectData {
  title: string;
  description?: string;
  technologies: string[];
  order: number;
  images: string[];
  content: string;
}

export default function AddProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectData>({
    title: '',
    description: '',
    technologies: [],
    order: 0,
    images: [],
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState("");

  const handleAddTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (techInput) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput],
      }));
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    try {
      const storageRef = ref(storage, `project-images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, downloadURL],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleContentImageUpload = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `project-images/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleRemoveImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageUrl),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      <form onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await addDocument('projects', formData);
          router.push('/admin');
        } catch (err) {
          console.error("Error adding project:", err);
        }
        setLoading(false);
      }}>
        <div className="space-y-6">
          <div>
            <label className="text-lg font-semibold mb-2 block">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="text-lg font-semibold mb-2 block">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 h-24"
            />
          </div>

          <div>
            <label className="text-lg font-semibold mb-2 block">Technologies</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.technologies.map(tech => (
                <div key={tech} className="bg-gray-800 px-3 py-1 rounded-md flex items-center">
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="ml-2 text-red-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddTech} className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                placeholder="Add technology..."
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </form>
          </div>

          <div>
            <label className="text-lg font-semibold mb-2 block">Project Images</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {formData.images.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <Image
                    src={imageUrl}
                    alt={`Project image ${index + 1}`}
                    width={200}
                    height={150}
                    className="rounded-lg object-cover w-full h-40"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(imageUrl)}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700"
            />
          </div>
          
          <div>
            <label className="text-lg font-semibold mb-2 block">Project Content</label>
            <TiptapEditor
              content={formData.content}
              onChange={content => setFormData(prev => ({ ...prev, content }))}
              onImageUpload={handleContentImageUpload}
              placeholder="Write about your project..."
            />
          </div>

          <div>
            <label className="text-lg font-semibold mb-2 block">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={e => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition mt-10"
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}