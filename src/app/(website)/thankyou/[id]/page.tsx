"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCloudDone } from "react-icons/io";
import { format } from "date-fns";
import { AdProduct } from "@/types";
import ReactToPrint from "react-to-print";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/app/redux_store/cartAddSlice";

const Invoicepage = () => {
  const params = useParams();
  console.log("param", params);
  const [isCleared, setIsCleared] = useState(false);
  const encodedEmail: string = params.id as string;
  const decodedEmail: string = decodeURIComponent(encodedEmail);
  const dispatch = useDispatch();

  const fetchUpload = async () => {
    const { data } = await axios.get(`/api/invoice/${decodedEmail}`);
    return data;
  };
  const componentRef = useRef(null);

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["order-data"],
    queryFn: fetchUpload,
  });
  useEffect(() => {
    if (data && !isCleared) {
      console.log("Setting timer to clear localStorage");
      const timer = setTimeout(() => {
        console.log("Clearing localStorage");
        localStorage.clear();
        dispatch(clearCart());
        setIsCleared(true);
      }, 2000);

      return () => {
        console.log("Clearing timer on unmount");
        clearTimeout(timer);
      };
    }
  }, [data, isCleared, dispatch]);

  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return null;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }
  console.log({ data });

  return (
    <div className=" py-6 sm:py-8 lg:py-12 mx-auto max-w-4xl">
      <div className="flex items-center justify-center">
        <ReactToPrint
          trigger={() => (
            <button className="my-4 px-4 py-2 bg-blue-500 text-white rounded">
              Print Invoice
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div
        ref={componentRef}
        className="bg-[#f4f5ef]  border border-gray-200 rounded-md px-4 md:px-10 py-6 flex flex-col items-center justify-between"
      >
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
            <h3>{data?.date}</h3>
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
              {data &&
                data.product &&
                data.product.map((item: AdProduct, idx: any) => (
                  <tr key={idx}>
                    <td className="pr-6 py-4 whitespace-nowrap">
                      {item.title}, {item.frameName}
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap">
                      {item.quantity}
                    </td>

                    <td className="pr-6 py-4 whitespace-nowrap">
                      {item.discount === null ? item.price : item.discount},
                      {item.framePrice === null ? "" : item.framePrice}
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap">
                      {(item.discount === null
                        ? item.price + (item.framePrice ?? 0)
                        : item.discount + (item.framePrice ?? 0)) *
                        item.quantity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="sm:col-span-2 mt-4  rounded-lg pr-10 lg:pr-[60px] bg-transparent ">
            <div className="flex  items-start justify-between gap-4 text-gray-500 py-1">
              <span className="font-medium">Subtotal</span>

              <span className="flex flex-col items-end">
                <span className="font-medium text-sm">
                  {(data?.total - data?.formdata?.deliverycharge).toFixed(2)}tk
                </span>
              </span>
            </div>
            <div className="flex  items-start justify-between gap-4 text-gray-500 py-1">
              <span className="font-medium">Delivery Charge</span>

              <span className="flex flex-col items-end">
                <span className="text-sm font-medium">
                  {data?.formdata?.deliverycharge !== undefined
                    ? data.formdata.deliverycharge.toFixed(2) + "tk"
                    : ""}
                </span>
              </span>
            </div>
            <div className="flex mt-4 border-t pt-4  items-start justify-between gap-4 text-gray-800">
              <span className="text-lg font-bold">Total</span>

              <span className="flex flex-col items-end">
                <span className="text-lg font-bold">
                  {data?.total?.toFixed(2)}tk
                </span>
                <span className="text-sm text-gray-500">
                  including Delivery Charge
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex items-start justify-start">
          <p className="py-4 ">Thank you for using Aesthete!</p>
        </div>
      </div>
    </div>
  );
};

export default Invoicepage;
