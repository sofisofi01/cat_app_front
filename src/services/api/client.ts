import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://sofisofi01.pythonanywhere.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  console.log("Отправка запроса:", config.url);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log("Ответ от сервера:", response.status, response.data);
    return response.data;
  },
  (error) => {
    console.error("Ошибка API:", error.response?.status, error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
