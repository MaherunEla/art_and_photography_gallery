"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
const signupformSchema = z.object({
  firstname: z.string().min(1, "First Name is required"),
  lastname: z.string().min(1, "Last Name is required"),
  contact: z
    .string()
    .min(1, "Contact is required")
    .length(11, "Must Contain 11 Digit"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid Email address" }),
  occupation: z.string().min(1, "occupation is required"),
});

type FormValues = z.infer<typeof signupformSchema>;
// type FormValues = {
//   firstname: string;
//   lastname: string;
//   contact: string;
//   email: string;
//   job: string;
// };

const Signuppage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signupformSchema),
  });

  const onSubmit = (data: any) => {
    console.log({ data });
  };
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2 border border-gray-200 rounded-2xl pb-5"
        >
          <div className="mb-2 md:mb-4 flex flex-col items-center sm:col-span-2 border border-indigo-500 rounded-t-2xl bg-indigo-500">
            <h2 className="pt-4 mb-4 text-center text-2xl font-bold text-white md:mb-6 lg:text-3xl">
              Sign Up
            </h2>
          </div>

          <div className="my-2 flex flex-col items-center sm:col-span-2 ">
            <label className="themeSwitcherThree relative inline-flex cursor-pointer select-none items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="sr-only"
              />

              <div className="shadow-card flex h-[46px] w-[160px] items-center justify-center font-bold rounded-full bg-white border border-[#e11d48]">
                <span
                  className={`flex h-[45px] w-[80px] items-center justify-center rounded-full ${
                    !isChecked ? "bg-[#e11d48] text-white" : "text-black"
                  }`}
                >
                  User
                </span>
                <span
                  className={`flex h-[45px] w-[80px] items-center justify-center rounded-full ${
                    isChecked ? "bg-[#e11d48] text-white" : "text-black"
                  }`}
                >
                  Author
                </span>
              </div>
            </label>
          </div>
          <div className="px-5">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base ">
              First name
            </label>
            <input
              type="text"
              {...register("firstname")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.firstname && (
              <p className="text-red-600">
                {errors.firstname.message as string}
              </p>
            )}
          </div>

          <div className="px-5">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              Last name
            </label>
            <input
              type="text"
              {...register("lastname")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.lastname && (
              <p className="text-red-600">
                {errors.lastname.message as string}
              </p>
            )}
          </div>

          <div className="sm:col-span-2 px-5">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
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

          <div className="sm:col-span-2 px-5">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
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

          <div className="sm:col-span-2 px-5">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
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

          <div className="flex items-center justify-between sm:col-span-2 px-5">
            <button
              type="submit"
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signuppage;
