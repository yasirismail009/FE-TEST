import React from 'react';

export default function AdminCreatePostPage() {
  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Add New Post</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm mb-1" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="body">Body</label>
          <div className="w-full h-40 bg-gray-900 border border-gray-700 rounded flex items-center justify-center text-gray-500">
            Rich Text Editor Coming Soon
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition opacity-50 cursor-not-allowed"
          disabled
        >
          Create Post
        </button>
      </form>
    </section>
  );
} 