import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const GET = async (req: any) => {
  const order = await prisma.order.findMany();
  return NextResponse.json(order);
};

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);

  const res = await prisma.order.create({
    data: data,
  });
  return NextResponse.json(res);
}
