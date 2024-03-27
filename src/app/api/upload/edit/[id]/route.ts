import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const GET = async (req: any, { params }: any) => {
  const uploads = await prisma.upload.findUnique({
    where: {
      id: params?.id as string,
    },
  });
  return NextResponse.json(uploads);
};

export const PUT = async (req: Request, { params }: any) => {
  console.log({ params });

  const data = await req.json();
  console.log({ data });

  try {
    const mygallerydata = await prisma.upload.update({
      where: { id: params.id as string },
      data: data,
    });
    return NextResponse.json(mygallerydata);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.error();
  }

  // console.log("user", user);
  //const data = NextResponse.json(query);
};
