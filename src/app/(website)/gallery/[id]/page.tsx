"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { HomeGalleryData } from "../../components/home/components/HomeGallery";
//import { Product } from "@/types";
import Singleproduct from "../../components/shared/singleproduct";
import { AdProduct } from "@/types";
import Comments from "../../components/comment/Comment";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "../../components/shared/SearchSkeleton";

const fetchUpload = async (id: string) => {
  const { data } = await axios.get(`/api/upload/edit/${id}`);
  return data;
};
const Itempage = () => {
  const param = useParams();
  console.log({ param });
  const productId = Array.isArray(param.id) ? param.id[0] : param.id;

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["upload-data", productId],
    queryFn: () => fetchUpload(productId),
  });

  // console.log({ data });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-wrap justify-center gap-4">
          <SkeletonCard />
        </div>
      </div>
    );
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  if (!data) {
    // Handle the case when the product is not found
    return <div>Product not found</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-12">
      <Singleproduct Gallery={data} />
      <Comments productId={param.id} />
    </div>
  );
};

export default Itempage;
