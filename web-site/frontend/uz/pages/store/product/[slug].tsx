import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { GetProductService } from "@/services/store/get-product.service";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";
import Layout from "@/layout/layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Comments from "@/components/comment/comments";

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const [activeImg, setActiveImg] = useState(product.images[0]?.image || "");

  const handleThumbnailClick = (image: string) => {
    setActiveImg(image);
  };

  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    if (product.average_stars === null) {
      setRating(5);
    } else {
      setRating(product.average_stars);
    }
  }, [product.average_stars]);

  return (
    <Layout>
      <div
        className={`flex md:w-10/12 w-11/12 mx-auto md:flex-row flex-col justify-between gap-x-2 items-start`}
      >
        <div className={`md:w-7/12 md:sticky top-20 mx-auto w-full `}>
          <div className="w-full flex mt-8 px-8 justify-between md:flex-row flex-col-reverse">
            <div
              className={`flex md:flex-col flex-row mt-4 md:mt-0 md:gap-y-3 gap-x-3`}
            >
              {product.images.map((image) => (
                <ImageThumbnail
                  key={image.id}
                  image={process.env.API_URL + image.image}
                  onClick={() => handleThumbnailClick(image.image)}
                  alt={`${image.image}`}
                  isActive={activeImg === image.image}
                />
              ))}
            </div>
            <div
              className={`md:w-2/3 md:h-[500px] h-[300px] lg:sticky top-20  rounded-md mx-auto w-full`}
            >
              <Image
                width={999}
                height={999}
                src={process.env.API_URL + activeImg}
                alt="pro"
                className={`w-full duration-300 lg:absolute p-6 h-full  border-2 border-black/60 object-contain rounded-md`}
              />
            </div>
          </div>
        </div>
        <div className={`md:w-5/12 px-2 mt-8 flex justify-between flex-col`}>
          <div>
            <div
              className={`md:flex hidden md:flex-row flex-col justify-between gap-2 items-center w-full`}
            >
              <div className={`flex flex-col gap-2`}>
                <h1 className={`text-black text-3xl`}>{product.name}</h1>

                {product.in_stock ? (
                  <span
                    className={`bg-green-200 flex w-full items-center font-bold text-black text-sm px-2 py-1 rounded`}
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
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Omborda mavjud
                  </span>
                ) : (
                  <span
                    className={`bg-red-200 flex w-full items-center font-bold text-black text-sm px-2 py-1 rounded`}
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
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Omborda mavjud emas
                  </span>
                )}
              </div>
              <div className={`flex flex-col gap-2`}>
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
                <h4 className={`text-2xl text-black`}>
                  {(product.price * 1).toLocaleString("en-US", {
                    style: "currency",
                    currency: "uzs",
                  })}
                </h4>
              </div>
            </div>
            <div className={`mt-8`}>
              <p className={`first-letter:uppercase`}>{product.description}</p>
            </div>
          </div>
          <div className={`flex justify-between items-center mt-8 gap-3`}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            <Button className={`w-full`}>{`Savatchaga qo'shish`}</Button>
          </div>
        </div>
      </div>
      {product.video ? (
        <div className={`mt-8 w-10/12 mx-auto`}>
          <video
            controls={true}
            className={`w-full h-[400px] md:h-[600px] p-4 bg-black cursor-pointer object-contain rounded-md border-2 border-black/60`}
            src={product.video}
          ></video>
        </div>
      ) : (
        <div></div>
      )}
      <div className={`w-10/12 mx-auto mt-8`}>
        <Comments product={product} />
      </div>
    </Layout>
  );
};

interface ImageThumbnailProps {
  onClick: () => void;
  alt: string;
  isActive: boolean;
  image: string;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  image,
  onClick,
  alt,
  isActive,
}) => (
  <div onClick={onClick}>
    <Image
      width={999}
      height={999}
      src={image}
      alt={alt}
      className={`md:w-40 w-24 duration-300 h-24 md:h-40 p-2 bg-gray-100 cursor-pointer shadow-md object-contain rounded-lg border ${
        isActive ? "border-blue-500 shadow-blue-200" : "border-gray-400"
      }`}
    />
  </div>
);

export default ProductDetailPage;

interface ProductDetailPageProps {
  product: ProductInterfaces;
}

export const getServerSideProps: GetServerSideProps<
  ProductDetailPageProps
> = async ({ query }) => {
  try {
    const slug = query.slug as string;
    const product = await GetProductService.getOneProducts(slug);

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};
