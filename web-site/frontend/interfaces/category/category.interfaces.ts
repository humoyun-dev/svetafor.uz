import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

export interface CategoryInterfaces {
  id: number;
  name: string;
  slug: string;
  products: ProductInterfaces[];
  image: string;
}
