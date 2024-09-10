"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { PostResponse } from "../../../../../types/types"

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const post: PostResponse = await res.json();
        setTitle(post.title);
        setContent(post.content);
      } catch (err) {
        setError('Failed to fetch post data.');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        setSuccess('Post updated successfully!');
        router.push(`/posts/${id}`);
      } else {
        setError('Failed to update post.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Textarea
            name="content"
            placeholder="Content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </Button>
      </form>
    </div>
  );
}
