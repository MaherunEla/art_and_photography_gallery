import prisma from "@/app/utils/connect";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: NextResponse) => {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");
    console.log({ query });
    //const decodedQuery = query ? decodeURIComponent(query as string) : "";

    if (!query) {
      // If query is not provided or empty, return an empty array
      return new NextResponse(JSON.stringify({ products: [], status: 200 }));
    }
    // if (!query) {
    //   // If query is not provided, return an empty array
    //   return new NextResponse(JSON.stringify({ products: [], status: 200 }));
    // }

    const product = await prisma.upload.findMany({
      where: { category: { contains: query || "" } },
    });
    return new NextResponse(JSON.stringify({ product, status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "SomeThing Went wrong", status: 200 })
    );
  }
};
