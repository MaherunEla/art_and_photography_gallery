"use client";
import React, { FC, useState } from "react";
import { MdNavigateNext, MdOutlineFileDownload } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { flexRender, getCoreRowModel } from "@tanstack/react-table";

import {
  useReactTable,
  PaginationState,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { getJsPageSizeInKb } from "next/dist/build/utils";
import { Download } from "lucide-react";

const DefaultTable: FC<{ data: any; columns: any }> = ({ data, columns }) => {
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value);

    setPageSize(newSize);
    table.setPageSize(newSize);
  };

  console.log("table state", table.getState());
  var pages = Array.from(
    { length: table?.getPageCount() || 0 },
    (_, index) => index + 1
  );

  return (
    <div>
      <table id="order" className="w-full text-black">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-start py-4 px-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={row.index % 2 === 0 ? "bg-[#D6EEEE]" : ""}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-[10px] px-2 text-black ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-gray-700 text-sm md:text-base">
            show {table.getState().pagination.pageSize} in {data.length} items
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <label htmlFor="pageSize">Page Size: </label>
          <select
            id="pageSize"
            value={pageSize}
            className="rounded-md border border-gray-300 px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handlePageSizeChange}
          >
            <option value="10">10</option>
            <option value="5">5</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-md  bg-indigo-500 text-white hover:bg-indigo-600 transition cursor-pointer"
            onClick={() => table.setPageIndex(0)}
          >
            First Page
          </button>
          <button
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => table.previousPage()}
          >
            <GrFormPrevious className="text-lg" />
          </button>

          <button
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => table.nextPage()}
          >
            <MdNavigateNext className="text-lg" />
          </button>
          <button
            className="px-3 py-1.5 rounded-md  bg-indigo-500 text-white hover:bg-indigo-600 transition cursor-pointer"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultTable;
