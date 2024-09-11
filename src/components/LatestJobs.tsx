// src/app/(components)/LatestJobs.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import mongoose from "mongoose";


import { addOrgAndUserData, JobModel } from "@/models/Job";
import Jobs from "./Jobs";

export default async function LatestJobs() {
  // Fetch user session from NextAuth
  const session = await getServerSession(authOptions);

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI as string);

  // Fetch the latest jobs and enrich data
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, { limit: 5, sort: "-createdAt" }),
    session?.user
  );

  return <Jobs header={''} jobs={latestJobs} />;
}
