import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (req: any) => {
  const order = await prisma.order.findMany({
    where: { status: { equals: "Deliverd" } },
  });
  return NextResponse.json(order);
};
