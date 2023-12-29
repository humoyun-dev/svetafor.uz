import React from "react";
import Layout from "@/layout/layout";
import { GetServerSideProps, NextPage } from "next";
import StoreCard from "@/components/card/store-card";
import { GetProductService } from "@/services/store/get-product.service";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

const HomePage: NextPage<HomePageProps> = ({ products }) => {
  return (
    <Layout>
      <div></div>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-10">
              <div className="lg:w-1/2 w-full  lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  Barcha Mahsulotlar
                </h1>
                <div className="h-1 w-20 bg-yellow-500 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-x-12 gap-y-10">
              {products.map((product) => (
                <StoreCard key={product.id} data={product} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;

interface HomePageProps {
  products: ProductInterfaces[];
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const products = await GetProductService.getAllProducts();
  return {
    props: {
      products,
    },
  };
};
