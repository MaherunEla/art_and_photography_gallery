"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { HomeGalleryData } from "../../../../../components/HomeGallery";
import { Product } from "@/types";
import Singleproduct from "../../components/shared/singleproduct";
const Itempage = () => {
  const param = useParams();
  console.log({ param });

  const Gallery: Product | any = HomeGalleryData.find(
    (e) => e.slug == param?.slug
  );
  console.log({ Gallery });

  return (
    <div>
      <Singleproduct Gallery={Gallery} />
    </div>
  );
};

export default Itempage;
