"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { importBlogsFromMedium } from "@/lib/firebase/firebaseUtils";
import Link from "next/link";

export default function ImportMediumPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [mediumUsername, setMediumUsername] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [error, setError] = useState("");

  // Redirect if not admin
  if (!loading && !user) {
    router.push("/admin/login");
    return null;
  }

  if (!loading && !isAdmin) {
    router.push("/admin");
    return null;
  }

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mediumUsername) {
      setError("Please enter a Medium username");
      return;
    }
    
    try {
      setError("");
      setIsImporting(true);
      
      // Remove @ symbol if included
      const username = mediumUsername.startsWith('@') 
        ? mediumUsername.substring(1) 
        : mediumUsername;
      
      const result = await importBlogsFromMedium(username);
      setImportResult(result);
    } catch (err: any) {
      setError(err.message || "Failed to import blogs from Medium");
      console.error("Import error:", err);
    } finally {
      setIsImporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Import Medium Blogs</h1>
          <p className="text-gray-400 mt-1">Import your blogs from Medium to your portfolio</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/admin">
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <form onSubmit={handleImport} className="space-y-4">
          <div>
            <label htmlFor="mediumUsername" className="block mb-2">
              Medium Username
            </label>
            <div className="flex">
              <span className="bg-gray-700 text-gray-300 px-3 flex items-center rounded-l-md border-r-0 border border-gray-600">
                @
              </span>
              <input
                id="mediumUsername"
                type="text"
                value={mediumUsername}
                onChange={(e) => setMediumUsername(e.target.value)}
                placeholder="your-medium-username"
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-r-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isImporting}
              />
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Enter your Medium username without the @ symbol
            </p>
          </div>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isImporting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition ${
              isImporting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isImporting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Importing...
              </div>
            ) : (
              "Import Blogs"
            )}
          </button>
        </form>

        {importResult && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Import Results</h2>
            {importResult.success ? (
              <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-300 px-4 py-3 rounded-md">
                <p className="font-medium">Import completed successfully!</p>
                <ul className="mt-2">
                  <li>Imported: {importResult.totalImported} blogs</li>
                  <li>Skipped (already exist): {importResult.totalSkipped} blogs</li>
                </ul>
                
                {importResult.totalImported > 0 && (
                  <div className="mt-4">
                    <Link href="/admin/blog">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition">
                        View Imported Blogs
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded-md">
                <p className="font-medium">Import failed</p>
                <p className="mt-1">{importResult.error}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">About Medium Imports</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            This feature uses Medium's RSS feed to import your most recent blog posts. Due to limitations
            with Medium's API, only your most recent posts (typically the last 10-15) will be imported.
          </p>
          <p>
            Each imported blog will include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Title and full body content</li>
            <li>Publication date</li>
            <li>Featured image (if available)</li>
            <li>Categories</li>
            <li>Link to the original Medium post</li>
          </ul>
          <p>
            For a more complete import of all your Medium content, you can:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Download your Medium data from Medium.com (Settings → Security and apps → Download your information)</li>
            <li>Contact us to help with a custom import solution for your entire Medium history</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 