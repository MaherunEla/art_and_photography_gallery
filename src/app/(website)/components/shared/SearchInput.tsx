"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );

  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return console.log("error");
    }

    const encodedSearchQuery = encodeURI(searchQuery);

    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <div className="mb-10 md:mb-16 flex items-center justify-center gap-4 ">
      <form onSubmit={onSearch} className="px-4 mx-auto grow mt-12  gap-4">
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
            value={searchQuery || ""}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full  py-3 pl-12 pr-4 text-gray-500 border rounded-full outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
