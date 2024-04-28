import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";

const Card = ({ item }: any) => {
  return (
    <div className="bg-[#182237] p-5 rounded-[10px] flex gap-5  w-full">
      <item.icon className="text-white" size={24} />
      <div className="flex flex-col gap-5">
        <span className="text-white">{item.title}</span>
        <span className="text-white text-[24px] font-semibold">
          {item.number}
        </span>
        <span className="text-white md:text-[16px] lg:text-[20px] font-light">
          <span className={item.change > 0 ? "text-green-400" : "text-red-500"}>
            {item.change}%
          </span>
          {item.change > 0 ? "more" : "less"} than previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
