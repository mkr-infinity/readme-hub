import React, { useState, useEffect } from 'react';

interface RobustImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  srcs?: string[];
  sources?: string[];
  fallback?: React.ReactNode;
}

export function RobustImage({ srcs, sources, alt, fallback, ...props }: RobustImageProps) {
  const list = sources && sources.length ? sources : srcs || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setError(false);
  }, [list.join('|')]);

  const handleError = () => {
    if (currentIndex < list.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setError(true);
    }
  };

  if (error || list.length === 0) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="w-full h-full min-h-[40px] bg-muted flex items-center justify-center border-2 border-foreground/30 border-dashed">
        <span className="text-muted-foreground text-[10px] font-mono uppercase">{alt || 'no image'}</span>
      </div>
    );
  }

  return <img src={list[currentIndex]} alt={alt} onError={handleError} {...props} />;
}
