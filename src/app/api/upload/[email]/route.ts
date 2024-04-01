import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const GET = async (req: any, { params }: any) => {
  const uploads = await prisma.upload.findMany({
    where: {
      userEmail: params?.email as string,
    },
  });
  return NextResponse.json(uploads);
};

export async function POST(req: Request, { params }: any) {
  console.log({ params });

  const data = await req.json();

  const res = await prisma.upload.create({
    data: {
      ...data,
      userEmail: params?.email as string,
    },
  });
  return NextResponse.json(res);
}

export const DELETE = async (req: Request, { params }: any) => {
  const prisma = new PrismaClient();
  console.log("id:", params?.email);

  const productDelete = await prisma.upload.delete({
    where: { id: params?.email as string },
  });
  return NextResponse.json(productDelete);
};
