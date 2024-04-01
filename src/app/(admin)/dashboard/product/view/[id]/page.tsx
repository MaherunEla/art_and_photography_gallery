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

const uploadformSchema = z.object({
  title: z.string().min(1, "Title is required"),

  price: z.string().transform((value) => parseFloat(value)),
  artist: z.string().min(1, "Artist is required"),

  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
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
      const res = await axios.put(
        `http://localhost:3000/api/upload/edit/${decodedEmail}`,
        data
      );
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
    <div className="flex gap-[50px] mt-5">
      <div className="flex-1 bg-[#182237] p-5 rounded-[10px] font-bold text-[#b7bac1] max-h-max">
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px]  lg:w-[400px] lg:h-[400px] relative rounded-[10px] overflow-hidden mb-5">
          <Image src={image || data?.image} alt="" fill />
        </div>
        {data?.title}
      </div>
      <div className="flex-3 bg-[#182237] p-5 rounded-[10px]">
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
              {errors.description && (
                <p className="text-red-600">
                  {errors.description.message as string}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
                Price
              </label>
              <input
                type="number"
                {...register("price")}
                className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
              />
              {errors.price && (
                <p className="text-red-600">{errors.price.message as string}</p>
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
