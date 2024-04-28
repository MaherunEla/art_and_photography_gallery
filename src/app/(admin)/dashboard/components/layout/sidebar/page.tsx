import Image from "next/image";
import React from "react";
import { navigation, navsFooter } from "./sidebardata";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Sidebarpage = () => {
  return (
    <nav className="top-0 left-0 w-full h-full border-r bg-[#182237] space-y-8 sm:w-[290px]  border border-gray-900">
      <div className="flex flex-col h-full">
        <div className="py-10 px-4 ">
          <div className="flex items-center gap-x-4 relative">
            <Image
              src="/assets/images/home/admin.jpg"
              width={50}
              height={50}
              className="rounded-full border-4 border-gray-300"
              alt=""
            />
            <div>
              <span className="block text-white text-sm font-semibold">
                Admin
              </span>
              <span className="block text-white text-sm font-semibold">
                Administrator
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col h-full overflow-auto">
          <ul className="px-4 text-sm font-medium flex-1">
            {navigation.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="flex items-center gap-x-2 font-semibold text-white p-2 rounded-lg   hover:bg-[#2e374a] active:bg-[#2e374a] duration-150"
                >
                  <item.icon className="text-white " size={25} />

                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <ul className="px-4 pb-4 text-sm font-medium">
              {navsFooter.map((item, idx) => (
                <li key={idx}>
                  {item.name === "Logout" ? (
                    <a
                      onClick={() => signOut()}
                      className="flex items-center gap-x-2 text-white text-normal font-bold p-2 rounded-lg   hover:bg-[#2e374a] active:bg-[#2e374a] duration-150 cursor-pointer"
                    >
                      <div className="text-white">
                        <item.icon className="text-white " size={20} />
                      </div>
                      {item.name}
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center gap-x-2 text-white text-normal font-bold p-2 rounded-lg   hover:bg-[#2e374a] active:bg-[#2e374a] duration-150"
                    >
                      <div className="text-white">
                        <item.icon className="text-white " size={20} />
                      </div>
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebarpage;
