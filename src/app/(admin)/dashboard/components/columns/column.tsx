import { Order } from "@/types";

import { AccessorFn, createColumnHelper } from "@tanstack/react-table";

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
  columnHelper.accessor("date", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Date",
  }),
  columnHelper.accessor("total", {
    cell: (info) => <p>{info.getValue().toFixed(2)}</p>,
    header: () => "Amount",
  }),
];
