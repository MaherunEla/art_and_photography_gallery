"use client";
import Image from "next/image";
import Card from "./components/card/card";
import { FaRegImage, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { MdAttachMoney, MdSupervisedUserCircle } from "react-icons/md";
import Transactions from "./components/transactions/transactions";
import Featured from "./components/featured/featured";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Chart from "./components/chart/chart";
import { useState, useEffect } from "react";
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
      change: data?.data[4],
      icon: FaUserCircle,
    },
    {
      id: 2,
      title: "Total Product",
      number: data?.data[1],
      change: data?.data[5],
      icon: FaRegImage,
    },
    {
      id: 3,
      title: "Revenue",
      number: data?.data[2],
      change: data?.data[3],
      icon: MdAttachMoney,
    },
  ];

  return (
    <main className="max-w-screen-xl ">
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex gap-5 justify-between">
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between ">
          <Featured
            totalRevenueToday={data?.data[3]}
            totalRevenueLastWeek={data?.data[4]}
            totalRevenueLastMonth={data?.data[5]}
          />

          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="flex-1">
          <Transactions />
        </div>
      </div>
    </main>
  );
}
