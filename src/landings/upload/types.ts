import { ImageProps } from "@/components/Image/types";

export type MemeData = {
  text: string;
  image: ImageProps;
};

export type ThoughtData = {
  text: string;
  image: ImageProps;
};

export type UploadProps = {
  meme: MemeData;
  thought: ThoughtData;
};
