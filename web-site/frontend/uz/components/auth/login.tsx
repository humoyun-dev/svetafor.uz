import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";

const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>("");

  return (
    <>
      <h1 className={`text-center text-2xl font-semibold my-3`}>Kirish</h1>
      <hr />
      <div className={`mt-4`}>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="username" className={`text-lg`}>
            Telefon raqamigiz
          </Label>

          <PhoneInput
            inputClass={`!w-full !py-2 !text-lg`}
            country={"uz"}
            onlyCountries={["uz"]}
            countryCodeEditable={false}
            onChange={(phone: string) => setPhone(phone)}
            masks={{ uz: "(..) ...-..-.." }}
          />
        </div>
        <div className={`flex flex-col space-y-2 mt-4`}>
          <Label htmlFor="password" className={`text-lg`}>
            Parol
          </Label>
          <div className={`relative`}>
            <Input
              id="password"
              type={"password"}
              placeholder="Parolni kiriting"
              className={`text-lg`}
            />
          </div>
        </div>
        <Button className={`mt-4 w-full`}>Kirish</Button>
      </div>
    </>
  );
};

export default Login;
