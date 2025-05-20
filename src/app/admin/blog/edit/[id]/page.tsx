"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchBlogs, updateBlog } from "@/lib/firebase/firebaseUtils";
import dynamic from "next/dynamic";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";
import React from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [blog, setBlog] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Create refs for the editor
  const quillRef = useRef<any>(null);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  
  // Load Quill CSS only on client-side
  // useEffect(() => {
  //   import("react-quill/dist/quill.snow.css");
  // }, []);

  // Fetch blog data
  useEffect(() => {
    setIsLoading(true);
    fetchBlogs().then(blogs => {
      const found = blogs.find((b: any) => b.id === id);
      if (found) {
        setBlog(found);
        setTitle(found.title || "");
        setSubtitle(found.subtitle || "");
        setBody(found.body || "");
        setCategory(found.category || "");
        setDatePublished(found.datePublished || "");
      }
      setIsLoading(false);
    });
  }, [id]);

  // Custom handler for content changes that preserves scroll position
  const handleBodyChange = (content) => {
    // Don't update state directly from header format changes
    // as they will be handled by the toolbar handler
    if (quillRef.current) {
      const formats = quillRef.current.getEditor().getFormat();
      if (formats.header && !body.includes(`<h${formats.header}`)) {
        // Just update the body without attempting to restore selection/scroll
        setBody(content);
        return;
      }
    }
    
    // For non-heading changes, regular update is fine
    setBody(content);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await updateBlog(id, { title, subtitle, body, category, datePublished });
    setIsLoading(false);
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

  // Configure Quill modules with special handling for header commands
  const modules = useMemo(() => {
    // Create a custom header handler that prevents scroll jumps
    const customHeaderHandler = function(value) {
      if (!quillRef.current) return;
      
      const quill = quillRef.current.getEditor();
      const selection = quill.getSelection();
      
      if (!selection) return;
      
      // Store the scroll position of the editor before heading change
      const editorElement = document.querySelector('.ql-editor');
      let scrollTop = 0;
      if (editorElement) {
        scrollTop = editorElement.scrollTop;
      }
      
      // Apply the heading format
      quill.format('header', value);
      
      // After React renders, restore the scroll position
      window.requestAnimationFrame(() => {
        if (editorElement) {
          editorElement.scrollTop = scrollTop;
        }
      });
    };
    
    return {
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          image: imageHandler,
          header: customHeaderHandler
        }
      }
    };
  }, []);

  if (isLoading && !blog) return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="text-xl">Loading...</div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <button 
          onClick={() => router.push("/admin/blog")} 
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
        >
          Back to Posts
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white"
              />
            </div>
            
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                id="subtitle"
                type="text"
                placeholder="Subtitle"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">Publication Date</label>
              <input
                id="date"
                type="date"
                placeholder="Date Published"
                value={datePublished}
                onChange={e => setDatePublished(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="body" className="block text-sm font-medium mb-1">Content</label>
          <div 
            ref={editorWrapperRef}
            className="quill-wrapper bg-gray-800 rounded-md border border-gray-700"
          >
            <ReactQuill
              ref={el => { quillRef.current = el; }}
              value={body}
              onChange={handleBodyChange}
              theme="snow"
              modules={modules}
              className="text-white"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-6">
          <button 
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-gray-900 font-semibold rounded-md disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Blog'}
          </button>
        </div>
      </form>
      
      <style jsx global>{`
        .quill-wrapper .ql-toolbar {
          background: #1F2937 !important;
          border: 1px solid #374151 !important;
          border-bottom: none !important;
          border-top-left-radius: 0.375rem !important;
          border-top-right-radius: 0.375rem !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 100 !important;
        }
        
        .quill-wrapper .ql-toolbar .ql-stroke {
          stroke: #fff !important;
        }
        .quill-wrapper .ql-toolbar .ql-fill {
          fill: #fff !important;
        }
        .quill-wrapper .ql-toolbar .ql-picker {
          color: #fff !important;
        }
        .quill-wrapper .ql-toolbar .ql-picker-label {
          color: #fff !important;
        }
        .quill-wrapper .ql-toolbar .ql-picker-options {
          background: #1F2937 !important;
          color: #fff !important;
        }
        .quill-wrapper .ql-container {
          background: #1F2937 !important;
          color: #fff !important;
          border: 1px solid #374151 !important;
          border-top: none !important;
          border-bottom-left-radius: 0.375rem !important;
          border-bottom-right-radius: 0.375rem !important;
          min-height: 24rem !important;
          height: auto !important;
        }
        .quill-wrapper .ql-editor {
          color: #fff !important;
          min-height: 500px !important;
          height: auto !important;
          overflow-y: auto !important;
          font-size: 1rem !important;
          line-height: 1.5 !important;
          padding: 1rem !important;
          scroll-behavior: auto !important;
        }
        
        /* Improve heading spacing to reduce layout shift */
        .quill-wrapper .ql-editor h1,
        .quill-wrapper .ql-editor h2,
        .quill-wrapper .ql-editor h3,
        .quill-wrapper .ql-editor h4,
        .quill-wrapper .ql-editor h5,
        .quill-wrapper .ql-editor h6 {
          margin-top: 0.5em !important;
          margin-bottom: 0.5em !important;
          position: relative !important;
        }
        
        /* Scrollbars styling */
        .quill-wrapper .ql-container::-webkit-scrollbar,
        .quill-wrapper .ql-editor::-webkit-scrollbar {
          width: 8px !important;
          background: #1F2937 !important;
        }
        .quill-wrapper .ql-container::-webkit-scrollbar-thumb,
        .quill-wrapper .ql-editor::-webkit-scrollbar-thumb {
          background: #4B5563 !important;
          border-radius: 4px !important;
        }
        
        /* Make date picker icon white */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
} 