import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (req: any) => {
  const frame = await prisma.frame.findMany({
    where: { stockstatus: "Stock" },
  });
  return NextResponse.json(frame);
};
