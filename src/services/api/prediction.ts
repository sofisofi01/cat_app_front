import apiClient from "./client";
import { Prediction, ApiResponse } from "./types";

export const PredictionService = {
  getRandom: async (): Promise<Prediction> => {
    return apiClient.get("/random-prediction/");
  },

  getAll: async (): Promise<ApiResponse<Prediction>> => {
    return apiClient.get("/all-predictions/");
  },

  create: async (data: Omit<Prediction, "id">): Promise<Prediction> => {
    return apiClient.post("/add-prediction/", data);
  },

  like: async (predictionId: number): Promise<Prediction> => {
    return apiClient.post(`/like-prediction/${predictionId}/`);
  },
};
