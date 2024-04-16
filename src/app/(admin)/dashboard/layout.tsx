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

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <div className="flex ">
            <div className="flex-1 p-5 min-h-screen bg-[#151c2c]">
              <Sidebarpage />
            </div>
            <div className="grow md-grow-0 p-5 bg-[#151c2c] ">
              <Navbar />
              {children}
            </div>
            <Toaster />
          </div>
        </QueryClientProvider>
        {/* <div className="flex">
          <div className="hidden lg:flex flex-col ">
            <Sidebarpage />
          </div>

          <div className="flex-1 bg-slate-600 border border-red-950">
            {children}
          </div>
        </div> */}
      </body>
    </html>
  );
}
