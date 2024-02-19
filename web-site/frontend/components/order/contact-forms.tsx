import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { OrderService } from "@/services/order/order.service";
import { calculateSubTotalPrice, calculateTotalPrice } from "@/util/cart";
import { setCart } from "@/redux/reducers/cart.reducer";

const uzbekistanRegions = [
  { region: "Andijon viloyati" },
  { region: "Buxoro viloyati" },
  { region: "Farg'ona viloyati" },
  { region: "Jizzax viloyati" },
  { region: "Namangan viloyati" },
  { region: "Navoiy viloyati" },
  { region: "Qashqadaryo viloyati" },
  { region: "Samarqand viloyati" },
  { region: "Sirdaryo viloyati" },
  { region: "Surxondaryo viloyati" },
  { region: "Toshkent shahri" },
  { region: "Toshkent viloyati" },
  { region: "Qoraqalpog'iston Respublikasi" },
];

interface ContactFormsProps {
  success: (flag: boolean) => void;
  error: (flag: boolean) => void;
}

const ContactForms: React.FC<ContactFormsProps> = ({ success, error }) => {
  const user = useSelector((state: RootState) => state.user.userData);
  const token = useSelector((state: RootState) => state.user.token);
  const PromoCod = useSelector((state: RootState) => state.cart.promoCod);
  const cart = useSelector((state: RootState) => state.cart.cartItems);

  const dispatch = useDispatch();

  const subtotal = calculateSubTotalPrice(cart);
  const total = calculateTotalPrice(subtotal, PromoCod);

  const [firstName, setFirstName] = useState<string>(user.first_name);
  const [lastName, setLastName] = useState<string>(user.last_name);
  const [phoneNumber, setPhoneNumber] = useState<string>(user.username);

  const [country, setCountry] = useState<string>("");
  const [village, setVillage] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const dataI = (id: number) => {
    return cart.map((i) => ({
      product: i.id,
      quantity: i.quantity,
      order: id,
      phone_number: phoneNumber,
    }));
  };

  console.log(country);

  const orderCreate = async () => {
    const req = await OrderService.createOrder(
      {
        shipping_address: `${country}, ${village}, ${street}`,
        total_price: total,
        promo_code: PromoCod,
      },
      token,
    );

    // @ts-ignore
    if (req.status === 201) {
      // @ts-ignore
      const id = req.data.id;
      const formData = dataI(id);

      const res = await OrderService.createOrderItem(formData, token);
      // @ts-ignore
      if (res.status === 201) {
        // Order and order items creation successful
        success(true);
        dispatch(setCart([]));
        localStorage.setItem("cart", JSON.stringify([]));
      } else {
        error(true);
      }
    } else {
      error(true);
    }
  };

  return (
    <>
      <div className={`border rounded-xl p-4 border-gray-500`}>
        <h1
          className={`text-2xl font-semibold mb-3`}
        >{`Aloqa ma'lumotlari`}</h1>
        <hr />
        <div className={`flex justify-between mt-2 items-center gap-x-2`}>
          <div className={`flex flex-col w-1/2 space-y-2`}>
            <Label className={`text-lg`}>Ismingiz</Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={`Muhammad`}
            />
          </div>
          <div className={`flex flex-col w-1/2 space-y-2`}>
            <Label className={`text-lg`}>Familyangiz</Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={`Abdullayev`}
            />
          </div>
        </div>
        <div className={`flex flex-col  space-y-2 my-3`}>
          <Label htmlFor="username" className={`text-lg`}>
            Telefon raqamigiz
          </Label>

          <PhoneInput
            inputClass={`!w-full !py-2 !text-lg`}
            country={"uz"}
            value={phoneNumber}
            onlyCountries={["uz"]}
            countryCodeEditable={false}
            onChange={(phone: string) => setPhoneNumber(phone)}
            masks={{ uz: "(..) ...-..-.." }}
          />
        </div>
      </div>
      <div className={`border rounded-xl p-4 border-gray-500 mt-5`}>
        <h1 className={`text-2xl font-semibold mb-3`}>
          Yetkazib berish manzili
        </h1>
        <div className={`space-y-2`}>
          <Label>Viloyatni tanlang</Label>
          <Select onValueChange={(value) => setCountry(value)}>
            <SelectTrigger>
              <SelectValue
                defaultValue={country}
                placeholder="Viloyatni tanlang"
              />
            </SelectTrigger>
            <SelectContent>
              {uzbekistanRegions.map((i) => {
                return (
                  <SelectItem key={i.region} value={`${i.region}`}>
                    {i.region}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className={`mt-2 space-y-2`}>
          <Label>Tumanni kiriting</Label>
          <Input
            value={village}
            placeholder={`Olmazor tumani`}
            onChange={(e) => setVillage(e.target.value)}
          />
        </div>
        <div className={`mt-2 space-y-2`}>
          <Label>Manzilni kiriting</Label>
          <Input
            value={street}
            placeholder={`Mirzo g'olib ko'chasi k1`}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Button onClick={() => orderCreate()} className={`w-full mt-8`}>
          Buyurtma berish
        </Button>
      </div>
    </>
  );
};

export default ContactForms;
