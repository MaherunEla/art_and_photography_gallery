"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebarpage from "./layout/sidebar/page";
const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className=" p-5 rounded-[10px] bg-[#182237] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="bg-[#182237] p-2 rounded-md">
                <Menu className="text-white" size={20} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-[#151c2c] w-[260px] p-5 border-none"
            >
              <Sidebarpage />
            </SheetContent>
          </Sheet>
        </div>
        <div className="text-[#b7bac1] font-bold capitalize">
          {pathname.split("/").pop()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
