export type Prediction = {
  id: number;
  text: string;
  image?: string;
  likes: number;
  tag?: string;
  avatar?: string;
};

export interface ApiResponse<T> {
  images: T[];
  total_pages?: number;
  current_page?: number;
}

export type Comment = {
  id: number;
  prediction_id: number;
  author: string;
  text: string;
  created_at: string;
};

export interface Image {
  id: number;
  name: string;
  image: string;
  uploaded_at?: string;
  tag?: string;
}
