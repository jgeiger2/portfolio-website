"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { addBlog } from "@/lib/firebase/firebaseUtils";
import dynamic from "next/dynamic";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";
import React from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AddBlogPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBlog({ title, subtitle, body, category, datePublished });
    router.push("/admin/blog");
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
        const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
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

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "2rem", background: "#181f2a", borderRadius: 8 }}>
      <h1 style={{ marginBottom: 24 }}>Add Blog Post</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: "1px solid #333", background: "#232b3a", color: "#fff" }}
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #333", background: "#232b3a", color: "#fff" }}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #333", background: "#232b3a", color: "#fff" }}
        />
        <div style={{ background: "#232b3a", borderRadius: 4, marginBottom: 40 }}>
          <ReactQuill
            ref={el => { quillRef.current = el; }}
            value={body}
            onChange={setBody}
            theme="snow"
            modules={modules}
            style={{ height: 180, color: "#fff", background: "#232b3a", borderRadius: 4 }}
          />
        </div>
        <input
          type="date"
          placeholder="Date Published"
          value={datePublished}
          onChange={e => setDatePublished(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #333", background: "#232b3a", color: "#fff", marginTop: 20 }}
        />
        <button type="submit" style={{ background: "#4fd1c5", color: "#181f2a", border: "none", borderRadius: 4, padding: "10px 0", fontWeight: 600, cursor: "pointer", marginTop: 12 }}>
          Add Blog
        </button>
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
          overflow: hidden !important;
          overflow-y: auto !important;
          height: 180px !important;
          min-height: 180px !important;
          max-height: 180px !important;
        }
        .ql-container::after, .ql-container::before {
          display: none !important;
        }
        .ql-editor {
          color: #fff !important;
          min-height: 120px !important;
          max-height: 120px !important;
          height: 120px !important;
          overflow-y: auto !important;
        }
        .ql-container::-webkit-scrollbar,
        .ql-editor::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          background: transparent !important;
        }
        .ql-container,
        .ql-editor {
          scrollbar-width: none !important; /* Firefox */
          -ms-overflow-style: none !important; /* IE/Edge */
        }
        
        /* Make date picker icon white */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
} 