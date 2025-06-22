"use client";
import Image from "next/image";
import Card from "./components/card/card";
import { FaRegImage, FaUserAlt, FaUserCircle } from "react-icons/fa";
import {
  MdAttachMoney,
  MdFilterFrames,
  MdSupervisedUserCircle,
} from "react-icons/md";
import Transactions from "./components/transactions/transactions";
import Featured from "./components/featured/featured";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Chart from "./components/chart/chart";
import { useState, useEffect } from "react";
import { FcFrame } from "react-icons/fc";
export default function Home() {
  const fetchCalculation = () => {
    return axios.get("/api/calculation");
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["calculation-data"],
    queryFn: fetchCalculation,
  });
  console.log(data?.data[0]);

  const cards = [
    {
      id: 1,
      title: "Total Users",
      number: data?.data[0],
      change: data?.data[7],
      icon: FaUserCircle,
    },
    {
      id: 2,
      title: "Total Product",
      number: data?.data[1],
      change: data?.data[8],
      icon: FaRegImage,
    },
    {
      id: 3,
      title: "Total Frame",
      number: data?.data[10],
      change: data?.data[11],
      icon: MdFilterFrames,
    },
    {
      id: 4,
      title: "Total Revenue",
      number: data?.data[2],
      change: data?.data[6],
      icon: MdAttachMoney,
    },
  ];

  return (
    <main>
      <div className="flex flex-col gap-5 mt-5">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="w-full md:w-[40%] ">
            <Featured
              totalRevenueToday={data?.data[3]}
              totalRevenueLastWeek={data?.data[4]}
              totalRevenueLastMonth={data?.data[5]}
            />
          </div>

          <div className="w-full md:w-[60%] ">
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
        </div>
        <div className="flex-1">
          <Transactions />
        </div>
      </div>
    </main>
  );
}
