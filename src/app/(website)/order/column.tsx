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
    cell: (info) => {
      const Color = info.getValue();
      if (Color == "Pending") {
        return (
          <div>
            <p className="p-1 w-[75px] text-center border border-yellow-400 bg-yellow-400 rounded-md">
              {info.getValue()}
            </p>
          </div>
        );
      }
      if (Color == "InProgress") {
        return (
          <p className="p-1 w-[100px] text-center border border-teal-400 bg-teal-400 rounded-md">
            {info.getValue()}
          </p>
        );
      }
      if (Color == "Deliverd") {
        return (
          <p className="p-1 text-center w-[80px] border border-cyan-450 bg-cyan-450 rounded-md">
            {info.getValue()}
          </p>
        );
      }
      if (Color == "Cancel") {
        return (
          <p className="p-1 w-[70px] text-center border border-red-400 bg-red-400 rounded-md">
            {info.getValue()}
          </p>
        );
      }
    },
    header: () => "Status",
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => <p>{formatDate(info.getValue())}</p>,
    header: () => "Date",
  }),
];
