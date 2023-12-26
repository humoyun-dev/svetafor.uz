import React from "react";
import { Inter } from "next/font/google";
import Header from "@/components/navigations/header";
import Navbar from "@/components/navigations/navbar";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.className}`}>
      <Header />
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
