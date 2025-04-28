export type Prediction = {
  id: number;
  text: string;
  image?: string;
  likes: number;
  tag?: string;
  avatar?: string;
};

export type CommentApiResponse = {
  comments: Comment[];
  total_pages: number;
  current_page: number;
};

export type PredictionApiResponse = {
  predictions: Prediction[];
  total_pages: number;
  current_page: number;
};

export type ImageApiResponse = {
  images: ImageType[];
  total_pages: number;
  current_page: number;
};

export type Comment = {
  id: number;
  prediction_id: number;
  username: string;
  text: string;
  created_at: string;
};

export type ImageType = {
  tag?: string;
  id: number;
  image: string;
  description?: string;
};
