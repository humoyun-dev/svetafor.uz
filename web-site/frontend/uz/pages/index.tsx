import React from "react";
import Layout from "@/layout/layout";
import { GetServerSideProps, NextPage } from "next";
import { CarTypeInterfaces } from "@/interfaces/car-type/car-type.interfaces";
import { CategoryInterfaces } from "@/interfaces/category/category.interfaces";
import FilteredData from "@/components/hero/filtered-data";
import Image from "next/image";
import { useRouter } from "next/router";
import { CarouselInterface } from "@/interfaces/carousel/carousel.interface";
import AppCarousel from "@/components/hero/carousel";
import { ListProductInterfaces } from "@/interfaces/product/list-product.interfaces";
import { GetProductService } from "@/services/store/get-product.service";
import { GetCategoryService } from "@/services/store/get-category.service";
import { GetCarTypeService } from "@/services/store/get-car-type.service";
import { GetCarouselService } from "@/services/store/get-carousel.service";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

interface HomePageProps {
  products: ProductInterfaces[];
  carType: CarTypeInterfaces[];
  category: CategoryInterfaces[];
  carousel: CarouselInterface[];
}

const HomePage: NextPage<HomePageProps> = ({
  products,
  carType,
  category,
  carousel,
}) => {
  const router = useRouter();
  return (
    <Layout
      title={"Svetaforuz"}
      keyword={"svetaforuz, svetafor.uz, svetafor"}
      img={"https://svetafor.uz/_next/image?url=%2Flogo.png&w=1080&q=75"}
      des={
        "Svetofor Uz\n" +
        "Automotive Parts Store\n" +
        "- Энг арзон авто аксессуарлар !\n" +
        "- Доставка шахар бу́йлаб\n" +
        "- L.E.D лампы в широком ассортименте.\n" +
        "- Адресс: авторынок сергели 7/1 блок 8 магазин"
      }
    >
      <div className={`md:w-10/12 w-11/12 mx-auto my-2`}>
        <AppCarousel data={carousel} />
      </div>
      <section className={`my-6`}>
        <div className="container flex flex-wrap w-full mb-10">
          <div className="lg:w-1/2 w-full  lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Avtomabillar
            </h1>
            <div className="h-1 w-20 bg-yellow-500 rounded"></div>
          </div>
        </div>
        <div
          className={`grid md:w-10/12 w-11/12 mx-auto md:grid-cols-5 grid-cols-2 gap-2 md:gap-x-4 md:gap-y-10`}
        >
          {carType.slice(0, 10).map((i) => (
            <div
              onClick={() => router.push(`/store/car/${i.slug}`)}
              className={`cursor-pointer bg-gray-100 group rounded-xl border duration-300 hover:shadow`}
              key={i.id}
            >
              <div className={`overflow-hidden rounded-t-xl`}>
                <Image
                  className={`w-full h-[150px] object-cover duration-300 group-hover:scale-110`}
                  src={i.image}
                  alt={i.name}
                  width={999}
                  height={999}
                />
              </div>
              <p
                className={`text-center mt-2 text-lg hover:underline underline-offset-4`}
              >
                {i.name}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className={`mt-6`}>
        <div className="container flex flex-wrap w-full mb-10">
          <div className="lg:w-1/2 w-full  lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Kataloglar
            </h1>
            <div className="h-1 w-20 bg-yellow-500 rounded"></div>
          </div>
        </div>
        <div
          className={`grid md:w-10/12 w-11/12 mx-auto md:grid-cols-5 grid-cols-2 gap-2 md:gap-x-4 md:gap-y-10`}
        >
          {category.slice(0, 10).map((i) => (
            <div
              onClick={() => router.push(`/store/category/${i.slug}`)}
              className={`cursor-pointer bg-gray-100 group rounded-xl border duration-300 hover:shadow`}
              key={i.id}
            >
              <div className={`overflow-hidden rounded-t-xl`}>
                <Image
                  className={`w-full h-[150px] object-cover duration-300 group-hover:scale-110`}
                  src={i.image}
                  alt={i.name}
                  width={999}
                  height={999}
                />
              </div>
              <p
                className={`text-center mt-2 text-lg hover:underline underline-offset-4`}
              >
                {i.name}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className={`w-11/12 md:w-full mx-auto`}>
        <section className="text-gray-600 body-font">
          <div className="md:px-5 py-24 mx-auto">
            <div className="container flex flex-wrap w-full mb-10">
              <div className="lg:w-1/2 w-full ">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  Barcha Mahsulotlar
                </h1>
                <div className="h-1 w-20 bg-yellow-500 rounded"></div>
              </div>
            </div>
            <FilteredData
              data={products}
              carType={carType}
              category={category}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const products = await GetProductService.getAllProducts();
  const category = await GetCategoryService.getAllCategory();
  const carType = await GetCarTypeService.getAllCars();
  const carousel = await GetCarouselService.getCarousel();
  return {
    props: {
      products,
      carType,
      category,
      carousel,
    },
  };
};
