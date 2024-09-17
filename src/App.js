import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { signIn, signOut, checkUser } from '../utils/auth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './components/SignIn';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await checkUser();
        setUser(userData);
      } catch (error) {
        console.log('User is not authenticated');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      const userData = await signIn(email, password);
      setUser(userData);
    } catch (error) {
      console.error('Sign in failed', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {user ? (
          <Routes>
            <Route path="/" element={<Home user={user} onSignOut={handleSignOut} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        ) : (
          <SignIn onSignIn={handleSignIn} />
        )}
      </div>
    </Router>
  );
}

export default App;
