import { Users } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Users>();
export const columns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstname", {
    cell: (info) => <p className="text-black">{info.getValue()}</p>,
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor("lastname", {
    cell: (info) => <p className="text-black ">{info.getValue()}</p>,
    header: () => "Last Name",
  }),
  columnHelper.accessor("contact", {
    cell: (info) => <p className="tablep">{info.getValue()}</p>,
    header: () => "Contact",
  }),
  columnHelper.accessor("email", {
    cell: (info) => <p className="tablep">{info.getValue()}</p>,
    header: () => "Email",
  }),
  columnHelper.accessor("Occupation", {
    header: () => "Occupation",
    cell: (info) => <p className="tablep">{info.renderValue()}</p>,
  }),
  columnHelper.accessor("totalorder", {
    header: () => "Total Order",
    cell: (info) => <p className="tablep">{info.getValue()}</p>,
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
