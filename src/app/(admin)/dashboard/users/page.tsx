"use client";
import React from "react";
import DefaultTable from "../shared/table/DefaultTable";
import { columns } from "./components/column";
import { defaultData } from "./components/UsersData";
import UserNavbar from "./components/UserNavbar";
import Search from "./components/search";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg-[#182237] p-5 rounded-[10px] mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a user ..." />
        <Link href="/">
          <button className="p-[10px] bg-[#5d57c9] text-white border-none rounded-[5px] cursor-pointer">
            Add New
          </button>
        </Link>
      </div>
      <div className="my-10">
        <DefaultTable columns={columns} data={defaultData} />
      </div>
    </div>
  );
};

export default page;
