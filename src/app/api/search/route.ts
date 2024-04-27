import prisma from "@/app/utils/connect";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: NextResponse) => {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    if (!query) {
      // If query is not provided, return an empty array
      return new NextResponse(JSON.stringify({ products: [], status: 200 }));
    }

    const words = query.toUpperCase().split(" ");
    const firstLetters = words.map((word) => word.charAt(0));
    console.log(words);

    const product = await prisma.upload.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query || "",
            },
          },
          {
            title: {
              startsWith: firstLetters[0],
            },
          },
          {
            description: {
              contains: query || "",
            },
          },
          {
            description: {
              startsWith: firstLetters[0],
            },
          },
          {
            artist: {
              contains: query || "",
            },
          },
          {
            artist: {
              startsWith: firstLetters[0],
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
