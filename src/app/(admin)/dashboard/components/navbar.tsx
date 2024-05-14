"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="max-w-screen-xl p-5 rounded-[10px] bg-[#182237] flex items-center justify-between">
      <div className="text-[#b7bac1] font-bold capitalize">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-5">{/* <MdOutlineChat size={20} /> */}</div>
      </div>
    </div>
  );
};

export default Navbar;
