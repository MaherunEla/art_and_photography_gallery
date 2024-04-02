import { Order } from "@/types";
import { format } from "date-fns";
import { AccessorFn, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

import Link from "next/link";

const columnHelper = createColumnHelper<Order>();
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "d MMM, yyyy");
};
export const columns = [
  // columnHelper.accessor("id", {
  //   header: () => "ID",
  //   cell: (info) => info.getValue(),
  // }),

  columnHelper.accessor("formdata", {
    cell: (info) => {
      const form = info.getValue();
      return (
        <div>
          <h3>{form.name}</h3>
        </div>
      );
    },
    header: () => "Name",
  }),
  columnHelper.accessor("formdata", {
    cell: (info) => {
      const form = info.getValue();
      return (
        <div>
          <h3>{form.contact}</h3>
        </div>
      );
    },
    header: () => "Contact",
  }),
  columnHelper.accessor("formdata", {
    cell: (info) => {
      const form = info.getValue();
      return (
        <div>
          <h3>{form.address}</h3>
        </div>
      );
    },
    header: () => "Address",
  }),
  columnHelper.accessor("formdata", {
    cell: (info) => {
      const form = info.getValue();
      return (
        <div>
          <h3>{form.ordernote}</h3>
        </div>
      );
    },
    header: () => "Note",
  }),

  columnHelper.accessor("product", {
    cell: (info) => {
      const products = info.getValue();
      return (
        <div>
          {products.map((e: any, index: any) => (
            <span key={index} className="flex flex-col gap-2">
              {e.title} ({e.quantity})
            </span>
          ))}
        </div>
      );
    },
    header: () => "Product",
  }),
  columnHelper.accessor("product", {
    cell: (info) => {
      const products = info.getValue();
      return (
        <div>
          {products.map((e: any, index: any) => (
            <span key={index} className="flex flex-col gap-2">
              {e.artist}
            </span>
          ))}
        </div>
      );
    },
    header: () => "Artist",
  }),
  columnHelper.accessor("total", {
    cell: (info) => <p>{info.getValue().toFixed(2)}</p>,
    header: () => "Total",
  }),
  columnHelper.accessor("status", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Status",
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => <p>{formatDate(info.getValue())}</p>,
    header: () => "Date",
  }),

  // columnHelper.accessor("totalorder", {
  //   header: () => "Total Order",
  //   cell: (info) => <p>{info.getValue()}</p>,
  // }),
  //   columnHelper.accessor("view", {
  //     header: () => "",
  //     cell: (info) => (
  //       <Link href={`/dashboard/product/view/${info.row.original.id}`}>
  //         <button className="px-[10px] py-[5px] rounded-[5px] text-white border-none cursor-pointer bg-teal-600">
  //           View
  //         </button>
  //       </Link>
  //     ),
  //   }),
  //   columnHelper.accessor("delete", {
  //     header: () => "",
  //     cell: (info) => <Deletebutton id={`${info.row.original.id}`} />,
  //   }),

  // columnHelper.accessor("icon", {
  //   header: () => "",
  //   cell: (info) => {
  //     const Icon = info.getValue();
  //     const id = info.row.original.id;
  //     return <DropdownMenuDemo id={id} />;
  //   },
  // }),
];
