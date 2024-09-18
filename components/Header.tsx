"use client";

import Image from "next/image";
import Link from "next/link";
import LoginAndLogout from "./LoginAndLogout";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="w-full flex items-center justify-between px-6 py-4 md:px-12 md:py-5">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.svg" width={128} height={38} alt="Evently logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-[#4732d1] transition duration-300">
              Home
            </Link>
            <Link href="/events/create-event" className="hover:text-[#4732d1] transition duration-300">
              Create Event
            </Link>
            <Link href="/my-profile" className="hover:text-[#4732d1] transition duration-300">
              My Profile
            </Link>
            <LoginAndLogout />
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            {isMenuOpen ? (
              <HiX className="text-3xl cursor-pointer" onClick={toggleMenu} />
            ) : (
              <HiMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white z-50 p-4 shadow-lg md:hidden">
            <ul className="flex flex-col items-start space-y-4">
              <Link href="/" className="hover:text-[#4732d1] transition duration-300" onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/events/create-event" className="hover:text-[#4732d1] transition duration-300" onClick={toggleMenu}>
                Create Event
              </Link>
              <Link href="/my-profile" className="hover:text-[#4732d1] transition duration-300" onClick={toggleMenu}>
                My Profile
              </Link>
              <LoginAndLogout />
            </ul>
          </div>
        )}
      </header>
      <hr />
    </>
  );
}
