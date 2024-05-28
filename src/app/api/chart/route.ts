import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/utils/connect";

export const GET = async (req: any) => {
  try {
    // Get the current date
    const today = new Date();

    // Initialize an array to store revenue totals for each month
    const revenueByMonth: { name: string; Total: number }[] = [];

    // Iterate through the last 6 months
    for (let i = 5; i >= 0; i--) {
      // Calculate the start and end dates for the current month
      const startDate = new Date(today);
      startDate.setMonth(today.getMonth() - i, 1);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(today);
      endDate.setMonth(today.getMonth() - i + 1, 0);
      endDate.setHours(23, 59, 59, 999);

      // Get the name of the current month
      const monthName = startDate.toLocaleString("default", { month: "long" });

      // Aggregate the sum of revenue for orders created within the current month
      const revenueResult = await prisma.order.aggregate({
        _sum: { revenue: true },
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          status: "Deliverd",
        },
      });

      // Extract the sum of revenue from the aggregation result
      const revenue = revenueResult._sum?.revenue || 0;

      // Add the month name and revenue total to the array
      revenueByMonth.push({ name: monthName, Total: revenue });
    }

    // Return the array of revenue totals for the last 6 months
    return NextResponse.json(revenueByMonth);
  } catch (error) {
    console.error("Error fetching revenue by month:", error);
    return NextResponse.error();
  }
};
