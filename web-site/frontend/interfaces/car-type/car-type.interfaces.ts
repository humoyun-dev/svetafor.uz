import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

export interface CarTypeInterfaces {
  id: number;
  name: string;
  slug: string;
  make: string;
  image: string;
  products: ProductInterfaces[];
}
