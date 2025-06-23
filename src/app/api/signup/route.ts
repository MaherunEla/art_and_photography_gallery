import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (req: any) => {
  const signup = await prisma.signup.findMany();
  return NextResponse.json(signup);
};

export async function POST(req: Request) {
  const data = await req.json();
  const { password, ...rest } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const res = await prisma.signup.create({
    data: {
      ...rest,
      password: hashedPassword,
    },
  });
  return NextResponse.json(res);
}
