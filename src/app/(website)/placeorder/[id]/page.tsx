"use client";
import React, { useEffect, useState } from "react";
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

        router.push(`/thankyou/${params.id}`);
      })
      .catch((err) => console.log({ err }));
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return null;
  }

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
          className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2"
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
          <div className="relative sm:col-span-2">
            {radio.map((item, idx) => (
              <div key={idx} className="py-2">
                <label htmlFor={item.title} className="block relative">
                  <input
                    id={item.title}
                    type="radio"
                    defaultChecked={idx === 1}
                    className="sr-only peer"
                    value={item.price || 120}
                    {...register("deliverycharge")}
                  />
                  {errors.deliverycharge && (
                    <p className="text-red-600">
                      {errors.deliverycharge.message as string}
                    </p>
                  )}

                  <div className="w-full flex gap-x-3 items-start p-4 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 hover:ring-1 hover:ring-gray-300 transition duration-200">
                    <div className="flex-none">{item.icon}</div>
                    <div>
                      <h3 className="leading-none text-gray-800 font-medium px-3">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="absolute top-4 right-[50px] flex items-center justify-center text-black">
                    <h2 className="font-semibold px-3">{item.price} Tk</h2>
                  </div>

                  <div className="absolute top-4 right-4 w-4 h-4 rounded-full border flex items-center justify-center text-transparent peer-checked:bg-indigo-600 peer-checked:text-white transition duration-200">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 12 10">
                      <polyline
                        fill="none"
                        strokeWidth="2"
                        stroke="currentColor"
                        strokeDasharray="16"
                        points="1.5 6 4.5 9 10.5 1"
                      />
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
          <div className="relative sm:col-span-2  flex flex-col gap-4">
            {cart.length > 0 &&
              cart?.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-wrap gap-4 rounded-lg border p-2 "
                >
                  <Link
                    href={`/gallery/${item.id}`}
                    className="relative h-[90px] w-[70px]  sm:h-[120px] sm:w-[90px]"
                  >
                    <Image
                      src={item.cimage}
                      alt=""
                      className="object-cover rounded"
                      fill
                    />
                    <span className="absolute top-0 right-0  bg-red-500 rounded-bl px-2 py-1 text-sm text-white">
                      {item.quantity}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col justify-between">
                    <p className="text-sm font-bold sm:text-base">
                      {item.title}
                    </p>
                    <p className=" text-gray-500 text-sm">By {item.artist}</p>
                    <p className="font-bold text-sm">
                      ৳
                      {((item.discount ?? item.price) * item.quantity).toFixed(
                        2
                      )}
                    </p>
                  </div>

                  <Link
                    href={`/gallery/${item.id}`}
                    className="relative  h-[90px] w-[70px]  sm:h-[120px] sm:w-[90px]"
                  >
                    <Image
                      src={item.frameImg || ""}
                      alt=""
                      className="object-cover rounded"
                      fill
                    />
                    <span className="absolute top-0 right-0  bg-red-500 rounded-bl px-2 py-1 text-sm text-white">
                      {item.quantity}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col justify-between">
                    <p className=" text-sm font-bold  sm:text-base">
                      {item.frameName}
                    </p>

                    <p className="font-bold text-sm">
                      ৳{((item.framePrice ?? 0) * item.quantity).toFixed(2)}
                    </p>

                    <p className="font-bold text-red-800 text-sm sm:text-base">
                      ৳{" "}
                      {((item.discount ?? item.price) +
                        (item.framePrice ?? 0)) *
                        Number(item.quantity.toFixed(2))}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      dispatch(removeCart(item.id));
                    }}
                    className="absolute top-2 right-2  text-indigo-600 hover:text-red-600 transition"
                  >
                    <IoClose className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              ))}
          </div>
          <div className="sm:col-span-2 mt-4  rounded-lg p-4 bg-gray-100 ">
            <div className="flex justify-between text-sm text-gray-600 py-1">
              <span>Subtotal</span>
              <span>{total.toFixed(2)} ৳</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 py-1">
              <span>Delivery Charge</span>
              <span>{deliveryCharge.toFixed(2)}৳</span>
            </div>
            <div className="mt-4 border-t pt-4 text-lg font-bold">
              <div className="flex justify-between">
                <span>Total</span>
                <span>{(total + deliveryCharge).toFixed(2)}৳</span>
              </div>
              <div className="text-sm text-gray-500 text-right">
                including Delivery Charge
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={cart.length === 0}
            className={`sm:col-span-2 mt-4 py-3 rounded-lg text-white font-semibold transition duration-100 text-center ${
              cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Placeorderpage;
