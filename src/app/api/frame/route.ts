import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (req: any) => {
  const frame = await prisma.frame.findMany();
  return NextResponse.json(frame);
};

export async function POST(req: Request) {
  const data = await req.json();

  const res = await prisma.frame.create({
    data: data,
  });
  return NextResponse.json(res);
}
