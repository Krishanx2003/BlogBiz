import { NextRequest, NextResponse } from 'next/server';

import Job from '@/models/Job';
import { connectDB } from '@/utils/mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { title, company, location, description } = await req.json();

    const newJob = new Job({ title, company, location, description });
    await newJob.save();

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating job' }, { status: 500 });
  }
}
export async function GET() {
    try {
      await connectDB();
      const jobs = await Job.find();
      return NextResponse.json(jobs);
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching jobs' }, { status: 500 });
    }
  }
  