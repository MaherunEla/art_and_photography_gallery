"use client";
import React, { useState } from "react";
import DefaultTable from "../../components/shared/DefaultTableOrder";
import { columns } from "@/app/(admin)/dashboard/sales/components/column";

import Link from "next/link";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdSearch } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const fetchUpload = async () => {
  const { data } = await axios.get("/api/sales");
  return data;
};
const Productpage = () => {
  const router = useRouter();
  const { status } = useSession();
  const params = useParams();
  console.log("param", params);
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

  const userEmailToFilter = params.id;

  const filteredData: any = data.filter((item: any) =>
    item.product.some((product: any) => product.userEmail === userEmailToFilter)
  );
  console.log(filteredData);

  const tabledata = filteredData || [];

  if (status !== "authenticated") {
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8p-5 p-5 rounded-[10px] mt-5">
      <div className="flex items-center justify-between"></div>
      <div className="my-10">
        <DefaultTable columns={columns} data={tabledata} />
      </div>
    </div>
  );
};

export default Productpage;
