import apiClient from "./client";
import { Comment, CommentApiResponse } from "./types";

export const CommentService = {
  getByPrediction: async (
    predictionId: number,
  ): Promise<CommentApiResponse> => {
    return apiClient.get(`/comments/${predictionId}/`);
  },

  add: async (
    predictionId: number,
    text: string,
    username: string,
  ): Promise<Comment> => {
    const res = await apiClient.post(`/add-comment/${predictionId}/`, {
      text,
      username,
    });
    return res.data;
  },
};
