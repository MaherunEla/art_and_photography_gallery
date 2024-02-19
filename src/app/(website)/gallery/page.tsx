import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HomeGalleryData } from "../components/home/components/HomeGallery";

const Gallerypage = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          {/* <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Gallery
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated.
          </p> */}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {HomeGalleryData.map((item, index) => (
            <div key={index}>
              <Link
                href={`/gallery/${item.slug}`}
                className="group relative block h-96 overflow-hidden rounded-t-lg bg-gray-100"
              >
                <Image
                  src={item.img}
                  loading="lazy"
                  alt="Photo by Vladimir Fedotov"
                  className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  fill
                />
              </Link>

              <div className="flex items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                <div className="flex flex-col">
                  <Link
                    href="#"
                    className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg"
                  >
                    {item.title}
                  </Link>
                  <span className="text-sm text-gray-500 lg:text-base">
                    by {item.author}
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="font-bold text-gray-600 lg:text-lg">
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

export default Gallerypage;
