import apiClient from "./client";
import { Comment, ApiResponse } from "./types";

export const CommentService = {
  getByPrediction: async (
    predictionId: number,
  ): Promise<ApiResponse<Comment>> => {
    return apiClient.get(`/comments/${predictionId}/`);
  },

  add: async (predictionId: number, text: string): Promise<Comment> => {
    return apiClient.post(`/add-comment/${predictionId}/`, { text });
  },
};
