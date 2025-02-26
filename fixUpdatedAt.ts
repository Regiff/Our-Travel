import prisma from "@lib/prismadb";

async function fixUpdatedAt() {
  await prisma.blog.updateMany({
    where: {
      updatedAt: null, // Find all records with null updatedAt
    },
    data: {
      updatedAt: new Date(), // Set it to the current timestamp
    },
  });

  console.log("Fixed updatedAt fields");
}

fixUpdatedAt().catch(console.error);
