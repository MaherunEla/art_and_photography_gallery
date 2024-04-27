"use client";
import React, { useState } from "react";

import { columns } from "./components/column";
import { format } from "date-fns";
import Link from "next/link";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdOutlineFileDownload, MdSearch } from "react-icons/md";

import { Order } from "@/types";

import * as XLSX from "xlsx";
import DefaultTable from "../shared/table/DefaultTable";
interface TableDataRow {
  [key: string]: any;
}

const fetchSales = async () => {
  const { data } = await axios.get("/api/sales");
  return data;
};
const Productpage = () => {
  const [filtering, setFiltering] = useState("");
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["sales-data"],
    queryFn: fetchSales,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  // const tabledata: TableDataRow = data || [];
  const tabledata: Order[] = data || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMM, yyyy");
  };

  const pdfMake = require("pdfmake/build/pdfmake.js");
  const pdfFonts = require("pdfmake/build/vfs_fonts.js");
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const handleDownload = () => {
    // Convert data to a format compatible with Excel
    const excelData: { [key: string]: any }[] = tabledata.map((order) => ({
      Product: order.product
        .map((product: any) => `${product.title} (${product.quantity})`)
        .join(", "),
      Artist: order.product.map((product: any) => product.artist).join(", "),
      Total: ` ${order.total.toFixed(2)}tk`,
      Revenue: ` ${order.revenue.toFixed(2)}tk`,
      TotalRevenue: `${order.totalrevenue.toFixed(2)}tk`,
      Date: formatDate(order.createdAt),
    }));

    const pdfData = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*"],
            body: [
              // Header Row
              Object.keys(excelData[0]).map((header) => ({
                text: header,
                style: "tableHeader",
              })),
              // Data Rows
              ...excelData.map((row) => Object.values(row)),
            ],
          },
        },
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 13,
          fillColor: "#eeeeee",
        },
      },
    };

    pdfMake.createPdf(pdfData).download("Revenue.pdf");
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
