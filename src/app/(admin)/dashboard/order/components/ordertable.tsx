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
  console.log({ pageSize });
  console.log("table state", table.getState());
  var pages = Array.from(
    { length: table?.getPageCount() || 0 },
    (_, index) => index + 1
  );

  return (
    <div className="w-full overflow-x-auto">
      <table id="order" className="min-w-[600px] w-full text-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-start px-4 py-2 text-sm sm:text-base"
                >
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
                <td
                  key={cell.id}
                  className="px-4 py-2 text-sm sm:text-base text-white"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="tablep text-white text-sm">
            show {table.getState().pagination.pageSize} in {data.length} items
          </p>
        </div>
        <div className="text-white text-sm">
          <label htmlFor="pageSize" className="mr-2">
            Page Size:{" "}
          </label>
          <select
            id="pageSize"
            value={pageSize}
            className="bg-[#151c2c] text-white p-1 rounded"
            onChange={handlePageSizeChange}
          >
            <option value="10">10</option>
            <option value="5">5</option>
            <option value="2">2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="border border-[#2e374a] bg-gray-300 text-black px-4 py-1 rounded hover:bg-[#151c2c] hover:text-white disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
          >
            First Page
          </button>
          <button
            disabled={!table.getCanPreviousPage()}
            className="border border-[#2e374a] bg-gray-300 text-black px-2 py-1 rounded hover:bg-[#151c2c] hover:text-white disabled:opacity-50"
            onClick={() => table.previousPage()}
          >
            <GrFormPrevious className="text-xl" />
          </button>

          <button
            disabled={!table.getCanNextPage()}
            className="border border-[#2e374a] bg-gray-300 text-black px-2 py-1 rounded hover:bg-[#151c2c] hover:text-white disabled:opacity-50"
            onClick={() => table.nextPage()}
          >
            <MdNavigateNext className="text-xl" />
          </button>
          <button
            className="border border-[#2e374a] bg-gray-300 text-black px-4 py-1 rounded hover:bg-[#151c2c] hover:text-white disabled:opacity-50"
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
