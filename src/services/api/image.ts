import apiClient from "./client";
import { ImageType, ImageApiResponse } from "./types";

export const ImageService = {
  getAll: async (): Promise<ImageApiResponse> => {
    return apiClient.get("/images?page_size=1000");
  },

  getById: async (imageId: number): Promise<ImageType> => {
    return apiClient.get(`/images/${imageId}/`);
  },

  upload: async (
    file: File,
    name: string,
    tag?: string,
  ): Promise<ImageType> => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    if (tag) formData.append("tag", tag);

    return apiClient.post("/upload-image/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
