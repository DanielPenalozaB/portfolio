import { useState, useEffect } from 'react';

interface ScreenDimensions {
  width: number;
  height: number;
}

const useScreenDimensions = (): ScreenDimensions => {
  const [ dimensions, setDimensions ] = useState<ScreenDimensions>({
    width: 1024, // Default to desktop size for SSR
    height: 768
  });

  useEffect(() => {
    // Only run on client side
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial dimensions
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

export default useScreenDimensions;