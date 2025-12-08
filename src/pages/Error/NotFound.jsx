"use client";

import { Link } from "react-router-dom"; // ❗ If using Next.js change to next/link
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-md bg-white shadow-xl rounded-2xl p-10 border">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="text-red-500 w-10 h-10" />
          </div>
        </div>

        <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition-all"
        >
          <ArrowLeft size={18} />
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
