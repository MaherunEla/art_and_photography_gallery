"use client";
import React, { FormEventHandler, useState } from "react";

import { columns } from "./components/column";
import { format } from "date-fns";
import Link from "next/link";
import axios from "axios";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdOutlineFileDownload, MdSearch } from "react-icons/md";
import * as XLSX from "xlsx";
import { Order } from "@/types";
import DefaultTable from "./components/ordertable";
import { useToast } from "@/components/ui/use-toast";

const fetchUpload = async () => {
  const { data } = await axios.get("/api/order");
  return data;
};
const Productpage = () => {
  const [startingdate, setStartingdate] = useState("");
  const [endingdate, setEndingdate] = useState("");
  const [filteredData, setFilteredData] = useState<Order[]>([]);
  const queryClient = useQueryClient();
  const { toast } = useToast();
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
  const dataToMap = filteredData.length === 0 ? tabledata : filteredData;

  console.log(startingdate, endingdate);
  const pdfMake = require("pdfmake/build/pdfmake.js");
  const pdfFonts = require("pdfmake/build/vfs_fonts.js");
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const filteredOrders = data.filter((order: any) => {
      // Extract the date from the order object
      const orderDate = order.date;

      // Check if the order date falls within the specified range
      return orderDate >= startingdate && orderDate <= endingdate;
    });
    setFilteredData(filteredOrders);

    // try {
    //   const { data } = await axios.get(
    //     `http://localhost:3000/api/order/datesearch?q=${startingdate}&c=${startingdate}`
    //   );
    //   setFilteredData(data);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    //   // Handle the error appropriately, such as displaying an error message to the user
    // }
  };
  console.log({ filteredData });

  const handleDownload = () => {
    // Convert data to a format compatible with Excel
    const dataToMap = filteredData.length === 0 ? tabledata : filteredData;
    const excelData: { [key: string]: any }[] = dataToMap.map((order) => ({
      Name: order.formdata.name,
      Contact: order.formdata.contact,
      Address: order.formdata.address,
      Note: order.formdata.note ?? "",

      Product: order.product
        .map(
          (product: any) =>
            `${product.title}${product.frameName ?? ""} (${product.quantity})`
        )
        .join(", "),

      Artist: order.product.map((product: any) => product.artist).join(", "),
      Total: ` ${order.total.toFixed(2)}tk`,
      Status: order.status,
      Date: order.date,
    }));

    const pdfData = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
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

    pdfMake.createPdf(pdfData).download("Order.pdf");
  };

  return (
    <div className="bg-[#182237] p-5 rounded-[10px] mt-5">
      <div className="flex items-center justify-between">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex items-center gap-[10px] bg-[#2e374a] p-[10px] rounded-[10px] max-w-max">
            <MdSearch />
            <input
              type="text"
              value={startingdate}
              onChange={(e) => setStartingdate(e.target.value)}
              placeholder="Staring Date"
              className="bg-transparent border-none text-white outline-none"
            />
          </div>

          <div className="flex items-center gap-[10px] bg-[#2e374a] p-[10px] rounded-[10px] max-w-max">
            <MdSearch />
            <input
              type="text"
              value={endingdate}
              onChange={(e) => setEndingdate(e.target.value)}
              placeholder="Ending Date"
              className="bg-transparent border-none text-white outline-none"
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            type="submit"
          >
            Submit
          </button>
        </form>

        <button
          className="bg-blue-500 flex items-center justify-between gap-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownload}
        >
          Download
          <MdOutlineFileDownload className="mr-2" size={20} />
        </button>
      </div>
      <div className="my-10">
        <DefaultTable columns={columns} data={dataToMap} />
      </div>
    </div>
  );
};

export default Productpage;
