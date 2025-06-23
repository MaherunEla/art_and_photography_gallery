"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

import { TbMoodEdit } from "react-icons/tb";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Progress from "../../components/progress";
import { Productstatus } from "@prisma/client";

const uploadformSchema = z.object({
  title: z.string().min(1, "Title is required"),

  price: z.string().transform((value) => parseFloat(value)),
  discount: z
    .string()
    .transform((value) => parseFloat(value))
    .optional(),

  artist: z.string().min(1, "Artist is required"),
  category: z.string().min(3, "Category is required"),
  description: z.string().min(1, "Description is required").optional(),
  image: z.string().min(1, "Image is required"),
});

type FormValues = z.infer<typeof uploadformSchema>;
const Addpage = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(uploadformSchema),
  });

  const [File, setFile] = useState({});
  const router = useRouter();

  type url = {
    success: number;
    url: string | null;
  };

  const params = useParams();
  const encodedEmail = params.id as string;
  const decodedEmail = decodeURIComponent(encodedEmail);

  console.log("param", params);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted...", data);
    axios
      .post(`/api/upload/${decodedEmail}`, data)
      .then((res) => {
        console.log({ res });
        queryClient.invalidateQueries({ queryKey: ["upload-data"] });
        toast({
          title: " Upload successfully  ",
        });
        router.push("/dashboard/product");
      })
      .catch((err) => console.log({ err }));
  };
  const uploadImages = async (file: File): Promise<url> => {
    try {
      const options = {
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          console.log(`${loaded}kb of ${total}kb | ${percent}%`);
          console.log(file.name);
          setFile({
            FileName: file.name,
            total,
            percent,
          });
          //let progressHTML =

          //htmlprogress.innerHTML = Progress({ file, total, percent });
          // <Progress file={file} total={total} percent={percent} />;
        },
      };

      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my-uploads");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/djfwg1dfa/image/upload",
        formData,
        options
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
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              // defaultValue={form.getValues("name")}
              className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none "
            />
            {errors.title && (
              <p className="text-red-600">{errors.title.message as string}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold  text-white sm:text-base">
              Description
            </label>
            <input
              type="text"
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
              Category
            </label>
            <select
              {...register("category")}
              className="w-full rounded border bg-[#151c2c] px-3 py-2 text-white outline-none ring-indigo-300 transition duration-100 focus:ring "
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
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
              Artist
            </label>
            <input
              type="text"
              {...register("artist")}
              className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none"
            />
            {errors.artist && (
              <p className="text-red-600">{errors.artist.message as string}</p>
            )}
          </div>
          <div className="sm:col-span-2 ">
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

          <div className="sm:col-span-2 ">
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
              Image
            </label>
            <div className="form relative bg-[#151c2c] cursor-pointer">
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input opacity-0 w-full h-full absolute cursor-pointer"
                    onChange={async (e: any) => {
                      const file = e.target.files[0];
                      const res: any = await uploadImages(file);
                      console.log(res);
                      setValue("image", res.url);
                      field.onChange(res.url);
                    }}
                  />
                )}
              />
              {errors.image && (
                <p className="error">{errors.image.message as string}</p>
              )}

              <div className="w-[100px] h-[103px] relative">
                <Image
                  src="/assets/images/home/Group 58.svg"
                  fill
                  alt="image"
                />
              </div>
              <h6 className="pt-6 text-center text-sm text-white font-medium leading-[20.723px] ">
                Drag & Drop image here{" "}
              </h6>
              <h6 className="text-center  text-sm text-white  font-medium leading-[20.723px]">
                or{" "}
                <span className="underline  text-[#3C83F6]">Upload File</span>
              </h6>
            </div>

            <p className="text-[12px] font-normal text-[#8897AE]">
              Upload .jpg or .png file with 16:9 ratio
            </p>
            {/* <div className="progrss bg-[#151c2c]">
              <Progress file={File} />
            </div> */}
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
