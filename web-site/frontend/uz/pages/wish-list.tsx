import React from "react";
import { NextPage } from "next";
import Layout from "@/layout/layout";
import StoreCard from "@/components/card/store-card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";

const WishListPage: NextPage = () => {
  const wishlist = useSelector((state: RootState) => state.wishList.wishItems);
  const router = useRouter();

  return (
    <Layout
      title={"Svetaforuz"}
      keyword={"svetaforuz, svetafor.uz, svetafor"}
      img={"https://svetafor.uz/_next/image?url=%2Flogo.png&w=1080&q=75"}
      des={
        "Svetofor Uz\n" +
        "Automotive Parts Store\n" +
        "- Энг арзон авто аксессуарлар !\n" +
        "- Доставка шахар бу́йлаб\n" +
        "- L.E.D лампы в широком ассортименте.\n" +
        "- Адресс: авторынок сергели 7/1 блок 8 магазин"
      }
    >
      <div className={`min-h-screen`}>
        {wishlist.length ? (
          <>
            <div></div>
            <div className="grid grid-cols-4 gap-x-12 gap-y-10 w-10/12 mx-auto my-10">
              {wishlist.map((product) => (
                <StoreCard key={product.id} data={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full">
            <div className="text-center">
              <div className="inline-flex rounded-full bg-yellow-100 p-4">
                <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
                  <svg
                    className="w-16 h-16"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <h1 className="mt-5 text-[30px] font-bold text-slate-800 lg:text-[40px]">
                Saralangan mahsulot yoʻq
              </h1>
              <button
                onClick={() => router.push("/")}
                className={`py-2 px-4 bg-green-100 rounded font-sans font-semibold hover:bg-green-200 duration-300 text-md`}
              >
                Xaridlarni boshlash
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishListPage;
