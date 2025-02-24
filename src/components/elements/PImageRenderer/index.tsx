import React, { useCallback, useEffect, useState } from "react";

import { TPImageRendererProps } from "./type";

const PImageRenderer: React.FC<TPImageRendererProps> = ({
  src,
  alt,
  fallbackSrc = "https://digpbmme8jwkp.cloudfront.net/project/image_not_found.png",
  customClassName = "",
  onClick,
  onLoad,
  onError,
  shouldLoadLazy = true,
  style,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleImageLoadSuccess = useCallback(() => {
    setIsLoaded(true);
    onLoad && onLoad();
  }, [onLoad]);

  const handleImageLoadError = useCallback(() => {
    if (!isLoaded && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    onError && onError();
  }, [fallbackSrc, onError, isLoaded]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`p-image-renderer ${customClassName}`}
      onClick={onClick}
      onLoad={handleImageLoadSuccess}
      onError={handleImageLoadError}
      loading={shouldLoadLazy ? "lazy" : "eager"}
      style={style}
    />
  );
};

export default PImageRenderer;
