import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { AdProduct } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
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

export const InvoiceDocument = async ({ orderId }: any) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchUpload = async () => {
      try {
        const { data } = await axios.get(`/api/invoice/${orderId}`);
        setData(data);
      } catch (error) {
        setIsError(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpload();
  }, [orderId]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
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
          {data?.product.map((item: AdProduct, idx: any) => (
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
          ))}
        </View>
        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", margin: "4px 0" }}>
            Subtotal: {(data?.total - data?.formdata.deliverycharge).toFixed(2)}
            tk
          </Text>
          <Text style={{ fontWeight: "bold", margin: "4px 0" }}>
            Delivery Charge: {data.formdata.deliverycharge.toFixed(2)}tk
          </Text>
          <Text style={{ fontWeight: "bold", margin: "4px 0" }}>
            Total: {data?.total.toFixed(2)}tk
          </Text>
        </View>
      </Page>
    </Document>
  );
};
