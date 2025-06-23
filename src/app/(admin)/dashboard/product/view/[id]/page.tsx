"use client";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Productstatus } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TbMoodEdit } from "react-icons/tb";
import { z } from "zod";

const uploadformSchema = z.object({
  title: z.string().min(1, "Title is required"),

  price: z
    .union([
      z.string().transform((value) => parseFloat(value)),
      z.number(),
      z.null(),
    ])
    .optional(),
  discount: z
    .union([
      z.string().transform((value) => parseFloat(value)),
      z.number(),
      z.null(),
    ])
    .optional(),
  category: z.string().min(3, "Category is required"),
  artist: z.string().min(1, "Artist is required"),
  permission: z.string().optional(),
  description: z.string().optional(),
  image: z.string().min(1, "Image is required"),
  cimage: z.string().min(1, "Water mark image is required").optional(),
  productstatus: z
    .string()
    .min(4, "Sale or Notsale")
    .optional()
    .refine((value) => value === "Sale" || value === "Notsale", {
      message: "Product status must be 'Sale' or 'Notsale'",
    }),
});

type FormValues = z.infer<typeof uploadformSchema>;

const Viewpage = () => {
  const params = useParams();

  const encodedEmail = params.id as string;
  const decodedEmail = decodeURIComponent(encodedEmail);

  console.log(params.id);

  const fetchProfile = async () => {
    const { data } = await axios.get(`/api/upload/edit/${decodedEmail}`);
    return data;
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["upload-data"],
    queryFn: fetchProfile,
  });

  console.log({ data });
  const [image, setImage] = useState(data?.image);

  const form = useForm<FormValues>({
    defaultValues: async () => {
      const { data } = await axios.get(`/api/upload/edit/${decodedEmail}`);
      return data;
    },
    resolver: zodResolver(uploadformSchema),
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
      const res = await axios.put(`/api/upload/edit/${decodedEmail}`, data);
      console.log({ res });
      refetch();
      queryClient.invalidateQueries({ queryKey: ["upload-data"] });
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
        <div className="w-full max-w-[400px]  aspect-square relative rounded-[10px] overflow-hidden mb-5 ">
          <Image
            src={image || data?.image}
            alt={data?.title}
            fill
            className="object-cover"
          />
        </div>
        {data?.title}
      </div>
      <div className="flex-[2] bg-[#182237] p-5 rounded-[10px] w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex items-center justify-center pt-5"></div>
          <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Title
              </label>
              <input
                type="text"
                {...register("title")}
                // defaultValue={form.getValues("name")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              />
              {errors.title && (
                <p className="text-red-600">{errors.title.message as string}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold  text-white sm:text-base">
                Description
              </label>
              <textarea
                {...register("description")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Price
              </label>
              <input
                type="text"
                {...register("price")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              />
              {errors.price && (
                <p className="text-red-600">{errors.price.message as string}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Discounted
              </label>
              <input
                type="text"
                {...register("discount")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              />
              {errors.discount && (
                <p className="text-red-600">
                  {errors.discount.message as string}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring "
              >
                <option selected value="0">
                  Select Category
                </option>
                {[
                  "Digitally Captured",
                  "Color Painting",
                  "Water Color",
                  "Oil Painting",
                  "Pencil Sketches",
                  "Acrylic",
                ].map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-600">
                  {errors.category.message as string}
                </p>
              )}
            </div>

            <div className="sm:col-span-2 ">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Artist
              </label>
              <input
                type="text"
                {...register("artist")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              />
              {errors.artist && (
                <p className="text-red-600">
                  {errors.artist.message as string}
                </p>
              )}
            </div>

            <div className="sm:col-span-2 ">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Product Status
              </label>
              <input
                type="text"
                {...register("productstatus")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              />
              {errors.productstatus && (
                <p className="text-red-600">
                  {errors.productstatus.message as string}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Permission
              </label>
              <select
                {...register("permission")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              >
                <option value="Accepted">Accepted</option>
                <option value="Not Accepted">Not Accepted</option>
              </select>
              {errors.permission && (
                <p className="text-red-600">
                  {errors.permission.message as string}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Product Image
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
                Watermark Image
              </label>
              <Controller
                name="cimage"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="cimage/*"
                    className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none "
                    onChange={async (e: any) => {
                      const file = e.target.files[0];
                      const res: any = await uploadImages(file);
                      console.log("res", res);
                      setValue("cimage", res.url);
                      setImage(res.url);
                      field.onChange(res.url);
                    }}
                  />
                )}
              />
              {errors.cimage && (
                <p className="error">{errors.cimage.message as string}</p>
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
