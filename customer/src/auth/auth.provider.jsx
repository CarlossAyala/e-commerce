import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, removeToken, setToken } from '../api';
import { useGetProfile } from './auth.queries';

const AuthContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(() => getToken());
  const [user, setUser] = useState(null);

  const mutationProfile = useGetProfile();

  const getProfile = async () => {
    try {
      const data = await mutationProfile.mutateAsync();
      const token = getToken();

      // console.log('user', data);
      // console.log('token', token);

      signin({
        jwt: token,
        user: data,
      });
    } catch (error) {
      signout();
      console.log('Error getting profile', error);
    }
  };

  const signin = (values) => {
    setJwt(values.jwt);
    setUser(values.user);
    setToken(values.jwt);
  };

  const signout = () => {
    setJwt(null);
    setUser(null);
    removeToken();
  };

  useEffect(() => {
    if (jwt) getProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ jwt, user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
