import { connectDB } from "@/utils/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || typeof credentials.email !== "string") {
          throw new Error("Invalid email or password");
        }

        if (!credentials.password || typeof credentials.password !== "string") {
          throw new Error("Invalid email or password");
        }

        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? "";
        token.email = user.email ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Custom error page
  },
};
