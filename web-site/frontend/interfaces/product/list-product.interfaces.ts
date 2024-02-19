import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

export interface ListProductInterfaces {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductInterfaces[];
}
