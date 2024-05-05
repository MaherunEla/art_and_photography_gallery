"use client";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
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

  occupation: z.string().min(1, "occupation is required"),
  image: z.string().min(1, "Image is reguired"),

  socialaccountf: z.string().optional(),
  socialaccountl: z.string().optional(),
});

type FormValues = z.infer<typeof signupformSchema>;

const Profileeditpage = () => {
  const params = useParams();
  const encodedEmail = params.id as string;
  const decodedEmail = decodeURIComponent(encodedEmail);
  console.log("param", params);

  const fetchProfile = async () => {
    const { data } = await axios.get(`/api/signup/${params.id}`);
    return data;
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["signup-data"],
    queryFn: fetchProfile,
  });

  console.log(data?.email);

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
      const res = await axios.put(
        `http://localhost:3000/api/signup/${decodedEmail}`,
        data
      );
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

  const router = useRouter();
  const { status } = useSession();
  if (status !== "authenticated") {
    router.push("/");
  }

  return (
    <div className=" py-4 sm:py-8 lg:py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto bg-gradient-to-r from-indigo-100 py-4 border rounded-lg max-w-screen-2xl px-4 md:px-8"
      >
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px]  lg:w-[400px] lg:h-[400px]  mx-auto relative">
          <Image
            src={form.getValues("image")}
            fill
            className="rounded-full border-4 border-gray-300"
            alt=""
          />
        </div>
        <div className="flex items-center justify-center ">
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
              placeholder="LinkedIn"
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
              placeholder="Twiter"
              className="w-full rounded border bg-gray-50 mt-4 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
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
  );
};

export default Profileeditpage;
