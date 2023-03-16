import { useState, useEffect, createContext, useContext } from 'react';
import AccountAPI from './auth.api';

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

const ITEM_NAME_LS = 'jwt-ecommerce';

const jwtInitialState = () => localStorage.getItem(ITEM_NAME_LS) || undefined;

const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(jwtInitialState);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!user) getProfile(jwt);
  }, []);

  const signin = (data) => {
    localStorage.setItem(ITEM_NAME_LS, data.jwt);

    setJwt(data.jwt);
    setUser(data.user);
  };

  const signout = () => {
    localStorage.removeItem(ITEM_NAME_LS);

    setJwt(undefined);
    setUser(undefined);
  };

  const getProfile = async (token) => {
    try {
      if (!token) return;
      const data = await AccountAPI.profile(token);
      // console.log('Auth Provider getProfile', data);

      setJwt(token);
      setUser(data);
    } catch (error) {
      console.error('getProfile', error);
      signout();
    }
  };

  const value = [jwt, user, { signin, signout, getProfile }];

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
