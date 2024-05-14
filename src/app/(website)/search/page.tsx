"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "./Spinner";
import useSWR from "swr";

import Product from "../components/home/components/Product";
import SearchInput from "../components/shared/SearchInput";
import { useEffect, useState } from "react";
import Image from "next/image";

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

const SearchPage = () => {
  const [categoryQuery, setCategoryQuery] = useState("");
  const [ProductData, setProductData] = useState([]);
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (data && data.product) {
      setProductData(data.product);
    }
  }, [data]);

  console.log({ data });

  if (!encodedSearchQuery) {
    router.push("/");
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.product) {
    return null;
  }

  console.log({ categoryQuery });

  const filteredProduct = data?.product.filter(
    (item: any) => item.category === categoryQuery
  );
  console.log(filteredProduct);

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 flex items-start justify-start gap-4">
        <div
          onClick={() => setCategoryQuery("Digitally Captured")}
          className="w-[220px] h-[60px] pr-2 bg-violet-200 rounded-full flex items-center justify-center gap-3 cursor-pointer"
        >
          <div className="w-[50px] h-[50px] relative ">
            <Image
              src="/assets/images/home/digitally.jpg"
              fill
              alt=""
              className="rounded-full  "
            />
          </div>
          <h3 className="text-base font-semibold">Digitally Captured</h3>
        </div>
        <div
          onClick={() => setCategoryQuery("Color Painting")}
          className="w-[190px] h-[60px] pr-2 bg-pink-200 rounded-full flex items-center justify-center gap-3 cursor-pointer"
        >
          <div className="w-[50px] h-[50px] relative ">
            <Image
              src="/assets/images/home/color.jpg"
              fill
              alt=""
              className="rounded-full  "
            />
          </div>
          <h3 className="text-base font-semibold">Color Painting</h3>
        </div>
        <div
          onClick={() => setCategoryQuery("Water Color")}
          className="w-[180px] h-[60px] pr-2 bg-orange-200 rounded-full flex items-center justify-center gap-3 cursor-pointer"
        >
          <div className="w-[50px] h-[50px] relative ">
            <Image
              src="/assets/images/home/watercolor.jpg"
              fill
              alt=""
              className="rounded-full  "
            />
          </div>
          <h3 className="text-base font-semibold">Water Color</h3>
        </div>
        <div
          onClick={() => setCategoryQuery("Oil Painting")}
          className="w-[170px] h-[60px] pr-2 bg-blue-300 rounded-full flex items-center justify-center gap-3 cursor-pointer"
        >
          <div className="w-[50px] h-[50px] relative ">
            <Image
              src="/assets/images/home/oilpainting.jpg"
              fill
              alt=""
              className="rounded-full  "
            />
          </div>
          <h3 className="text-base font-semibold">Oil Painting</h3>
        </div>
        <div
          onClick={() => setCategoryQuery("Pencil Sketches")}
          className="w-[200px] h-[60px] pr-2 bg-green-200 rounded-full flex items-center justify-center gap-3 cursor-pointer"
        >
          <div className="w-[50px] h-[50px] relative ">
            <Image
              src="/assets/images/home/pencil1.jpg"
              fill
              alt=""
              className="rounded-full  "
            />
          </div>
          <h3 className="text-base font-semibold">Pencil Sketches</h3>
        </div>
        <div
          onClick={() => setCategoryQuery("Acrylic")}
          className="w-[140px] h-[60px] pr-2 bg-yellow-200 rounded-full flex items-center justify-center gap-3 cursor-pointer"
        >
          <div className="w-[50px] h-[50px] relative ">
            <Image
              src="/assets/images/home/Acrylic1.jpg"
              fill
              alt=""
              className="rounded-full  "
            />
          </div>
          <h3 className="text-base font-semibold">Acrylic</h3>
        </div>
      </div>
      {/* <span className="text-xl">
        Showing results for:{" "}
        <span className="font-semibold">{searchQuery}</span>
        <div className="relative mt-12 w-[300px] max-w-full mx-auto  flex items-center justify-center shrink-0 gap-3">
          <p className="text-indigo-600 font-semibold text-lg ">FilterBy:</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <select
            value={categoryQuery || ""}
            onChange={(event) => setCategoryQuery(event.target.value)}
            className="w-full px-3 py-3 text-lg text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
          >
            <option value={""}>Select Category</option>
            <option value={"Digitally Captured"}>Digitally Captured</option>
            <option value={"Color Painting"}>Color Painting</option>
          </select>
        </div>
      </span> */}
      <Product
        Gallery={filteredProduct.length > 0 ? filteredProduct : data?.product}
      />
    </>
  );
};

export default SearchPage;
