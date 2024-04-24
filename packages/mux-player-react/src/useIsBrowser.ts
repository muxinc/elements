import { useState, useEffect } from 'react';

const useIsBrowser = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true);
    }
  }, []);

  return isBrowser;
};

export default useIsBrowser;
