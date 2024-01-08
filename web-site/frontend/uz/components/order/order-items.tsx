import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Rating from "@/components/ui/rating";
import { CouponService } from "@/services/search/coupon.service";
import { setPromoCod } from "@/redux/reducers/cart.reducer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { calculateSubTotalPrice, calculateTotalPrice } from "@/util/cart";
import { RootState } from "@/redux/store";

const OrderItems = () => {
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState(false);

  const PromoCod = useSelector((state: RootState) => state.cart.promoCod);
  const cart = useSelector((state: RootState) => state.cart.cartItems);

  const subtotal = calculateSubTotalPrice(cart);
  const total = calculateTotalPrice(subtotal, PromoCod);

  const searchP = async () => {
    try {
      const result = await CouponService.searchCoupon({
        coupon_code: coupon,
      });
      if (result.status == 201) {
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

  return (
    <>
      <div className={`border p-4 rounded-xl border-gray-500`}>
        <div>
          <p className={`text-sm mb-2`}>Discount code / Promo code</p>
          <div className={`relative flex items-center`}>
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              type={"text"}
              placeholder={`XXXXXXX`}
              className={`px-4 text-md ${error ? "border border-red-600" : ""}`}
            />
            {coupon.length ? (
              <Button onClick={searchP} className={`absolute right-0`}>
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
          <p>{PromoCod}%</p>
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
          <h1 className={`text-xl underline underline-offset-8`}>
            Savatdagi mahsulorlar ({cart.length})
          </h1>
          <ul className={`mt-4`}>
            {cart.map((i) => (
              <li key={i.id}>
                <div className="md:h-[122px] md:flex-row flex-col w-full py-4 justify-start items-center gap-[15px] inline-flex">
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
                    </div>
                  </div>
                </div>
                <hr className={`my-4`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderItems;
