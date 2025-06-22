"use client";
import Image from "next/image";
import React from "react";
import { navigation, navsFooter } from "./sidebardata";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Sidebarpage = () => {
  const { data: session, status } = useSession();
  const defaultImage = "/assets/images/home/admin.jpg";

  console.log({ session });
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 relative">
          <Image
            src={session?.user?.image || (defaultImage as any)}
            width={48}
            height={48}
            className="rounded-full border border-white"
            alt="Admin"
          />
        </div>

        <div>
          <p className=" text-sm font-semibold text-white">Admin</p>
          <p className="text-xs text-gray-400">Administrator</p>
        </div>
      </div>

      <ul className="flex-1 space-y-2">
        {navigation.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.href}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-[#2e374a] text-white "
            >
              <item.icon size={18} />

              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="space-y-2 pt-4 border-t border-[#2e374a]">
        {navsFooter.map((item, idx) => (
          <li key={idx}>
            {item.name === "Logout" ? (
              <a
                onClick={() => signOut()}
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-[#2e374a] w-full text-left text-white cursor-pointer"
              >
                <item.icon size={18} />

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
  );
};

export default Sidebarpage;
