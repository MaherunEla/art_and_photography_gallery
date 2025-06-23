import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/app/utils/connect";

export const GET = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const uploads = await prisma.upload.findMany({
      where: {
        userEmail: params?.email,
        permission: "Accepted",
      },
    });
    return NextResponse.json(uploads);
  } catch (error) {
    console.error("Error fetching uploads:", error);
    return NextResponse.json(
      { error: "Failed to fetch uploads" },
      { status: 500 }
    );
  }
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
  console.log("id:", params?.email);

  const productDelete = await prisma.upload.delete({
    where: { id: params?.email as string },
  });
  return NextResponse.json(productDelete);
};
