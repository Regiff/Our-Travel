import Tag from "@components/ui/Tag";
import Image from "next/image";

import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";
import { PostTypes } from "../../../types/postTypes";
import { formatDate } from "utils/formatDate";

// Fetch data based on the post id
const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post data");
  }

  return res.json();
};

// Update typing of params to match expected constraints
interface PageProps {
  params: Promise<PostTypes>; // Expecting a promise wrapped around PostTypes
}

const page = async ({ params }: PageProps) => {
  // Wait for params to resolve
  const resolvedParams = await params;
  const { id } = resolvedParams; // id should be of type string based on your PostTypes
  const post = await getData(id);

  return (
    <div className="w-[95%] mx-auto max-w-[1450px]">
      <div className="w-full h-[400px] relative mb-5">
        <Image
          fill
          alt="image for blog"
          src={post.img || "/default-image.png"} // Use default image if none exists
          className="object-contain"
          unoptimized={true}
        />
      </div>

      <Tag text={post.category} />
      <h2 className="text-4xl font-extrabold uppercase text-tertiary my-3">
        {post.title}
      </h2>

      <div className="flex md:gap-20 gap-5 relative mt-10 md:flex-row flex-col">
        <aside className="md:sticky md:top-3/4 md:h-screen">
          <span className="uppercase text-2xl font-extrabold text-tertiary">
            Share:
          </span>
          <div className="flex text-3xl gap-5 text-gray-400 mt-2 [&>*]:border">
            <AiOutlineFacebook />
            <AiOutlineInstagram />
            <AiOutlineTwitter />
          </div>
        </aside>

        <article>
          <p className="text-xl">{post.desc}</p>

          <div className="mt-5 flex gap-5 items-center">
            <Image
              src={post.user?.image || "/default-avatar.png"}
              width={600}
              height={800}
              alt={`Image of ${post.user?.name || "Unknown User"}`}
            />

            <div className="flex gap-1 flex-col">
              <span>{post.user?.name || "Unknown Author"}</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default page;
