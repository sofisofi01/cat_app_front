export interface MemeItem {
  id: number;
  title: string;
  image: string;
  tag: string;
}

export interface MemesPageProps {
  title: string;
  memes: MemeItem[];
  uploadTitle: string;
}
