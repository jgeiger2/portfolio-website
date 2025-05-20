import { useEffect, useState } from "react";
import { addSampleProjects } from "@/../../scripts/addSampleProjects";

export default function AddSampleProjectsPage() {
  const [status, setStatus] = useState("Adding sample projects...");

  useEffect(() => {
    addSampleProjects()
      .then(() => setStatus("Sample projects added!"))
      .catch((err) => setStatus("Error: " + err.message));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Add Sample Projects</h1>
        <p>{status}</p>
      </div>
    </div>
  );
} 