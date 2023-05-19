import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/auth.provider';
import { useEffect } from 'react';

const Logout = () => {
  const { signout } = useAuth();

  useEffect(() => {
    signout();
  }, []);

  return <Navigate to='/' />;
};

export default Logout;
