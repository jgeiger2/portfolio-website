"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { fetchSkills, updateSkills } from "@/lib/firebase/firebaseUtils";
import Link from "next/link";

type Skill = {
  name: string;
  level: number;
  category: string;
};

export default function SkillsEditor() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    level: 75,
    category: "frontend",
  });

  // Categories for dropdown
  const categories = [
    "frontend",
    "backend",
    "language",
    "database",
    "devops",
    "design",
    "api",
    "optimization",
    "mobile",
    "other",
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
      return;
    }

    const loadSkills = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSkills();
        setSkills(data.map((name) => ({
          name,
          level: 75, // default value
          category: "frontend", // default value
        })));
      } catch (error) {
        console.error("Error loading skills:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && isAdmin) {
      loadSkills();
    }
  }, [user, loading, isAdmin, router]);

  const handleAddSkill = () => {
    if (!newSkill.name) return;
    
    setSkills([...skills, newSkill]);
    setNewSkill({
      name: "",
      level: 75,
      category: "frontend",
    });
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillChange = (index: number, field: keyof Skill, value: string | number) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: field === "level" ? Number(value) : value,
    };
    setSkills(updatedSkills);
  };

  const handleMoveSkill = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === skills.length - 1)
    ) {
      return;
    }

    const updatedSkills = [...skills];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    
    [updatedSkills[index], updatedSkills[newIndex]] = [updatedSkills[newIndex], updatedSkills[index]];
    setSkills(updatedSkills);
  };

  const handleSaveSkills = async () => {
    try {
      setIsSaving(true);
      await updateSkills(skills.map(skill => skill.name));
      router.push("/admin/about");
    } catch (error) {
      console.error("Error saving skills:", error);
      setIsSaving(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // This will be redirected by the useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Skills</h1>
          <p className="text-gray-400 mt-1">Add, remove, or reorder your skills</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Link href="/admin/about">
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition">
              Cancel
            </button>
          </Link>
          <button
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition flex items-center ${
              isSaving ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={handleSaveSkills}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                Saving...
              </>
            ) : (
              "Save Skills"
            )}
          </button>
        </div>
      </div>

      {/* Add New Skill Form */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Skill</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Skill Name</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
              placeholder="e.g., React, TypeScript, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Proficiency Level</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                min="1"
                max="100"
                className="w-full"
              />
              <span className="text-blue-400 w-10 text-center">{newSkill.level}%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition w-full"
              onClick={handleAddSkill}
            >
              Add Skill
            </button>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Current Skills</h2>
        {skills.length > 0 ? (
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="p-4 border border-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Skill Name</label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Proficiency Level</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        value={skill.level}
                        onChange={(e) => handleSkillChange(index, "level", e.target.value)}
                        min="1"
                        max="100"
                        className="w-full"
                      />
                      <span className="text-blue-400 w-10 text-center">{skill.level}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={skill.category}
                      onChange={(e) => handleSkillChange(index, "category", e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end space-x-2">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      Remove
                    </button>
                    <div className="flex flex-col space-y-1">
                      <button
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition disabled:opacity-50"
                        onClick={() => handleMoveSkill(index, "up")}
                        disabled={index === 0}
                      >
                        ↑
                      </button>
                      <button
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition disabled:opacity-50"
                        onClick={() => handleMoveSkill(index, "down")}
                        disabled={index === skills.length - 1}
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No skills found. Add some skills using the form above.</p>
        )}
      </div>
    </div>
  );
} 