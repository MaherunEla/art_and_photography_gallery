import { options } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { TiShoppingCart } from "react-icons/ti";
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
import { signOut, useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { FaRegUser } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

import { MdOutlineCloudUpload } from "react-icons/md";
import { RiLuggageCartLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/navigation";

export function DropdownMenuDemo(user: any) {
  console.log("Image", user?.user?.image);

  const defaultImage = "/assets/images/home/defaultimage.jpg";
  // const session = await getServerSession(options);

  const router = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status !== "authenticated") {
    router.push("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-[50px] h-[50px] relative" asChild>
        <Image
          src={user?.user?.image || (defaultImage as any)}
          //src=""
          width={30}
          height={30}
          className="rounded-full border-4 border-gray-300 "
          alt=""
          // alt={session?.user?.name ?? "Profile Pic"}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`/profile/${user?.user?.email}`}
              className="flex items-center gap-1 font-semibold"
            >
              <FaRegUser size={15} />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/upload/${user?.user?.email}`}
              className="flex items-center gap-1 font-semibold"
            >
              <MdOutlineCloudUpload size={15} />
              Upload
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/mygallery/${user?.user?.email}`}
              className="flex items-center gap-1 font-semibold"
            >
              <GrGallery size={15} />
              My Gallery
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/order/${user?.user?.email}`}
              className="flex items-center gap-1 font-semibold"
            >
              <RiLuggageCartLine size={15} />
              Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/sales/${user?.user?.email}`}
              className="flex items-center gap-1 font-semibold"
            >
              <TiShoppingCart size={15} />
              Sales
            </Link>
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
