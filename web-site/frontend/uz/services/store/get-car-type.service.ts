import axios from "axios";

const GetCarTypeService = {
  async getAllCars() {
    const { data } = await axios.get(`${process.env.API_URL}/store/car-types/`);
    return data;
  },
  async getOneCars(slug: string) {
    const { data } = await axios.get(
      `${process.env.API_URL}/store/car-types/${slug}`,
    );
    return data;
  },
};
