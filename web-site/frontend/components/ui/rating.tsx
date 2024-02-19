import React, { useEffect, useState } from "react";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

interface RatingInterface {
  data: ProductInterfaces;
}

const Rating: React.FC<RatingInterface> = ({ data }) => {
  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    if (data.average_stars === null) {
      setRating(5);
    } else {
      setRating(data.average_stars);
    }
  }, [data.average_stars]);
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-3xl cursor-pointer ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          &#9733;
        </span>
      ))}
    </>
  );
};

export default Rating;
