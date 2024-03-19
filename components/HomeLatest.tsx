import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HomeGalleryData } from "./HomeGallery";

const HomeLatest = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
            Latest
          </h2>

          <Link
            href="/gallery"
            className="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
          >
            Show more
          </Link>
        </div>

        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {HomeGalleryData.map((item, index) => (
            <div key={index}>
              <Link
                href="#"
                className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-gray-100 lg:mb-3 "
              >
                <div className="h-full w-full related">
                  <Image
                    src={item.img}
                    loading="lazy"
                    alt="Photo by Rachit Tank"
                    className="object-cover object-center transition duration-200 group-hover:scale-110"
                    fill
                  />
                </div>

                {/* <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                  sale
                </span> */}
              </Link>

              <div>
                <a
                  href="#"
                  className="hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
                >
                  {item.title}
                </a>

                <div className="flex items-end gap-2">
                  <span className="font-bold text-gray-800 lg:text-lg">
                    {item.price}
                  </span>
                  <span className="mb-0.5 text-red-500 line-through">
                    {item.discount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLatest;
