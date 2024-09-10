import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/utils/mongodb'; 
import Post from '@/models/Post'; 

// GET /api/posts/:id (existing)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectDB();
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return NextResponse.json({ message: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT /api/posts/:id (new)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  try {
    await connectDB();
    const post = await Post.findByIdAndUpdate(id, body, { new: true });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error updating post by ID:', error);
    return NextResponse.json({ message: 'Failed to update post' }, { status: 500 });
  }
}
