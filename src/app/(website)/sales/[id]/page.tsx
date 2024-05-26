"use client";
import React, { useEffect, useState } from "react";
import DefaultTable from "../../components/shared/DefaultTableOrder";
import { columns } from "../column";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "antd";
import Link from "next/link";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdOutlineFileDownload, MdSearch } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Order } from "@/types";

const fetchUpload = async () => {
  const { data } = await axios.get("/api/sales");
  return data;
};
const Productpage = () => {
  const router = useRouter();
  const { status } = useSession();
  const params = useParams();
  console.log("param", params);
  const [dates, setDates] = useState<string[]>([]);

  const [filteredData, setFilteredData] = useState<Order[]>([]);
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["order-data"],
    queryFn: fetchUpload,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }
  const encodedEmail: any = params.id;
  const userEmailToFilter = decodeURIComponent(encodedEmail);

  console.log({ userEmailToFilter });

  const filteredDataa: Order[] = data.filter((item: any) =>
    item.product.some((product: any) => product.userEmail === userEmailToFilter)
  );
  console.log(filteredDataa);

  const tabledata = filteredDataa || [];
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
        const filteredOrders = filteredDataa.filter((order: any) => {
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
      Name: order.formdata.name,
      Contact: order.formdata.contact,
      Address: order.formdata.address,

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
            widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
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

    pdfMake.createPdf(pdfData).download("Sales.pdf");
  };

  if (status !== "authenticated") {
    return null;
  }

  const { RangePicker } = DatePicker;

  const disabledDate = (current: any) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8p-5 p-5 rounded-[10px] mt-5">
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
