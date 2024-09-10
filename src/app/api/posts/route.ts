// app/api/posts/route.ts
import { NextResponse } from 'next/server';

import Post from '@/models/Post';
import { PostData, PostResponse, UpdatePostData, DeletePostData } from '../../../../types/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/auth'
import { connectDB } from '@/utils/mongodb';

// Create (POST) a new post
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const { title, content }: PostData = await request.json();

    // Create the post and associate it with the logged-in user
    const post = new Post({ title, content, userId: session.user.id });
    await post.save();

    const response: PostResponse = { ...post.toObject(), _id: post._id.toString() };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
  }
}

// Read (GET) all posts (or user's own posts)
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    
    // Get posts by the logged-in user
    const userPosts = await Post.find({ userId: session.user.id });

    // Convert ObjectId to string before sending
    const response: PostResponse[] = userPosts.map(post => ({
      ...post.toObject(),
      _id: post._id.toString(),
    }));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}

// Update (PUT) a post
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const { id, title, content }: UpdatePostData = await request.json();

    // Find the post and ensure the logged-in user is the author
    const post = await Post.findById(id);

    if (!post || post.userId.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Unauthorized or post not found' }, { status: 403 });
    }

    // Update the post
    post.title = title;
    post.content = content;
    await post.save();

    const response: PostResponse = { ...post.toObject(), _id: post._id.toString() };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating post' }, { status: 500 });
  }
}

// Delete (DELETE) a post
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const { id }: DeletePostData = await request.json();

    // Find the post and ensure the logged-in user is the author
    const post = await Post.findById(id);

    if (!post || post.userId.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Unauthorized or post not found' }, { status: 403 });
    }

    // Delete the post
    await post.deleteOne();

    return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting post' }, { status: 500 });
  }
}
