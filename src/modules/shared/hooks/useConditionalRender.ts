// useConditionalRender.ts
import { useEffect, useState } from 'react';

export const useConditionalRender = (open: boolean, delay = 0) => {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
    } else {
      if (delay > 0) {
        const timeout = setTimeout(() => setMounted(false), delay);
        return () => clearTimeout(timeout);
      } else {
        setMounted(false);
      }
    }
  }, [open, delay]);

  return mounted;
};
