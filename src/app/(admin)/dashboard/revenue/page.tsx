"use client";
import React, { useState } from "react";
import DefaultTable from "../shared/table/DefaultTable";
import { columns } from "./components/column";

import Link from "next/link";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdSearch } from "react-icons/md";

const fetchUpload = async () => {
  const { data } = await axios.get("/api/sales");
  return data;
};
const Productpage = () => {
  const [filtering, setFiltering] = useState("");
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["upload-data"],
    queryFn: fetchUpload,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  const tabledata = data || [];

  return (
    <div className="bg-[#182237] p-5 rounded-[10px] mt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px] bg-[#2e374a] p-[10px] rounded-[10px] max-w-max">
          <MdSearch />
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Search for a user ..."
            className="bg-transparent border-none text-white outline-none"
          />
        </div>
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

export default Productpage;
