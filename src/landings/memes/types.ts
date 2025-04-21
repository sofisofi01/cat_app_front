export interface MemeItem {
  id: string;
  title: string;
  image: string;
  likes: number;
  comments: number;
}

export interface MemesPageProps {
  title: string;
  memes: MemeItem[];
}
