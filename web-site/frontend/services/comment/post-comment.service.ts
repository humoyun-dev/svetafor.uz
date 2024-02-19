import axios from "axios";
import { CommentInterfaces } from "@/interfaces/comment/comment.interfaces";

const api = process.env.API_URL;
export const PostCommentService = {
  async AddComment(formData: any, token: string) {
    try {
      const response = await axios.post<CommentInterfaces>(
        `${api}/comments/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        },
      );
      return response;
    } catch (error: any) {
      return error;
    }
  },
};
