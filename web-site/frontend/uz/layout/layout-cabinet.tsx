import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/navigations/header";
import Navbar from "@/components/navigations/navbar";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/navigations/sidebar";
import Footer from "@/components/navigations/footer";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  useSavedCartItems,
  useSavedTokenEffect,
  useSavedUserDataEffect,
  useSavedWishItems,
} from "@/util/loader";
import Head from "next/head";
import ToolFooter from "@/components/navigations/tool-footer";

const inter = Inter({ subsets: ["latin"] });

const LayoutCabinet: React.FC<LayoutInterface> = ({
  children,
  title,
  des,
  img,
  keyword,
}) => {
  useSavedTokenEffect();
  useSavedUserDataEffect();
  useSavedCartItems();
  useSavedWishItems();

  const token = useSelector((state: any) => state.user.token);
  const router = useRouter();

  // Redirect if there is no token
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel={"icon"} href={"/logo.png"} />
        {/* SEO */}
        <meta name="description" content={`${des}`} />
        <meta name="keywords" content={keyword} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title}`} />
        <meta name="twitter:description" content={`${des}`} />
        <meta name="twitter:image" content={`${img}`} />
        <meta name="twitter:image:alt" content={`${title}`} />
        {/*OG*/}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={des} />
        <meta property="og:image" content={img} />
        <link
          rel="stylesheet"
          href={
            "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          }
        />
      </Head>
      <div className={`${inter.className}`}>
        <Header />
        <Navbar />
        <ToastContainer />
        <div
          className={`md:w-10/12 w-11/12 mx-auto items-start flex md:flex-row flex-col gap-x-3 my-5`}
        >
          <div className={`sticky top-24 md:w-[20%]`}>
            <Sidebar />
          </div>
          <div
            className={`w-full px-4`}
            style={{ width: "80%", borderLeft: "1px solid gray" }}
          >
            {children}
          </div>
        </div>
        <ToolFooter />
        <Footer />
      </div>
    </>
  );
};

export default LayoutCabinet;

interface LayoutInterface {
  children: React.ReactNode;
  title: string;
  des?: string;
  img?: string;
  keyword?: string;
}
