export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import { prisma } from "@/app/utils/connect";

export const GET = async (req: any) => {
  const upload = await prisma.upload.findMany();
  return NextResponse.json(upload);
};
