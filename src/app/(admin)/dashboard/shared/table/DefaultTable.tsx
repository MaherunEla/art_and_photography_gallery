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

const DefaultTable: FC<{ data: any; columns: any; filtering: any }> = ({
  data,
  columns,
  filtering,
}) => {
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: filtering,
  });

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
    table.setPageSize(newSize);
  };

  console.log("table state", table.getState());

  return (
    <div>
      <table id="order" className="w-full text-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-start">
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-[10px]  text-white ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-[50px] flex justify-between ">
        <div>
          <p className="tablep text-white">
            show {table.getState().pagination.pageSize} in {data.length} items
          </p>
        </div>
        <div className="text-white">
          <label htmlFor="pageSize">Page Size: </label>
          <select
            id="pageSize"
            value={pageSize}
            className="bg-[#151c2c]"
            onChange={handlePageSizeChange}
          >
            <option value="10">10</option>
            <option value="5">5</option>
            <option value="2">2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="flex items-center gap-[10px]">
          <button
            className="border border-[#2e374a] active:border-[#2e374a] active:bg-[#151c2c]  bg-gray-300 w-[100px] h-[30px] cursor-pointer"
            onClick={() => table.setPageIndex(0)}
          >
            First Page
          </button>
          <button
            disabled={!table.getCanPreviousPage()}
            className="border border-[#2e374a] active:border-[#2e374a] active:bg-[#151c2c]  bg-gray-300 w-[30px] h-[30px] cursor-pointer"
            onClick={() => table.previousPage()}
          >
            <GrFormPrevious className="ml-[4px] text-[#151c2c]" />
          </button>

          <button
            disabled={!table.getCanNextPage()}
            className="border border-[#2e374a] active:border-[#2e374a] active:bg-[#151c2c]  bg-gray-300 w-[30px] h-[30px] cursor-pointer"
            onClick={() => table.nextPage()}
          >
            <MdNavigateNext className="ml-[4px] text-[#151c2c]" />
          </button>
          <button
            className="border border-[#2e374a] active:border-[#2e374a] active:bg-[#151c2c]  bg-gray-300 w-[100px] h-[30px] cursor-pointer"
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
