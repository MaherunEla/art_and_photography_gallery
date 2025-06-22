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

// interface Product {
//   id: number;
//   slug: string;
//   title: string;
//   description: string; // Make description optional
//   image: any;
//   price: number;
//   discount: number;
//   artist: string;
//   quantity: number;
// }

const fetchUpload = async () => {
  const { data } = await axios.get("/api/upload/gallery");
  return data;
};
const Itempage = () => {
  const param = useParams();
  console.log({ param });

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["upload-data"],
    queryFn: fetchUpload,
  });

  console.log({ data });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  const Gallery: AdProduct | undefined = data.find(
    (e: any) => e.id == param?.id
  );
  console.log({ Gallery });

  if (!Gallery) {
    // Handle the case when the product is not found
    return <div>Product not found</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-12">
      <Singleproduct Gallery={Gallery} />
      <Comments productId={param.id} />
    </div>
  );
};

export default Itempage;
