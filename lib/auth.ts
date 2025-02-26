import { NextAuthOptions, User, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@lib/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import GitHubProvider from "next-auth/providers/github";
import { ObjectId } from "mongodb";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
      
        const dbUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });
      
        if (!dbUser) throw new Error("No user found");
      
        if (!dbUser.password) throw new Error("This account uses OAuth. Please sign in with Google.");
      
        const isPasswordValid = await bcrypt.compare(credentials.password, dbUser.password);
        
        if (!isPasswordValid) throw new Error("Invalid credentials");
      
        return dbUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  adapter: PrismaAdapter(prisma),

  callbacks: {
    
async signIn({ user, account, profile }) {
  console.log("Account Data:", account); // Debugging

  if (!profile?.email) return false;

  const existingUser = await prisma.user.findUnique({
    where: { email: profile.email },
  });

  if (existingUser) {
    if (existingUser.provider !== account.provider) {
      throw new Error("OAuthAccountNotLinked");
    }
    return true;
  }

  // ✅ Corrected: Use ObjectId instead of random UUID
  const userId = new ObjectId().toString();

  await prisma.user.create({
    data: {
      id: userId, // ✅ Ensures MongoDB ObjectId format
      email: profile.email,
      name: profile.name,
      image: profile.picture,
      provider: account.provider,
      password: account.provider === "credentials" ? "hashedPasswordHere" : null,
    },
  });

  return true;
},

    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.userId = token.userId;
        session.user = {
          name: token.name,
          email: token.email,
          image: token.image,
        };
      }
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/"); // Redirect if no session
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/"); // Redirect if no session
  }
}
