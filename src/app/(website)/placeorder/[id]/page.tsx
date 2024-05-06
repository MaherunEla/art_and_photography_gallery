"use client";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { MdEventNote, MdPhoneAndroid } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import {
  addQuantity,
  decrementQuantity,
  removeCart,
} from "@/app/redux_store/cartAddSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const orderformSchema = z.object({
  name: z.string().min(1, "Name is required"),

  contact: z
    .string()
    .min(1, "Contact is required")
    .length(11, "Must Contain 11 Digit"),
  address: z.string().min(4, "address is required"),
  deliverycharge: z.string().transform((value) => parseFloat(value)),
  ordernote: z.string().optional(),
});

type FormValues = z.infer<typeof orderformSchema>;

const Placeorderpage = () => {
  const radio = [
    {
      title: "Inside Dhaka Delivery Charge",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black absolute left-3 inset-y-0 my-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      ),
      price: 60,
    },
    {
      title: "Outside Dhaka Delivery Charge ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black absolute left-3 inset-y-0 my-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      ),
      price: 120,
    },
  ];
  const { data: session, status } = useSession();
  console.log(session?.user?.email);

  const params = useParams();
  console.log("param", params);

  const fetchProfile = () => {
    return axios.get(`/api/signup/${params.id}`);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["signup-data"],
    queryFn: fetchProfile,
  });

  const cart = useAppSelector((state) => state?.cart?.products);
  console.log(cart);

  const router = useRouter();
  const total: number = cart.reduce(
    (sum, item) =>
      sum +
      (item.discount !== null
        ? item.discount + (item.framePrice ?? 0)
        : item.price + (item.framePrice ?? 0)) *
        item.quantity,
    0
  );
  const revenue: number = cart.reduce(
    (sum, item) =>
      sum +
      (item.discount !== null
        ? item.discount + (item.framePrice ?? 0)
        : item.price + (item.framePrice ?? 0)) *
        0.1 *
        item.quantity,
    0
  );

  const userEmail: any = session?.user?.email;

  const form = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await axios.get(`/api/signup/${params.id}`);
      return data;
    },
    resolver: zodResolver(orderformSchema),
  });

  console.log({ revenue });
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = form;
  const deliveryCharge = Number(form.watch("deliverycharge")) || 120;
  const onSubmit = async (formdata: FormValues) => {
    console.log("cart data", cart);
    const data = {
      product: cart,
      total: total + formdata.deliverycharge,
      formdata,
      revenue,
      userEmail,
    };
    axios
      .post("/api/order", data)
      .then((res) => {
        console.log({ res });
        toast({
          title: "Order added Successfully",
        });
        localStorage.clear();

        router.push(`/thankyou/${params.id}`);
      })
      .catch((err) => console.log({ err }));
  };
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            For Cash on delivery
          </h2>
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Enter your information to order
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto grid w-[500px] gap-4 sm:grid-cols-2"
        >
          <div className="relative sm:col-span-2 ">
            <IoMdContact className="w-6 h-6 text-black absolute left-3 inset-y-0 my-auto" />
            <input
              type="text"
              placeholder="Enter your Name"
              {...register("name")}
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message as string}</p>
            )}
          </div>
          <div className="relative sm:col-span-2 ">
            <MdPhoneAndroid className="w-6 h-6 text-black absolute left-3 inset-y-0 my-auto" />
            <input
              type="text"
              placeholder="Enter your Contact"
              {...register("contact")}
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.contact && (
              <p className="text-red-600">{errors.contact.message as string}</p>
            )}
          </div>
          <div className="relative sm:col-span-2 ">
            <FaLocationDot className="w-6 h-6 text-black absolute left-3 inset-y-0 my-auto" />
            <input
              type="text"
              placeholder="Enter your Address"
              {...register("address")}
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.address && (
              <p className="text-red-600">{errors.address.message as string}</p>
            )}
          </div>
          <div className="relative sm:col-span-2 ">
            {radio.map((item, idx) => (
              <div key={idx} className="py-2">
                <label htmlFor={item.title} className="block relative">
                  <input
                    id={item.title}
                    type="radio"
                    defaultChecked={idx == 1 ? true : false}
                    className="sr-only peer"
                    value={item.price || 120}
                    {...register("deliverycharge")}
                  />
                  {errors.deliverycharge && (
                    <p className="text-red-600">
                      {errors.deliverycharge.message as string}
                    </p>
                  )}
                  <div className=" w-full flex gap-x-3 items-start p-4 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 duration-200">
                    <div className="flex-none">{item.icon}</div>
                    <div>
                      <h3 className="leading-none text-gray-800 font-medium px-3">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute top-4 right-[50px] flex-none flex items-center justify-center w-4 h-4  text-black">
                    <h2 className=" font-semibold px-3">{item.price}Tk</h2>
                  </div>

                  <div className="absolute top-4 right-4 flex-none flex items-center justify-center w-4 h-4 rounded-full border peer-checked:bg-indigo-600 text-white peer-checked:text-white duration-200">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 12 10">
                      <polyline
                        fill="none"
                        stroke-width="2px"
                        stroke="currentColor"
                        stroke-dasharray="16px"
                        points="1.5 6 4.5 9 10.5 1"
                      ></polyline>
                    </svg>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="relative sm:col-span-2 ">
            <MdEventNote className="w-6 h-6 text-black absolute left-3 inset-y-0 my-auto" />
            <input
              type="text"
              placeholder="Enter order note"
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div className="relative sm:col-span-2  mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
            {cart.length > 0 &&
              cart?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6"
                >
                  <Link
                    href={`/gallery/${item.id}`}
                    className="group relative block h-[50px] w-[50px] overflow-hidden bg-gray-100 sm:h-[120px] sm:w-[70px]"
                  >
                    <Image
                      src={item.cimage}
                      loading="lazy"
                      alt=""
                      className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                      fill
                    />
                    <span className="absolute right-0  rounded-l-lg bg-red-500 px-2 py-1 text-sm font-semibold uppercase tracking-wider text-white">
                      {item.quantity}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col justify-between py-4">
                    <div>
                      <a
                        href="#"
                        className="mb-1 inline-block text-sm font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-sm"
                      >
                        {item.title}
                      </a>
                      <span className="block text-gray-500 text-base">
                        By {item.artist}
                      </span>
                    </div>

                    <div>
                      <span className="mb-1 block font-bold text-gray-800 md:text-sm">
                        ৳
                        {(
                          (item.discount === null
                            ? item.price
                            : item.discount) * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {item.category === "Digitally Captured" ? (
                    <>
                      <Link
                        href={`/gallery/${item.id}`}
                        className="group relative block  h-[50px] w-[50px] overflow-hidden bg-gray-100 sm:h-[120px] sm:w-[70px]"
                      >
                        <Image
                          src={item.frameImg || ""}
                          loading="lazy"
                          alt=""
                          className=" mt-8 object-cover object-center transition duration-200 group-hover:scale-110"
                          width={160}
                          height={240}
                        />
                        <span className="absolute right-0 top-0 rounded-l-lg bg-red-500 px-2 py-1 text-sm font-semibold uppercase tracking-wider text-white">
                          {item.quantity}
                        </span>
                      </Link>

                      <div className="flex flex-1 flex-col justify-between py-4">
                        <div>
                          <a
                            href="#"
                            className="mb-1 inline-block text-sm font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-sm"
                          >
                            {item.frameName}
                          </a>
                          <div>
                            <span className="mb-1 block font-bold text-gray-800 md:text-sm">
                              ৳
                              {((item.framePrice ?? 0) * item.quantity).toFixed(
                                2
                              )}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="mb-1 block font-bold text-red-800 md:text-lg">
                            ৳
                            {(item.discount === null
                              ? (item?.price + (item?.framePrice ?? 0)) *
                                item?.quantity
                              : (item?.discount + (item?.framePrice ?? 0)) *
                                item?.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="flex w-full justify-between border-t px-2 sm:w-auto sm:border-none sm:pl-0  lg:pl-0">
                    <div className="ml-4  md:ml-8  lg:ml-16">
                      <span className="block font-bold text-gray-800 md:text-lg">
                        <button
                          onClick={() => {
                            dispatch(removeCart(item.id));
                          }}
                          className="select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                        >
                          <IoClose className="text-black " />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="sm:col-span-2 mt-4  rounded-lg p-4 bg-gray-100 ">
            <div className="flex  items-start justify-between gap-4 text-gray-500 py-1">
              <span className="font-medium">Subtotal</span>

              <span className="flex flex-col items-end">
                <span className="font-medium text-sm">
                  {total.toFixed(2)} ৳
                </span>
              </span>
            </div>
            <div className="flex  items-start justify-between gap-4 text-gray-500 py-1">
              <span className="font-medium">Delivery Charge</span>

              <span className="flex flex-col items-end">
                <span className="text-sm font-medium">
                  {deliveryCharge.toFixed(2)}৳
                </span>
              </span>
            </div>
            <div className="flex mt-4 border-t pt-4  items-start justify-between gap-4 text-gray-800">
              <span className="text-lg font-bold">Total</span>

              <span className="flex flex-col items-end">
                <span className="text-lg font-bold">
                  {(total + deliveryCharge).toFixed(2)}৳
                </span>
                <span className="text-sm text-gray-500">
                  including Delivery Charge
                </span>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="inline-block sm:col-span-2 rounded-lg bg-indigo-500  py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Placeorderpage;
