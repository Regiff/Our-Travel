
import { User } from "@prisma/client";

export interface PostTypes {
  id: string;
  createdAt: string | Date
  title: string;
  img: string | null;
  desc: string;
  featured: boolean;
  topPost: boolean;
  category: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image?: string | null; // ✅ Make sure image is included
  };
};
