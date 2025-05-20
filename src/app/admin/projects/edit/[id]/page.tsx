"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDocuments, updateDocument } from "@/lib/firebase/firebaseUtils";
import dynamic from "next/dynamic";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";
import Image from "next/image";

const QuillWrapper = dynamic(() => import("@/components/QuillWrapper"), { ssr: false });

// Add Project type
type Project = {
  id: string;
  title: string;
  description?: string;
  technologies?: string[];
  order?: number;
  images?: string[];
  content?: string | any[];
  // Add any other fields as needed
};

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [order, setOrder] = useState(1);
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const projects = await getDocuments("projects") as Project[];
      const project = projects.find((p) => p.id === id);
      if (project) {
        setTitle(project.title || "");
        setDescription(project.description || "");
        setTechnologies((project.technologies || []).join(", "));
        setOrder(project.order || 1);
        setImage((project.images && project.images[0]) || "");
        
        // Handle content - if it's already HTML string use it directly
        if (typeof project.content === 'string') {
          setContent(project.content);
        } 
        // If it's the old array format, convert it to HTML
        else if (Array.isArray(project.content)) {
          let htmlContent = '';
          project.content.forEach(block => {
            if (block.type === 'paragraph') {
              htmlContent += `<p>${block.text}</p>`;
            } else if (block.type === 'image') {
              htmlContent += `<p><img src="${block.src}" alt="${block.alt || ''}" /></p>`;
            }
          });
          setContent(htmlContent);
        }
      }
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `project-main-images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setImage(downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
    setUploadingImage(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    // Debug logs
    console.log("Updating project with id:", id);
    const data = {
      title,
      description,
      technologies: technologies.split(",").map(t => t.trim()),
      images: image ? [image] : [],
      order: Number(order),
      content, // Now this is a rich HTML string
    };
    console.log("Data to update:", data);
    try {
      await updateDocument("projects", id as string, data);
      setMessage("Project updated!");
      setTimeout(() => router.push("/admin/projects"), 1000);
    } catch (err) {
      setMessage("Error updating project");
      console.error("Update error:", err);
    }
    setSaving(false);
  };

  // Function to handle image upload
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    
    input.onchange = async () => {
      if (!input.files) return;
      const file = input.files[0];
      
      try {
        // Use the Firebase storage directly
        const storageRef = ref(storage, `project-images/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        
        // Get the URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
        
        // Insert image into editor
        const quill = quillRef.current?.getEditor();
        const range = quill?.getSelection();
        if (quill && range) {
          quill.insertEmbed(range.index, 'image', downloadURL);
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    };
  };

  // Configure Quill modules
  const quillRef = React.useRef<any>(null);
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  if (loading) return <div className="max-w-xl mx-auto py-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required className="w-full p-2 rounded bg-gray-800 text-white" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required className="w-full p-2 rounded bg-gray-800 text-white" />
        <input value={technologies} onChange={e => setTechnologies(e.target.value)} placeholder="Technologies (comma separated)" required className="w-full p-2 rounded bg-gray-800 text-white" />
        <input value={order} onChange={e => setOrder(Number(e.target.value))} type="number" placeholder="Order" required className="w-full p-2 rounded bg-gray-800 text-white" />
        
        <div>
          <label className="block mb-2 text-sm font-medium">Main Image</label>
          <div className="flex flex-col gap-3">
            {image && (
              <div className="relative w-full h-40 bg-gray-800 rounded overflow-hidden">
                <Image 
                  src={image} 
                  alt="Project main image" 
                  fill 
                  style={{ objectFit: 'contain' }} 
                  className="p-2"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                {uploadingImage ? "Uploading..." : "Upload Image"}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  disabled={uploadingImage}
                />
              </label>
              {image && (
                <button 
                  type="button" 
                  onClick={() => setImage("")} 
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Project Body</h3>
          <div style={{ background: "#232b3a", borderRadius: 4, marginBottom: 50 }}>
            <QuillWrapper
              ref={el => { quillRef.current = el; }}
              value={content}
              onChange={setContent}
              theme="snow"
              modules={modules}
              style={{ height: 300, color: "#fff", background: "#232b3a", borderRadius: 4 }}
            />
          </div>
        </div>
        
        <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition mt-10">
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {message && <div className="mt-2 text-center">{message}</div>}
      </form>
      
      <style jsx global>{`
        .ql-toolbar {
          background: #232b3a !important;
          border: 1px solid #333 !important;
        }
        .ql-toolbar .ql-stroke {
          stroke: #fff !important;
        }
        .ql-toolbar .ql-fill {
          fill: #fff !important;
        }
        .ql-toolbar .ql-picker {
          color: #fff !important;
        }
        .ql-toolbar .ql-picker-label {
          color: #fff !important;
        }
        .ql-toolbar .ql-picker-options {
          background: #232b3a !important;
          color: #fff !important;
        }
        .ql-container {
          background: #232b3a !important;
          color: #fff !important;
          border: 1px solid #333 !important;
          resize: none !important;
          height: 300px !important;
          min-height: 300px !important;
          margin-bottom: 30px !important;
        }
        .ql-editor {
          color: #fff !important;
          min-height: 250px !important;
          height: 250px !important;
          overflow-y: auto !important;
        }
        /* Fix spacing between quill and button */
        form .ql-container {
          margin-bottom: 40px !important;
        }
        /* Make date picker icon white */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
} 