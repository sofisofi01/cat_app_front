export type Prediction = {
  id: number;
  text: string;
  image?: string;
  likes: number;
  tag?: string;
  avatar?: string;
};

export type ApiResponse<T> = {
  content: T[];
  total_pages: number;
  current_page: number;
};

export type Comment = {
  id: number;
  prediction_id: number;
  author: string;
  text: string;
  created_at: string;
};

export type Image = {
  tag?: string;
  id: number;
  url: string;
  description?: string;
};
