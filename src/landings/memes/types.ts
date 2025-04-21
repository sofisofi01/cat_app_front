export interface MemeItem {
  id: number;
  title?: string; // Может приходить как description или tag
  image: string; 
}

export interface MemesPageProps {
  title: string;
  memes: MemeItem[];
}
