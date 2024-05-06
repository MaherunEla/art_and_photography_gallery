"use client";
import Image from "next/image";
import React, { useState } from "react";
import { addCart } from "@/app/redux_store/cartAddSlice";
import { useAppDispatch } from "@/app/redux_store/store";
import { AdProduct } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// const images = [
//   { id: 1, src: "/assets/images/home/frame4.jpg", name: "gold", price: 200 },
//   { id: 2, src: "/assets/images/home/frame2.jpg", name: "gold", price: 200 },
//   { id: 3, src: "/assets/images/home/frame3.jpg", name: "gold", price: 200 },
// ];

type Props = {
  Gallery: AdProduct;
};

const fetchFrame = async () => {
  const { data } = await axios.get("/api/frame/gallery");
  return data;
};
const Singleproduct = ({ Gallery }: Props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [selectedImagePrice, setSelectedImagePrice] = useState(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["frame-data"],
    queryFn: fetchFrame,
  });

  const handleImageChange = (
    imageId: any,
    imageName: any,
    imagePrice: any,
    imageSrc: any
  ) => {
    setSelectedImage(imageId);
    setSelectedImageName(imageName);
    setSelectedImagePrice(imagePrice);
    setSelectedImageSrc(imageSrc);
  };
  const product: AdProduct = {
    id: Gallery?.id,
    title: Gallery?.title,
    cimage: Gallery?.cimage,
    category: Gallery?.category,
    price: Gallery?.price,
    discount: Gallery?.discount,
    quantity: 1,
    artist: Gallery?.artist,
    frameImg: selectedImageSrc || "",
    frameName: selectedImageName || "",
    framePrice: selectedImagePrice || 0,
    description: Gallery?.description,
    userEmail: Gallery?.userEmail,
    productstatus: Gallery?.productstatus,
  };
  const dispatch = useAppDispatch();
  //for zoom image
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMangnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  //Function to handle mouse hovers over the image

  const handleMouseHover = (e: any) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    //Calculate the position (x,y) as a percentage based on cursor location

    const x = ((e.pageX - left) / width) * 100;

    const y = ((e.pageX - top) / height) * 100;

    setPosition({ x, y });

    // Update cursorPosition to store the current mouse cursor coordinates relative to the image

    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };
  const { toast } = useToast();

  if (!Gallery) return <div>Not Found</div>;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8  ">
        <div
          className={`grid gap-8 ${
            Gallery.category === "Digitally Captured"
              ? "grid-cols-3"
              : "grid-cols-2"
          } `}
        >
          <div
            className="relative  overflow-hidden rounded-lg bg-gray-100 "
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseMove={handleMouseHover}
          >
            <Image
              src={Gallery?.cimage}
              loading="lazy"
              alt="Photo by Himanshu Dewangan"
              className=" h-full w-full object-cover object-center"
              fill
            />
            {showMangnifier && (
              <div
                style={{
                  position: "absolute",
                  //Position the magnifier near the cursor

                  left: `${cursorPosition.x - 100}px`,
                  top: `${cursorPosition.y - 100}px`,

                  //Make sure the magnifier does't interfere with mouse events
                  pointerEvents: "none",
                }}
              >
                <div
                  className="magnifier-image"
                  style={{
                    backgroundImage: `url(${Gallery?.cimage})`,
                    backgroundPosition: `${position.x}% ${position.y}%`,
                  }}
                />
              </div>
            )}

            {/* <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
            sale
          </span>

          <a
            href="#"
            className="absolute right-4 top-4 inline-block rounded-lg border bg-white px-3.5 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-gray-700 md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </a> */}
          </div>

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {Gallery?.artist}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {Gallery?.title}
              </h2>
            </div>

            {/* <div className="mb-6 flex items-center gap-3 md:mb-10">
            <div className="flex h-7 items-center gap-1 rounded-full bg-indigo-500 px-2 text-white">
              <span className="text-sm">4.2</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>

            <span className="text-sm text-gray-500 transition duration-100">
              56 ratings
            </span>
          </div> */}

            <div className="mt-2 md:mt-4 lg:mt-6">
              <div className="mb-3 text-lg font-semibold text-gray-800">
                Description
              </div>

              <p className="text-gray-500">{Gallery?.description}</p>

              {Gallery.productstatus === "Sale" ? (
                <p className="text-red-500 text-lg font-bold">Out of Stock</p>
              ) : (
                <></>
              )}
            </div>

            <div className="my-4">
              {Gallery?.discount === null ? (
                <div className="flex items-end gap-2">
                  <span className="mb-0.5 text-xl font-bold md:text-2xl text-gray-800 ">
                    ৳ {Gallery?.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-gray-800 md:text-2xl">
                    ৳ {Gallery?.discount.toFixed(2)}
                  </span>
                  <span className="mb-0.5  text-red-500 line-through">
                    ৳ {Gallery?.price.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-3 flex  items-center gap-2 text-gray-800">
              {selectedImagePrice === null ? (
                <div className="text-lg font-semibold flex flex-col items-start justify-start gap-2">
                  {Gallery?.category === "Digitally Captured" ? (
                    <p className="text-red-500">
                      Select a frame before add to card
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div className="text-lg font-semibold flex flex-col items-start justify-start gap-2">
                  <p> {selectedImageName}</p>
                  <p>৳ {(1 + selectedImagePrice).toFixed(2)}</p>
                  <p className="text-red-500">
                    <span className="text-gray-800"> Total: </span>৳{" "}
                    {Gallery?.discount === null
                      ? (Gallery?.price + selectedImagePrice).toFixed(2)
                      : (Gallery.discount + selectedImagePrice).toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            {Gallery.category === "Digitally Captured" ? (
              <div className="flex gap-2.5">
                <button
                  disabled={selectedImage === null}
                  onClick={() => {
                    dispatch(addCart(product));
                    toast({
                      title: " Item added to cart  ",
                    });
                  }}
                  className="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base"
                >
                  Add to cart
                </button>

                <a
                  href="/cart"
                  className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                >
                  Buy now
                </a>
              </div>
            ) : (
              <div className="flex gap-2.5">
                <button
                  disabled={Gallery.productstatus === "Sale"}
                  onClick={() => {
                    dispatch(addCart(product));
                    toast({
                      title: " Item added to cart  ",
                    });
                  }}
                  className="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base"
                >
                  Add to cart
                </button>

                <a
                  href="/cart"
                  className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                >
                  Buy now
                </a>
              </div>
            )}
          </div>
          {Gallery.category === "Digitally Captured" ? (
            <div className="w-full h-full">
              <h3 className="text-lg font-semibold">
                Selected Frame for Image:
              </h3>

              {selectedImage && (
                <div className="w-full h-full relative  ">
                  <Image
                    src={
                      data?.find((image: any) => image.id === selectedImage)!
                        .frameimage
                    }
                    alt="Selected Image"
                    fill
                  />
                  <div className="relative top-0 left-0 w-full h-full ">
                    <Image
                      src={Gallery.image} // Replace with the path to your overlay image
                      alt="Overlay Image"
                      fill
                      className="w-full h-full p-[60px]"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        {Gallery.category === "Digitally Captured" ? (
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Select Frame for Image:</h2>
            <form className="grid gap-8 grid-cols-3">
              {data?.map((image: any) => (
                <div
                  key={image.id}
                  className="flex  items-start justify-start gap-2"
                >
                  <input
                    type="radio"
                    id={`image-${image.id}`}
                    name="selectedImage"
                    value={image.id}
                    checked={selectedImage === image.id}
                    onChange={() =>
                      handleImageChange(
                        image.id,
                        image.framename,
                        image.frameprice,
                        image.frameimage
                      )
                    }
                  />
                  <label htmlFor={`image-${image.id}`}>
                    <Image
                      src={image.frameimage}
                      alt={`Image ${image.id}`}
                      width={200}
                      height={200}
                    />
                    <p className="text-lg font-semibold py-2">
                      Frame: {image.framename}
                    </p>
                    <p className="text-lg font-semibold">
                      Price: {image.frameprice}
                    </p>
                  </label>
                </div>
              ))}
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Singleproduct;
