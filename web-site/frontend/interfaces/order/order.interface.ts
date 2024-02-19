import { OrderItemInterface } from "@/interfaces/order/order-item.interface";

export interface OrderInterface {
  id: number;
  shipping_address: string;
  user: number;
  status: boolean;
  total_price: number;
  date_added: string;
  items: OrderItemInterface[];
  promo_code: number;
  phone_number: string;
}
