import { Order } from "@/types";
import { format } from "date-fns";
import { AccessorFn, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

import Link from "next/link";
import { DropdownMenuDemo } from "./dropdownmenudemo";

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
    cell: (info) => <p>{info.getValue().toFixed(2)}</p>,
    header: () => "Total",
  }),
  columnHelper.accessor("status", {
    cell: (info) => {
      const Color = info.getValue();
      if (Color == "Pending") {
        return (
          <div>
            <p className="p-1 w-[75px] text-center border border-yellow-700 bg-yellow-600 rounded-md">
              {info.getValue()}
            </p>
          </div>
        );
      }
      if (Color == "InProgress") {
        return (
          <p className="p-1 w-[100px] text-center border border-teal-900 bg-teal-900 rounded-md">
            {info.getValue()}
          </p>
        );
      }
      if (Color == "Deliverd") {
        return (
          <p className="p-1 text-center w-[80px] border border-cyan-950 bg-cyan-950 rounded-md">
            {info.getValue()}
          </p>
        );
      }
      if (Color == "Cancel") {
        return (
          <p className="p-1 w-[70px] text-center border border-red-900 bg-red-900 rounded-md">
            {info.getValue()}
          </p>
        );
      }
    },
    header: () => "Status",
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => <p>{info.getValue().substring(0, 10)}</p>,
    header: () => "Date",
  }),
  columnHelper.accessor("icon", {
    header: () => "",
    cell: ({ row, getValue }) => {
      const Icon = getValue();
      const id = row.original.id;
      return <DropdownMenuDemo row={row.original} />;
    },
  }),

  // columnHelper.accessor("totalorder", {
  //   header: () => "Total Order",
  //   cell: (info) => <p>{info.getValue()}</p>,
  // }),

  //   columnHelper.accessor("delete", {
  //     header: () => "",
  //     cell: (info) => <Deletebutton id={`${info.row.original.id}`} />,
  //   }),
];
