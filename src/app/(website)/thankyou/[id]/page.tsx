"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { IoMdCloudDone } from "react-icons/io";
import { format } from "date-fns";
import { AdProduct } from "@/types";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
    backgroundColor: "#f4f5ef",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
    paddingBottom: 5,
    paddingTop: 5,
  },
  cell: {
    flex: 1,
  },
});

const Invoicepage = () => {
  const params = useParams();
  console.log("param", params);
  const encodedEmail: string = params.id as string;
  const decodedEmail: string = decodeURIComponent(encodedEmail);

  const fetchUpload = async () => {
    const { data } = await axios.get(`/api/invoice/${decodedEmail}`);
    return data;
  };

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
  console.log({ data });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMM, yyyy");
  };

  const InvoiceDocument = ({ data }: any) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Invoice</Text>
          <Text style={{ marginBottom: 10 }}>Billed To:</Text>
          <Text>{data?.formdata?.name}</Text>
          <Text>{data?.formdata?.contact}</Text>
          <Text style={{ marginBottom: 10 }}>{data?.formdata?.address}</Text>
          <Text>Invoice No.: {data?.id}</Text>
          <Text>
            Invoice Date: {format(new Date(data?.createdAt), "d MMM, yyyy")}
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.cell}>Item</Text>
            <Text style={styles.cell}>Quantity</Text>
            <Text style={styles.cell}>Unit Price</Text>
            <Text style={styles.cell}>Total</Text>
          </View>
          {data?.product.map((item: AdProduct, idx: any) => (
            <View style={styles.row} key={idx}>
              <Text style={styles.cell}>{item.title}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>{item.discount}</Text>
              <Text style={styles.cell}>{item.discount * item.quantity}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", margin: "4px 0" }}>
            Subtotal: {data?.total}tk
          </Text>
          <Text style={{ fontWeight: "bold", margin: "4px 0" }}>
            Tax (0%): 0tk
          </Text>
          <Text style={{ fontWeight: "bold", margin: "4px 0" }}>
            Total: {data?.total}tk
          </Text>
        </View>
      </Page>
    </Document>
  );
  return (
    <div className=" py-6 sm:py-8 lg:py-12">
      <div className="bg-[#f4f5ef] mx-auto max-w-4xl border border-gray-200 rounded-md px-4 md:px-10 py-6 flex flex-col items-center justify-between">
        <div className="w-full flex items-start justify-between py-5">
          <div className="w-full ">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
              aria-label="logo"
            >
              <svg
                width="95"
                height="94"
                viewBox="0 0 95 94"
                className="h-auto w-6 text-indigo-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
              </svg>
              Aesthete
            </Link>
          </div>

          <div className="w-full flex items-end justify-end ">
            <h1 className="uppercase text-2xl ">Invoice</h1>
          </div>
        </div>

        <div className="w-full py-8 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="uppercase font-bold">billed to:</h1>
            <h3>{data?.formdata?.name}</h3>
            <h3>{data?.formdata?.contact}</h3>
            <h3>{data?.formdata?.address}</h3>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold">Invoice No. </h3>
            <h3>{data?.id}</h3>
            <h3>{formatDate(data?.createdAt)}</h3>
          </div>
        </div>

        <div className="w-full mt-12 relative h-max overflow-auto">
          <table className="w-full table-auto text-sm text-left ">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 pr-8">Item</th>
                <th className="py-3 pr-6">Quantity</th>
                <th className="py-3 pr-6">Unit Price</th>
                <th className="py-3 pr-6">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {data?.product.map((item: AdProduct, idx: any) => (
                <tr key={idx}>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.title}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>

                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.discount}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.discount * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex  items-end justify-end gap-4 py-4">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold">Subtotal </h3>
              <h3 className="font-bold ">Tax(0%) </h3>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-bold">{data?.total}tk</h3>
              <h3 className="font-bold ">0tk</h3>
            </div>
          </div>

          <div className="  flex items-end justify-end gap-4">
            <div className="w-[150px] border-t-2 border-black flex items-end justify-end gap-4 py-2">
              <h1 className="font-bold text-xl">Total</h1>
              <h1 className="font-bold text-xl ">{data?.total}tk</h1>
            </div>
          </div>
        </div>

        <div className="w-full flex items-start justify-start">
          <p className="py-4 ">Thank you for using Aesthete!</p>
        </div>
        <div className="px-2 inline-block sm:col-span-2 rounded-lg bg-indigo-500  py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
          <PDFDownloadLink
            document={<InvoiceDocument data={data} />}
            fileName="invoice.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default Invoicepage;
