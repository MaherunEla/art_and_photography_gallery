// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ["query", "error"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;

import { PrismaClient } from "@prisma/client";

const prismaOptions = {
  __internal: {
    engine: {
      statement_cache: false,
    },
  },
} as unknown as ConstructorParameters<typeof PrismaClient>[0];

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  process.env.NODE_ENV === "production"
    ? new PrismaClient(prismaOptions)
    : globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
