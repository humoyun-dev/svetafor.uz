import React, { useEffect, useState } from "react";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Auth from "@/components/auth/auth";
import { PostCommentService } from "@/services/comment/post-comment.service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CommentInterfaces } from "@/interfaces/comment/comment.interfaces";

interface AddCommentProps {
  data: ProductInterfaces;
}

const AddComment: React.FC<AddCommentProps> = ({ data }) => {
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(5);

  const router = useRouter();

  const userData = useSelector((state: any) => state.user.token);
  const token = useSelector((state: any) => state.user.token);

  useEffect(() => {
    // Set initial rating to 5 if average_stars is null
    if (data.average_stars === null) {
      setRating(5);
    } else {
      // Set initial rating to the provided average_stars value
      setRating(data.average_stars);
    }
  }, [data.average_stars]);

  const handleStarClick = (clickedIndex: number) => {
    const newRating = clickedIndex + 1 - (rating % 1 === 0.5 ? 0.5 : 0);
    setRating(newRating);
  };

  const add = async () => {
    try {
      const result = await PostCommentService.AddComment(
        {
          text: comment,
          stars: rating,
          product: data.id,
        },
        token,
      );

      await router.replace(router.asPath);
      toast.success("Muvaffaqiyatli Izoh qo'shildi", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Dialog>
      <div className="mt-1">
        <div>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              onClick={() => handleStarClick(index)}
              className={`text-3xl cursor-pointer ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              &#9733;
            </span>
          ))}
        </div>
        <div className="relative mt-1 duration-300">
          <Input
            onChange={(e) => setComment(e.target.value)}
            type="text" // Use double quotes consistently
            placeholder={`Izoh qoldiring`}
          />
          {userData ? (
            <button
              onClick={() => add()}
              className={`right-0 top-0 bg-black h-full text-center text-white px-4 rounded-lg ${
                comment ? "absolute" : "hidden"
              }`}
            >
              Yuborish
            </button>
          ) : (
            <DialogTrigger
              type="button"
              // onClick={() => router.push("/auth/login")}
              className={`right-0 top-0 bg-black h-full text-center text-white px-4 rounded-lg ${
                comment ? "absolute" : "hidden"
              }`}
            >
              Kirish
            </DialogTrigger>
          )}
        </div>
      </div>
      <Auth />
    </Dialog>
  );
};

export default AddComment;
