"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { HomeGalleryData } from "../../components/home/components/HomeGallery";
//import { Product } from "@/types";
import Singleproduct from "../../components/shared/singleproduct";
import { AdProduct } from "@/types";

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
const Itempage = () => {
  const param = useParams();
  console.log({ param });

  const Gallery: AdProduct | undefined = HomeGalleryData.find(
    (e) => e.slug == param?.slug
  );
  console.log({ Gallery });

  if (!Gallery) {
    // Handle the case when the product is not found
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Singleproduct Gallery={Gallery} />
    </div>
  );
};

export default Itempage;
