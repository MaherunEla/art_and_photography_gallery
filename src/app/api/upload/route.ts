import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const GET = async (req: any) => {
  const uploads = await prisma.upload.findMany();
  return NextResponse.json(uploads);
};

export async function POST(req: Request) {
  const data = await req.json();

  const res = await prisma.upload.create({
    data: data,
  });
  return NextResponse.json(res);
}
