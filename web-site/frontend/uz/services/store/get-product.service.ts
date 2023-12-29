import axios from "axios";

export const GetProductService = {
  async getAllProducts() {
    const { data } = await axios.get(`${process.env.API_URL}/store/products/`);

    return data;
  },
  async getOneProducts(slug: string) {
    const { data } = await axios.get(
      `${process.env.API_URL}/store/products/${slug}`,
    );

    return data;
  },
};
