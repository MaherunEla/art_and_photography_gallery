import React from "react";

const HomeTeam = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-8 md:mb-12">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Our Team by the numbers
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Behind every masterpiece in our gallery, there&apos;s a passionate
            team dedicated to bringing art and photography to life. Get to know
            us through the lens of numbers:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8">
            <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
              15+
            </div>
            <div className="text-sm font-semibold sm:text-base">
              Talented Artists
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
            <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
              500+
            </div>
            <div className="text-sm font-semibold sm:text-base">
              Captured Moments
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
            <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
              1000+
            </div>
            <div className="text-sm font-semibold sm:text-base">Customers</div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
            <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
              2000+
            </div>
            <div className="text-sm font-semibold sm:text-base">
              Hours of Creativity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTeam;
