import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (res: NextApiResponse, req: NextApiRequest) => {
  // const { startDate, endDate } = req.query;

  // console.log(startDate);

  // const startDate = "2024-05-05";
  // // const endDate = "2024-05-05";
  // const dateObject = new Date(startDate + "T13:35:37.518Z");

  try {
    const { dates } = req.query;
    if (!dates) {
      return res.status(400).json({ error: "Dates parameter is missing" });
    }
    const datesString = Array.isArray(dates) ? dates[0] : dates;

    const [startingdate, endingdate] = datesString.split(",");

    // const { startDate, endDate } = req.query;
    // const url = new URL(req.url);
    // const startDate = url.searchParams.get("q");
    // const endDate = url.searchParams.get("c");
    // // const endDate = url.searchParams.get("endDate");
    // // console.log("hello");

    // if (typeof startDate !== "string" || typeof endDate !== "string") {
    //   throw new Error("Invalid request");
    // }

    // const startDate = "2024-05-05";
    // const endDate = "2024-05-05";

    const orderdatewise = await prisma.order.findMany({
      where: {
        date: {
          gte: startingdate, // Greater than or equal to start date
          lte: endingdate, // Less than or equal to end date
        },
      },
    });

    return NextResponse.json(orderdatewise);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Internal server error " });
  }
};
