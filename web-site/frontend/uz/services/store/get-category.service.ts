import axios from "axios";
import { CategoryInterfaces } from "@/interfaces/category/category.interfaces";

export const GetCategoryService = {
  async getAllCategory() {
    const { data } = await axios.get<CategoryInterfaces[]>(
      `${process.env.API_URL}/store/categories/`,
    );
    return data;
  },

  async getOneCategory(slug: string) {
    const { data } = await axios.get<CategoryInterfaces>(
      `${process.env.API_URL}/store/categories/${slug}/`,
    );
    return data;
  },
};
