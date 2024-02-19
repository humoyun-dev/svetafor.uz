import { OrderInterface } from "@/interfaces/order/order.interface";

export interface UserInterfaces {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  address: string;
  passport: string;
  orders: OrderInterface[];
  profile_image: string | null;
}
