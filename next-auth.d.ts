import { User } from "@/types/interfaces";
import { Role } from "@prisma/client";

import "next-auth/jwt";

// type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      role: Role;
    };

    // user: User & {
    //   id: UserId;
    //   role: Role;
    // };
  }
}
