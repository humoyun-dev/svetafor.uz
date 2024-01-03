import { CarTypeInterfaces } from "@/interfaces/car-type/car-type.interfaces";
import { CategoryInterfaces } from "@/interfaces/category/category.interfaces";
import { CommentInterfaces } from "@/interfaces/comment/comment.interfaces";

export interface ProductInterfaces {
  id: number;
  name: string;
  slug: string;
  in_stock: boolean;
  price: number;
  average_stars: number | null;
  car_types: CarTypeInterfaces[];
  description: string;
  comments: CommentInterfaces[];
  images: ImagesList[];
  category: CategoryInterfaces;
  video?: string | null;
  quantity: number;
}

export interface ImagesList {
  id: number;
  image: string;
  product: number;
}
