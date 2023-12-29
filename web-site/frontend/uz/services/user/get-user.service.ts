import axios from "axios";
import { getCookie } from "@/util/cookie";

const api = process.env.API_URL;
const token = getCookie("token");

export const GetUserService = {
  async GetUserByToken() {
    try {
      const response = await axios.get(`${api}/user/user-detail/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      return response.data.orders;
    } catch (error: any) {
      throw new Error(`Error submitting form: ${error.message}`);
    }
  },
};
