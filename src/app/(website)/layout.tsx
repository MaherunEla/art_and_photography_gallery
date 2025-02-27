"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import Navbar from "./components/layout/header/Navbar";
import Footer from "./components/layout/footer/Footer";
import GetLatestUpdate from "./components/shared/GetLatestUpdate";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../redux_store/store";
import AuthProvider from "../context/AuthProvider";
import LogoutOnClose from "./components/shared/Logoutclose";

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
          <Provider store={store}>
            <AuthProvider>
              <Navbar />

              {children}

              <GetLatestUpdate />
              <Toaster />
              <Footer />
              <LogoutOnClose />
            </AuthProvider>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
