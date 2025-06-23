"use client";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Productstatus, Stockstatus } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TbMoodEdit } from "react-icons/tb";
import { z } from "zod";

const FrameSchema = z.object({
  framename: z.string().min(1, "Frame name is required"),

  frameprice: z
    .union([
      z.string().transform((value) => parseFloat(value)),
      z.number(),
      z.null(),
    ])
    .optional(),
  frameimage: z.string().min(1, "Image is required"),
  stockstatus: z.string().min(1, "Stock is required").optional(),
});

type FormValues = z.infer<typeof FrameSchema>;

const Viewpage = () => {
  const params = useParams();

  console.log(params.id);

  const fetchFrame = async () => {
    const { data } = await axios.get(`/api/frame/${params.id}`);
    return data;
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["frame-data"],
    queryFn: fetchFrame,
  });

  console.log(data);
  const [image, setImage] = useState(data?.frameimage);

  const form = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await axios.get(`/api/frame/${params.id}`);
      return data;
    },
    resolver: zodResolver(FrameSchema),
  });
  console.log(form.getValues);

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

      if (res.data.secure_url) {
        toast({
          title: "Image Updated successfully",
        });
      }

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
      const res = await axios.put(`/api/frame/${params.id}`, data);
      console.log({ res });
      refetch();
      queryClient.invalidateQueries({ queryKey: ["frame-data"] });
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
        <div className="w-full max-w-[400px] aspect-square relative rounded-[10px] overflow-hidden mb-5">
          <Image
            src={image || data?.frameimage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        {data?.framename}
      </div>
      <div className="flex-[2] bg-[#182237] p-5 rounded-[10px] w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex items-center justify-center pt-5"></div>
          <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Frame Name
              </label>
              <input
                type="text"
                {...register("framename")}
                // defaultValue={form.getValues("name")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              />
              {errors.framename && (
                <p className="text-red-600">
                  {errors.framename.message as string}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Price
              </label>
              <input
                type="text"
                {...register("frameprice")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              />
              {errors.frameprice && (
                <p className="text-red-600">
                  {errors.frameprice.message as string}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Select Stock Status
              </label>
              <select
                {...register("stockstatus")}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring "
              >
                <option selected value="0">
                  Select Status
                </option>
                {["Stock", "OutofStock"].map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Frame Image
              </label>
              <Controller
                name="frameimage"
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
                      setValue("frameimage", res.url);
                      setImage(res.url);
                      field.onChange(res.url);
                    }}
                  />
                )}
              />
              {errors.frameimage && (
                <p className="error">{errors.frameimage.message as string}</p>
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
