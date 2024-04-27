import { MdOutlineDashboard } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { BsBoxSeamFill } from "react-icons/bs";
import { BsStack } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { TiHome } from "react-icons/ti";
import { IoLogOut } from "react-icons/io5";

export const navigation = [
  {
    href: "/dashboard",
    name: "Dashboard",
    icon: MdOutlineDashboard,
  },
  {
    href: "/dashboard/product",
    name: "Products",
    icon: GiWallet,
  },
  {
    href: "/dashboard/order",
    name: "Orders",
    icon: BsBoxSeamFill,
  },
  {
    href: "/dashboard/sales",
    name: "Sales",
    icon: BsStack,
  },
  {
    href: "/dashboard/revenue",
    name: "Revenue",
    icon: FaChartLine,
  },

  {
    href: "/dashboard/users",
    name: "Users",
    icon: FaUserCircle,
  },
];

export const navsFooter = [
  {
    href: "/",
    name: "Home",
    icon: TiHome,
  },
  {
    href: "",
    name: "Logout",
    icon: IoLogOut,
  },
];
