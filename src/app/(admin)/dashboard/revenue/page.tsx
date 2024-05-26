"use client";
import React, { FormEventHandler, useState } from "react";

import { columns } from "./components/column";

import Link from "next/link";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdOutlineFileDownload, MdSearch } from "react-icons/md";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "antd";
import { Order } from "@/types";

import * as XLSX from "xlsx";
import DefaultTable from "../order/components/ordertable";

const fetchSales = async () => {
  const { data } = await axios.get("/api/sales");
  return data;
};
const { RangePicker } = DatePicker;
const Productpage = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<Order[]>([]);

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

  const tabledata: Order[] = data || [];

  const dataToMap = filteredData.length === 0 ? tabledata : filteredData;

  const pdfMake = require("pdfmake/build/pdfmake.js");
  const pdfFonts = require("pdfmake/build/vfs_fonts.js");
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const handleDateChange = (values: [Dayjs | null, Dayjs | null] | null) => {
    if (values) {
      const formattedDates: any = values.map((item: any) =>
        item.format("YYYY-MM-DD")
      );
      setDates(formattedDates);
      const [startDate, endDate] = formattedDates;
      if (startDate && endDate) {
        const filteredOrders = data.filter((order: any) => {
          const orderDate = order.date;
          return orderDate >= startDate && orderDate <= endDate;
        });
        setFilteredData(filteredOrders);
      } else {
        setFilteredData([]);
      }
    } else {
      setDates([]);
      setFilteredData([]);
    }
  };

  console.log({ filteredData });
  const handleDownload = () => {
    // Convert data to a format compatible with Excel
    const dataToMap = filteredData.length === 0 ? tabledata : filteredData;
    const excelData: { [key: string]: any }[] = dataToMap.map((order) => ({
      Product: order.product
        .map(
          (product: any) =>
            `${product.title} ${""} ${product.frameName ?? ""} (${
              product.quantity
            })`
        )
        .join(", "),

      Artist: order.product.map((product: any) => product.artist).join(", "),
      Total: ` ${order.total.toFixed(2)}tk`,
      Revenue: ` ${order.revenue.toFixed(2)}tk`,
      TotalRevenue: `${order.totalrevenue.toFixed(2)}tk`,
      Date: order.date,
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

  const { RangePicker } = DatePicker;

  const disabledDate = (current: any) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <div className="bg-[#182237] p-5 rounded-[10px] mt-5">
      <div className="flex items-center justify-between">
        <RangePicker onChange={handleDateChange} disabledDate={disabledDate} />
        <button
          className={`flex items-center justify-between gap-1 text-white font-bold py-2 px-4 rounded
    ${
      dataToMap.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-700"
    }`}
          onClick={handleDownload}
          disabled={dataToMap.length === 0}
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
