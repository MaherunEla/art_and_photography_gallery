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

const Orderinvoice = ({ orderId }: any) => {
  const fetchUpload = async () => {
    const { data } = await axios.get(`/api/invoice/${orderId}`);
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

  //   const formatDate = (dateString: string) => {
  //     const date = new Date(dateString);
  //     return format(date, "d MMM, yyyy");
  //   };

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
            {/* Invoice Date: {format(new Date(data?.createdAt), "d MMM, yyyy")} */}
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.cell}>Item</Text>
            <Text style={styles.cell}>Quantity</Text>
            <Text style={styles.cell}>Unit Price</Text>
            <Text style={styles.cell}>Total</Text>
          </View>
          {/* {data?.product.map((item: AdProduct, idx: any) => (
            <View style={styles.row} key={idx}>
              <Text style={styles.cell}>
                {item.title},{item.frameName}
              </Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>
                {" "}
                {item.discount === null ? item.price : item.discount},
                {item.framePrice === null ? "" : item.framePrice}
              </Text>
              <Text style={styles.cell}>
                {" "}
                {(item.discount === null
                  ? item.price + (item.framePrice ?? 0)
                  : item.discount + (item.framePrice ?? 0)) * item.quantity}
              </Text>
            </View>
          ))} */}
        </View>
        <View style={styles.section}>
          {/* <Text style={{ fontWeight: "bold", margin: "4px 0" }}>
            Subtotal: {(data?.total - data?.formdata.deliverycharge).toFixed(2)}
            tk
          </Text>
          <Text style={{ fontWeight: "bold", margin: "4px 0" }}>
            Delivery Charge: {data.formdata.deliverycharge.toFixed(2)}tk
          </Text>
          <Text style={{ fontWeight: "bold", margin: "4px 0" }}>
            Total: {data?.total.toFixed(2)}tk
          </Text> */}
        </View>
      </Page>
    </Document>
  );
  return (
    <div className=" py-6 sm:py-8 lg:py-12">
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
  );
};

export default Orderinvoice;
