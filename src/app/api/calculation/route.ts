import { NextResponse } from "next/server";

import { prisma } from "@/app/utils/connect";

export const GET = async (req: any) => {
  try {
    const totaluser = await prisma.signup.aggregate({
      _count: { name: true },
      where: {
        userstatus: "Active",
      },
    });

    const countuser = totaluser._count?.name || 0;

    const totalproduct = await prisma.upload.aggregate({
      _count: { title: true },
      where: {
        permission: "Accepted",
        productstatus: "Notsale",
      },
    });

    const countproduct = totalproduct._count?.title || 0;

    const totalframe = await prisma.frame.aggregate({
      _count: { framename: true },
      where: {
        stockstatus: "Stock",
      },
    });

    const countframe = totalframe._count?.framename || 0;

    const revenue = await prisma.order.aggregate({
      _max: { totalrevenue: true },
      where: {
        status: "Deliverd",
      },
    });

    const totalrevenue = revenue._max?.totalrevenue || 0;

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todaysale = await prisma.order.aggregate({
      _sum: { revenue: true },
      where: {
        createdAt: {
          // Use Prisma's date functions to filter by today's date
          gte: startOfDay,
          lte: endOfDay,
        },
        status: "Deliverd",
      },
    });

    const totalRevenueToday = todaysale._sum?.revenue || 0;

    const lastWeekStart = new Date();
    lastWeekStart.setDate(today.getDate() - 7);
    lastWeekStart.setHours(0, 0, 0, 0);

    // Calculate the end date of last week (today)
    const lastWeekEnd = new Date();
    lastWeekEnd.setHours(23, 59, 59, 999);

    // Aggregate the sum of revenue for orders created in the last week
    const lastWeekSale = await prisma.order.aggregate({
      _sum: { revenue: true },
      where: {
        createdAt: {
          // Use Prisma's date functions to filter by the last week's date range
          gte: lastWeekStart,
          lte: lastWeekEnd,
        },
        status: "Deliverd",
      },
    });

    // Extract the sum of revenue from the aggregation result
    const totalRevenueLastWeek = lastWeekSale._sum?.revenue || 0;

    // Calculate the start and end dates for last month
    const startOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const endOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
      23,
      59,
      59,
      999
    );

    // Aggregate the sum of revenue for orders created last month
    const lastMonthSale = await prisma.order.aggregate({
      _sum: { revenue: true },
      where: {
        createdAt: {
          // Use Prisma's date functions to filter by last month's date range
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
        status: "Deliverd",
      },
    });

    // Extract the sum of revenue from the aggregation result
    const totalRevenueLastMonth = lastMonthSale._sum?.revenue || 0;

    // Calculate the start and end dates for the current week
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
    currentWeekStart.setHours(0, 0, 0, 0);

    const currentWeekEnd = new Date(today);
    currentWeekEnd.setDate(today.getDate() + (6 - today.getDay())); // End of the week (Saturday)
    currentWeekEnd.setHours(23, 59, 59, 999);

    // Calculate the start and end dates for the previous week
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(currentWeekStart.getDate() - 7);

    const previousWeekEnd = new Date(currentWeekEnd);
    previousWeekEnd.setDate(currentWeekEnd.getDate() - 7);

    // Aggregate the sum of revenue for orders created in the current week
    const currentWeekSale = await prisma.order.aggregate({
      _sum: { revenue: true },
      where: {
        createdAt: {
          gte: currentWeekStart,
          lte: currentWeekEnd,
        },
        status: "Deliverd",
      },
    });

    const totalRevenueCurrentWeek = currentWeekSale._sum?.revenue || 0;

    // Aggregate the sum of revenue for orders created in the previous week
    const previousWeekSale = await prisma.order.aggregate({
      _sum: { revenue: true },
      where: {
        createdAt: {
          gte: previousWeekStart,
          lte: previousWeekEnd,
        },
        status: "Deliverd",
      },
    });

    const totalRevenuePreviousWeek = previousWeekSale._sum?.revenue || 0;

    // Calculate the difference between the total revenues of the current week and the previous week
    const revenueDifference =
      (totalRevenueCurrentWeek - totalRevenuePreviousWeek) * 0.01;

    // Aggregate the count of users created in the current week
    const currentWeekUserCount = await prisma.signup.aggregate({
      _count: { name: true },
      where: {
        createdat: {
          gte: currentWeekStart,
          lte: currentWeekEnd,
        },
      },
    });

    const countUserCurrentWeek = currentWeekUserCount._count?.name || 0;

    // Aggregate the count of users created in the previous week
    const previousWeekUserCount = await prisma.signup.aggregate({
      _count: { name: true },
      where: {
        createdat: {
          gte: previousWeekStart,
          lte: previousWeekEnd,
        },
      },
    });

    const countUserPreviousWeek = previousWeekUserCount._count?.name || 0;

    const userdifference =
      (countUserCurrentWeek - countUserPreviousWeek) * 0.01;

    // Aggregate the count of Product created in the current week
    const currentWeekProductCount = await prisma.upload.aggregate({
      _count: { title: true },
      where: {
        createdAt: {
          gte: currentWeekStart,
          lte: currentWeekEnd,
        },
        permission: "Accepted",
      },
    });

    const countProductCurrentWeek = currentWeekProductCount._count?.title || 0;

    // Aggregate the count of product created in the previous week
    const previousWeekProductCount = await prisma.upload.aggregate({
      _count: { title: true },
      where: {
        createdAt: {
          gte: previousWeekStart,
          lte: previousWeekEnd,
        },
        permission: "Accepted",
      },
    });

    const countProductPreviousWeek =
      previousWeekProductCount._count?.title || 0;

    const productdifference =
      (countProductCurrentWeek - countProductPreviousWeek) * 0.01;

    const totalArtist = await prisma.signup.aggregate({
      where: { role: "Artist" },
      _count: { name: true },
    });

    const countArtist = totalArtist._count?.name || 0;

    // Aggregate the count of Frame created in the current week
    const currentWeekFrameCount = await prisma.frame.aggregate({
      _count: { framename: true },
      where: {
        createdAt: {
          gte: currentWeekStart,
          lte: currentWeekEnd,
        },
      },
    });

    const countFrameCurrentWeek = currentWeekFrameCount._count?.framename || 0;

    // Aggregate the count of users created in the previous week
    const previousWeekFrameCount = await prisma.frame.aggregate({
      _count: { framename: true },
      where: {
        createdAt: {
          gte: previousWeekStart,
          lte: previousWeekEnd,
        },
      },
    });

    const countFramePreviousWeek =
      previousWeekFrameCount._count?.framename || 0;

    const framedifference =
      (countFrameCurrentWeek - countFramePreviousWeek) * 0.01;

    return NextResponse.json([
      countuser,
      countproduct,
      totalrevenue,
      totalRevenueToday,
      totalRevenueLastWeek,
      totalRevenueLastMonth,
      revenueDifference,
      userdifference,
      productdifference,
      countArtist,
      countframe,
      framedifference,
    ]);
  } catch (error) {
    console.error("Error fetching total users:", error);
    return NextResponse.error();
  }
};
