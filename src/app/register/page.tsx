"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }

    const r = await register({ email, password, name });

    if (r?.error) {
      setError(r.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        ref={ref}
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(ref.current!);
          await handleSubmit(formData);
          if (!error) ref.current?.reset(); // Reset the form only if there's no error
        }}
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 border border-solid border-black bg-white rounded"
      >
        {error && <div className="text-red-500">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold">Register</h1>
        <label className="w-full text-sm">Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
          name="name"
          aria-required="true"
        />
        <label className="w-full text-sm">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
          name="email"
          aria-required="true"
        />
        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
            name="password"
            aria-required="true"
          />
        </div>
        <button
          type="submit"
          className="w-full border border-solid border-black py-1.5 mt-2.5 rounded transition duration-150 ease hover:bg-black"
        >
          Sign up
        </button>
        <Link
          href="/login"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
        >
          Already have an account?
        </Link>
      </form>
    </section>
  );
}
