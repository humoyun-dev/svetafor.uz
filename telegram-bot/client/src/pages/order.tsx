import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import api from "@/api.json";
import { Separator } from "@/components/ui/separator.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useState } from "react";
import { CouponService } from "@/service/coupon.service.ts";
import { calculateSubTotalPrice, calculateTotalPrice } from "@/util/cart.ts";

const Order = () => {
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const [coupon, setCoupon] = useState<string>("");
  const [per, setPer] = useState<number>(0);

  const search = async () => {
    try {
      const result = await CouponService.searchCoupon({
        coupon_code: coupon,
      });
      if (result.status == 201) {
        setPer(result.data.discount_amount);
        setCoupon("");
      } else {
        setPer(0);
        setCoupon("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const subtotal = calculateSubTotalPrice(cart);

  const total = calculateTotalPrice(subtotal, per);

  return (
    <div>
      <div className={`flex items-center justify-between px-4 py-2 bg-white`}>
        <h3 className={`font-semibold text-lg`}>Sizning buyurtmangiz</h3>
        <NavLink className={`text-green-600 font-[500]`} to={`/cart`}>
          Tahrirlash
        </NavLink>
      </div>
      <Separator className={`mb-3`} />
      <div className={`w-11/12 mx-auto`}>
        <Label>PromoCod</Label>
        <div className={`relative mt-1`}>
          <Input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className={`rounded pr-[105px] ${
              per > 0 ? "border-green-500" : ""
            }`}
            placeholder={`${per > 0 ? "Tekshirildi" : "PromoCodni kirg'azing"}`}
          />
          <Button onClick={search} className={`absolute right-0 top-0 rounded`}>
            Tekshirish
          </Button>
        </div>
      </div>
      <div className={`w-11/12 mx-auto`}>
        <div className={`flex justify-between border-b py-1`}>
          <p>PromoCod:</p>
          <p>-{per}%</p>
        </div>
        <div className={`flex justify-between border-b py-1`}>
          <p>Jammi:</p>
          <p>
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "uzs",
            })}
          </p>
        </div>
      </div>
      <Separator className={`my-3`} />
      <div className={`w-11/12 mx-auto`}>
        <ul className={`space-y-2`}>
          {cart.map((i) => (
            <li key={i.id} className={`flex items-center justify-between`}>
              <img
                src={api.api + i.images[0].image}
                alt={i.slug}
                className={`w-16 h-16 object-cover bg-green-100`}
              />
              <div className={`flex flex-col space-y-1`}>
                <div className={`flex items-center space-x-3`}>
                  <h1 className={`text-xl underline underline-offset-4`}>
                    {i.name}
                  </h1>
                  <span className={`text-yellow-500 font-bold`}>
                    x {i.quantity}
                  </span>
                </div>
                <p className={`text-gray-500 text-sm`}>{i.category.name}</p>
              </div>
              <div className={`text-center space-y-1`}>
                <p
                  className={`text-yellow-500 font-bold underline underline-offset-4`}
                >
                  {(i.price * i.quantity).toLocaleString("en-US", {
                    style: "currency",
                    currency: "uzs",
                  })}
                </p>
                <p className={`text-sm text-gray-500`}>
                  {(i.price * 1).toLocaleString("en-US", {
                    style: "currency",
                    currency: "uzs",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Order;
