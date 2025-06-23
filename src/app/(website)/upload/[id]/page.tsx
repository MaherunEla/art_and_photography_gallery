"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Progress from "../components/Progress";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
const uploadformSchema = z.object({
  title: z.string().min(1, "Title is required"),

  price: z
    .string()
    .min(1, "Price is required")
    .transform((value) => parseFloat(value)),
  discount: z
    .string()
    .transform((value) => parseFloat(value))
    .optional(),
  artist: z.string().min(1, "Artist is required"),
  category: z.string().min(3, "Category is required"),

  description: z.string().optional(),
  image: z.string().min(1, "Image is required"),
});

type FormValues = z.infer<typeof uploadformSchema>;
const Uploadpage = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(uploadformSchema),
  });

  type UploadFile = {
    FileName: string;
    total: number;
    percent: number;
  };

  const [File, setFile] = useState<UploadFile | null>(null);
  const router = useRouter();

  type url = {
    success: number;
    url: string | null;
  };
  const params = useParams();
  console.log("param", params);

  const { status } = useSession();

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted...", data);

    axios
      .post("/api/upload/${params.id}", data)
      .then((res) => {
        console.log({ res });
        queryClient.invalidateQueries({ queryKey: ["upload-data"] });
        toast({
          title: " Upload successfully  ",
        });
        reset();
        setFile(null);

        // router.push(`/mygallery/${params.id}`);
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
          console.log(file?.name);
          setFile({
            FileName: file?.name,
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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return null;
  }
  const removeFile = () => {
    setFile(null);
    setValue("image", "");
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Upload Your Work
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.title && (
              <p className="text-red-600">{errors.title.message as string}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              Price
            </label>
            <input
              type="text"
              {...register("price")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.price && (
              <p className="text-red-600">{errors.price.message as string}</p>
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

          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              Artist
            </label>
            <input
              type="text"
              {...register("artist")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            {errors.artist && (
              <p className="text-red-600">{errors.artist.message as string}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              Description
            </label>
            <textarea
              {...register("description")}
              className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            ></textarea>
            {/* {errors.description && (
              <p className="text-red-600">
                {errors.description.message as string}
              </p>
            )} */}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              Image
            </label>
            <div className="form relative">
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
                      console.log(res);
                      setValue("image", res.url);
                      field.onChange(res.url);
                    }}
                  />
                )}
              />

              <div className="w-[100px] h-[103px] relative">
                <Image
                  src="/assets/images/home/Group 58.svg"
                  fill
                  alt="image"
                />
              </div>
              <h6 className="pt-6 text-center text-sm text-[#2D3643] font-medium leading-[20.723px]">
                Drag & Drop image here{" "}
              </h6>
              <h6 className="text-center  text-sm text-[#2D3643]  font-medium leading-[20.723px]">
                or{" "}
                <span className="underline  text-[#3C83F6]">Upload File</span>
              </h6>
            </div>

            <p className="text-[12px] font-normal text-[#8897AE]">
              Upload .jpg or .png file with 16:9 ratio
            </p>

            {File && (
              <div className="progrss">
                <Progress file={File} removeFile={removeFile} />
              </div>
            )}

            {errors.image && (
              <p className="text-red-600">{errors.image.message as string}</p>
            )}
          </div>

          <div className="flex items-center justify-between sm:col-span-2">
            <button
              type="submit"
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Uploadpage;
