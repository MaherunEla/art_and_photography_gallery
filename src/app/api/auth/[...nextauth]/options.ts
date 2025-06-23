import { getServerSession, type NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/utils/connect";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
    updateAge: 15 * 60,
  },
  jwt: {
    maxAge: 60 * 60,
  },

  pages: {
    signIn: "/login",

    error: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user = await prisma.signup.findFirst({
            where: {
              email: email,
              userstatus: "Active",
            },
          });

          if (user && bcrypt.compareSync(password, user.password)) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessTokenExpires = Math.floor(Date.now() / 1000) + 60 * 60;
      }

      if (
        token.accessTokenExpires &&
        Date.now() / 1000 > token.accessTokenExpires
      ) {
        return Promise.reject(new Error("Session expired"));
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.id;
      session.user.role = token.role;
      session.expires = new Date(token.accessTokenExpires * 1000).toISOString();

      if (
        token.accessTokenExpires &&
        typeof token.accessTokenExpires === "number"
      ) {
        session.expires = new Date(
          token.accessTokenExpires * 1000
        ).toISOString();
      } else {
        session.expires = new Date().toISOString();
      }

      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(options);
