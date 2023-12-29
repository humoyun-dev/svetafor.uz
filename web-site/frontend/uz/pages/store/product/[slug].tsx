import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { GetProductService } from "@/services/store/get-product.service";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";
import Layout from "@/layout/layout";

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  console.log(product);
  return (
    <Layout>
      <div></div>
    </Layout>
  );
};

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
