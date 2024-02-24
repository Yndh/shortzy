import NextAuth from "next-auth";

interface User {
  id: string;
  email: string;
  image: string;
  name: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
}
