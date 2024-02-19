import axios from "axios";

const api = process.env.API_URL;

export const AuthPutService = {
  async UpdateProfile(formData: any, token: any) {
    try {
      const response = await axios.patch(
        `${api}/user/update-profile/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        },
      );

      localStorage.setItem("user-data", JSON.stringify(response.data.user));

      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Error submitting form: ${error.message}`);
    }
  },

  async UpdateProfileImage(file: any, token: any) {
    try {
      const formData = new FormData();
      formData.append("profile_image", file);

      const response = await axios.patch(
        `${api}/user/update-profile-image/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.status === 200) {
        localStorage.setItem("user-data", JSON.stringify(response.data.user));
        return response.data;
      }
    } catch (error: any) {
      console.error("Error updating profile media:", error);
      throw new Error(`Error updating profile image: ${error.message}`);
    }
  },

  async UpdatePassword(data: any, token: any) {
    try {
      const response = await axios.patch(`${api}/user/update-password/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Error submitting form: ${error.message}`);
    }
  },
};
