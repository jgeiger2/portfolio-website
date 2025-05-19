"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // This will be redirected by the useEffect
  }

  // If user is not an admin, show access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500">Access Denied</h1>
          <p className="mb-6">You do not have permission to access the admin area.</p>
          <LogoutButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <LogoutButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Manage Projects" 
          description="Add, edit, or remove portfolio projects"
          link="/admin/projects"
        />
        <DashboardCard 
          title="Manage Blog Posts" 
          description="Create and manage blog content"
          link="/admin/blog"
        />
        <DashboardCard 
          title="Contact Submissions" 
          description="View and manage contact form submissions"
          link="/admin/contact"
        />
      </div>
    </div>
  );
}

function DashboardCard({ 
  title, 
  description, 
  link 
}: { 
  title: string;
  description: string;
  link: string;
}) {
  const router = useRouter();
  
  return (
    <div 
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg cursor-pointer hover:bg-opacity-20 transition"
      onClick={() => router.push(link)}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-300 mb-4">{description}</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
        Manage
      </button>
    </div>
  );
} 