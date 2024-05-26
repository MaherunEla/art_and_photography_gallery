import { Users } from "@/types";

import { AccessorFn, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Deletebutton from "./deletebutton";
import Link from "next/link";

const columnHelper = createColumnHelper<Users>();

const nameAndImageAccessor: AccessorFn<Users> = (row) => {
  const { name, image } = row;
  return { name, image };
};

export const columns = [
  // columnHelper.accessor("id", {
  //   header: () => "ID",
  //   cell: (info) => info.getValue(),
  // }),

  columnHelper.accessor("image", {
    cell: (info) => (
      <div className="w-[30px] h-[30px] relative">
        <Image src={info.getValue()} alt="" className="rounded-full " fill />
      </div>
    ),
    header: () => "",
  }),

  columnHelper.accessor("name", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Name",
  }),

  columnHelper.accessor("email", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Email",
  }),
  columnHelper.accessor("contact", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Contact",
  }),
  columnHelper.accessor("createdat", {
    cell: (info) => <p>{info.getValue().substring(0, 10)}</p>,
    header: () => "Created at",
  }),
  columnHelper.accessor("role", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Role",
  }),
  columnHelper.accessor("userstatus", {
    cell: (info) => {
      const Color = info.getValue();
      if (Color == "Active") {
        return (
          <div>
            <p className="p-1 w-[75px] text-center border border-green-900 bg-green-900 rounded-md">
              {info.getValue()}
            </p>
          </div>
        );
      }
      if (Color == "Inactive") {
        return (
          <p className="p-1 w-[100px] text-center border border-red-900 bg-red-900 rounded-md">
            {info.getValue()}
          </p>
        );
      }
    },
    header: () => "Status",
  }),
  columnHelper.accessor("occupation", {
    header: () => "Occupation",
    cell: (info) => <p>{info.renderValue()}</p>,
  }),
  // columnHelper.accessor("totalorder", {
  //   header: () => "Total Order",
  //   cell: (info) => <p>{info.getValue()}</p>,
  // }),
  columnHelper.accessor("view", {
    header: () => "",
    cell: (info) => (
      <Link href={`/dashboard/users/view/${info.row.original.email}`}>
        <button className="px-[10px] py-[5px] rounded-[5px] text-white border-none cursor-pointer bg-teal-600">
          View
        </button>
      </Link>
    ),
  }),
  // columnHelper.accessor("delete", {
  //   header: () => "",
  //   cell: (info) => <Deletebutton id={`${info.row.original.email}`} />,
  // }),

  // columnHelper.accessor("icon", {
  //   header: () => "",
  //   cell: (info) => {
  //     const Icon = info.getValue();
  //     const id = info.row.original.id;
  //     return <DropdownMenuDemo id={id} />;
  //   },
  // }),
];
