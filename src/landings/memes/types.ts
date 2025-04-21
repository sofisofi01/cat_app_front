export interface MemeItem {
  id: number;
  title?: string; // Может приходить как description или tag
  image: string; // URL картинки
  likes: number;
  comments?: number; // Опционально, если есть в API
}

export interface MemesPageProps {
  title: string;
  memes: MemeItem[];
}
