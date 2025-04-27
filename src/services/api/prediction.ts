import apiClient from "./client";
import { Prediction, PredictionApiResponse } from "./types";

export const PredictionService = {
  getRandom: async (): Promise<Prediction> => {
    return apiClient.get("/random-prediction/");
  },

  getAll: async (): Promise<PredictionApiResponse> => {
    return apiClient.get("/all-predictions/");
  },

  create: async (data: Omit<Prediction, "id">): Promise<Prediction> => {
    return apiClient.post("/add-prediction/", data);
  },

  like: async (predictionId: number): Promise<Prediction> => {
    return apiClient.post(`/like-prediction/${predictionId}/`);
  },

  unlike: async (predictionId: number): Promise<Prediction> => {
    return apiClient.post(`/unlike-prediction/${predictionId}/`);
  },

  getLikes: async (predictionId: number): Promise<Prediction> => {
    return apiClient.get(`/prediction-likes/${predictionId}/`);
  },
};
