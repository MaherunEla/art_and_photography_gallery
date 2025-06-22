"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import { useToast } from "@/components/ui/use-toast";
import {
  addQuantity,
  decrementQuantity,
  removeCart,
} from "@/app/redux_store/cartAddSlice";
import axios from "axios";
import { useSession } from "next-auth/react";

const Carttablepage = () => {
  const { toast } = useToast();
  const { data: session, status } = useSession();

  const cart = useAppSelector((state) => state?.cart?.products);
  console.log(cart);

  const total: number = cart.reduce(
    (sum, item) =>
      sum +
      (item.discount !== null
        ? item.discount + (item.framePrice ?? 0)
        : item.price + (item.framePrice ?? 0)) *
        item.quantity,
    0
  );

  const dispatch = useAppDispatch();
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Your Cart
          </h2>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
          {cart.length > 0 &&
            cart?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row flex-wrap gap-4  rounded-lg border p-4"
              >
                <Link
                  href="#"
                  className="group relative w-full max-w-[160px] aspect-[3/4] sm:max-w-[180px] md:max-w-[200px] overflow-hidden bg-gray-100"
                >
                  <Image
                    src={item.cimage}
                    loading="lazy"
                    alt=""
                    sizes="(max-width:640px) 100vw, (max-width:768px) 50vw, 200px"
                    className="object-contain object-center transition duration-200 group-hover:scale-110"
                    fill
                  />
                </Link>

                <div className="flex  flex-col justify-between flex-1">
                  <div>
                    <p className="text-lg font-bold text-gray-800 lg:text-xl">
                      {item.title}
                    </p>
                    <span className="text-gray-500">By Jone deo </span>
                  </div>

                  <div>
                    <span className="font-bold text-gray-800 md:text-lg">
                      ৳
                      {item.discount
                        ? item.discount.toFixed(2)
                        : item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="group relative w-full max-w-[160px] aspect-[3/4]  bg-gray-100 overflow-hidden sm:max-w-[180px] md:max-w-[200px]">
                  <Image
                    src={item?.frameImg || ""}
                    loading="lazy"
                    alt=""
                    className="object-cover object-center transition duration-200 group-hover:scale-110"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 200px"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-lg font-bold text-gray-800 lg:text-xl">
                      {item.frameName}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-gray-800 md:text-lg">
                      ৳{item?.framePrice?.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 mt-4 border-t pt-4 sm:border-none sm:mt-0">
                  <div className="flex flex-col gap-2">
                    {item?.category === "Digitally Captured" && (
                      <div className="flex h-12 w-24 overflow-hidden rounded border">
                        <p className="w-full px-4 py-2 text-center">
                          {item?.quantity}
                        </p>

                        <div className="flex flex-col divide-y border-l">
                          <button
                            onClick={() => {
                              dispatch(addQuantity(item.id));
                            }}
                            className="flex-1  hover:bg-gray-100"
                          >
                            +
                          </button>
                          <button
                            disabled={item.quantity === 1}
                            onClick={() => {
                              dispatch(decrementQuantity(item.id));
                            }}
                            className="flex-1 hover:bg-gray-100"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        dispatch(removeCart(item.id));
                      }}
                      className="text-sm font-semibold text-indigo-500  hover:text-indigo-600"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="text-right sm:text-left">
                    <span className="font-bold text-gray-800 md:text-lg">
                      ৳
                      {(
                        (item.discount ??
                          item.price + (item?.framePrice ?? 0)) * item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
            <div className="mt-4 border-t pt-4">
              <div className="flex items-start justify-between text-gray-800">
                <span className="text-lg font-bold">Total</span>
                <span className="flex flex-col items-end">
                  <span className="text-lg font-bold">
                    {total.toFixed(2)} ৳
                  </span>
                  <span className="text-sm text-gray-500">
                    Without including Delivery charge
                  </span>
                </span>
              </div>
            </div>
          </div>

          {session ? (
            <Link href={`/placeorder/${session?.user?.email}`}>
              <button className=" rounded-lg bg-indigo-500 px-8 py-3  text-white hover:bg-indigo-600">
                Place Order
              </button>
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-gray-200 px-8 py-3  text-gray-500 hover:bg-gray-300"
            >
              Sign Up / Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carttablepage;
