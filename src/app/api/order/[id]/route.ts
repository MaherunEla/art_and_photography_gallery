import { Status, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export const GET = async (req: any, { params }: any) => {
  console.log(params);

  const query = await prisma.order.findUnique({
    where: { id: params?.id as string },
  });

  // console.log("user", user);
  return NextResponse.json(query);
};

export const PUT = async (req: Request, { params }: any) => {
  const data = await req.json();
  console.log(data);

  const updatestatus = await prisma.order.update({
    where: { id: params?.id as string },
    data: data,
  });

  console.log(updatestatus);

  return NextResponse.json(updatestatus);
};
export const DELETE = async (req: any, { params }: any) => {
  const prisma = new PrismaClient();

  const OrderDelete = await prisma.order.delete({
    where: { id: params?.id as string },
  });
  return NextResponse.json({ OrderDelete });
};
