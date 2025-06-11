'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost, updatePost, deletePost, Post } from '@/api/posts';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import ErrorAlert from '@/components/ErrorAlert';
import { PostModal } from '@/components/PostModal';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { useToast } from '@/components/ToastProvider';
import AdminLayout from './page/adminLayout';
import { Key, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from '@/components/ui/pagination';

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  
  // View mode state
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: posts, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Calculate pagination values
  const totalPages = posts ? Math.ceil(posts.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts?.slice(startIndex, endIndex);

  // Log component mount and state changes
  React.useEffect(() => {
    console.log('AdminDashboardPage mounted');
    return () => console.log('AdminDashboardPage unmounted');
  }, []);

  // Log component state
  React.useEffect(() => {
    console.log('Component state updated:', {
      isLoading,
      isError,
      error,
      postsCount: posts?.length,
      hasPosts: !!posts
    });
  }, [isLoading, isError, error, posts]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setModalOpen(false);
      showToast('Post created successfully!', 'success');
    },
    onError: () => {
      showToast('Failed to create post.', 'error');
    },
  });

  // Edit mutation
  const editMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Omit<Post, 'id'>) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setModalOpen(false);
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
      setDeleteModalOpen(false);
      setDeletingPost(null);
      showToast('Post deleted successfully!', 'success');
    },
    onError: () => {
      showToast('Failed to delete post.', 'error');
    },
  });

  function handleAdd() {
    setModalMode('create');
    setEditingPost(null);
    setModalOpen(true);
  }

  function handleEdit(post: Post) {
    setModalMode('edit');
    setEditingPost(post);
    setModalOpen(true);
  }

  function handleDelete(post: Post) {
    setDeletingPost(post);
    setDeleteModalOpen(true);
  }

  function handleConfirmDelete() {
    if (deletingPost) {
      deleteMutation.mutate(deletingPost.id);
    }
  }

  const handleCreatePost = (data: { title: string; content: string; author: string }) => {
    if (modalMode === 'create') {
      createMutation.mutate({ title: data.title, body: data.content });
    } else if (modalMode === 'edit' && editingPost) {
      editMutation.mutate({ id: editingPost.id, title: data.title, body: data.content });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorAlert message={error.message} />;
  if (!posts?.length) return <EmptyState message="No posts found" />;

  return (
    <AdminLayout>
    <div className="space-y-8">
      {/* Overview Card */}
      <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Overview</h2>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">Posts Management</div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Posts</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">{posts ? posts.length : '--'}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Drafts</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">--</span>
          </div>
        </div>
      </section>
      {/* Posts Section */}
      <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Posts</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <Button
                variant={viewMode === 'table' ? 'default' : 'secondary'}
                size="sm"
                className={viewMode === 'table' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200  cursor-pointer '}
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
              <Button
                variant={viewMode === 'card' ? 'default' : 'secondary'}
                size="sm"
                className={viewMode === 'card' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200  cursor-pointer '}
                onClick={() => setViewMode('card')}
              >
                Card
              </Button>
            </div>
            <Button onClick={handleAdd} className="bg-pink-600 hover:bg-pink-700  cursor-pointer  text-white px-4 py-2 rounded shadow">Add Post</Button>
          </div>
        </div>
        {!isLoading && !isError && (!currentPosts || currentPosts.length === 0) && (
          <EmptyState message="No posts found." />
        )}
        {!isLoading && !isError && currentPosts && currentPosts.length > 0 && (
          <>
            {viewMode === 'table' ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 mt-4">
                <Table>
                  <TableHeader>
                    <TableRow className='border-b border-gray-200 dark:border-gray-800'>
                      <TableHead className="text-gray-900 dark:text-white">Title</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Excerpt</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">User ID</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">System ID</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPosts.map((post: Post) => (
                      <TableRow className='border-b border-gray-200 dark:border-gray-800' key={post.id}>
                        <TableCell className="text-gray-900 dark:text-white">{post.title}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">{post.body.slice(0, 60)}...</TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-100 dark:border-blue-900 flex items-center gap-1 w-fit">
                            <Key size={12} />
                            {post.userId || 'admin123'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200 border border-purple-100 dark:border-purple-900">
                            {`POST-${post.id.toString().padStart(4, '0')}`}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="secondary" size="icon" className="bg-yellow-400  cursor-pointer  hover:bg-yellow-500 text-white" onClick={() => handleEdit(post)} title="Edit post">
                              <Pencil size={16} />
                            </Button>
                            <Button variant="destructive" size="icon" className="bg-red-600  cursor-pointer  hover:bg-red-700 text-white" onClick={() => handleDelete(post)} title="Delete post">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {currentPosts.map((post: Post) => (
                  <Card key={post.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white border border-blue-600 flex items-center gap-1">
                        <Key size={12} />
                        {post.userId || 'admin123'}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500 text-white border border-purple-600">
                        {`POST-${post.id.toString().padStart(4, '0')}`}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{post.body.slice(0, 100)}...</p>
                    <div className="flex justify-end gap-2 mt-auto">
                      <Button variant="secondary" size="icon" className=" cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white" onClick={() => handleEdit(post)} title="Edit post">
                        <Pencil size={16} />
                      </Button>
                      <Button variant="destructive" size="icon" className=" cursor-pointer bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(post)} title="Delete post">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  pageCount={totalPages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </section>
      <PostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreatePost}
        initialData={editingPost ? {
          title: editingPost.title,
          content: editingPost.body,
          author: editingPost.userId || ''
        } : undefined}
        mode={modalMode}
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
        postTitle={deletingPost?.title}
      />
    </div>
    </AdminLayout>
  );
} 