'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost, deletePost } from '@/api/posts';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { PostModal } from '@/components/PostModal';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { useToast } from '@/components/ToastProvider';

interface Post {
  id: number;
  title: string;
  body: string;
  userId?: string;
}

interface UpdatePostData {
  title: string;
  body: string;
}

interface PostDetailsClientProps {
  initialPost: Post;
  timestamp: string;
}

export default function PostDetailsClient({ initialPost, timestamp }: PostDetailsClientProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [post, setPost] = useState(initialPost);

  // Format the timestamp on the client side
  const formattedDate = new Date(timestamp).toLocaleDateString();
  const formattedTime = new Date(timestamp).toLocaleTimeString();

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: number } & UpdatePostData) => updatePost(id, data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setIsEditModalOpen(false);
      setPost(updatedPost);
      showToast('Post updated successfully!', 'success');
    },
    onError: () => {
      showToast('Failed to update post.', 'error');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setIsDeleteModalOpen(false);
      showToast('Post deleted successfully!', 'success');
      router.push('/');
    },
    onError: () => {
      showToast('Failed to delete post.', 'error');
    },
  });

  const handleEdit = (data: { title: string; content: string; author: string }) => {
    updateMutation.mutate({ 
      id: post.id, 
      title: data.title, 
      body: data.content 
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <AdminLayout>
      <div className="text-gray-900 dark:text-white px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-950/50"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Posts
            </Link>
          </Button>
        </div>

        <Card className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700/50 shadow-lg">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-sm flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.userId}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
                {post.body}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Last updated: {formattedDate}, {formattedTime}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit Post
                </Button>
                <Button 
                  variant="destructive" 
                  className="bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-300 dark:hover:bg-red-500/30"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete Post
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <PostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        initialData={{
          title: post.title,
          content: post.body,
          author: post.userId || ''
        }}
        mode="edit"
      />

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        postTitle={post.title}
      />
    </AdminLayout>
  );
} 