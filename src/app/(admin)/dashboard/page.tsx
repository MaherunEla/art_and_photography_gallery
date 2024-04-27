"use client";
import Image from "next/image";
import Card from "./components/card/card";
import { FaRegImage, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { MdAttachMoney, MdSupervisedUserCircle } from "react-icons/md";
import Transactions from "./components/transactions/transactions";
import Featured from "./components/featured/featured";
import { authOption } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const cards = [
    {
      id: 1,
      title: "Total Users",
      number: 10,
      change: 12,
      icon: FaUserCircle,
    },
    {
      id: 2,
      title: "Total Product",
      number: 8.236,
      change: -2,
      icon: FaRegImage,
    },
    {
      id: 3,
      title: "Revenue",
      number: 6.642,
      change: 18,
      icon: MdAttachMoney,
    },
  ];
  return (
    <main>
      <div className="flex gap-5 mt-5">
        <div className="flex-3 flex flex-col gap-5">
          <div className="flex gap-5 justify-between">
            {cards.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
          <Transactions />
          {/* <Chart />  */}
        </div>
        <div className="flex-1">
          <Featured />
        </div>
      </div>
    </main>
  );
}
