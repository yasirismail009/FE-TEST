import React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import ErrorAlert from '@/components/ErrorAlert';

export default function AdminPostsPage() {
  // Placeholder states
  const isLoading = false;
  const isError = false;
  const posts = [];

  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Posts</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">Add Post</button>
      </div>
      {/* Loading State */}
      {isLoading && <LoadingSpinner />}
      {/* Error State */}
      {isError && <ErrorAlert message="Failed to load posts. Please try again." />}
      {/* Empty State */}
      {!isLoading && !isError && posts.length === 0 && <EmptyState message="No posts found." />}
      {/* Table (hidden if loading, error, or empty) */}
      {!isLoading && !isError && posts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Excerpt</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder rows */}
              <tr className="border-b border-gray-700">
                <td className="py-2 px-4">--</td>
                <td className="py-2 px-4">--</td>
                <td className="py-2 px-4">
                  <button className="text-blue-400 hover:underline mr-2">Edit</button>
                  <button className="text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
} 