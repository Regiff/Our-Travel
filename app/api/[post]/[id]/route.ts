import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prismadb";


export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  try {
    const post = await prisma.blog.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }),
        { status: 404 }
      );
    }

    // Ensure 'featured' property exists and is set to false if not present
    const postWithFeatured = {
      ...post,
      featured: post.featured ?? false, // Default 'featured' to false if missing
    };

    return new NextResponse(JSON.stringify(postWithFeatured), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
