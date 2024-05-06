import { Frame } from "@/types";
import { format } from "date-fns";
import { AccessorFn, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

import Link from "next/link";

const columnHelper = createColumnHelper<Frame>();

export const columns = [
  // columnHelper.accessor("id", {
  //   header: () => "ID",
  //   cell: (info) => info.getValue(),
  // }),

  columnHelper.accessor("frameimage", {
    cell: (info) => (
      <div className="w-[80px] h-[80px] relative">
        <Image src={info.getValue()} alt="" className="rounded-[10px] " fill />
      </div>
    ),
    header: () => "",
  }),

  columnHelper.accessor("framename", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Frame Name",
  }),

  columnHelper.accessor("frameprice", {
    cell: (info) => <p>{info.getValue().toFixed(2)}</p>,
    header: () => "Price",
  }),
  columnHelper.accessor("stockstatus", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Status",
  }),

  // columnHelper.accessor("permission", {
  //   cell: (info) => <p>{info.getValue()}</p>,
  //   header: () => "Permission",
  // }),

  // columnHelper.accessor("totalorder", {
  //   header: () => "Total Order",
  //   cell: (info) => <p>{info.getValue()}</p>,
  // }),

  columnHelper.accessor("view", {
    header: () => "",
    cell: (info) => (
      <Link href={`/dashboard/frame/view/${info.row.original.id}`}>
        <button className="px-[10px] py-[5px] rounded-[5px] text-white border-none cursor-pointer bg-teal-600">
          View
        </button>
      </Link>
    ),
  }),
];
