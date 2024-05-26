import { NextResponse } from "next/server";

import prisma from "@/app/utils/connect";

export const GET = async (req: any) => {
  const order = await prisma.order.findMany({
    where: { NOT: [{ status: { equals: "Deliverd" } }] },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(order);
};

export async function POST(req: Request) {
  const data = await req.json();
  const today = new Date().toISOString().substring(0, 10);

  const res = await prisma.order.create({
    data: { ...data, totalrevenue: 0, date: today },
  });
  return NextResponse.json(res);
}
