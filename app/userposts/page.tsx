import prisma from "@lib/prismadb";
import getCurrentUser from "../actions/getCurrentUser";
import UserCard from "@components/shared/UserCard";
import DeletePosts from "@components/shared/DeletePosts";
const page = async () => {
  const user = await getCurrentUser();
  const posts = await prisma.blog.findMany({
    where: {
      userId: user?.id ?? undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  
  const sanitizedPosts = posts.map(post => ({
    ...post,
    updatedAt: post.updatedAt || new Date() // Fallback in case of null
  }));
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {!user ? (
        <h1 className="text-3xl font-extrabold">
          Sign in to view your post!
        </h1>
      ) : (
        <div className="min-h-screen flex flex-col">
          <div className="w-auto text-center mb-5">
            <h1 className="text-3xl font-extrabold text-tertiary">
              Hello {user?.name}
            </h1>
            <span className="text-lg">
              You have published {posts.length} posts
            </span>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-10">
            {posts.map((post) => (
              <div key={post.id} className="relative">
                <UserCard post={post as any} />
                <DeletePosts post={post as any} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;