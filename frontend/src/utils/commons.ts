import React, { useRef, useEffect } from 'react'

export const useEffectOnlyOnce = (callback) => {
  const calledOnce = useRef(false);

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }
    callback();
    calledOnce.current = true;
  }, [callback]);
};

export default useEffectOnlyOnce;