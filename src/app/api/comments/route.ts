import { getAuthSession } from "../auth/[...nextauth]/options";
import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get(" productId");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(productId && { productId }),
      },
      include: { user: true, product: true },
    });

    return new NextResponse(JSON.stringify({ comments, status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "SomeThing went wrong!", status: 500 })
    );
  }
};

export const POST = async (req: any) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!", status: 401 })
    );
  }
  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session?.user?.email },
    });
    return new NextResponse(JSON.stringify({ comment, status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "SomeThing went wrong!", status: 500 })
    );
  }
};
