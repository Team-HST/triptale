import { useState, useCallback } from 'react';

const useInput = (init = '') => {
  const [value, setValue] = useState(init);
  const handle = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handle, setValue];
};

export default useInput;
