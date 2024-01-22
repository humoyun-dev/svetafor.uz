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
  const [image, setImage] = useState<File | null>(null);

  const token = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setImage(selectedFile);
  };

  const upload = async () => {
    try {
      if (!image) {
        console.error("Please select a file.");
        return;
      }

      const result = await AuthPutService.UpdateProfileImage(image, token);

      console.log(result);

      dispatch(setUserData(result.user));
      await router.push("/cabinet");
      toast.success("Muvaffaqiyatli yuklandi", {
        // ...toast options
      });
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      toast.error("Error uploading image. Please try again.", {
        // ...toast options
      });
    }
  };

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
      <Button onClick={upload} className={`mt-3`} disabled={!image}>
        Rasmni yuklash
      </Button>
    </>
  );
};

export default UpdateImage;
