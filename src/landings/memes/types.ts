export interface MemeItem {
  id: number;
  title: string;
  image: string;
  tag: string;
}

export interface MemesPageProps {
  memes: MemeItem[];
}
