import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const GET = async (req: NextResponse) => {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");
    const product = await prisma.upload.findMany({
      where: {
        OR: [
          {
            title: { contains: query || "" },
          },
          {
            description: {
              contains: query || "",
            },
          },
          {
            artist: {
              contains: query || "",
            },
          },
        ],
      },
    });
    return new NextResponse(JSON.stringify({ product, status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "SomeThing Went wrong", status: 200 })
    );
  }
};
