import { MdOutlineDashboard } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { BsBoxSeamFill } from "react-icons/bs";
import { BsStack } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";

export const navigation = [
  {
    href: "javascript:void(0)",
    name: "Dashboard",
    icon: MdOutlineDashboard,
  },
  {
    href: "javascript:void(0)",
    name: "Products",
    icon: GiWallet,
  },
  {
    href: "javascript:void(0)",
    name: "Orders",
    icon: BsBoxSeamFill,
  },
  {
    href: "javascript:void(0)",
    name: "Sales",
    icon: BsStack,
  },
];

export const navsFooter = [
  {
    href: "",
    name: "Revenue",
    icon: FaChartLine,
  },
  {
    href: "/dashboard/artist",
    name: "Artists",
    icon: BsPeopleFill,
  },
  {
    href: "/dashboard/users",
    name: "Users",
    icon: FaUserCircle,
  },
  {
    href: "javascript:void(0)",
    name: "Report",
    icon: BiSolidReport,
  },
];
