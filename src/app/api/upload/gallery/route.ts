import { NextResponse } from "next/server";

import { prisma } from "@/app/utils/connect";

import { Permission } from "@prisma/client";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const total = await prisma.upload.count({
      where: {
        permission: Permission.Accepted,
        cimage: { not: null },
      },
    });
    const upload = await prisma.upload.findMany({
      where: {
        permission: Permission.Accepted,
        cimage: { not: null },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      results: upload,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching uploads:", error);
    return NextResponse.json(
      { error: "Failed to fetch uploads" },
      { status: 500 }
    );
  }
};
