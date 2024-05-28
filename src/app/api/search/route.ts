import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q");

    if (typeof query !== "string") {
      throw new Error("Invalid request");
    }

    const words = query.split(" ").filter(Boolean); // Split query string into individual words
    const products = await Promise.all(
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

    const uniqueProducts = products.flat().filter((product, index, self) => {
      return (
        index ===
        self.findIndex((p) => p.id === product.id && p.title === product.title)
      );
    });

    return NextResponse.json({ product: uniqueProducts, status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
};
