import React from 'react';
import { fetchPost } from '@/api/posts';
import PostDetailsClient from '@/components/PostDetailsClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await fetchPost(parseInt(resolvedParams.id));
  const timestamp = new Date().toISOString(); // Use ISO string for stable timestamp
  
  return <PostDetailsClient initialPost={post} timestamp={timestamp} />;
} 