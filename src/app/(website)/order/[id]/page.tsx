"use client";
import React, { useState } from "react";
import DefaultTable from "../../components/shared/DefaultTableOrder";
import { columns } from "@/app/(website)/order/column";

import Link from "next/link";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdSearch } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Productpage = () => {
  const params = useParams();
  console.log("param", params);
  const router = useRouter();
  const { status } = useSession();

  const fetchUpload = async () => {
    const { data } = await axios.get(`/api/userorder/${params.id}`);
    return data;
  };

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

  if (status !== "authenticated") {
    router.push("/");
  }

  return (
    <div className=" mx-auto max-w-screen-2xl px-4 md:px-8p-5 rounded-[10px] mt-5">
      <div className="flex items-center justify-between">
        {/* <Link href={url}>
          <button className="p-[10px] bg-[#5d57c9] text-white border-none rounded-[5px] cursor-pointer">
            Add New
          </button>
        </Link> */}
      </div>
      <div className="my-10">
        <DefaultTable columns={columns} data={tabledata} />
      </div>
    </div>
  );
};

export default Productpage;
