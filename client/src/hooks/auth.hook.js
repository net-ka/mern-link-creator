import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const signin = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }));
  }, []);

  const signout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName)
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      signin(data.token, data.userId);
    }
  }, [signin])

  return { signin, signout, token, userId }
}