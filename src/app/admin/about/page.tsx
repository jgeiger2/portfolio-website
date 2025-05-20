"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { fetchSkills, fetchTimeline, initializeAboutData } from "@/lib/firebase/firebaseUtils";
import Link from "next/link";

export default function AdminAboutPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"skills" | "timeline">("skills");
  const [skills, setSkills] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initStatus, setInitStatus] = useState<{
    initialized: boolean;
    message: string;
  }>({ initialized: false, message: "" });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
      return;
    }

    const loadData = async () => {
      try {
        setIsLoading(true);

        // Initialize data if needed
        const initResult = await initializeAboutData();
        if (initResult.skillsInitialized || initResult.timelineInitialized) {
          setInitStatus({
            initialized: true,
            message: "Sample data initialized successfully!"
          });
        }
        
        // Load skills and timeline data
        const skillsData = await fetchSkills();
        const timelineData = await fetchTimeline();
        
        setSkills(skillsData);
        setTimeline(timelineData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && isAdmin) {
      loadData();
    }
  }, [user, loading, isAdmin, router]);

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
          <h1 className="text-3xl font-bold">About Page Content</h1>
          <p className="text-gray-400 mt-1">Manage skills and career timeline</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Link href="/admin">
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>

      {/* Initialization message */}
      {initStatus.initialized && (
        <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-300 px-4 py-3 rounded-md mb-6">
          {initStatus.message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "skills"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-400 hover:text-gray-200"
          }`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "timeline"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-400 hover:text-gray-200"
          }`}
          onClick={() => setActiveTab("timeline")}
        >
          Career Timeline
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "skills" ? (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Skills Management</h2>
            <Link href="/admin/about/skills">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                Edit Skills
              </button>
            </Link>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            {skills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="p-4 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400 mt-1">{skill.category}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No skills found. Add some skills to get started.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Career Timeline Management</h2>
            <Link href="/admin/about/timeline">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                Edit Timeline
              </button>
            </Link>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            {timeline.length > 0 ? (
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-700 rounded-lg">
                    <div className="flex flex-wrap justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{item.title}</h3>
                        <p className="text-gray-400">{item.company}</p>
                      </div>
                      <span className="text-cyan-400">{item.period}</span>
                    </div>
                    <p className="mt-2 text-gray-300">{item.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No timeline entries found. Add some to get started.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 