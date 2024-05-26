"use client";
import React, { useState } from "react";
import DefaultTable from "../../shared/table/DefaultTable";

import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdSearch } from "react-icons/md";
import { columns } from "../columns/column";

const fetchUpload = async () => {
  const { data } = await axios.get("/api/order");
  return data;
};
const Transactions = () => {
  const [filtering, setFiltering] = useState("");
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["order-data"],
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
        <div className="flex items-center gap-[10px]  p-[10px] max-w-max">
          <p className="text-gray-400 text-lg font-semibold">
            Latest Transactions
          </p>
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

export default Transactions;
