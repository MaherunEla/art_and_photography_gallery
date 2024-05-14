"use client";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "./featured.scss";
import "react-circular-progressbar/dist/styles.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Featured = ({
  totalRevenueToday,
  totalRevenueLastWeek,
  totalRevenueLastMonth,
}: any) => {
  const percent = +(totalRevenueToday * 0.01).toFixed(2);

  return (
    <div className="featured max-w-md">
      <div className="top">
        <h1 className="title text-[24px]">Total Revenue</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={percent}
            text={`${percent}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount text-white">{totalRevenueToday}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
              <div className="resultAmount">৳ 12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <div className="resultAmount">৳ {totalRevenueLastWeek}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <div className="resultAmount">৳ {totalRevenueLastMonth}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
