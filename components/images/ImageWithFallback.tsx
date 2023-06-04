import Image, { ImageProps } from 'next/image';
import React from 'react';


interface ImageWithFallbackProps extends ImageProps {
  alt: string;
  fallbackUrl: string;
  src: string;
  fill?: boolean;
}

export const ImageWithFallback = ({alt, fallbackUrl, fill = false, ...props}: ImageWithFallbackProps) => {
  const [src, setSrc] = React.useState(props.src);

  return (
    <Image
      {...props}
      src={src+ "?" + Date.now()}
      alt={alt}
      fill={fill}
      onError={(e) => { setSrc(fallbackUrl) }}
    />
  );
};