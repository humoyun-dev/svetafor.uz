import React, { useState } from "react";
import { NextPage } from "next";
import Layout from "@/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  calculateSubTotalPrice,
  calculateTotalPrice,
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from "@/util/cart";
import { setCart, setPromoCod } from "@/redux/reducers/cart.reducer";
import Image from "next/image";
import Rating from "@/components/ui/rating";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { CouponService } from "@/services/search/coupon.service";
import { useRouter } from "next/router";
import { state } from "sucrase/dist/types/parser/traverser/base";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Auth from "@/components/auth/auth";

const CartPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userToken = useSelector((state: RootState) => state.user.token);

  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const handleRemoveFromCart = (id: number) => {
    const updatedCart = removeProduct(id, cart);
    dispatch(setCart(updatedCart));
  };

  const handleDecrement = (id: number) => {
    const updatedCart = decrementQuantity(id, cart);
    dispatch(setCart(updatedCart));
  };
  const handleIncrement = (id: number) => {
    const updatedCart = incrementQuantity(id, cart);
    dispatch(setCart(updatedCart));
  };

  const [error, setError] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [per, setPer] = useState(0);

  const search = async () => {
    try {
      const result = await CouponService.searchCoupon({
        coupon_code: coupon,
      });
      if (result.status == 201) {
        setPer(result.data.discount_amount);
        dispatch(setPromoCod(result.data.discount_amount));
        setCoupon("");
        toast.success("Active PromoCod", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setError(false);
      } else {
        setPer(0);
        setCoupon("");
        setError(result.data.message);
        toast.error(`${result.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
  };

  const subtotal = calculateSubTotalPrice(cart);

  const total = calculateTotalPrice(subtotal, per);

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
      <div
        className={`flex flex-row justify-between items-start w-10/12 gap-x-4 mx-auto my-10`}
      >
        {cart.length ? (
          <div className={`w-1/2`}>
            <h1 className={`text-xl underline underline-offset-8`}>
              Savatdagi mahsulorlar ({cart.length})
            </h1>
            <ul className={`mt-4`}>
              {cart.map((i) => (
                <li key={i.id}>
                  <div className="h-[122px] w-full py-4 justify-start items-center gap-[15px] inline-flex">
                    <div className="w-[90px] h-[90px] justify-center items-center flex">
                      <Image
                        className="w-[90px] object-cover h-[90px]"
                        src={process.env.API_URL + i.images[0].image}
                        alt={i.slug}
                        width={999}
                        height={999}
                      />
                    </div>
                    <div className="flex w-10/12 items-center">
                      <div className="grow shrink w-2/3 basis\-0 flex-col justify-start items-start gap-2 inline-flex">
                        <p>{i.name}</p>
                        <div>
                          <Rating data={i} />
                        </div>
                      </div>
                      <div className="justify-end items-center gap-6 flex">
                        <div className="justify-start items-center gap-2 flex">
                          <div
                            className="w-6 h-6 relative cursor-pointer"
                            onClick={() => handleDecrement(i.id)}
                          >
                            <svg
                              fill="none"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14"
                              />
                            </svg>
                          </div>
                          <div className="px-4 w-20 py-2 rounded border border-zinc-300 flex-col justify-center items-center gap-2 inline-flex">
                            <div className="text-center text-black text-base font-medium font-['SF Pro Display'] leading-none">
                              {i.quantity}
                            </div>
                          </div>
                          <div
                            className="w-6 h-6 relative cursor-pointer"
                            onClick={() => handleIncrement(i.id)}
                          >
                            <svg
                              fill="none"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className={`flex flex-col items-center`}>
                          <div className="text-black text-xl font-medium font-['SF Pro Display'] leading-loose tracking-wide">
                            {(i.price * i.quantity).toLocaleString("en-US", {
                              style: "currency",
                              currency: "uzs",
                            })}
                          </div>
                          <div className="text-black text-sm font-medium font-['SF Pro Display'] leading-loose tracking-wide">
                            {(i.price * 1).toLocaleString("en-US", {
                              style: "currency",
                              currency: "uzs",
                            })}
                          </div>
                        </div>
                        <div
                          className="w-6 h-6 relative cursor-pointer"
                          onClick={() => handleRemoveFromCart(i.id)}
                        >
                          <svg
                            fill="none"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className={`text-red-600`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className={`my-4`} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-1/2">
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
                  Savatda hozircha mahsulot yoʻq
                </h1>
                <button
                  onClick={() => router.push("/")}
                  className={`py-2 px-4 bg-green-100 rounded font-sans font-semibold hover:bg-green-200 duration-300 text-md`}
                >
                  Xaridlarni boshlash
                </button>
              </div>
            </div>
          </>
        )}
        <div className={`w-1/2 px-16 py-4`}>
          <div className={`border rounded-xl py-3 px-6`}>
            <h2 className={`text-xl font-semibold mb-2`}>
              Buyurtma Tafsilotlari
            </h2>
            <div>
              <p className={`text-sm mb-2`}>Discount code / Promo code</p>
              <div className={`relative flex items-center`}>
                <Input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  type={"text"}
                  placeholder={`XXXXXXX`}
                  className={`px-4 text-md ${
                    error ? "border border-red-600" : ""
                  }`}
                />
                {coupon.length ? (
                  <Button onClick={search} className={`absolute right-0`}>
                    Tekshirish
                  </Button>
                ) : (
                  <Button disabled={true} className={`absolute right-0`}>
                    Tekshirish
                  </Button>
                )}
              </div>
            </div>
            <div className={`flex justify-between mt-5 text-lg`}>
              <p className={`font-semibold`}>Oraliq jami:</p>
              <p>
                {subtotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "uzs",
                })}
              </p>
            </div>
            <hr className={`my-2`} />
            <div className={`flex justify-between mt-2 text-lg`}>
              <p className={`font-semibold`}>PromoCod:</p>
              <p>{per}%</p>
            </div>
            <hr className={`my-2`} />
            <div className={`flex justify-between mt-2 text-lg`}>
              <p className={`font-semibold`}>Jami:</p>
              <p>
                {total.toLocaleString("en-US", {
                  style: "currency",
                  currency: "uzs",
                })}
              </p>
            </div>
            <div className={`mt-6`}>
              {userToken ? (
                <Button
                  onClick={() => router.push(`/order/check`)}
                  className={`w-full`}
                >
                  Buyurtma berish
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className={`w-full`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      Kirish
                    </Button>
                  </DialogTrigger>
                  <Auth />
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
