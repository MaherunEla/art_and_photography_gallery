import { Product } from "@/types";
import { format } from "date-fns";
import { AccessorFn, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Deletebutton from "./deletebutton";
import Link from "next/link";

const columnHelper = createColumnHelper<Product>();

const nameAndImageAccessor: AccessorFn<Product> = (row) => {
  const { title, image } = row;
  return { title, image };
};

export const columns = [
  // columnHelper.accessor("id", {
  //   header: () => "ID",
  //   cell: (info) => info.getValue(),
  // }),

  columnHelper.accessor("image", {
    cell: (info) => (
      <div className="w-[80px] h-[80px] relative">
        <Image src={info.getValue()} alt="" className="rounded-[10px] " fill />
      </div>
    ),
    header: () => "",
  }),

  columnHelper.accessor("title", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Title",
  }),

  columnHelper.accessor("description", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Description",
  }),
  columnHelper.accessor("artist", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Author",
  }),
  columnHelper.accessor("price", {
    cell: (info) => <p>{info.getValue().toFixed(2)}</p>,
    header: () => "price",
  }),
  columnHelper.accessor("discount", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Discount",
  }),

  // columnHelper.accessor("totalorder", {
  //   header: () => "Total Order",
  //   cell: (info) => <p>{info.getValue()}</p>,
  // }),
  columnHelper.accessor("view", {
    header: () => "",
    cell: (info) => (
      <Link href={`/dashboard/product/view/${info.row.original.id}`}>
        <button className="px-[10px] py-[5px] rounded-[5px] text-white border-none cursor-pointer bg-teal-600">
          View
        </button>
      </Link>
    ),
  }),
  columnHelper.accessor("delete", {
    header: () => "",
    cell: (info) => <Deletebutton id={`${info.row.original.id}`} />,
  }),

  // columnHelper.accessor("icon", {
  //   header: () => "",
  //   cell: (info) => {
  //     const Icon = info.getValue();
  //     const id = info.row.original.id;
  //     return <DropdownMenuDemo id={id} />;
  //   },
  // }),
];
