import { prisma } from "@/app/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: any, { params }: any) => {
  console.log(params);

  const query = await prisma.order.findMany({
    where: { userEmail: params?.email as string },
  });

  // console.log("user", user);
  return NextResponse.json(query);
};
