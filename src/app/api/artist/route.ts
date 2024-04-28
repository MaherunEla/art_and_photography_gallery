import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (req: any) => {
  const signup = await prisma.signup.findMany({
    where: { role: "Artist" },
  });
  return NextResponse.json(signup);
};
