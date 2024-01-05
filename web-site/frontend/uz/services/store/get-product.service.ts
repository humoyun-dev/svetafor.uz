import axios from "axios";
import { ListProductInterfaces } from "@/interfaces/product/list-product.interfaces";

export const GetProductService = {
  async getAllProducts() {
    const { data } = await axios.get<ListProductInterfaces>(
      `${process.env.API_URL}/store/products/`,
    );

    return data;
  },
  async getOneProducts(slug: string) {
    const { data } = await axios.get(
      `${process.env.API_URL}/store/products/${slug}`,
    );

    return data;
  },
};
