import axios from "axios";

const api = process.env.API_URL;

export const CouponService = {
  async searchCoupon(formData: any) {
    try {
      const response = await axios.post(`${api}/store/coupon/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error: any) {
      throw new Error(`Error submitting form: ${error.message}`);
    }
  },
};
