"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// import { HomeGalleryData } from "../components/home/components/HomeGallery";
import { AdProduct } from "@/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUpload = async () => {
  const { data } = await axios.get("/api/upload");
  return data;
};
const Gallerypage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<AdProduct[]>([]);

  async function getSearchProduct(query: string) {
    const res = await fetch(`/api/search?query=${query}`, {
      method: "GET",
      cache: "no-store",
    });
    const { product } = await res.json();
    console.log({ product });
    if (res.ok) {
      setSearchResult(product);
    }
  }

  async function handleSearch() {
    getSearchProduct(searchQuery);
  }

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
        <div className="mb-10 md:mb-16  flex items-center gap-1 ">
          <form className="flex-1 max-w-2xl px-4 mx-auto mt-12">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search By Title, Artist ,Description"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="w-full  py-3 pl-12 pr-4 text-gray-500 border rounded-full outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
            {/* <div className="flex shrink-0 gap-3">
              <p className="text-indigo-600 font-semibold">Per Page:</p>
              <input
                type="text"
                placeholder="5"
                className="w-10 px-1  text-gray-500 border  outline-none bg-white focus:bg-white focus:border-indigo-600"
              />
            </div>

            <div className="relative w-72 max-w-full mx-auto mt-12 flex shrink-0 gap-3">
              <p className="text-indigo-600 font-semibold"> Filter By:</p>

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
              <select className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
                <option></option>
                <option>Software engineer</option>
                <option>IT manager</option>
                <option>UI / UX designer</option>
              </select>
            </div> */}
          </form>

          <button
            className="w-[120px] px-6 py-3 mt-12 bg-blue-600 rounded-md text-white text-lg font-normal"
            onClick={handleSearch}
          >
            Search
          </button>

          {/* <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Gallery
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated.
          </p> */}
        </div>
        {searchResult && searchResult.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchResult.map((item, index) => (
              <div key={index}>
                <Link
                  href={`/gallery/${item.id}`}
                  className="group relative block h-96 overflow-hidden rounded-t-lg bg-gray-100"
                >
                  <Image
                    src={item.image}
                    loading="lazy"
                    alt="Photo by Vladimir Fedotov"
                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    fill
                  />
                </Link>

                <div className="flex items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                  <div className="flex flex-col">
                    <Link
                      href="#"
                      className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg"
                    >
                      {item.title}
                    </Link>
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
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((item: any, index: any) => (
              <div key={index}>
                <Link
                  href={`/gallery/${item.id}`}
                  className="group relative block h-96 overflow-hidden rounded-t-lg bg-gray-100"
                >
                  <Image
                    src={item.image}
                    loading="lazy"
                    alt="Photo by Vladimir Fedotov"
                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    fill
                  />
                </Link>

                <div className="flex items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                  <div className="flex flex-col">
                    <Link
                      href="#"
                      className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg"
                    >
                      {item.title}
                    </Link>
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
              </div>
            ))}
          </div>
        )}

        {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {HomeGalleryData.map((item, index) => (
            <div key={index}>
              <Link
                href={`/gallery/${item.slug}`}
                className="group relative block h-96 overflow-hidden rounded-t-lg bg-gray-100"
              >
                <Image
                  src={item.image}
                  loading="lazy"
                  alt="Photo by Vladimir Fedotov"
                  className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  fill
                />
              </Link>

              <div className="flex items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                <div className="flex flex-col">
                  <Link
                    href="#"
                    className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg"
                  >
                    {item.title}
                  </Link>
                  <span className="text-sm text-gray-500 lg:text-base">
                    by {item.artist}
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="font-bold text-gray-600 lg:text-lg">
                    ৳{item.discount.toFixed(2)}
                  </span>
                  <span className="font-bold text-gray-600 lg:text-lg line-through">
                    ৳{item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Gallerypage;
