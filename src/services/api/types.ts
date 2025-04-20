export type Prediction = {
  id: number;
  text: string;
  image?: string;
  likes: number;
  tag?: string;
  avatar?: string;
};

export type ApiResponse<T> = {
  predictions: T[];
  total_pages: number;
  current_page: number;
};
