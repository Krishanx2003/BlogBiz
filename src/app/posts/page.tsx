"use client";

import { useEffect, useState } from 'react';
import { PostResponse } from '../../../types/types';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function Posts() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: PostResponse[] = await response.json();
        setPosts(data);
      } catch (error) {
        setError('Error fetching posts. Please try again later.');
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-500">No posts available.</p>
      )}

      {!loading && !error && posts.length > 0 && (
        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post._id} className="border-b last:border-none pb-4">
              <Card className="w-full rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <Link href={`/posts/${post._id}`}>
                    <h3 className="text-2xl font-bold hover:underline">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-2">
                    {post.content.substring(0, 150)}...
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
