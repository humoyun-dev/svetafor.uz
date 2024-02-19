import React from "react";
import { Inter } from "next/font/google";
import Header from "@/components/navigations/header";
import Navbar from "@/components/navigations/navbar";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/navigations/footer";
import {
  useSavedCartItems,
  useSavedTokenEffect,
  useSavedUserDataEffect,
  useSavedWishItems,
} from "@/util/loader";
import Head from "next/head";
import ToolFooter from "@/components/navigations/tool-footer";

const inter = Inter({ subsets: ["latin"] });

const Layout: React.FC<LayoutInterface> = ({
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
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </Head>
      <div className={`${inter.className}`}>
        <Header />
        <Navbar />
        <ToastContainer />
        {children}
        <ToolFooter />
        <Footer />
      </div>
    </>
  );
};

export default Layout;

interface LayoutInterface {
  children: React.ReactNode;
  title: string;
  des?: string;
  img?: string;
  keyword?: string;
}
