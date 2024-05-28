"use client";
import React, { useState } from "react";
import DefaultTable from "../shared/table/DefaultTable";
import { columns } from "./components/column";
import Link from "next/link";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdSearch } from "react-icons/md";

const fetchFrame = async () => {
  const { data } = await axios.get("/api/frame");
  return data;
};
const Framepage = () => {
  const [filtering, setFiltering] = useState("");
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["frame-data"],
    queryFn: fetchFrame,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  const tabledata = data || [];
  const adminemail: string = "meherunela2002@gmail.com";
  const url = `/dashboard/product/add`;

  return (
    <div className="bg-[#182237] p-5 rounded-[10px] mt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px] bg-[#2e374a] p-[10px] rounded-[10px] max-w-max">
          <MdSearch />
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Search for a frame ..."
            className="bg-transparent border-none text-white outline-none"
          />
        </div>

        <Link href="/dashboard/frame/add">
          <button className="p-[10px] bg-[#5d57c9] text-white border-none rounded-[5px] cursor-pointer">
            Add New
          </button>
        </Link>
      </div>
      <div className="my-10">
        <DefaultTable
          columns={columns}
          data={tabledata}
          filtering={filtering}
        />
      </div>
    </div>
  );
};

export default Framepage;
