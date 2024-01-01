import React, { useEffect, useState } from "react";
import AddComment from "@/components/comment/add-comment";
import { CommentInterfaces } from "@/interfaces/comment/comment.interfaces";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";
import moment from "moment";

interface CommentProps {
  product: ProductInterfaces;
  id?: number | null;
}

const Comments: React.FC<CommentProps> = ({ id, product }) => {
  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    if (product.average_stars === null) {
      setRating(5);
    } else {
      setRating(product.average_stars);
    }
  }, [product.average_stars]);

  return (
    <div className="mt-1 flex md:flex-row flex-col items-start justify-between md:gap-x-4 gap-y-4">
      <div className="md:w-2/12 w-full md:sticky py-10 top-24 rounded-lg shadow-md border bg-gray-100 p-4 flex flex-col gap-y-2 items-center justify-center">
        <h1 className="text-6xl font-bold">{rating.toString().slice(0, 3)}</h1>
        <div>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`text-3xl ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              &#9733;
            </span>
          ))}
        </div>
        <p className="opacity-50">of {product.comments.length} reviews</p>
      </div>
      <div className="md:w-10/12 w-full">
        <div className="mb-5">
          <AddComment data={product} />
          <hr className="mt-3" />
        </div>

        {product.comments.map((comment: CommentInterfaces) => (
          <div
            key={comment.id}
            className="bg-gray-50 mb-4 rounded-lg border shadow p-3 flex items-start justify-between"
          >
            <div>
              <p className="text-2xl font-[500]"></p>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-3xl ${
                    index < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  &#9733;
                </span>
              ))}
              <p>{comment.text}</p>
              <p className="opacity-50 underline mt-2">
                {moment(comment.date).utcOffset(5).format("YYYY/MM/DD, HH:mm")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
