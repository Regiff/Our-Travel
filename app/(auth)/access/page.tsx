"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Authenticated");
      router.push("/");
    }
  }, [status, router]);

  const socialAction = async (action: string) => {
    setIsLoading(true);
    setError(null); // Clear any previous error

    try {
      const callback = await signIn(action, { redirect: false });

      if (callback?.error) {
        if (callback.error === "OAuthAccountNotLinked") {
          setError("This email is linked to another provider. Use the original login method.");
        } else {
          setError("An error occurred. Please try again.");
        }
      }

      if (callback?.ok && !callback?.error) {
        router.push("/");
      }
    } catch (error) {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-24 sm:mx-auto sm:max-w-4xl px-5">
      <div className="bg-white shadow sm:rounded-lg flex gap-5 justify-between h-96 overflow-hidden">
        <div className="mt-6 flex gap-2 flex-col justify-center items-center mx-auto">
          <Link href="/" className="mb-5">
            <h1 className="text-3xl font-extrabold text-secondary">
              Our<span className="text-primary">Travels</span>
            </h1>
          </Link>
          <span className="text-sm-justity-center m-4">Log in or Sign up with the links below</span>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {isLoading ? (
            <p className="text-sm text-gray-500">Processing...</p>
          ) : (
            <>
              <GoogleLoginButton onClick={() => socialAction("google")} disabled={isLoading} />
              <FacebookLoginButton onClick={() => socialAction("facebook")} disabled={isLoading} />
              <GithubLoginButton onClick={() => socialAction("github")} disabled={isLoading} />
            </>
          )}
        </div>

        <Image
          src="/assets/access.jpg"
          height={500}
          width={500}
          alt="Sign up form image"
          className="object-cover w-full hidden lg:block"
        />
      </div>
    </div>
  );
};

export default Page;
