import { OrderInterface } from "@/interfaces/order/order.interface";
import axios from "axios";

const api = process.env.API_URL;
export const OrderService = {
  async createOrder(formData: any, token: string) {
    try {
      const req = await axios.post<OrderInterface>(`${api}/order/`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      return req;
    } catch (e) {
      return e;
    }
  },
  async createOrderItem(formData: any, token: string) {
    try {
      const req = await axios.post<OrderInterface>(
        `${api}/order/item/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        },
      );

      return req;
    } catch (e) {
      return e;
    }
  },
};
