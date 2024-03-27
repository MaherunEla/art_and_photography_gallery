import { PrismaClient } from "@prisma/client";

import { getServerSession, type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
//import prisma from "@/app/utils/connect";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),

  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          // Query the user from the database using Prisma

          // if (!credentials || !credentials.username || !credentials.password) {
          //   return null; // Return null if credentials are not provided or incomplete
          // }
          const user = await prisma.signup.findFirst({
            where: {
              email: email,
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

  pages: {
    signIn: "/login",
  },
};

export const getAuthSession = () => getServerSession(options);
