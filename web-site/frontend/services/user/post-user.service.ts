import axios from "axios";
import { setCookie } from "@/util/cookie";

const api = process.env.API_URL;

export const AuthPostService = {
  async Register(formData: any) {
    try {
      const response = await axios.post(`${api}/user/register/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCookie("token", response.data.token, { expires: 30 });
      localStorage.setItem("user-data", JSON.stringify(response.data.user));

      return response.data;
    } catch (error: any) {
      throw new Error(`Error submitting form: ${error.message}`);
    }
  },

  async Login(formData: any) {
    try {
      const response = await axios.post(`${api}/user/login/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCookie("token", response.data.token, { expires: 30 });
      localStorage.setItem("user-data", JSON.stringify(response.data.user));

      return response.data;
    } catch (error: any) {
      throw new Error(`Error submitting form: ${error.message}`);
    }
  },
};
