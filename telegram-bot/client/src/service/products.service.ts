import axios from "axios";
import { ProductInterfaces } from "@/interfaces/product.interface.ts";
import api from "@/api.json";

const root = api.api;

export const ProductService = {
  async getAllProducts() {
    const { data } = await axios.get<ProductInterfaces[]>(
      `${root}/store/products/`,
    );

    return data;
  },
  async getOneProducts(slug: string) {
    const { data } = await axios.get<ProductInterfaces>(
      `${root}/store/products/${slug}`,
    );

    return data;
  },
};
