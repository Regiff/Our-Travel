"use server"

import prisma from "@lib/prismadb"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  const desc = formData.get("description") as string
  const cat = formData.get("category") as string
  const userEmail = formData.get("email") as string
  const image = formData.get("image") as string
  const content = formData.get("content") as string
  const topPost = true; 
  
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail
    }
  })

  if (!user) {
    throw new Error("User not found")
  }

  await prisma.blog.create({
    data: {
      img: image,
      title: title,
      desc: desc,
      category: cat,
      content: content, 
      topPost: topPost, 
      user: {
        connect: { email: userEmail }, // Link the blog to the user using their email
      },
    }
  })

  const blogsWithNullUserId = await prisma.blog.findMany({
    where: { userId: null },
  });
  
  console.log(blogsWithNullUserId);

  revalidatePath("/create")
}

export async function deletePost(formData: FormData) {
  const id = formData.get("postId") as string

  await prisma.blog.delete({
    where: {
      id: id
    }
  })

  revalidatePath("/userposts")
}