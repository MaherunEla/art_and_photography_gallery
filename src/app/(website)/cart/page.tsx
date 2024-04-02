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

const Carttablepage = () => {
  const { toast } = useToast();

  const cart = useAppSelector((state) => state?.cart?.products);
  console.log(cart);
  const total: number = cart.reduce(
    (sum, item) => sum + item.discount * item.quantity,
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
                className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6"
              >
                <Link
                  href="#"
                  className="group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 sm:w-40"
                >
                  <Image
                    src={item.image}
                    loading="lazy"
                    alt=""
                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    fill
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between py-4">
                  <div>
                    <a
                      href="#"
                      className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                    >
                      {item.title}
                    </a>
                    <span className="block text-gray-500">By Jone deo </span>
                  </div>

                  <div>
                    <span className="mb-1 block font-bold text-gray-800 md:text-lg">
                      ৳{item.discount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex w-full justify-between border-t p-4 sm:w-auto sm:border-none sm:pl-0 lg:p-6 lg:pl-0">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex h-12 w-20 overflow-hidden rounded border">
                      <p className="w-full px-4 py-2 outline-none ring-inset ring-indigo-300 transition duration-100 focus:ring">
                        {item?.quantity}
                      </p>

                      <div className="flex flex-col divide-y border-l">
                        <button
                          onClick={() => {
                            dispatch(addQuantity(item.id));
                          }}
                          className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                        >
                          +
                        </button>
                        <button
                          disabled={item.quantity === 1}
                          onClick={() => {
                            dispatch(decrementQuantity(item.id));
                          }}
                          className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                        >
                          -
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        dispatch(removeCart(item.id));
                      }}
                      className="select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="ml-4 pt-3 md:ml-8 md:pt-2 lg:ml-16">
                    <span className="block font-bold text-gray-800 md:text-lg">
                      ৳{(item.discount * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
            <div className="space-y-1">
              {/* <div className="flex justify-between gap-4 text-gray-500">
                <span>Subtotal</span>
                <span>৳129.99</span>
              </div> */}

              {/* <div className="flex justify-between gap-4 text-gray-500">
                  <span>Shipping</span>
                  <span>৳4.99</span>
                </div> */}
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-start justify-between gap-4 text-gray-800">
                <span className="text-lg font-bold">Total</span>

                <span className="flex flex-col items-end">
                  <span className="text-lg font-bold">
                    {total.toFixed(2)} ৳
                  </span>
                  <span className="text-sm text-gray-500">
                    including Delivery charge
                  </span>
                </span>
              </div>
            </div>
          </div>
          <Link href="/placeorder">
            <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
              Place Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carttablepage;
