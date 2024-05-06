import { Order } from "@/types";

import { AccessorFn, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

const columnHelper = createColumnHelper<Order>();

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
              {e.title}, {e.frameName} ({e.quantity})
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
    cell: (info) => <p>{info.getValue().substring(0, 10)}</p>,
    header: () => "Date",
  }),
  columnHelper.accessor("icon", {
    header: () => "",
    cell: (info) => (
      <Link href={`/orderinvoice/${info.row.original.id}`}>
        <button className="px-[10px] py-[5px] rounded-[5px] text-white border-none cursor-pointer bg-teal-600">
          Invoice
        </button>
      </Link>
    ),
  }),
];
