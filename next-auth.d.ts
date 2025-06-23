import { Role } from "@prisma/client";
import { User as CustomUser } from "@/types/interfaces";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User extends CustomUser {
    id: string;
    role: Role;
  }

  interface Session {
    user: CustomUser & {
      id: string;
      role: Role;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    accessTokenExpires: number;
  }
}
