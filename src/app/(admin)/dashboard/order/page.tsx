"use client";
import React, { useState } from "react";
import DefaultTable from "../shared/table/DefaultTable";
import { columns } from "./components/column";
import { format } from "date-fns";
import Link from "next/link";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdOutlineFileDownload, MdSearch } from "react-icons/md";
import * as XLSX from "xlsx";
import { Order } from "@/types";

const fetchUpload = async () => {
  const { data } = await axios.get("/api/order");
  return data;
};
const Productpage = () => {
  const [filtering, setFiltering] = useState("");
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["order-data"],
    queryFn: fetchUpload,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  const tabledata: Order[] = data || [];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMM, yyyy");
  };

  const handleDownload = () => {
    // Convert data to a format compatible with Excel
    const excelData: { [key: string]: any }[] = tabledata.map((order) => ({
      Name: order.formdata.name,
      Contact: order.formdata.contact,
      Address: order.formdata.address,
      Note: order.formdata.note,

      Product: order.product
        .map((product: any) => `${product.title} (${product.quantity})`)
        .join(", "),

      Artist: order.product.map((product: any) => product.artist).join(", "),
      Total: `৳ ${order.total.toFixed(2)}`,
      Status: order.status,
      Date: formatDate(order.createdAt),
    }));

    // Define column headers
    const headers = Object.keys(excelData[0]);

    // Create an array of arrays containing the values of each cell
    const excelArray = [
      headers,
      ...excelData.map((row) => headers.map((header) => row[header])),
    ];

    // Create a new Excel workbook
    const workbook = XLSX.utils.book_new();

    // Convert the data array to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(excelArray);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // Trigger file download
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  return (
    <div className="bg-[#182237] p-5 rounded-[10px] mt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px] bg-[#2e374a] p-[10px] rounded-[10px] max-w-max">
          <MdSearch />
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Search for a user ..."
            className="bg-transparent border-none text-white outline-none"
          />
        </div>

        <button
          className="bg-blue-500 flex items-center justify-between gap-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownload}
        >
          Download
          <MdOutlineFileDownload className="mr-2" size={20} />
        </button>
      </div>
      <div className="my-10">
        <DefaultTable
          columns={columns}
          data={tabledata}
          filtering={filtering}
        />
      </div>
    </div>
  );
};

export default Productpage;
