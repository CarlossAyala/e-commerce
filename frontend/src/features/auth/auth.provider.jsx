import { useState, useEffect, createContext, useContext } from 'react';
import AccountAPI from './auth.api';

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

const ITEM_NAME_LS = 'jwt-ecommerce';

const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(
    () => localStorage.getItem(ITEM_NAME_LS) || null
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user && jwt) getProfile(jwt);
  }, []);

  const signin = (data) => {
    localStorage.setItem(ITEM_NAME_LS, data.jwt);

    setJwt(data.jwt);
    setUser(data.user);
  };

  const signout = () => {
    localStorage.removeItem(ITEM_NAME_LS);

    setJwt(null);
    setUser(null);
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
