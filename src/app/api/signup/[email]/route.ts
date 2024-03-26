import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const GET = async (req: any, { params }: any) => {
  console.log(params);

  const query = await prisma.signup.findUnique({
    where: { email: params?.email as string },
  });
  return NextResponse.json(query);
};
