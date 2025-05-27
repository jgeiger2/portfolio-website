"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { fetchTimeline, updateTimeline } from "@/lib/firebase/firebaseUtils";
import Link from "next/link";

type TimelineItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: "briefcase" | "graduation-cap";
};

export default function TimelineEditor() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newItem, setNewItem] = useState<TimelineItem>({
    title: "",
    company: "",
    period: "",
    description: "",
    icon: "briefcase",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
      return;
    }

    const loadTimeline = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTimeline();
        setTimeline(data);
      } catch (error) {
        console.error("Error loading timeline:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && isAdmin) {
      loadTimeline();
    }
  }, [user, loading, isAdmin, router]);

  const handleAddItem = () => {
    if (!newItem.title || !newItem.company || !newItem.period) return;
    
    setTimeline([...timeline, newItem]);
    setNewItem({
      title: "",
      company: "",
      period: "",
      description: "",
      icon: "briefcase",
    });
  };

  const handleRemoveItem = (index: number) => {
    setTimeline(timeline.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof TimelineItem, value: string) => {
    const updatedTimeline = [...timeline];
    updatedTimeline[index] = {
      ...updatedTimeline[index],
      [field]: value,
    };
    setTimeline(updatedTimeline);
  };

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === timeline.length - 1)
    ) {
      return;
    }

    const updatedTimeline = [...timeline];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    
    [updatedTimeline[index], updatedTimeline[newIndex]] = [updatedTimeline[newIndex], updatedTimeline[index]];
    setTimeline(updatedTimeline);
  };

  const handleSaveTimeline = async () => {
    try {
      setIsSaving(true);
      await updateTimeline(
        timeline.map(item => ({
          company: item.company,
          position: item.title,
          duration: item.period,
          description: item.description,
        }))
      );
      router.push("/admin/about");
    } catch (error) {
      console.error("Error saving timeline:", error);
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
          <h1 className="text-3xl font-bold">Edit Career Timeline</h1>
          <p className="text-gray-400 mt-1">Add, remove, or reorder your career timeline</p>
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
            onClick={handleSaveTimeline}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                Saving...
              </>
            ) : (
              "Save Timeline"
            )}
          </button>
        </div>
      </div>

      {/* Add New Item Form */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Timeline Entry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title/Position</label>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
              placeholder="e.g., Senior Developer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company/Institution</label>
            <input
              type="text"
              value={newItem.company}
              onChange={(e) => setNewItem({ ...newItem, company: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
              placeholder="e.g., Tech Company Inc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time Period</label>
            <input
              type="text"
              value={newItem.period}
              onChange={(e) => setNewItem({ ...newItem, period: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
              placeholder="e.g., 2020-Present"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icon Type</label>
            <select
              value={newItem.icon}
              onChange={(e) => setNewItem({ ...newItem, icon: e.target.value as "briefcase" | "graduation-cap" })}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
            >
              <option value="briefcase">Work (Briefcase)</option>
              <option value="graduation-cap">Education (Graduation Cap)</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white h-20"
            placeholder="Describe your role, achievements, or study focus"
          />
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          onClick={handleAddItem}
        >
          Add Timeline Entry
        </button>
      </div>

      {/* Timeline List */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Current Timeline</h2>
        {timeline.length > 0 ? (
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="p-4 border border-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      {item.icon === 'briefcase' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-medium text-lg">{item.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-col space-y-1">
                      <button
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition disabled:opacity-50"
                        onClick={() => handleMoveItem(index, "up")}
                        disabled={index === 0}
                      >
                        ↑
                      </button>
                      <button
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition disabled:opacity-50"
                        onClick={() => handleMoveItem(index, "down")}
                        disabled={index === timeline.length - 1}
                      >
                        ↓
                      </button>
                    </div>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition h-full"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title/Position</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleItemChange(index, "title", e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Company/Institution</label>
                    <input
                      type="text"
                      value={item.company}
                      onChange={(e) => handleItemChange(index, "company", e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Time Period</label>
                    <input
                      type="text"
                      value={item.period}
                      onChange={(e) => handleItemChange(index, "period", e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Icon Type</label>
                    <select
                      value={item.icon}
                      onChange={(e) => handleItemChange(index, "icon", e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                    >
                      <option value="briefcase">Work (Briefcase)</option>
                      <option value="graduation-cap">Education (Graduation Cap)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white h-20"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No timeline entries found. Add some entries using the form above.</p>
        )}
      </div>
    </div>
  );
} 