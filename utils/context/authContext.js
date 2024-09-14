import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';  // Correct import from Firebase Auth
import { auth } from '../../src/firebase/firebaseConfig';    // Use the initialized auth from firebaseConfig.js
import { checkUser } from '../auth'; // Assuming you have a custom checkUser function

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  const updateUser = useMemo(
    () => (uid) => checkUser(uid).then((gamerInfo) => {
      setUser({ fbUser: oAuthUser, ...gamerInfo });
    }),
    [oAuthUser],
  );

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        checkUser(fbUser.uid).then((gamerInfo) => {
          let userObj = {};
          if ('null' in gamerInfo) {
            userObj = gamerInfo;
          } else {
            userObj = { fbUser, uid: fbUser.uid, ...gamerInfo };
          }
          setUser(userObj);
        });
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    });
    
    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const value = useMemo(() => ({
    user,
    updateUser,
    userLoading: user === null || oAuthUser === null,
  }), [user, oAuthUser, updateUser]);

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
