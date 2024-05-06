"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// import { HomeGalleryData } from "../components/home/components/HomeGallery";
import { AdProduct } from "@/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "../components/shared/SearchInput";
import { HomeGalleryData } from "../components/home/components/HomeGallery";

const fetchUpload = async () => {
  const { data } = await axios.get("/api/upload/gallery");
  return data;
};
const Gallerypage = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchResult, setSearchResult] = useState<AdProduct[]>([]);

  // const [categoryFilter, setCategoryFilter] = useState("");
  // const [categoryResult, setCategoryResult] = useState<AdProduct[]>([]);

  // console.log({ categoryFilter });

  // console.log({ searchResult });

  // async function getSearchProduct(query: string) {
  //   const res = await fetch(`/api/search?query=${query}`, {
  //     method: "GET",
  //     cache: "no-store",
  //   });
  //   const { product } = await res.json();
  //   console.log({ product });
  //   if (res.ok) {
  //     setSearchResult(product);
  //   }
  // }

  // async function handleSearch() {
  //   getSearchProduct(searchQuery);
  // }

  // async function getFilterProduct(query: string) {
  //   const decodedQuery = query ? decodeURIComponent(query as string) : "";
  //   console.log({ decodedQuery });
  //   const res = await fetch(`/api/upload/category?query=${query}`, {
  //     method: "GET",
  //     cache: "no-store",
  //   });
  //   const { product } = await res.json();
  //   console.log({ product });
  //   if (res.ok) {
  //     setCategoryResult(product);
  //   }
  // }

  // async function handleFilter() {
  //   getFilterProduct(categoryFilter);
  // }

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["upload-data"],
    queryFn: fetchUpload,
  });

  console.log({ data });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 ">
        <SearchInput />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((item: any, index: any) => (
            <div key={index}>
              <Link href={`/gallery/${item.id}`}>
                <div className="group relative block h-96 overflow-hidden rounded-t-lg bg-gray-100">
                  <Image
                    src={item.cimage}
                    loading="lazy"
                    alt="Photo by Vladimir Fedotov"
                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    fill
                  />
                  {item.productstatus === "Sale" ? (
                    <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                      {item.productstatus}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="flex items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                  <div className="flex flex-col">
                    <div className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">
                      {item.title}
                    </div>
                    <span className="text-sm text-gray-500 lg:text-base">
                      by {item.artist}
                    </span>
                  </div>

                  {item.discount === null ? (
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-600 lg:text-lg ">
                        ৳{item.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-600 lg:text-lg">
                        ৳{item.discount.toFixed(2)}
                      </span>
                      <span className="font-semibold text-red-600 lg:text-lg line-through">
                        ৳{item.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallerypage;
