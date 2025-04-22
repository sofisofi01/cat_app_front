import apiClient from "./client";
import { Image, ImageApiResponse } from "./types";

export const ImageService = {
  getAll: async (): Promise<ImageApiResponse> => {
    return apiClient.get("/images/");
  },

  getById: async (imageId: number): Promise<Image> => {
    return apiClient.get(`/images/${imageId}/`);
  },

  upload: async (file: File): Promise<Image> => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post("/upload-image/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
