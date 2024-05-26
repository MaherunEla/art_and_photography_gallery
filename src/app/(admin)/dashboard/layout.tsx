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

  if (status === "loading") {
    // Show loading indicator if session status is still loading
    return <div>Loading...</div>;
  }

  // Check if the user is authenticated and has the "Admin" role
  const isAdmin = session?.user?.role === "Admin";

  if (!isAdmin) {
    // If user is not authenticated or does not have the "Admin" role, redirect to login page
    // You can replace "/login" with your actual login page URL
    window.location.href = "/Adminlogin";
    return null; // Ensure nothing else is rendered if redirecting
  }

  return (
    <div className="flex ">
      <div className="sticky w-[300px] p-5 min-h-screen bg-[#151c2c]">
        <Sidebarpage />
      </div>
      <div className="flex-1  lg:p-5 bg-[#151c2c] ">
        <div className="hidden sm:flex flex-col max-w-screen-xl px-5 ">
          <Navbar />
          {children}
        </div>
      </div>
      <Toaster />
      <LogoutOnClose />
    </div>
  );
}
