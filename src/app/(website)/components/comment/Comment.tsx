"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const fetcher = async (url: any) => {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.comments);
  if (!res.ok) {
    const error = new Error(data.message);
  }
  return data;
};
type Props = {
  productId: any;
};
const Comments = ({ productId }: Props) => {
  const { status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `/api/comments?productId=${productId}`,
    fetcher
  );
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ text, productId }),
    });
    setText("");
    mutate();
  };
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
      <h1 className="text-2xl text-[#626262] font-bold mb-6">Comments</h1>
      {status === "authenticated" ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 py-6">
          <textarea
            className="w-full sm:flex-1 py-3 px-3 border border-slate-200 bg-slate-200 rounded-lg outline-none text-black resize-none min-h-[100px]"
            placeholder="write a comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-full sm:w-fit px-6 py-3 bg-emerald-600 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="inline-block text-emerald-600 font-semibold underline py-6"
        >
          Login to write a comment
        </Link>
      )}
      <div className="flex flex-col gap-8 mt-8">
        {isLoading
          ? "loading"
          : data?.comments.map((item: any) => (
              <div className="flex flex-col gap-4 border-b pb-6" key={item.id}>
                <div className="flex items-start gap-4">
                  <div className="relative w-[50px] h-[50px] shrink-0">
                    <Image
                      src={item?.user?.image}
                      alt="image"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-[#111827]">
                      {item?.user?.name}
                    </span>
                    <p className="text-sm text-gray-700">{item?.text}</p>
                    {/* <span>{item.createdAt.substring(0, 10)}</span> */}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {item?.createdAt.substring(0, 10)}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
