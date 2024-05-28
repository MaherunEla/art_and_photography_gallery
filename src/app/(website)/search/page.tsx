"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "../components/shared/Spinner";
import useSWR from "swr";
import Product from "../components/home/components/Product";
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
  const [productData, setProductData] = useState([]);
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const router = useRouter();

  useEffect(() => {
    if (!searchQuery) {
      router.push("/");
    }
  }, [searchQuery, router]);

  const encodedSearchQuery = encodeURIComponent(searchQuery || "");

  const { data, isLoading } = useSWR(
    searchQuery ? `/api/search?q=${encodedSearchQuery}` : null,
    fetchPosts,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (data && data.product) {
      setProductData(data.product);
    }
  }, [data]);

  if (!searchQuery) {
    return null;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.product) {
    return <div>No products found</div>;
  }

  const filteredProduct = productData.filter(
    (item: any) => item.category === categoryQuery
  );

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 flex items-start justify-start gap-4">
        {[
          {
            label: "Digitally Captured",
            bgColor: "bg-violet-200",
            imgSrc: "/assets/images/home/digitally.jpg",
          },
          {
            label: "Color Painting",
            bgColor: "bg-pink-200",
            imgSrc: "/assets/images/home/color.jpg",
          },
          {
            label: "Water Color",
            bgColor: "bg-orange-200",
            imgSrc: "/assets/images/home/watercolor.jpg",
          },
          {
            label: "Oil Painting",
            bgColor: "bg-blue-300",
            imgSrc: "/assets/images/home/oilpainting.jpg",
          },
          {
            label: "Pencil Sketches",
            bgColor: "bg-green-200",
            imgSrc: "/assets/images/home/pencil1.jpg",
          },
          {
            label: "Acrylic",
            bgColor: "bg-yellow-200",
            imgSrc: "/assets/images/home/Acrylic1.jpg",
          },
        ].map(({ label, bgColor, imgSrc }) => (
          <div
            key={label}
            onClick={() => setCategoryQuery(label)}
            className={`w-[220px] h-[60px] pr-2 ${bgColor} rounded-full flex items-center justify-center gap-3 cursor-pointer`}
          >
            <div className="w-[50px] h-[50px] relative">
              <Image src={imgSrc} fill alt="" className="rounded-full" />
            </div>
            <h3 className="text-base font-semibold">{label}</h3>
          </div>
        ))}
      </div>
      <Product
        Gallery={filteredProduct.length > 0 ? filteredProduct : data.product}
      />
    </>
  );
};

export default SearchPage;
