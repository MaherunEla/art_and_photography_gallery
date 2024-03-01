import Image from "next/image";
import React from "react";
import { navigation, navsFooter } from "./sidebardata";
import Link from "next/link";

const Sidebarpage = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-80">
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-8">
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
          </div>
          <div className="flex-1 flex flex-col h-full overflow-auto">
            <ul className="px-4 text-sm font-medium flex-1">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-x-2 font-semibold text-gray-600 p-2 rounded-lg hover:text-indigo-500 active:text-indigo-500  hover:bg-gray-50 active:bg-gray-100 duration-150"
                  >
                    <item.icon className="text-[#222] " size={25} />

                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <ul className="px-4 pb-4 text-sm font-medium">
                {navsFooter.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:text-indigo-500 active:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 duration-150"
                    >
                      <div className="text-gray-500">
                        <item.icon className="text-[#222] " size={20} />
                      </div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="py-10 px-4 border-t">
                <div className="flex items-center gap-x-4 relative">
                  <Image
                    src="/assets/images/home/admin.jpg"
                    width={50}
                    height={50}
                    className="rounded-full border-4 border-gray-300"
                    alt=""
                  />
                  <div>
                    <span className="block text-gray-700 text-sm font-semibold">
                      Alivika tony
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebarpage;
