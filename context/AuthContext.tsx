
"use client";

import { signIn, useSession } from "next-auth/react";

import { SessionProvider } from "next-auth/react";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({
  children,
}: AuthContextProps) {
  return <SessionProvider>
    {children}
    </SessionProvider>;
}
