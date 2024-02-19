import axios from "axios";
import { CarTypeInterfaces } from "@/interfaces/car-type/car-type.interfaces";

export const GetCarTypeService = {
  async getAllCars() {
    const { data } = await axios.get<CarTypeInterfaces[]>(
      `${process.env.API_URL}/store/car-types/`,
    );
    return data;
  },
  async getOneCars(slug: string) {
    const { data } = await axios.get(
      `${process.env.API_URL}/store/car-types/${slug}`,
    );
    return data;
  },
};
