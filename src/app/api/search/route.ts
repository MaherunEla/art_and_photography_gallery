export const dynamic = "force-dynamic";
import { prisma } from "@/app/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;
    if (!query) {
      return NextResponse.json({ results: [], total: 0, page, limit });
    }
    const results = await prisma.$queryRawUnsafe(
      `
  SELECT *
  FROM "Upload"
  WHERE "permission" = 'Accepted'
    AND "cimage" IS NOT NULL
    AND (
      similarity(title, $1) > 0.3
      OR similarity(artist, $1) > 0.3
      OR similarity(description, $1) > 0.3
      OR similarity(category, $1) > 0.3
    )
  ORDER BY GREATEST(
    similarity(title, $1),
    similarity(artist, $1),
    similarity(description, $1),
    similarity(category, $1)
  ) DESC
  LIMIT $2
  OFFSET $3
  `,
      query,
      limit,
      offset
    );

    const totalCountResult = await prisma.$queryRawUnsafe<{ count: number }[]>(
      `
  SELECT COUNT(*)::int AS count
  FROM "Upload"
  WHERE "permission" = 'Accepted'
    AND "cimage" IS NOT NULL
    AND (
      similarity(title, $1) > 0.3
      OR similarity(artist, $1) > 0.3
      OR similarity(description, $1) > 0.3
      OR similarity(category, $1) > 0.3
    )
  `,
      query
    );

    const total = totalCountResult[0]?.count || 0;

    return NextResponse.json({
      results,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
};
