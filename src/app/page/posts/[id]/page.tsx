"use client"

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPost, Post } from '@/api/posts';
import { useParams, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorAlert from '@/components/ErrorAlert';
import Link from 'next/link';

export default function PostDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const { data: post, isLoading, isError } = useQuery<Post | undefined>({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });

  if (!id || isNaN(id)) {
    return <ErrorAlert message="Invalid post ID." />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => router.back()} className="text-blue-400 hover:underline mb-6 inline-block">&larr; Back</button>
        {isLoading && <LoadingSpinner />}
        {isError && <ErrorAlert message="Failed to load post. Please try again." />}
        {!isLoading && !isError && !post && <ErrorAlert message="Post not found." />}
        {!isLoading && !isError && post && (
          <div className="bg-gray-800 rounded-xl shadow p-8">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-200 leading-relaxed whitespace-pre-line">{post.body}</div>
            <div className="mt-8 flex gap-4">
              <Link href={`/admin/posts/${post.id}/edit`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">Edit</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 