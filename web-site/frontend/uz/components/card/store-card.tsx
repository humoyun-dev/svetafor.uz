import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/redux/reducers/cart.reducer";
import { setWishList } from "@/redux/reducers/wish-list.reducer";
import {
  addToCartUtil,
  decrementQuantity,
  existProduct,
  incrementQuantity,
} from "@/util/cart";
import {
  addToWishlist,
  isInWishlist,
  removeFromWishlist,
} from "@/util/wish-list";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CustomImage from "@/components/image/image";
import Rating from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

interface StoreCardProps {
  data: ProductInterfaces;
}

const StoreCard: React.FC<StoreCardProps> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const wishlist = useSelector((state: RootState) => state.wishList.wishItems);

  const handleIncrement = (id: number) =>
    dispatch(setCart(incrementQuantity(id, cart)));
  const handleDecrement = (id: number) =>
    dispatch(setCart(decrementQuantity(id, cart)));

  const addToCart = () => {
    const updatedCart = addToCartUtil(data, cart);
    dispatch(setCart(updatedCart));
    toast.success("Muvaffaqiyatli savatga qo'shildi", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const addWishList = () =>
    dispatch(setWishList(addToWishlist(data, wishlist)));
  const removeWishList = () =>
    dispatch(setWishList(removeFromWishlist(data.id, wishlist)));

  const ifWish = isInWishlist(data.id, wishlist);
  const ifExist = existProduct(data.id, cart);

  return (
    <div className="group z-30 cursor-pointer">
      <div className="-z-10">
        <div className="relative overflow-hidden p-2 rounded-lg bg-gray-100">
          <CustomImage
            onClick={() => router.push(`/store/product/${data.slug}`)}
            key={data.id}
            image={`${process.env.API_URL}${data.images[0].image}`}
            className="rounded-lg md:h-[350px] p-10 h-[200px] group-hover:scale-110 object-cover duration-300"
            alt="image"
          />
          <Image
            className="md:w-20 w-16 absolute z-10 top-0 left-0"
            src="/logo.png"
            alt="logo"
            width={999}
            height={999}
          />
          {data.in_stock ? (
            <span className="bg-green-200 absolute bottom-0 left-0 flex w-full items-center font-bold text-black text-sm md:px-2 md:py-1 rounded">
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
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Omborda mavjud
            </span>
          ) : (
            <span className="bg-red-600 text-white absolute bottom-0 left-0 flex w-full items-center font-bold text-sm md:px-2 md:py-1 rounded">
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
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Omborda mavjud emas
            </span>
          )}
          {ifWish ? (
            <span
              onClick={removeWishList}
              className="absolute cursor-pointer top-2 right-2 z-20 text-red-600"
            >
              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 backdrop-blur"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </span>
          ) : (
            <span
              onClick={addWishList}
              className="absolute cursor-pointer top-2 right-2 z-20 text-red-600"
            >
              <svg
                aria-hidden="true"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 backdrop-blur"
              >
                <path
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>
        <div className="mt-2 px-2">
          <h4
            onClick={() => router.push(`/store/product/${data.slug}`)}
            className="text-black font-semibold text-lg"
          >
            {data.name}
          </h4>
          <div onClick={() => router.push(`/store/product/${data.slug}`)}>
            <Rating data={data} />
          </div>
          <div className="mb-1 border-b pb-2">
            <span className="mr-2">Katalog:</span>
            <Badge
              onClick={() =>
                router.push(`/store/category/${data.category.slug}`)
              }
              className="bg-gray-200"
            >
              {data.category.name}
            </Badge>
          </div>
          <div className="mb-5 flex flex-wrap items-center">
            <span className="mr-2">Moshinalar:</span>
            <div className="flex items-center gap-x-2">
              {data.car_types.map((i) => (
                <Badge
                  key={i.id}
                  onClick={() => router.push(`/store/car/${i.slug}`)}
                  className="bg-gray-200"
                >
                  {i.name}
                </Badge>
              ))}
            </div>
          </div>
          <span
            onClick={() => router.push(`/store/product/${data.slug}`)}
            className="bg-yellow-300 py-1 px-3 rounded-lg text-black"
          >
            {(data.price * 1).toLocaleString("en-US", {
              style: "currency",
              currency: "uzs",
            })}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-2 mt-5">
        <div className="w-full">
          {!ifExist ? (
            <button
              onClick={addToCart}
              className="border w-full py-2 border-yellow-500 hover:bg-yellow-300 duration-300 rounded-lg"
            >
              {`Savatga qo'shish`}
            </button>
          ) : (
            <div className="flex border-yellow-500 justify-between py-1 px-6 items-center w-full border rounded">
              <button
                onClick={() => handleDecrement(data.id)}
                className="w-full flex justify-center"
              >
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  className="w-6 h-6"
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
              </button>
              <p className="underline text-lg underline-offset-4">
                {ifExist.quantity}
              </p>
              <button
                onClick={() => handleIncrement(data.id)}
                className="w-full flex justify-center"
              >
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  className="w-6 h-6"
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
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
