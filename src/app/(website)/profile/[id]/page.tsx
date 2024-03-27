"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const Profilepage = () => {
  const params = useParams();
  console.log("param", params);

  const fetchProfile = () => {
    return axios.get(`/api/signup/${params.id}`);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["signup-data"],
    queryFn: fetchProfile,
  });

  console.log(data?.data.email);
  const defaultImage = "/assets/images/home/defaultimage.jpg";

  return (
    <div className="bg-gradient-to-r from-indigo-100 py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px]  lg:w-[400px] lg:h-[400px]  mx-auto relative">
          <Image
            src={data?.data.image || defaultImage}
            fill
            className="rounded-full border-4 border-gray-300"
            alt=""
          />
        </div>

        <div className="flex items-center justify-center pt-5">
          <Link
            href={`/profile/edit/${data?.data.email}`}
            className="rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:text-white md:text-base md:inline-block"
          >
            Edit Profile
          </Link>
        </div>
        <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-gray-800 sm:text-base">
              Name
            </label>
            <p className="border border-gray-200 px-3 py-2 rounded-sm">
              {data?.data.name}
            </p>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold  text-gray-800 sm:text-base">
              Contact
            </label>
            <p className="border border-gray-200 px-3 py-2 rounded-sm">
              {data?.data.contact}
            </p>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-gray-800 sm:text-base">
              Email
            </label>
            <p className="border border-gray-200 px-3 py-2 rounded-sm">
              {data?.data.email}
            </p>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-gray-800 sm:text-base">
              Occupation
            </label>
            <p className="border border-gray-200 px-3 py-2 rounded-sm">
              {data?.data.occupation}
            </p>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-gray-800 sm:text-base">
              Social Accunts
            </label>
            <p className="border border-gray-200 px-3 py-2 rounded-sm">
              linked in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
