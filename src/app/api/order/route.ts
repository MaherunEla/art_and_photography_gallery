import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const GET = async (req: any) => {
  const order = await prisma.order.findMany({
    where: { NOT: [{ status: { equals: "Deliverd" } }] },
  });
  return NextResponse.json(order);
};

export async function POST(req: Request) {
  const data = await req.json();

  // const totalrevenue = await prisma.order.aggregate({
  //   _sum: { revenue: true },
  // });

  // const totalRevenueSum = totalrevenue._sum?.revenue || 0;
  // const finalTotalRevenue = totalRevenueSum === 0 ? data.revenue : totalRevenueSum + data.revenue;

  const res = await prisma.order.create({
    data: { ...data, totalrevenue: 0 },
  });
  return NextResponse.json(res);
}
