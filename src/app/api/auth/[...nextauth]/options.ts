import { getServerSession, type NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/utils/connect";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
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
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.role = token.role;

      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(options);
