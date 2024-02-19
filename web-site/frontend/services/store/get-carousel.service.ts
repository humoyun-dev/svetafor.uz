import axios from "axios";
import { CarouselInterface } from "@/interfaces/carousel/carousel.interface";

export const GetCarouselService = {
  async getCarousel() {
    const { data } = await axios.get<CarouselInterface[]>(
      `${process.env.API_URL}/store/carousel/`,
    );
    return data;
  },
};
