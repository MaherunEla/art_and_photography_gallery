import { Status, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/connect";

export const GET = async (req: any, { params }: any) => {
  console.log(params);

  const lastOrder = await prisma.order.findMany({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(lastOrder[0]);
};
