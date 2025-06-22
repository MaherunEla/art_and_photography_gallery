"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import Sidebarpage from "./components/layout/sidebar/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import LogoutOnClose from "@/app/(website)/components/shared/Logoutclose";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <RootLayoutContent>{children}</RootLayoutContent>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "Admin") {
      router.push("/Adminlogin");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || session.user?.role !== "Admin") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#151c2c]">
      <div className="hidden sm:flex w-[260px] p-5 min-h-screen bg-[#151c2c] border-r border-[#2e374a]">
        <Sidebarpage />
      </div>

      <div className="flex-1  lg:p-5">
        <div className="flex flex-col px-5 ">
          <Navbar />
          <main className="mt-4">{children}</main>
        </div>
      </div>
      <Toaster />
      <LogoutOnClose />
    </div>
  );
}
