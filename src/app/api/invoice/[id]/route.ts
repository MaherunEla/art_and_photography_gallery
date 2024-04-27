import { Status, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export const GET = async (req: any, { params }: any) => {
  console.log(params);

  const lastOrder = await prisma.order.findMany({
    where: {
      userEmail: params.id, // Filter orders by userEmail
    },
    orderBy: {
      createdAt: "desc", // Sort by createdAt field in descending order
    },
    take: 1, // Limit the result to 1 record
  });

  return NextResponse.json(lastOrder[0]);
};
