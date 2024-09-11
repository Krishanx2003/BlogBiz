'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-black/[0.96] p-4 antialiased bg-grid-white/[0.02]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-neutral-300 hover:text-neutral-200">
          MyApp
        </Link>
        <Link href="/posts" className="text-neutral-300 hover:text-neutral-200">
                Blogs
              </Link>
        <div className="flex space-x-4">
          {session ? (
            <>
              <Link href="/create" className="text-neutral-300 hover:text-neutral-200">
                Create Blog 
              </Link>
              <Link className="rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white" href={'/jobs/new'}>
            Post a job
          </Link>
              <button onClick={() => signOut()} className="text-neutral-300 hover:text-neutral-200">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-neutral-300 hover:text-neutral-200">
                Login
              </Link>
              <Link href="/register" className="text-neutral-300 hover:text-neutral-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
