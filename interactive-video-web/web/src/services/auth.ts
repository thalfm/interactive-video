import { useCallback, useState } from 'react';

export const TOKEN_KEY = "@inshop-Token";

export default function useStorage() {
  const [state, setState] = useState(() => localStorage.getItem(TOKEN_KEY));

  const set = useCallback(newValue => {
    localStorage.setItem(TOKEN_KEY, newValue)
    setState(newValue);
  }, [TOKEN_KEY]);


  return {token: state, setToken: set};
}