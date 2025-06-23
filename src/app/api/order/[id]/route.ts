import { Status, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/connect";
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
  console.log({ data });

  if (data.status === "Deliverd") {
    const prevrevenue = await prisma.order.aggregate({
      _sum: { revenue: true },

      where: {
        status: "Deliverd",
      },
    });

    const prevRevenueSum = prevrevenue._sum?.revenue || 0;

    const nowrevenue = await prisma.order.aggregate({
      _sum: { revenue: true },

      where: {
        id: params?.id,
      },
    });

    const nowRevenue = nowrevenue._sum?.revenue || 0;

    const totalRevenue = prevRevenueSum + nowRevenue;

    const updatestatus = await prisma.order.update({
      where: { id: params?.id as string },
      data: { ...data, totalrevenue: totalRevenue },
    });

    console.log(updatestatus);
    return NextResponse.json(updatestatus);
  } else {
    const updatestatus = await prisma.order.update({
      where: { id: params?.id as string },
      data: data,
    });
    return NextResponse.json(updatestatus);
  }
};
export const DELETE = async (req: any, { params }: any) => {
  const OrderDelete = await prisma.order.delete({
    where: { id: params?.id as string },
  });
  return NextResponse.json({ OrderDelete });
};
