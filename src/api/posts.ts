export type Post = {
  id: number;
  title: string;
  body: string;
  userId?: string;
};

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const posts = await res.json();
  // Add mock userId to each post
  return posts.map((post: Post) => ({
    ...post,
    userId: `user${post.id}`
  }));
}

export async function fetchPost(id: number): Promise<Post> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  const post = await res.json();
  // Add mock userId to the post
  return {
    ...post,
    userId: `user${post.id}`
  };
}

export async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Failed to create post');
  const newPost = await res.json();
  // Add mock userId to the new post
  return {
    ...newPost,
    userId: `user${newPost.id}`
  };
}

export async function updatePost(id: number, post: Partial<Omit<Post, 'id'>>): Promise<Post> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Failed to update post');
  const updatedPost = await res.json();
  // Add mock userId to the updated post
  return {
    ...updatedPost,
    userId: `user${updatedPost.id}`
  };
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete post');
} 