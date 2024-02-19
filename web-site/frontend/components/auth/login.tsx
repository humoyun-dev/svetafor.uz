import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import { AuthPostService } from "@/services/user/post-user.service";
import { setToken, setUserData } from "@/redux/reducers/user.reducer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  const login = async () => {
    try {
      const result = await AuthPostService.Login({
        username: phone,
        password: password,
      });
      dispatch(setUserData(result.user));
      dispatch(setToken(result.token));
      await router.push("/");
      toast.success("Muvaffaqiyatli kirdingiz", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const valid = phone.length == 12 && password;

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
              onChange={(event) => setPassword(event.target.value)}
              type={"password"}
              placeholder="Parolni kiriting"
              className={`text-lg`}
            />
          </div>
        </div>
        {valid ? (
          <Button onClick={login} className={`mt-4 w-full`}>
            Kirish
          </Button>
        ) : (
          <Button variant={"outline"} disabled={true} className={`mt-4 w-full`}>
            Kirish
          </Button>
        )}
      </div>
    </>
  );
};

export default Login;
