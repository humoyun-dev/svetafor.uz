import React from "react";
import { ProductInterfaces } from "@/interfaces/product.interface.ts";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import api from "@/api.json";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/redux/cart.reducer.ts";
import {
  addToCartUtil,
  decrementQuantity,
  existProduct,
  incrementQuantity,
  removeProduct,
} from "@/util/cart.ts";
import { RootState } from "@/redux/store.ts";

interface StoreCardProps {
  data: ProductInterfaces;
}

const StoreCard: React.FC<StoreCardProps> = ({ data }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cartItems);

  const handleIncrement = (id: number) =>
    dispatch(setCart(incrementQuantity(id, cart)));
  const handleDecrement = (id: number) =>
    dispatch(setCart(decrementQuantity(id, cart)));

  const addToCart = () => {
    const updatedCart = addToCartUtil(data, cart);
    dispatch(setCart(updatedCart));
  };

  const removeCartList = () => dispatch(setCart(removeProduct(data.id, cart)));

  const ifExist = existProduct(data.id, cart);

  return (
    <Card>
      <div className={`relative`}>
        <img
          className={`object-cover w-full h-[150px] p-2 rounded-t-lg bg-green-100`}
          src={api.api + data.images[0].image}
          alt={data.slug}
        />
        <div className={`px-2 py-1`}>
          <h4 className={`text-lg`}>{data.name}</h4>
          <Separator className={`my-1`} />
          <Badge className={`text-md rounded w-full`}>
            {(data.price * 1).toLocaleString("en-US", {
              style: "currency",
              currency: "uzs",
            })}
          </Badge>
        </div>
        <div className={`px-1 my-2`}>
          {ifExist ? (
            <div className={`flex w-full justify-between gap-x-1 items-center`}>
              <Button
                className={`w-1/3 py-1 rounded text-xl`}
                variant={"outline"}
                onClick={() => handleDecrement(data.id)}
              >
                -
              </Button>
              <Badge
                className={`w-1/3 rounded text-md border-0 flex items-center justify-center py-1`}
                variant={"outline"}
              >
                {ifExist.quantity}
              </Badge>
              <Button
                variant={"outline"}
                className={`w-1/3 py-1 rounded text-xl`}
                onClick={() => handleIncrement(data.id)}
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              onClick={addToCart}
              className={`w-full`}
              variant={"outline"}
            >
              Savatga qo'shish
            </Button>
          )}
        </div>
        <span
          onClick={removeCartList}
          className={`absolute z-10 top-0 bg-red-600 rounded-full text-white cursor-pointer ${
            ifExist ? "" : "hidden"
          }`}
        >
          <svg
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={`w-7 h-7 border rounded-full p-0.5`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
    </Card>
  );
};

export default StoreCard;
