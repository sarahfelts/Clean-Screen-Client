import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { checkUser } from '../auth';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const updateUser = useMemo(
    () => (uid) => checkUser(uid).then((userInfo) => {
      setUser(userInfo);
    }),
    [],
  );

  const value = useMemo(
    () => ({
      user,
      updateUser,
      userLoading: user === null,
    }),
    [user, updateUser],
  );

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
