import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (req: any) => {
  const upload = await prisma.upload.findMany({
    where: { permission: "Accepted", cimage: { not: null } },
  });
  return NextResponse.json(upload);
};
