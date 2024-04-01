"use client";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

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
  password: z.string().min(8, "Password is required"),

  occupation: z.string().min(1, "occupation is required"),
  image: z.string().optional(),

  socialaccountf: z.string().optional(),
  socialaccountl: z.string().optional(),
});

type FormValues = z.infer<typeof signupformSchema>;
const Addpage = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signupformSchema),
  });
  const uploadImages = async (
    file: File
  ): Promise<{ success: number; url: string | null }> => {
    try {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my-uploads");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/djfwg1dfa/image/upload",
        formData
      );
      console.log({ res });

      return {
        success: 1,
        url: res.data.secure_url,
      };
    } catch (error) {
      console.error({ error });
      return {
        success: 1,
        url: null,
      };
    }
  };
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted...", data);
    try {
      const res = await axios.post("http://localhost:3000/api/signup", data);
      console.log({ res });

      queryClient.invalidateQueries({ queryKey: ["signup-data"] });
      toast({
        title: "Updated successfully",
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      // Handle error gracefully
    }
  };

  return (
    <div className="bg-[#182237] p-5 rounded-[10px] mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap justify-between"
      >
        {/* <div className="flex items-center justify-center ">
          <div className=" w-[50px] h-[50px] md:w-[60px] md:h-[60px] flex items-center justify-center absolute -mt-[50px] ml-[150px] md:-mt-[100px] md:ml-[250px] lg:-mt-[140px] lg:ml-[340px]  bg-white border rounded-full">
            <TbMoodEdit size={40} />
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  className="file-input opacity-0 w-full h-full absolute "
                  onChange={async (e: any) => {
                    const file = e.target.files[0];
                    const res: any = await uploadImages(file);
                    console.log("res", res);
                    setValue("image", res.url);
                    field.onChange(res.url);
                  }}
                />
              )}
            />
            {errors.image && (
              <p className="error">{errors.image.message as string}</p>
            )}
          </div>
        </div> */}

        <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              // defaultValue={form.getValues("name")}
              className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none "
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message as string}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold  text-white sm:text-base">
              Contact
            </label>
            <input
              type="text"
              {...register("contact")}
              className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
            />
            {errors.contact && (
              <p className="text-red-600">{errors.contact.message as string}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message as string}</p>
            )}
          </div>
          <div className="sm:col-span-2 ">
            <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
              Password
            </label>
            <input
              type="text"
              {...register("password")}
              className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
            />
            {errors.password && (
              <p className="text-red-600">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
              Image
            </label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none "
                  onChange={async (e: any) => {
                    const file = e.target.files[0];
                    const res: any = await uploadImages(file);
                    console.log("res", res);
                    setValue("image", res.url);
                    field.onChange(res.url);
                  }}
                />
              )}
            />
            {errors.image && (
              <p className="error">{errors.image.message as string}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
              Occupation
            </label>
            <input
              type="text"
              {...register("occupation")}
              className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
            />
            {errors.occupation && (
              <p className="text-red-600">
                {errors.occupation.message as string}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
              Social Accunts
            </label>
            <input
              type="text"
              placeholder="Twiter"
              {...register("socialaccountf")}
              className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none mb-5"
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
              className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
            />
            {errors.socialaccountl && (
              <p className="text-red-600">
                {errors.socialaccountl.message as string}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between sm:col-span-2">
            <button
              type="submit"
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addpage;
