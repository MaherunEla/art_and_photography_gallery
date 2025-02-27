import { Order } from "@/types";
import { format } from "date-fns";
import { AccessorFn, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

import Link from "next/link";

const columnHelper = createColumnHelper<Order>();

export const columns = [
  // columnHelper.accessor("id", {
  //   header: () => "ID",
  //   cell: (info) => info.getValue(),
  // }),

  columnHelper.accessor("product", {
    cell: (info) => {
      const products = info.getValue();
      return (
        <div>
          {products.map((e: any, index: any) => (
            <span key={index} className="flex flex-col gap-2">
              {e.title} {e.frameName} ({e.quantity})
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
    cell: (info) => <p> ৳ {info.getValue().toFixed(2)}</p>,
    header: () => "Total",
  }),
  columnHelper.accessor("revenue", {
    cell: (info) => <p> ৳ {info.getValue().toFixed(2)}</p>,
    header: () => "Revenue",
  }),
  columnHelper.accessor("totalrevenue", {
    cell: (info) => <p> ৳ {info.getValue().toFixed(2)}</p>,
    header: () => "Total Revenue",
  }),

  columnHelper.accessor("createdAt", {
    cell: (info) => <p>{info.getValue().substring(0, 10)}</p>,
    header: () => "Date",
  }),
];
