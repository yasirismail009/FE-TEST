import React from 'react';
import Link from 'next/link';

// Placeholder post data
const post = {
  id: 1,
  title: 'First Post',
  body: 'This is the full content of the first post. It will be replaced with real data later.'
};

export default function PostDetailsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-400 hover:underline mb-6 inline-block">&larr; Back to Posts</Link>
        <div className="bg-gray-800 rounded-xl shadow p-8">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-200 leading-relaxed">{post.body}</div>
        </div>
      </div>
    </main>
  );
} 