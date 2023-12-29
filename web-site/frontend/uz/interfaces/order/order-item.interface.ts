import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

export interface OrderItemInterface {
  id: number;
  product: number;
  quantity: number;
  order: number;
  product_data: ProductInterfaces;
}
