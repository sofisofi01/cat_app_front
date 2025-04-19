export type Prediction = {
  id: number;
  text: string;
  image?: string;
  likes: number;
  tag?: string;
  avatar?: string;
};

export type ApiResponse<T> = {
  count?: number;
  next?: string;
  previous?: string;
  results: T[];
};
