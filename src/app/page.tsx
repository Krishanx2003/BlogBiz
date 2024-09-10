'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
    HELLO
    </div>
  )}