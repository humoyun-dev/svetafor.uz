import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";
import Link from "next/link";

interface StoreCardProps {
  data: ProductInterfaces;
}

const StoreCard: React.FC<StoreCardProps> = ({ data }) => {
  const router = useRouter();

  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    // Set initial rating to 5 if average_stars is null
    if (data.average_stars === null) {
      setRating(5);
    } else {
      // Set initial rating to the provided average_stars value
      setRating(data.average_stars);
    }
  }, [data.average_stars]);

  // const handleStarClick = (clickedIndex: number) => {
  //   const newRating = clickedIndex + 1 - (rating % 1 === 0.5 ? 0.5 : 0);
  //   setRating(newRating);
  // };

  return (
    <div className={`group cursor-pointer`}>
      <Link href={`/store/product/${data.slug}`}>
        <div className={`relative overflow-hidden p-2 rounded-lg bg-gray-100`}>
          <Image
            key={data.id}
            src={`${process.env.API_URL}${data.images[0].image}`}
            className={`rounded-lg md:h-[350px] h-[200px] group-hover:scale-110 object-cover duration-300`}
            alt={`image`}
            width={999}
            height={999}
          />
        </div>
        <div className={`mt-2 px-2`}>
          <h4 className={`text-black font-semibold text-lg`}>{data.name}</h4>
          <div>
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
          </div>
          <div className={`mb-1 border-b pb-2`}>
            <span className={`mr-2`}>Katalog:</span>
            <Badge onClick={() => router.push(``)} className={`bg-gray-200`}>
              {data.category.name}
            </Badge>
          </div>
          <div className={`mb-5 flex items-center`}>
            <span className={`mr-2`}>Moshinalar:</span>
            <div className={`flex items-center gap-x-2`}>
              {data.car_types.map((i) => (
                <Badge
                  key={i.id}
                  onClick={() => router.push(``)}
                  className={`bg-gray-200`}
                >
                  {i.name}
                </Badge>
              ))}
            </div>
          </div>
          <span className={`bg-yellow-300 py-1 px-3 rounded-lg text-black`}>
            {(data.price * 1).toLocaleString("en-US", {
              style: "currency",
              currency: "uzs",
            })}
          </span>
        </div>
      </Link>
      <div className={`flex items-center justify-between gap-x-2 mt-5`}>
        <button
          className={`border hover:bg-gray-200 duration-300 py-2 rounded-lg px-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
        <button
          className={`border w-full py-2 border-yellow-500 hover:bg-yellow-300 duration-300 rounded-lg`}
        >{`Savatga qo'shish`}</button>
      </div>
    </div>
  );
};

export default StoreCard;
