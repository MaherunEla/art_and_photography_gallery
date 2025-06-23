"use client";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
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
  image: z.string().min(1, "Image is reguired"),
  role: z.string(),

  socialaccountf: z.string().optional(),
  socialaccountl: z.string().optional(),
});

type FormValues = z.infer<typeof signupformSchema>;

const Viewpage = () => {
  const params = useParams();

  const encodedEmail = params.id as string;
  const decodedEmail = decodeURIComponent(encodedEmail);

  console.log(params.id);

  const fetchProfile = async () => {
    const { data } = await axios.get(`/api/signup/${decodedEmail}`);
    return data;
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["signup-data"],
    queryFn: fetchProfile,
  });

  console.log({ data });
  const [image, setImage] = useState(data?.image);

  const form = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await axios.get(`/api/signup/${decodedEmail}`);
      return data;
    },
    resolver: zodResolver(signupformSchema),
  });

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = form;

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
      const res = await axios.put(`/api/signup/${decodedEmail}`, data);
      console.log({ res });
      refetch();
      queryClient.invalidateQueries({ queryKey: ["signup-data"] });
      toast({
        title: "Updated successfully",
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      // Handle error gracefully
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }
  return (
    <div className="flex flex-col gap-8 mt-5 md:flex-row md:gap-[50px]">
      <div className="flex-1 bg-[#182237] p-5 rounded-[10px] font-bold text-[#b7bac1] w-full">
        <div className="w-full max-w-[400px] aspect-square relative rounded-[10px] overflow-hidden mb-5 ">
          <Image
            src={image || data?.image}
            alt={data?.name}
            fill
            className="object-cover"
          />
        </div>
        {data?.name}
      </div>
      <div className="flex-[2] bg-[#182237] p-5 rounded-[10px] w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex items-center justify-center pt-5"></div>
          <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                // defaultValue={form.getValues("name")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
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
                <p className="text-red-600">
                  {errors.contact.message as string}
                </p>
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
                      setImage(res.url);
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
                Role
              </label>
              <input
                type="text"
                {...register("role")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              />
              {errors.role && (
                <p className="text-red-600">{errors.role.message as string}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Social Accunts
              </label>
              <input
                type="text"
                placeholder="LinkedIn"
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
                placeholder="Twiter"
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Viewpage;
