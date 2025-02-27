import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (req: any) => {
  const signup = await prisma.signup.findMany();
  return NextResponse.json(signup);
};

export async function POST(req: Request) {
  const data = await req.json();

  const res = await prisma.signup.create({
    data: data,
  });
  return NextResponse.json(res);
}
