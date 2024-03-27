"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useState } from "react";

const Loginpage = () => {
  const router = useRouter();
  const { data, status } = useSession();

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="w-full  flex flex-col items-center justify-center p-4">
      <div className="max-w-sm w-full text-gray-600 space-y-8 border border-gray-200 px-4 py-10 lg:px-8 rounded-md">
        <div className="text-center">
          <div className="mt-6 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log In
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="hidden"
            name="csrfToken"
            value="7822bdd177c28728328501675dd732c23f3c5db75bf00a6c553f78171ae6c4c0"
          />
          <div>
            <label className="font-medium">Username:</label>
            <input
              value={userInfo.email}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
              type="email"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password:</label>
            <input
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
              type="password"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            type="submit"
          >
            Log In
          </button>
        </form>

        {/* <div className="text-center">
          <p className="">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Loginpage;
