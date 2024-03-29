import { Users } from "@/types";
import { AccessorFn, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

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
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Created at",
  }),
  columnHelper.accessor("role", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Role",
  }),
  columnHelper.accessor("Occupation", {
    header: () => "Occupation",
    cell: (info) => <p>{info.renderValue()}</p>,
  }),
  columnHelper.accessor("totalorder", {
    header: () => "Total Order",
    cell: (info) => <p>{info.getValue()}</p>,
  }),
  columnHelper.accessor("view", {
    header: () => "",
    cell: (info) => (
      <button className="px-[10px] py-[5px] rounded-[5px] text-white border-none cursor-pointer bg-teal-600">
        View
      </button>
    ),
  }),
  columnHelper.accessor("delete", {
    header: () => "",
    cell: (info) => (
      <button className="px-[10px] py-[5px] rounded-[5px] text-white border-none cursor-pointer bg-red-600">
        Delete
      </button>
    ),
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
