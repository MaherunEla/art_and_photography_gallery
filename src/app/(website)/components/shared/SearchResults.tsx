"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { debounce } from "lodash";
import Product from "../home/components/Product";
import { AdProduct } from "@/types";
import { SkeletonCard } from "./SearchSkeleton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Props = {
  query: string;
};

const SearchResult = ({ query }: Props) => {
  const [categoryQuery, setCategoryQuery] = useState("");
  const [results, setResults] = useState<AdProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchUpload = async (page = 1, limit = 8) => {
    const { data } = await axios.get(
      `/api/upload/gallery?page=${page}&limit=${limit}`
    );
    return data;
  };

  const fetchSearch = async (query: string, page = 1, limit = 3) => {
    const { data } = await axios.get(
      `/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    return data;
  };

  const debouncedFetch = useMemo(
    () =>
      debounce(async (q: string, page: number) => {
        setLoading(true);
        try {
          const data = q
            ? await fetchSearch(q, page, 3)
            : await fetchUpload(page, 8);

          // normalize response
          setResults(data.results || data); // if data is array, fallback
          setTotalPages(
            data.totalPages || Math.ceil((data.total || data.length) / 3)
          );
        } catch (err: unknown) {
          console.error(err);

          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Something went wrong");
          }
        } finally {
          setLoading(false);
        }
      }, 400),
    []
  );

  useEffect(() => {
    debouncedFetch(query, page);
    return () => debouncedFetch.cancel();
  }, [query, page, debouncedFetch]);

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const filteredProduct = results.filter(
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

      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {!loading && results.length === 0 && (
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8 py-6 sm:py-8 lg:py-12">
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      )}
      {loading ? (
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8 py-6 sm:py-8 lg:py-12">
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      ) : (
        <Product
          Gallery={filteredProduct.length > 0 ? filteredProduct : results}
          query={query}
        />
      )}

      {totalPages > 1 && (
        <div className="mt-2 flex gap-2 items-center justify-center">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default SearchResult;
