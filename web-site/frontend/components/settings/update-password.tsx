import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthPutService } from "@/services/user/put-user.service";
import { setUserData } from "@/redux/reducers/user.reducer";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const UpdatePassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const token = useSelector((state: any) => state.user.token);
  const router = useRouter();

  const updatePassword = async () => {
    try {
      const result = await AuthPutService.UpdateProfile(
        {
          old_password: password,
          new_password: newPassword,
        },
        token,
      );
      await router.push("/cabinet");
      toast.success("Muvaffaqiyatli parol o'zgartirildi", {
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

  const valid = password && newPassword;

  return (
    <>
      <h1 className={`mt-20 text-xl font-600 border-b pb-2`}>
        Parolni almashtirish
      </h1>
      <div className={`flex my-4 w-full flex-col items-start gap-y-2`}>
        <Label htmlFor="password" className={`text-lg`}>
          Avalgi parolni kiriting
        </Label>

        <Input
          id="password"
          type={"password"}
          value={password}
          maxLength={9}
          onChange={(event: any) => setPassword(event.target.value)}
          placeholder="Avalgi parolni kiriting"
          className={`text-lg`}
        />
      </div>
      <div className={`flex my-4 w-full flex-col items-start gap-y-2`}>
        <Label htmlFor="password-new" className={`text-lg`}>
          Yangi parolni kiriting
        </Label>

        <Input
          id="password-new"
          type={"password"}
          value={newPassword}
          maxLength={9}
          onChange={(event: any) => setNewPassword(event.target.value)}
          placeholder="Yangi parolni kiriting"
          className={`text-lg`}
        />
      </div>
      {valid ? (
        <Button onClick={updatePassword} className={`mt-2`}>
          Parolni yangilash
        </Button>
      ) : (
        <Button variant={"outline"} disabled={true} className={`mt-2`}>
          Parolni yangilash
        </Button>
      )}
    </>
  );
};

export default UpdatePassword;
