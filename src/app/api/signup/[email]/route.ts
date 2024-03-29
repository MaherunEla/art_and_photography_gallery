import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const GET = async (req: any, { params }: any) => {
  console.log(params);

  const query = await prisma.signup.findUnique({
    where: { email: params?.email as string },
  });
  return NextResponse.json(query);
};

export const PUT = async (req: Request, { params }: any) => {
  console.log({ params });
  // const encodedEmail: string = params. as string;
  // const decodedEmail: string = decodeURIComponent(encodedEmail);
  // console.log({ encodedEmail });

  const data = await req.json();
  console.log({ data });

  try {
    const profiledata = await prisma.signup.update({
      where: { email: params.email as string },
      data: data,
    });
    return NextResponse.json(profiledata);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.error();
  }

  // console.log("user", user);
  //const data = NextResponse.json(query);
};
