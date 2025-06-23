"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NavbarData } from "./NavbarData";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import { DropdownMenuDemo } from "./DropDownMenu";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import { addAllCart } from "@/app/redux_store/cartAddSlice";
import { signOut, useSession } from "next-auth/react";
import { AdProduct } from "@/types";

const Navbar = () => {
  const { data: session, status } = useSession();

  console.log({ session });

  const currentRoute = usePathname();

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state?.cart?.products);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("cart")!);

    console.log({ products });
    if (products) {
      dispatch(addAllCart(products));
    }
  }, [dispatch]);

  const [navbar, setnavbar] = useState(false);
  console.log("Cart", cart?.length);
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="flex items-center justify-between py-4  md:py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <svg
              width="95"
              height="94"
              viewBox="0 0 95 94"
              className="h-auto w-6 text-indigo-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>
            Aesthete
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NavbarData.map((item, index) => (
              <Link
                href={item.href}
                className={`text-lg font-semibold text-gray-600 transition hover:text-indigo-500  ${
                  currentRoute === item.href ? "text-indigo-700" : " "
                }`}
                key={index}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4 ">
            <Link href="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              <span className="absolute top-0 right-0 -mt-1 -mr-2 text-[12px] bg-red-600 h-[18px] w-[18px]  rounded-full grid place-items-center text-white">
                {cart?.length}
              </span>
            </Link>

            {session ? (
              <DropdownMenuDemo user={session?.user} />
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-300"
              >
                Log In
              </Link>
            )}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center gap-2 rounded-lg bg-gray-200 p-2 hover:bg-gray-300"
            onClick={() => setnavbar(!navbar)}
          >
            {navbar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </button>
        </header>
        {navbar && (
          <nav className="flex flex-col items-start space-y-4 mt-4  md:hidden">
            {NavbarData.map((item, index) => (
              <Link
                href={item.href}
                className={`text-base font-semibold text-gray-600 hover:text-indigo-500  ${
                  currentRoute === item.href ? "text-indigo-700" : " "
                }`}
                key={index}
              >
                {item.title}
              </Link>
            ))}

            <Link href="/cart" className="relative flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              <span className="absolute -mt-2 ml-4 text-xs bg-red-600 h-5 w-5 rounded-full grid place-items-center text-white">
                {cart?.length}
              </span>
            </Link>

            {session ? (
              <DropdownMenuDemo user={session?.user} />
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-300"
              >
                Log In
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
