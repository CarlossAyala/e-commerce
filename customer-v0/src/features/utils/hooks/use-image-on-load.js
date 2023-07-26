import { useState } from 'react';
import clsx from 'clsx';

// The parent image needs relative class
const useImageOnLoad = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Triggered when full image will be loaded.
  const handleImageOnLoad = () => {
    setIsLoaded(true);
  };

  const css = {
    // Thumbnail style.
    thumbnail: clsx(
      'absolute blur transition-all duration-300 ease-out',
      isLoaded ? 'invisible' : 'visible'
    ),
    // thumbnail: {
    //   position: 'absolute',
    //   visibility: isLoaded ? 'hidden' : 'visible',
    //   filter: 'blur(8px)',
    //   transition: 'visibility 0ms ease-out 500ms',
    // },
    // Full image style.
    fullSize: clsx(
      isLoaded ? 'opacity-100' : 'opacity-0',
      'transition-opacity duration-300 ease-in'
    ),
    // fullSize: {
    //   opacity: isLoaded ? 1 : 0,
    //   transition: 'opacity 500ms ease-in 0ms',
    // },
  };

  return [handleImageOnLoad, css];
};

export default useImageOnLoad;
