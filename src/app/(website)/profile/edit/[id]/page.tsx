"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { TbMoodEdit } from "react-icons/tb";
import { z } from "zod";

const signupformSchema = z.object({
  name: z.string().min(1, "Name is required"),

  contact: z
    .string()
    .min(1, "Contact is required")
    .length(11, "Must Contain 11 Digit"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid Email address" }),

  occupation: z.string().min(1, "occupation is required"),
  image: z.string().min(1, "Image is reguired"),

  socialaccountf: z.string().optional(),
  socialaccountl: z.string().optional(),
});

type FormValues = z.infer<typeof signupformSchema>;

const Profileeditpage = () => {
  const params = useParams();
  console.log("param", params);

  const fetchProfile = () => {
    return axios.get(`/api/signup/${params.id}`);
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["Profile-data"],
    queryFn: fetchProfile,
  });

  console.log(data?.data.email);

  const form = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await axios.get(`/api/signup/${params.id}`);
      return data;
    },
    resolver: zodResolver(signupformSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    console.log({ data });
  };
  return (
    <div className="bg-gradient-to-r from-indigo-100 py-6 sm:py-8 lg:py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-screen-2xl px-4 md:px-8"
      >
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px]  lg:w-[400px] lg:h-[400px]  mx-auto relative">
          <Image
            src={data?.data.image}
            fill
            className="rounded-full border-4 border-gray-300"
            alt=""
          />
        </div>
        <div className="flex items-center justify-center ">
          <div className=" w-[50px] h-[50px] md:w-[60px] md:h-[60px] flex items-center justify-center absolute -mt-[50px] ml-[150px] md:-mt-[100px] md:ml-[250px] lg:-mt-[140px] lg:ml-[340px]  bg-white border rounded-full">
            <TbMoodEdit size={40} />
          </div>
        </div>

        <div className="flex items-center justify-center pt-5"></div>
        <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-gray-800 sm:text-base">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              // defaultValue={form.getValues("name")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message as string}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold  text-gray-800 sm:text-base">
              Contact
            </label>
            <input
              type="text"
              {...register("contact")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.contact && (
              <p className="text-red-600">{errors.contact.message as string}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-gray-800 sm:text-base">
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message as string}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-gray-800 sm:text-base">
              Occupation
            </label>
            <input
              type="text"
              {...register("occupation")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.occupation && (
              <p className="text-red-600">
                {errors.occupation.message as string}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-gray-800 sm:text-base">
              Social Accunts
            </label>
            <input
              type="text"
              placeholder="Twiter"
              {...register("socialaccountf")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.socialaccountf && (
              <p className="text-red-600">
                {errors.socialaccountf.message as string}
              </p>
            )}
            <input
              type="text"
              {...register("socialaccountl")}
              placeholder="LinkedIn"
              className="w-full rounded border bg-gray-50 mt-4 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.socialaccountl && (
              <p className="text-red-600">
                {errors.socialaccountl.message as string}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profileeditpage;
