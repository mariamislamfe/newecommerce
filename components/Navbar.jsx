"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

// Icons components
const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const BagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
      clipRule="evenodd"
    />
  </svg>
);

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
        width={128}
        height={40}
      />

      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4">
        <Image
          className="w-4 h-4"
          src={assets.search_icon}
          alt="search icon"
          width={16}
          height={16}
        />
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/cart")}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Cart"
            >
              <CartIcon />
            </button>
            <button
              onClick={() => router.push("/my-orders")}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="My Orders"
            >
              <BagIcon />
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image
              src={assets.user_icon}
              alt="user icon"
              width={20}
              height={20}
            />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/cart")}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Cart"
            >
              <CartIcon />
            </button>
            <button
              onClick={() => router.push("/my-orders")}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="My Orders"
            >
              <BagIcon />
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image
              src={assets.user_icon}
              alt="user icon"
              width={20}
              height={20}
            />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
