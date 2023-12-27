import axios from "axios";

const api = process.env.API_URL;

export const AuthPostService = {
  async Register(formData: any) {
    try {
      const response = await axios.post(`${api}/user/register/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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

      return response.data;
    } catch (error: any) {
      throw new Error(`Error submitting form: ${error.message}`);
    }
  },
};
