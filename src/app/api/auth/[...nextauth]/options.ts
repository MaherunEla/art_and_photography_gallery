import { getServerSession, type NextAuthOptions } from "next-auth";

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

          // Check if the user exists and if the provided password matches
          if (user && user.password === password) {
            return user; // Return the user object if authentication succeeds
          } else {
            return null; // Return null if authentication fails
          }
        } catch (error) {
          // Handle any errors that occur during the database query
          console.error("Error during authentication:", error);
          return null; // Return null in case of errors
        }

        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials

        //const user = { id: "42", name: "ela", password: "abc" };

        // if (
        //   credentials?.username === user.name &&
        //   credentials?.password === user.password
        // ) {
        //   return user;
        // } else {
        //   return null;
        // }
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
