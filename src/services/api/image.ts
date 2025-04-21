// services/api/image.ts
import apiClient from "./client";
import { Image, ApiResponse } from "./types";

export const ImageService = {
  getAll: async (): Promise<ApiResponse<Image>> => {
    // Используем правильный endpoint для админки Django
    return apiClient.get("/admin/catapp/imageupload/");
  },

  getById: async (imageId: number): Promise<Image> => {
    return apiClient.get(`/admin/catapp/imageupload/${imageId}/`);
  },

  // Для загрузки через админку
  upload: async (file: File): Promise<Image> => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post("/admin/catapp/imageupload/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  
  // Получение прямого URL изображения
  getImageUrl: (id: number) => {
    return `https://sofisofi01.pythonanywhere.com/uploads/meme1_222MlLm.png`;
  }
};