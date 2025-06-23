import { Stockstatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/app/utils/connect";

export const GET = async (req: Request) => {
  try {
    const frame = await prisma.frame.findMany({
      where: { stockstatus: Stockstatus.Stock },
    });

    return NextResponse.json(frame);
  } catch (error) {
    console.error("Error fetching frames:", error);
    return NextResponse.json(
      { error: "Failed to fetch frame data" },
      { status: 500 }
    );
  }
};
