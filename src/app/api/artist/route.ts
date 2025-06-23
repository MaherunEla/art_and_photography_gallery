import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/app/utils/connect";

export const GET = async (req: Request) => {
  try {
    const signup = await prisma.signup.findMany({
      where: { role: "Artist" },
    });

    return NextResponse.json(signup);
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json(
      { error: "Failed to fetch artists." },
      { status: 500 }
    );
  }
};
