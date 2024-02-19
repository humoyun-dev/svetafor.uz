import axios from "axios";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

const api = process.env.API_URL;

export const SearchService = {
  async search(q: string) {
    try {
      const { data } = await axios.get<ProductInterfaces[]>(
        `${api}/store/search/?q=${q}`,
      );

      return data;
    } catch (error: any) {
      throw new Error(`Error submitting form: ${error.message}`);
    }
  },
};
