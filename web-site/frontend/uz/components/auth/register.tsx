import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AuthPostService } from "@/services/user/post-user.service";

const Register: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [data, setData] = useState(null);

  const register = async () => {
    try {
      const result = await AuthPostService.Register({
        username: phone,
        password: password,
        first_name: firstName,
        last_name: lastName,
      });
      setData(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1
        className={`text-center text-2xl font-semibold my-5`}
      >{`Ro'yxatdan o'tish`}</h1>
      <hr />
      <div className={`mt-4`}>
        <div className={`flex flex-col space-y-2`}>
          <Label htmlFor="first_name" className={`text-lg`}>
            Ismingiz
          </Label>

          <Input
            id="first_name"
            onChange={(event) => setFirstName(event.target.value)}
            type={"text"}
            placeholder="Ismingiz kiriting"
            className={`text-lg`}
          />
        </div>
        <div className={`flex flex-col space-y-2 mt-4`}>
          <Label htmlFor="first_name" className={`text-lg`}>
            Familiyangiz
          </Label>

          <Input
            id="last_name"
            type={"text"}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Familiyangiz kiriting"
            className={`text-lg`}
          />
        </div>
        <div className="flex flex-col space-y-2 mt-4">
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
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        {phone && firstName && lastName && password ? (
          <Button onClick={register} className={`mt-4 w-full`}>
            Kirish
          </Button>
        ) : (
          <Button disabled={true} variant={"outline"} className={`mt-4 w-full`}>
            Kirish
          </Button>
        )}
      </div>
    </>
  );
};

export default Register;
