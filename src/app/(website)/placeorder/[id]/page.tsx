"use client";
import React from "react";
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
  ordernote: z.string().optional(),
});

type FormValues = z.infer<typeof orderformSchema>;

const Placeorderpage = () => {
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
    (sum, item) => sum + item.discount * item.quantity,
    0
  );
  const revenue: number = cart.reduce(
    (sum, item) => sum + item.discount * 0.1 * item.quantity,
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
  } = form;
  const onSubmit = async (formdata: FormValues) => {
    console.log("cart data", cart);
    const data = {
      product: cart,
      total,
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
                    href={`/gallery/${item.slug}`}
                    className="group relative block h-[50px] w-[50px] overflow-hidden bg-gray-100 sm:h-[120px] sm:w-[70px]"
                  >
                    <Image
                      src={item.image}
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
                        By Jone deo{" "}
                      </span>
                    </div>

                    <div>
                      <span className="mb-1 block font-bold text-gray-800 md:text-sm">
                        ৳{(item.discount * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

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
          <div className="sm:col-span-2 mt-4 border rounded-[10px] p-4 bg-gray-200 ">
            <div className="flex items-start justify-between gap-4 text-gray-800">
              <span className="text-lg font-bold">Total</span>

              <span className="flex flex-col items-end">
                <span className="text-lg font-bold">{total.toFixed(2)} ৳</span>
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
