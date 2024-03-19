import Image from "next/image";
import React from "react";

const HomeTestimonial = () => {
  return (
    <div className=" py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="bg-gray-100 rounded-lg py-8 flex flex-col items-center gap-4 md:gap-6">
          <a
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
          </a>

          <div className="max-w-lg  text-center text-gray-600 lg:text-lg">
            “Our gallery is a testament to the power of art and photography to
            inspire, evoke emotions, and transcend boundaries. it&apos;s a
            journey through stories told by visionaries.”
          </div>

          <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-14 md:w-14 ">
              <Image
                src="/assets/images/home/owner2.jpg"
                loading="lazy"
                alt="Photo by Radu Florin"
                className="h-full w-full object-cover object-center"
                width={48}
                height={48}
              />
            </div>

            <div>
              <div className="text-center text-sm font-bold text-indigo-500 sm:text-left md:text-base">
                John McCulling
              </div>
              <p className="text-center text-sm text-gray-500 sm:text-left md:text-sm">
                CEO / Aesthete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonial;
