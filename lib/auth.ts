import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "ecoco-local-development-secret",
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        username: { label: "帳號", type: "text" },
        password: { label: "密碼", type: "password" }
      },
      async authorize(credentials) {
        const username = process.env.ADMIN_USERNAME ?? "admin";
        const password = process.env.ADMIN_PASSWORD ?? "admin123";

        if (credentials?.username === username && credentials?.password === password) {
          return { id: "admin", name: "ECOCO Admin", email: "admin@ecoco.local" };
        }

        return null;
      }
    })
  ],
  callbacks: {
    session({ session }) {
      return session;
    }
  }
};
