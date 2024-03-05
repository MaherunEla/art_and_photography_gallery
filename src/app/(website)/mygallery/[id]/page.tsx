import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12">
          My Gallery
        </h2>

        <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mb-8 md:grid-cols-4 md:gap-6 xl:gap-8">
          <Link
            href="/mygallery/edit/d/"
            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
          >
            <Image
              src="/assets/images/home/1.jpg"
              loading="lazy"
              alt=""
              fill
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

            <span className="relative ml-4 mb-3 inline-block text-sm rounded-lg bg-red-600 px-3 py-1.5 uppercase tracking-wider text-white  md:ml-5 md:text-lg">
              Edit
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
