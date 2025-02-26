import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";
import Tag from "@components/ui/Tag";
import Overlay from "@components/ui/Overlay";
import Link from "next/link";
import { PostTypes } from "types/postTypes";

const UserCard: React.FC<{ post: PostTypes }> = ({
  post,
}) => {
  return (
    <article className="relative rounded-lg overflow-hidden">
      <div className="w-[500px] h-[250px] relative">
        {post.img && (
          <Image
            src={post.img}
            fill
            alt={`image for ${post.title}`}
            className="object-cover"
          />
        )}
        <Overlay />
      </div>

      <div className="absolute w-full h-full top-0 p-5 flex flex-col justify-between">
        <div>
          <Tag text={post.category} />

          <h3 className="text-3xl font-extrabold uppercase text-white">
            {post.title}
          </h3>
        </div>
      </div>

      <Link
        href={`/blog/${post.id}`}
        className="absolute bottom-0 right-0 bg-tertiary p-5 text-white rounded-tl-lg z-6 cursor-pointer"
      >
        <AiOutlineArrowRight size={25} />
      </Link>
    </article>
  );
};

export default UserCard;
