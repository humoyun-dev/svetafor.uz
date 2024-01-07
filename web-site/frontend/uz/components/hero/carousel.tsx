"use client";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import { CarouselInterface } from "@/interfaces/carousel/carousel.interface";
import { useRouter } from "next/router";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomDot = ({ onClick, ...rest }: any) => {
  const { active } = rest;

  return (
    <button
      className={`z-50 group-hover:mb-4 mx-1 -mb-4 duration-300 h-1.5 bg-white/70 rounded ${
        active ? "bg-yellow-300 md:w-14 w-8" : "md:w-8 w-4"
      }`}
      onClick={() => onClick()}
    ></button>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    carouselState: { currentSlide },
  } = rest;

  return (
    <button
      onClick={() => onClick()}
      disabled={onMove || currentSlide === rest.totalItems - 1}
      className={`z-40 group-hover:absolute text-white md:left-16 left-2 bg-black rounded-full md:w-12 md:h-12 w-10 h-10 flex items-center justify-center p-2`}
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
          d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
};

const CustomRightArrow = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    carouselState: { currentSlide },
  } = rest;

  return (
    <button
      onClick={() => onClick()}
      disabled={onMove || currentSlide === rest.totalItems - 1}
      className={`z-40 group-hover:absolute text-white right-2 md:right-16 bg-black rounded-full w-10 h-10 md:w-12  md:h-12 flex items-center justify-center p-2`}
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
          d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  );
};

const AppCarousel: React.FC<AppCarouselProps> = ({ data }) => {
  const router = useRouter();

  return (
    <Carousel
      customDot={<CustomDot />}
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
      infinite={true}
      keyBoardControl={true}
      showDots={true}
      ssr={true}
      responsive={responsive}
      className={`md:h-[500px] group cursor-pointer rounded-xl`}
      arrows={true}
    >
      {data.map((i) => (
        <Image
          onClick={() => router.push(`/store/product/${i.slug}`)}
          key={i.id}
          src={i.image}
          alt={"/image"}
          height={999}
          width={999}
          className={`w-full h-full object-cover`}
        />
      ))}
    </Carousel>
  );
};

export default AppCarousel;

interface AppCarouselProps {
  data: CarouselInterface[];
}
