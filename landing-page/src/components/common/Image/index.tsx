import { memo, type ImgHTMLAttributes, useState, useEffect } from 'react';
import isEqual from 'react-fast-compare';

type TImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> & {
  placeholderSrc?: string;
};

const ImageCustom = ({
  placeholderSrc = '',
  src = '',
  ...props
}: TImageProps): JSX.Element => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [srcSetState, setSrcSet] = useState<string>(placeholderSrc);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.srcset = `
    ${src} 280w,
    ${src} 480w,
    ${src} 560w,
    ${src} 840w,
    ${src} 960w,
    ${src} 1440w
    `;

    img.onload = () => {
      setSrcSet(img.srcset);
      setImgSrc(src);
    };
  }, [src]);

  return <img {...{ src: imgSrc, srcSet: srcSetState, ...props }} />;
};

const ImageMemorized = memo(ImageCustom, isEqual);

export default ImageMemorized;
