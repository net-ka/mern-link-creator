import { createContext } from 'react';

function noop () {};

export const AuthContext = createContext({
  token: null,
  userId: null,
  signin: noop,
  signup: noop,
  isAuth: false,
})