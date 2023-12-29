import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/navigations/header";
import Navbar from "@/components/navigations/navbar";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/navigations/sidebar";
import Footer from "@/components/navigations/footer";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const LayoutCabinet = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: any) => state.user.token);
  const router = useRouter();

  // Redirect if there is no token
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <div className={`${inter.className}`}>
      <Header />
      <Navbar />
      <ToastContainer />
      <div className={`w-10/12 mx-auto items-start flex  gap-x-3 my-5`}>
        <div className={`sticky top-24`} style={{ width: "20%" }}>
          <Sidebar />
        </div>
        <div
          className={`w-full px-4`}
          style={{ width: "80%", borderLeft: "1px solid gray" }}
        >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutCabinet;
