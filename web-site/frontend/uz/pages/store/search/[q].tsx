import React from "react";
import Layout from "@/layout/layout";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";
import { GetServerSideProps, NextPage } from "next";
import { SearchService } from "@/services/search/search.service";
import Link from "next/link";
import { GetCategoryService } from "@/services/store/get-category.service";
import { GetCarTypeService } from "@/services/store/get-car-type.service";
import { CarTypeInterfaces } from "@/interfaces/car-type/car-type.interfaces";
import { CategoryInterfaces } from "@/interfaces/category/category.interfaces";
import FilteredData from "@/components/hero/filtered-data";

const SearchDetail: NextPage<SearchDetailInterface> = ({
  data,
  carType,
  category,
}) => {
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
      {data.length ? (
        <div className={`m-4`}>
          <FilteredData data={data} carType={carType} category={category} />
        </div>
      ) : (
        <div className={`h-screen flex justify-center items-center`}>
          <div className="text-center">
            <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
            <p className="mb-4 text-lg text-gray-600">
              {`Oops! Looks like you're lost.`}
            </p>
            <div className="animate-bounce">
              <svg
                className="mx-auto h-16 w-16 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </div>
            <p className="mt-4 text-gray-600">
              {`Let's get you back`}
              <Link href="/" className="text-blue-500">
                home
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SearchDetail;

interface SearchDetailInterface {
  data: ProductInterfaces[];
  carType: CarTypeInterfaces[];
  category: CategoryInterfaces[];
}

export const getServerSideProps: GetServerSideProps<
  SearchDetailInterface
> = async ({ query }) => {
  try {
    const q = query.q as string;
    const data = await SearchService.search(q);
    const category = await GetCategoryService.getAllCategory();
    const carType = await GetCarTypeService.getAllCars();

    return {
      props: {
        data,
        carType,
        category,
      },
    };
  } catch (e) {
    console.error("Error fetching data:", e);
    return {
      notFound: true,
    };
  }
};
