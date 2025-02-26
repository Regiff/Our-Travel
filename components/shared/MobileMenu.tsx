import { useState, useEffect } from "react";
import { CgMenuGridO, CgClose } from "react-icons/cg";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaSquareSnapchat,
} from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

import Button from "@components/ui/Button";
import { navLinks } from "constants/index";
import Link from "next/link";
import Route from "@components/ui/Route";
import useMenuActive from "hooks/useMenuActive";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface MobileMenuProps {
  user: User | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  // Disable scrolling when menu is open
  useEffect(() => {
    if (openMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobileMenu]);

  return (
    <>
      <button
        className="md:hidden"
        onClick={() => setOpenMobileMenu((prev) => !prev)}
        aria-label="Toggle mobile menu"
      >
        {openMobileMenu ? <CgClose size={25} /> : <CgMenuGridO size={25} />}
      </button>

      {openMobileMenu && (
        <div
          onClick={() => setOpenMobileMenu(false)}
          className="fixed w-full h-screen top-0 left-0 bg-black/25 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute h-screen left-0 top-0 w-60 bg-white z-[999] px-5 border-r overflow-y-auto flex flex-col gap-10"
          >
            <div className="border-b py-5 text-center">
              <Link href="/" onClick={() => setOpenMobileMenu(false)}>
                <h1 className="text-3xl font-extrabold text-secondary">
                  Our<span className="text-primary">Travels</span>
                </h1>
              </Link>

              <div className="flex gap-5 text-secondary flex-1 justify-center text-xl mt-5">
                <FaFacebookSquare />
                <FaSquareInstagram />
                <FaSquareXTwitter />
                <FaSquareSnapchat />
              </div>
            </div>

            <ul className="flex items-center justify-center gap-5 flex-col mt-5 py-10 border-b">
              {navLinks.map((link, index) => {
                const isActive = useMenuActive(link.route);

                return (
                  <li key={index}>
                    <Route
                      route={link.route}
                      label={link.label}
                      isActive={isActive}
                      onClick={() => setOpenMobileMenu(false)}
                    />
                  </li>
                );
              })}
            </ul>

            {!user ? (
              <div className="flex gap-5 flex-1 flex-col py-5">
                <Button text="Log In" onClick={() => null} aria="Log in button" />
                <Button text="Sign Up" onClick={() => null} aria="Sign up button" />
              </div>
            ) : (
              <div>
                <ul className="flex flex-col gap-5 items-center">
                  <Link href="/create" onClick={() => setOpenMobileMenu(false)}>
                    <li>Create a Post</li>
                  </Link>
                  <Link href="/userposts" onClick={() => setOpenMobileMenu(false)}>
                    <li>My Post</li>
                  </Link>
                  <li
                    onClick={() => void signOut()}
                    className="cursor-pointer text-red-500"
                  >
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
