import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthPutService } from "@/services/user/put-user.service";
import { setUserData } from "@/redux/reducers/user.reducer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const UpdateImage: React.FC = () => {
  const [image, setImage] = useState<string>("");

  const token = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const upload = async () => {
    try {
      const result = await AuthPutService.UpdateProfileImage(
        {
          profile_image: image,
        },
        token,
      );
      dispatch(setUserData(result.user));
      await router.push("/cabinet");
      toast.success("Muvaffaqiyatli yuklandi", {
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

  console.log(image);

  return (
    <>
      <div className="grid mt-6 w-full items-center gap-1.5">
        <Label htmlFor="picture" className={`text-lg`}>
          Profil rasmi
        </Label>
        <Input
          className={`w-full`}
          id="picture"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      {image ? (
        <Button onClick={upload} className={`mt-3`}>
          Rasmni yuklash
        </Button>
      ) : (
        <Button
          variant={"outline"}
          disabled={true}
          onClick={upload}
          className={`mt-3`}
        >
          Rasmni yuklash
        </Button>
      )}
    </>
  );
};

export default UpdateImage;
