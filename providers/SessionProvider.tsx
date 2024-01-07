"use client";

import { SessionProvider } from "next-auth/react";

interface sessionProps {
  children: React.ReactNode;
}

function NextAuthSessionProvider({ children }: sessionProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthSessionProvider;
