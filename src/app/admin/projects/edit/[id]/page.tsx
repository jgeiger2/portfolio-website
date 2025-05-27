"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDocuments, updateDocument } from "@/lib/firebase/firebaseUtils";
import dynamic from "next/dynamic";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";
import Image from "next/image";

const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-800 rounded-md animate-pulse" />
});

interface Project {
  id: string;
  title: string;
  description?: string;
  technologies?: string[];
  order?: number;
  images?: string[];
  content?: string;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projects = await getDocuments('projects') as Project[];
        const found = projects.find(p => p.id === id);
        if (found) {
          setProject(found);
        }
      } catch (err) {
        console.error("Error loading project:", err);
      }
      setLoading(false);
    };

    loadProject();
  }, [id]);

  const handleAddTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (techInput && project) {
      const technologies = [...(project.technologies || []), techInput];
      setProject({ ...project, technologies });
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    if (project) {
      const technologies = project.technologies?.filter(t => t !== tech);
      setProject({ ...project, technologies });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    try {
      const storageRef = ref(storage, `project-images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      if (project) {
        const images = [...(project.images || []), downloadURL];
        setProject({ ...project, images });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    if (project) {
      const images = project.images?.filter(img => img !== imageUrl);
      setProject({ ...project, images });
    }
  };

  const handleContentImageUpload = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `project-images/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  if (loading) return <div className="max-w-4xl mx-auto py-10">Loading...</div>;
  if (!project) return <div className="max-w-4xl mx-auto py-10">Project not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <form onSubmit={async (e) => {
        e.preventDefault();
        if (!project) return;
        setSaving(true);
        try {
          await updateDocument('projects', project.id, project);
          router.push('/admin');
        } catch (err) {
          console.error("Error updating project:", err);
        }
        setSaving(false);
      }}>
        <div className="space-y-6">
          <div>
            <label className="text-lg font-semibold mb-2 block">Title</label>
            <input
              type="text"
              value={project.title || ''}
              onChange={e => setProject(prev => ({ ...prev!, title: e.target.value }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="text-lg font-semibold mb-2 block">Description</label>
            <textarea
              value={project.description || ''}
              onChange={e => setProject(prev => ({ ...prev!, description: e.target.value }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 h-24"
            />
          </div>

          <div>
            <label className="text-lg font-semibold mb-2 block">Technologies</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies?.map(tech => (
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
              {project.images?.map((imageUrl, index) => (
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
              content={project.content || ''}
              onChange={content => setProject(prev => ({ ...prev!, content }))}
              onImageUpload={handleContentImageUpload}
              placeholder="Write about your project..."
            />
          </div>

          <div>
            <label className="text-lg font-semibold mb-2 block">Order</label>
            <input
              type="number"
              value={project.order || 0}
              onChange={e => setProject(prev => ({ ...prev!, order: parseInt(e.target.value) }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition mt-10"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}