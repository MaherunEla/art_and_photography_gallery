import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (req: any) => {
  const order = await prisma.order.findMany({
    where: { NOT: [{ status: { equals: "Deliverd" } }] },
  });
  return NextResponse.json(order);
};

export async function POST(req: Request) {
  const data = await req.json();

  const res = await prisma.order.create({
    data: { ...data, totalrevenue: 0 },
  });
  return NextResponse.json(res);
}
