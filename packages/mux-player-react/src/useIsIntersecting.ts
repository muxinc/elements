import { useState, useEffect } from 'react';

const useIsIntersecting = (ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [ref, options]);

  return isIntersecting;
};

export default useIsIntersecting;
