import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (req: any, { params }: any) => {
  const frame = await prisma.frame.findUnique({
    where: {
      id: params?.id as string,
    },
  });
  return NextResponse.json(frame);
};

export const PUT = async (req: Request, { params }: any) => {
  console.log({ params });

  const data = await req.json();
  console.log({ data });

  try {
    const framedata = await prisma.frame.update({
      where: { id: params.id as string },
      data: data,
    });
    return NextResponse.json(framedata);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.error();
  }

  // console.log("user", user);
  //const data = NextResponse.json(query);
};
