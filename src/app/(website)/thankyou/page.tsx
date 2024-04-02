import Link from "next/link";
import React from "react";
import { IoMdCloudDone } from "react-icons/io";

const page = () => {
  return (
    <div className=" py-6 sm:py-8 lg:py-12">
      <div className="bg-gradient-to-r from-indigo-100  mx-auto max-w-screen-2xl px-4 md:px-8 py-6">
        <div className="mb-10 md:mb-16 flex flex-col items-center">
          <IoMdCloudDone className="text-green-700 w-[60px] h-[60px]" />
          <h2 className="mb-4 text-center text-2xl font-bold text-orange-800 md:mb-6 lg:text-3xl">
            Your order has been placed
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-lg items-center justify-center ">
          <p>Thank you for using Aesthete</p>
          <Link href="/gallery">
            <button className="uppercase inline-block sm:col-span-2 rounded-lg bg-indigo-500  px-5 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
