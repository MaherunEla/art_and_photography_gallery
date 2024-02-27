import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { FaRegUser } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

import { MdOutlineCloudUpload } from "react-icons/md";
import { RiLuggageCartLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src="/assets/images/home/admin.jpg"
          width={50}
          height={50}
          className="rounded-full border-4 border-gray-300"
          alt=""
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-1 font-semibold">
            <FaRegUser size={15} />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-1 font-semibold">
            <MdOutlineCloudUpload size={15} />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-1 font-semibold">
            <GrGallery size={15} />
            My Gallery
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-1 font-semibold">
            <RiLuggageCartLine size={15} />
            Orders
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuItem className="flex items-center gap-1 font-semibold">
          <TbLogout size={15} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
