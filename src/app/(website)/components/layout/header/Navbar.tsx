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

  console.log({ status });

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
        <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
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

          <nav className="hidden gap-12  md:flex ">
            {NavbarData.map((item, index) => (
              <Link
                href={item.href}
                className={`text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500  ${
                  currentRoute === item.href ? "text-indigo-700" : " "
                }`}
                key={index}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-3 ">
            <div className="flex items-center gap-3 ">
              <Link
                href="/cart"
                className="flex w-12 h-12  flex-col items-center justify-center gap-1.5  "
              >
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

                <span className="absolute -mt-[18px] ml-[24px] text-[14px] bg-red-600 h-[18px] w-[18px]  rounded-full grid place-items-center text-white">
                  {cart?.length}
                </span>
              </Link>
            </div>
            {session ? (
              <>
                {/* <button
                  onClick={() => signOut()}
                  className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base md:inline-block"
                >
                  Log Out
                </button> */}

                <div>
                  <DropdownMenuDemo user={session?.user} />
                </div>
              </>
            ) : (
              <Link
                href="/signup"
                className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base md:inline-block"
              >
                Sign Up
              </Link>
            )}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base md:hidden"
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
        <nav
          className={`flex flex-col items-center space-y-6  md:hidden ${
            navbar ? "block" : "hidden"
          }`}
        >
          {NavbarData.map((item, index) => (
            <Link
              href={item.href}
              className={`text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500  ${
                currentRoute === item.href ? "text-indigo-700" : " "
              }`}
              key={index}
            >
              {item.title}
            </Link>
          ))}
          <div className="flex items-center gap-3 ">
            <Link
              href="/cart"
              className="flex w-12 h-12  flex-col items-center justify-center gap-1.5  "
            >
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

              <span className="absolute -mt-[18px] ml-[24px] text-[14px] bg-red-600 h-[18px] w-[18px]  rounded-full grid place-items-center text-white">
                {cart?.length}
              </span>
            </Link>
          </div>

          <Link
            href="/login"
            className=" rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
          >
            Log In
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
