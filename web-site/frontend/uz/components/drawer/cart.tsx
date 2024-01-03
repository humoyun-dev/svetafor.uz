import React, { useState } from "react";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  calculateSubTotalPrice,
  calculateTotalPrice,
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from "@/util/cart";
import { setCart } from "@/redux/reducers/cart.reducer";
import { useRouter } from "next/router";
import Link from "next/link";
import { CouponService } from "@/services/search/coupon.service";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";

const Cart: React.FC = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = removeProduct(id, cart);
    dispatch(setCart(updatedCart));
  };

  const cart = useSelector((state: RootState) => state.cart.cartItems);

  const handleIncrement = (id: number) => {
    const updatedCart = incrementQuantity(id, cart);
    dispatch(setCart(updatedCart));
  };
  const handleDecrement = (id: number) => {
    const updatedCart = decrementQuantity(id, cart);
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
    <SheetHeader className={` flex flex-col justify-between`}>
      <SheetTitle>
        <h5 color="blue-gray" className={`flex items-center`}>
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
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Mening savatim
        </h5>
      </SheetTitle>
      <div className={`mb-6 overflow-scroll`}>
        <p className={`text-black text-lg border-b mb-4`}>
          {cart.length}ta mahsulot savatda bor
        </p>
        <ul className={`flex h-[300px]  flex-col gap-y-4`}>
          {cart.map((product) => (
            <li className={`relative`} key={product.id}>
              <div className={`flex gap-x-2 justify-between border-b pb-3`}>
                <div>
                  <Image
                    src={process.env.API_URL + product.images[0].image}
                    alt="pro"
                    width={999}
                    height={999}
                    className={`w-24 h-24 object-cover`}
                  />
                </div>
                <div className={`flex flex-col justify-between`}>
                  <p className={`text-black text-xl`}>{product.name}</p>
                  <div className={`flex border rounded items-center`}>
                    <button
                      onClick={() => {
                        handleDecrement(product.id);
                      }}
                      className="px-3 text-lg font-bold font-sans text-red-600"
                    >
                      -
                    </button>
                    <p>{product.quantity}</p>
                    <button
                      onClick={() => handleIncrement(product.id)}
                      className="px-3 text-lg font-bold font-sans text-green-500"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={`flex flex-col justify-between`}>
                  {/*<Rating value={4} readonly />*/}
                  <h6 className={`underline underline-offset-4`}>
                    {(product.price * 1).toLocaleString("en-US", {
                      style: "currency",
                      currency: "uzs",
                    })}
                  </h6>
                  <h6 className={`text-green-600 underline underline-offset-4`}>
                    {(product.price * product.quantity).toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "uzs",
                      },
                    )}
                  </h6>
                </div>
              </div>
              <div
                onClick={() => handleRemoveFromCart(product.id)}
                className={`absolute -top-3 cursor-pointer -left-0.5`}
              >
                <svg
                  fill="none"
                  strokeWidth={2}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className={`w-6 h-6 text-red-600 backdrop-blur rounded-full`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={`bg-white z-50 w-full`}>
        <div className={`mb-4 mt-8`}>
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
        </div>
        <div className={`flex flex-col gap-2 items-center gap-y-4`}>
          <Button
            onClick={() => router.push("/cart")}
            className={`w-full bg-yellow-300 py-2 rounded font-sans font-semibold hover:bg-yellow-200 duration-300 text-lg`}
          >
            Buyurtma berish
          </Button>

          <Link
            href={`/cart`}
            className="text-neutral-900 underline underline-offset-4 font-semibold leading-snug"
          >
            {`Savatga o'tish`}
          </Link>
        </div>
      </div>
    </SheetHeader>
  );
};

export default Cart;
