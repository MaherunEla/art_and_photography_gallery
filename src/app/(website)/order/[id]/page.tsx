"use client";
import React, { useEffect, useState } from "react";
import DefaultTable from "../../components/shared/DefaultTableOrder";
import { columns } from "@/app/(website)/order/column";

import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["order-data", params.id],
    queryFn: fetchUpload,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  const tabledata = data || [];

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className=" mx-auto max-w-screen-2xl px-4 md:px-8p-5 rounded-[10px] mt-5">
      <div className="flex items-center justify-between"></div>
      <div className="my-10">
        <DefaultTable columns={columns} data={tabledata} />
      </div>
    </div>
  );
};

export default Productpage;
