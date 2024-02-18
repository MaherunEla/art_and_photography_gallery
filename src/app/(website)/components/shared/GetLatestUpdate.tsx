import Image from "next/image";
import React from "react";

const GetLatestUpdate = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex overflow-hidden rounded-lg bg-gray-100">
          <div className="relative hidden bg-gray-200 sm:block sm:w-1/3 lg:w-1/2">
            <Image
              src="/assets/images/home/newsletter.jpg"
              loading="lazy"
              alt="Photo by mymind"
              className="absolute inset-0 h-full w-full object-cover object-center"
              fill
            />
          </div>

          <div className="flex w-full items-center p-4 sm:w-2/3 sm:p-8 lg:w-1/2 lg:pl-10">
            <div className="flex w-full flex-col items-center sm:block">
              <div className="mb-4 sm:mb-8">
                <h2 className="text-center text-xl font-bold text-indigo-500 sm:text-left sm:text-2xl lg:text-3xl">
                  Get the latest updates
                </h2>
                <p className="text-center text-gray-500 sm:text-left">
                  Sign up for our newsletter
                </p>
              </div>

              <form className="mb-3 flex w-full max-w-md gap-2 sm:mb-5">
                <input
                  placeholder="Email"
                  className="bg-gray-white w-full flex-1 rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />

                <button className="inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                  Send
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 sm:text-left">
                By signing up to our newsletter you agree to our{" "}
                <a
                  href="#"
                  className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                >
                  Term of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetLatestUpdate;
