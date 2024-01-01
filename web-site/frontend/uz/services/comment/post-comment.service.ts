import axios from "axios";

const api = process.env.API_URL;
export const PostCommentService = {
  async AddComment() {
    const data = await axios.post(`${api}/store`);
  },
};
