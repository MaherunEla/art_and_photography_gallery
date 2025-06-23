import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/app/utils/connect";

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
export const DELETE = async (req: Request, { params }: any) => {
  console.log("id:", params?.email);

  // const userDelete = await prisma.signup.delete({
  //   where: { email: params?.email as string },
  //   include: { upload: true },
  // });

  try {
    // Find the Signup record by email
    const signup = await prisma.signup.findUnique({
      where: { email: params.email as string },
      include: { upload: true }, // Include the associated uploads
    });

    if (!signup) {
      throw new Error("Signup record not found.");
    }

    // Delete associated Upload records
    await prisma.upload.deleteMany({
      where: { userEmail: params.email as string },
    });

    // Delete the Signup record
    const deleteuser = await prisma.signup.delete({
      where: { email: params.email as string },
    });

    return NextResponse.json(deleteuser);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user.");
  } finally {
    // Close the Prisma client connection
    await prisma.$disconnect();
  }
};
