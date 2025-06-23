import { NextResponse } from "next/server";

import { prisma } from "@/app/utils/connect";

export const GET = async (req: any) => {
  try {
    const upload = await prisma.upload.findMany({
      where: { permission: "Accepted", cimage: { not: null } },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
    return NextResponse.json(upload);
  } catch (error) {
    console.error("Error geting latest gallery:", error);
    return NextResponse.error();
  }
};
