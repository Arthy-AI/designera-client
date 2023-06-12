import Image, { ImageProps } from 'next/image';
import React from 'react';


interface ImageWithFallbackProps extends ImageProps {
  alt: string;
  fallbackUrl: string;
  src: string;
  fill?: boolean;
}

export const ImageWithBlur = ({alt, fallbackUrl, fill = false, ...props}: ImageWithFallbackProps) => {
  const [src, setSrc] = React.useState(props.src);

  return (
    <Image
      {...props}
      src={src+ "?" + src.split("/").pop() + props.height + props.width}
      alt={alt}
      fill={fill}
      placeholder={"blur"}
      blurDataURL={fallbackUrl}
      onError={(e) => { setSrc(fallbackUrl) }}
    />
  );
};