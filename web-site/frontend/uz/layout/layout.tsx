import React from "react";
import { Inter } from "next/font/google";
import Header from "@/components/navigations/header";
import Navbar from "@/components/navigations/navbar";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/navigations/footer";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.className}`}>
      <Header />
      <Navbar />
      <ToastContainer />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
