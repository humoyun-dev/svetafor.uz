import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserInterfaces } from "@/interfaces/user/user.interfaces";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AuthPutService } from "@/services/user/put-user.service";
import { setUserData } from "@/redux/reducers/user.reducer";

const UpdateProfile: React.FC = () => {
  const user: UserInterfaces = useSelector((state: any) => state.user.userData);
  const token = useSelector((state: any) => state.user.token);

  const [firstName, setFirstName] = useState<string>(user.first_name ?? "");
  const [lastName, setLastName] = useState<string>(user.last_name ?? "");
  const [passport, setPassport] = useState<string>(user.passport ?? "");
  const [address, setAddress] = useState<string>(user.address ?? "");
  const [email, setEmail] = useState<string>(user.email ?? "");

  const router = useRouter();
  const dispatch = useDispatch();

  const update = async () => {
    try {
      const result = await AuthPutService.UpdateProfile(
        {
          first_name: firstName,
          last_name: lastName,
          address: address,
          passport: passport,
          email: email,
        },
        token,
      );
      dispatch(setUserData(result.user));
      await router.push("/cabinet");
      toast.success("Muvaffaqiyatli yangilandi", {
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

  return (
    <div className={`mt-5`}>
      <div className={`flex justify-between gap-x-5`}>
        <div className={`flex w-full flex-col items-start gap-y-2`}>
          <Label htmlFor="first_name" className={`text-lg`}>
            Ismingiz
          </Label>

          <Input
            id="first_name"
            type={"text"}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Ismingiz kiriting"
            className={`text-lg`}
          />
        </div>
        <div className={`flex w-full flex-col items-start gap-y-2`}>
          <Label htmlFor="last_name" className={`text-lg`}>
            Familiyangiz
          </Label>

          <Input
            id="last_name"
            type={"text"}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Familiyangiz kiriting"
            className={`text-lg`}
          />
        </div>
      </div>
      <div className={`flex my-4 w-full flex-col items-start gap-y-2`}>
        <Label htmlFor="passport" className={`text-lg`}>
          Passportingiz
        </Label>

        <Input
          id="passport"
          type={"text"}
          value={passport}
          maxLength={9}
          onChange={(event) => setPassport(event.target.value)}
          placeholder="Passportingizni kiriting"
          className={`text-lg`}
        />
      </div>
      <div className={`flex my-4 w-full flex-col items-start gap-y-2`}>
        <Label htmlFor="address" className={`text-lg`}>
          Manzilingiz
        </Label>

        <Input
          id="address"
          type={"text"}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Manzilingizni kiriting"
          className={`text-lg`}
        />
      </div>
      <div className={`flex my-4 w-full flex-col items-start gap-y-2`}>
        <Label htmlFor="email" className={`text-lg`}>
          Email manzilingiz
        </Label>

        <Input
          id="email"
          type={"email"}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email manzilingizni kiriting"
          className={`text-lg`}
        />
      </div>
      <Button onClick={update}>Yangilash</Button>
    </div>
  );
};

export default UpdateProfile;
