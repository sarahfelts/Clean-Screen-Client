import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from './firebase/firebaseConfig';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Auth isSignUp={false} />} />
        <Route path="/signup" element={<Auth isSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
