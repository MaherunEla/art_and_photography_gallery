"use client";
import React from "react";
import DefaultTable from "../shared/table/DefaultTable";
import { columns } from "./components/column";
import { defaultData } from "./components/ArtistData";
import UserNavbar from "./components/ArtistNavbar";

const page = () => {
  return (
    <div className="container">
      <UserNavbar />

      <div className="my-10">
        <DefaultTable columns={columns} data={defaultData} />
      </div>
    </div>
  );
};

export default page;
