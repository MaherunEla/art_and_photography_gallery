import prisma from "@/app/utils/connect";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Upload } from "@prisma/client";
export const GET = async (req: NextResponse) => {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q");

    if (typeof query !== "string") {
      throw new Error("Invalid request");
    }

    const words = query.split(" ").filter(Boolean); // Split query string into individual words
    const product = await Promise.all(
      words.map(async (word) => {
        return await prisma.upload.findMany({
          where: {
            AND: [
              { permission: "Accepted" },
              {
                cimage: { not: null }, // Condition for cimage not being null
              },
              {
                OR: [
                  {
                    title: {
                      contains: word,
                      mode: "insensitive",
                    },
                  },
                  {
                    artist: {
                      contains: word,
                      mode: "insensitive",
                    },
                  },
                  {
                    description: {
                      contains: word,
                      mode: "insensitive",
                    },
                  },
                  {
                    category: {
                      contains: word,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            ],
          },
        });
      })
    );

    const uniqueProducts = product.flat().filter((product, index, self) => {
      return (
        index ===
        self.findIndex((p) => p.id === product.id && p.title === product.title)
      );
    });

    return new NextResponse(
      JSON.stringify({ product: uniqueProducts, status: 200 })
    );
    // const product: Array<Upload> = await prisma.upload.findMany({
    //   where: {
    //     OR: [
    //       {
    //         title: {
    //           contains: query,
    //           mode: "insensitive",
    //         },
    //       },
    //       {
    //         artist: {
    //           contains: query,
    //           mode: "insensitive",
    //         },
    //       },
    //       {
    //         description: {
    //           contains: query,
    //           mode: "insensitive",
    //         },
    //       },
    //       {
    //         category: {
    //           contains: query && (cate || ""),
    //           mode: "insensitive",
    //         },
    //       },
    //     ],
    //   },
    // });
    //   const url = new URL(req.url);
    //   const query = url.searchParams.get("query");

    //   if (!query) {
    //     // If query is not provided, return an empty array
    //     return new NextResponse(JSON.stringify({ products: [], status: 200 }));
    //   }

    //   const words = query.toUpperCase().split(" ");
    //   const firstLetters = words.map((word) => word.charAt(0));
    //   console.log(words);

    //   const product = await prisma.upload.findMany({
    //     where: {
    //       OR: [
    //         {
    //           title: {
    //             contains: query || "",
    //           },
    //         },
    //         {
    //           title: {
    //             startsWith: firstLetters[0],
    //           },
    //         },
    //         {
    //           description: {
    //             contains: query || "",
    //           },
    //         },
    //         {
    //           description: {
    //             startsWith: firstLetters[0],
    //           },
    //         },
    //         {
    //           artist: {
    //             contains: query || "",
    //           },
    //         },
    //         {
    //           artist: {
    //             startsWith: firstLetters[0],
    //           },
    //         },
    //       ],
    //     },
    //   });
    //return new NextResponse(JSON.stringify({ product, status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "SomeThing Went wrong", status: 200 })
    );
  }
};
