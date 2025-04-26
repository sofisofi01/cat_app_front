import { ImageProps } from './types';

export function Image(props: ImageProps) {
  return (
    <img
      id={props.id}
      style={props.style}
      height={props.height}
      width={props.width}
      src={props.src}
      srcSet={props.srcSet}
      alt={props.alt}
      title={props.title}
      loading={props.loading}
      className={props.className}
      onClick={props.onClick}
    />
  );
}