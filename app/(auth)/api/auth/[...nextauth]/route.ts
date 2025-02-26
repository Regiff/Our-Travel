import NextAuth from "next-auth";
import { authConfig } from "@lib/auth";

const handler = NextAuth(authConfig);

declare module 'next-auth' {
    interface Session {
      user: {
        id: string;  // Ensure that `id` is recognized by TypeScript
        name: string;
        email: string;
        image?: string | null;
      };
    }
  }

export { handler as GET, handler as POST, };