import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { GetProductService } from "@/services/store/get-product.service";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";
import Layout from "@/layout/layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Comments from "@/components/comment/comments";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/redux/reducers/cart.reducer";
import {
  addToCartUtil,
  decrementQuantity,
  existProduct,
  incrementQuantity,
} from "@/util/cart";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { setWishList } from "@/redux/reducers/wish-list.reducer";
import {
  addToWishlist,
  isInWishlist,
  removeFromWishlist,
} from "@/util/wish-list";

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const [activeImg, setActiveImg] = useState(product.images[0]?.image || "");
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const wishlist = useSelector((state: RootState) => state.wishList.wishItems);

  const handleThumbnailClick = (image: string) => {
    setActiveImg(image);
  };

  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    setRating(product.average_stars || 5);
  }, [product.average_stars]);

  const handleIncrement = (id: number) =>
    dispatch(setCart(incrementQuantity(id, cart)));
  const handleDecrement = (id: number) =>
    dispatch(setCart(decrementQuantity(id, cart)));

  const addToCart = () => {
    const updatedCart = addToCartUtil(product, cart);
    dispatch(setCart(updatedCart));
    toast.success("Muvaffaqiyatli savatga qo'shildi", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const addWishList = () =>
    dispatch(setWishList(addToWishlist(product, wishlist)));
  const removeWishList = () =>
    dispatch(setWishList(removeFromWishlist(product.id, wishlist)));

  const ifWish = isInWishlist(product.id, wishlist);
  const ifExist = existProduct(product.id, cart);

  return (
    <Layout
      title={"Svetaforuz"}
      keyword={"svetaforuz, svetafor.uz, svetafor"}
      img={product.images[0].image}
      des={`${product.name}\n` + `${product.description}`}
    >
      <div
        className={`flex md:w-10/12 w-11/12 mx-auto md:flex-row flex-col justify-between items-start`}
      >
        <div className={`md:w-7/12 md:sticky top-20 mx-auto w-full `}>
          <div className="w-full flex mt-8  md:justify-between justify-center md:flex-row flex-col-reverse">
            <div
              className={`flex md:h-[530px] px-2 detail-image md:overflow-y-scroll overflow-x-scroll md:flex-col flex-row mt-4 md:mt-0 md:gap-y-3 gap-x-3`}
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
            <div className={`md:hidden space-y-2`}>
              {product.in_stock ? (
                <span
                  className={`bg-green-200 inline-flex w-full items-center font-bold text-black text-sm px-2 py-1 rounded`}
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
                  className={`bg-red-200 inline-flex w-full items-center font-bold text-black text-sm px-2 py-1 rounded`}
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
              <h1 className={`text-4xl font-semibold`}>{product.name}</h1>
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
            </div>
            <hr className={`my-4`} />
            <div className={`mt-8`}>
              <p className={`first-letter:uppercase`}>{product.description}</p>
            </div>
          </div>
          <hr className={`my-4`} />
          <p className={`text-2xl md:hidden font-semibold`}>
            {(product.price * 1).toLocaleString("en-US", {
              style: "currency",
              currency: "uzs",
            })}
          </p>
          <div className={`flex justify-between items-center mt-8 gap-3`}>
            {ifWish ? (
              <span
                onClick={removeWishList}
                className="cursor-pointer top-2 right-2 z-20 text-red-600"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 backdrop-blur"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              </span>
            ) : (
              <span
                onClick={addWishList}
                className="cursor-pointer top-2 right-2 z-20 text-red-600"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 backdrop-blur"
                >
                  <path
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
            <div className="w-full">
              {!ifExist ? (
                <button
                  onClick={addToCart}
                  className="border w-full py-2 border-yellow-500 hover:bg-yellow-300 duration-300 rounded-lg"
                >
                  {`Savatga qo'shish`}
                </button>
              ) : (
                <div className="flex border-yellow-500 justify-between py-1 px-6 items-center w-full border rounded">
                  <button
                    onClick={() => handleDecrement(product.id)}
                    className="w-full flex justify-center"
                  >
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      className="w-6 h-6"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <p className="underline text-lg underline-offset-4">
                    {ifExist.quantity}
                  </p>
                  <button
                    onClick={() => handleIncrement(product.id)}
                    className="w-full flex justify-center"
                  >
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      className="w-6 h-6"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className={`my-6`} />

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
