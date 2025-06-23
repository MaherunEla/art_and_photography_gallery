import { NextResponse } from "next/server";

import { prisma } from "@/app/utils/connect";

import { Permission } from "@prisma/client";

export const GET = async (req: Request) => {
  try {
    const upload = await prisma.upload.findMany({
      where: {
        permission: Permission.Accepted,
        cimage: { not: null },
      },
    });

    return NextResponse.json(upload);
  } catch (error) {
    console.error("Error fetching uploads:", error);
    return NextResponse.json(
      { error: "Failed to fetch uploads" },
      { status: 500 }
    );
  }
};
