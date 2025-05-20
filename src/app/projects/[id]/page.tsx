"use client";
import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// TODO: Replace with real data fetching
const mockProject = {
  title: "My Awesome Project",
  tags: ["React", "Firebase", "UI/UX"],
  content: [
    { type: "paragraph", text: "This is the introduction to the project. It explains what the project is about and its main features." },
    { type: "image", src: "/images/demo1.jpg", alt: "Demo Screenshot 1" },
    { type: "paragraph", text: "Here is some more detail about the project, including technical challenges and solutions." },
    { type: "image", src: "/images/demo2.jpg", alt: "Demo Screenshot 2" },
    { type: "paragraph", text: "Conclusion and next steps for the project." },
  ],
};

export default function ProjectPage() {
  const { id } = useParams();
  // In a real app, fetch project data by id
  const project = mockProject;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {project.title}
      </motion.h1>
      <div className="flex gap-2 mb-6">
        {project.tags.map(tag => (
          <motion.span
            key={tag}
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm shadow transition"
          >
            {tag}
          </motion.span>
        ))}
      </div>
      <div className="prose prose-lg">
        {project.content.map((block, i) =>
          block.type === "paragraph" ? (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {block.text}
            </motion.p>
          ) : (
            <motion.img
              key={i}
              src={block.src}
              alt={block.alt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="my-6 rounded shadow-lg"
            />
          )
        )}
      </div>
    </div>
  );
} 