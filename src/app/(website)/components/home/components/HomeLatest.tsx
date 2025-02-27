"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HomeGalleryData } from "./HomeGallery";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUpload = async () => {
  const { data } = await axios.get("/api/upload/latest");
  return data;
};
const HomeLatest = () => {
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
  if (isFetching) {
    return <h2>data is fatching...</h2>;
  }
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
            Latest
          </h2>

          <Link
            href="/gallery"
            className="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
          >
            Show more
          </Link>
        </div>

        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((item: any, index: any) => (
            <div key={index}>
              <Link href={`/gallery/${item.id}`}>
                <div className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-gray-100 lg:mb-3 ">
                  <div className="h-full w-full related">
                    <Image
                      src={item.cimage}
                      loading="lazy"
                      alt="Photo by Rachit Tank"
                      className="object-cover object-center transition duration-200 group-hover:scale-110"
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
                </div>

                <div>
                  <div className="hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg">
                    {item.title}
                  </div>
                  {item?.discount === null ? (
                    <div className="flex items-end gap-2">
                      <span className="font-bold text-gray-800 lg:text-lg">
                        ৳{item.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-2">
                      <span className="font-bold text-gray-800 lg:text-lg">
                        ৳{item.discount.toFixed(2)}
                      </span>
                      <span className="mb-0.5 text-red-500 line-through">
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

export default HomeLatest;
