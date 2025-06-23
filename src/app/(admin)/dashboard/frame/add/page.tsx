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

const FrameSchema = z.object({
  framename: z.string().min(1, "Frame name is required"),

  frameprice: z.string().transform((value) => parseFloat(value)),

  frameimage: z.string().min(1, "Image is required"),
  stockstatus: z.string().min(1, "Stock is required").optional(),
});

type FormValues = z.infer<typeof FrameSchema>;

const Addpage = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FrameSchema),
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
      .post("/api/frame", data)
      .then((res) => {
        console.log({ res });
        queryClient.invalidateQueries({ queryKey: ["frame-data"] });
        toast({
          title: " Upload successfully  ",
        });
        router.push("/dashboard/frame");
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
      if (res.data.secure_url) {
        toast({
          title: " Image Upload successfully  ",
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

  return (
    <div className="bg-[#182237] p-5 rounded-[10px] mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap justify-between"
      >
        <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-lg font-bold text-white sm:text-base">
              Name
            </label>
            <input
              type="text"
              {...register("framename")}
              // defaultValue={form.getValues("name")}
              className="w-full px-2 py-2 bg-[#151c2c] text-white border-2 border-[#2e374a] rounded-[5px] outline-none "
            />
            {errors.framename && (
              <p className="text-red-600">
                {errors.framename.message as string}
              </p>
            )}
          </div>

          <div className="sm:col-span-2 ">
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
              Frame Image
            </label>
            <div className="form relative bg-[#151c2c] cursor-pointer">
              <Controller
                name="frameimage"
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
                      setValue("frameimage", res.url);
                      field.onChange(res.url);
                    }}
                  />
                )}
              />
              {errors.frameimage && (
                <p className="error">{errors.frameimage.message as string}</p>
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
