import { ImgHTMLAttributes } from 'react';

export type ImageProps = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  | 'id'
  | 'src'
  | 'srcSet'
  | 'alt'
  | 'title'
  | 'className'
  | 'loading'
  | 'style'
  | 'height'
  | 'width'
> & {
  src?: string;
};