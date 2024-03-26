import { options } from "@/app/api/auth/[...nextauth]/options";
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
import { signOut } from "next-auth/react";
// import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { FaRegUser } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

import { MdOutlineCloudUpload } from "react-icons/md";
import { RiLuggageCartLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

export function DropdownMenuDemo(user: any) {
  console.log("Image", user?.user?.image);
  const defaultImage = "/assets/images/home/defaultimage.jpg";
  // const session = await getServerSession(options);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={user?.user?.image || (defaultImage as any)}
          //src=""
          width={50}
          height={50}
          className="rounded-full border-4 border-gray-300"
          alt=""
          // alt={session?.user?.name ?? "Profile Pic"}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-1 font-semibold">
            <FaRegUser size={15} />
            <Link href="/profile/h">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-1 font-semibold">
            <MdOutlineCloudUpload size={15} />
            <Link href="/upload/h">Upload</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-1 font-semibold">
            <GrGallery size={15} />
            <Link href="/mygallery/h">My Gallery</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-1 font-semibold">
            <RiLuggageCartLine size={15} />
            <Link href="/order/h">Orders</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-1 font-semibold cursor-pointer"
        >
          <TbLogout size={15} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
