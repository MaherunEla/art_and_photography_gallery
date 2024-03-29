"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }: any) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e: any) => {
    const params: any = new URLSearchParams(searchParams);

    params.set("page", 1);

    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="flex items-center gap-[10px] bg-[#2e374a] p-[10px] rounded-[10px] max-w-max">
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none text-white outline-none"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
