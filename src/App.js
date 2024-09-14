import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from './components/Auth';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Auth isSignUp={false} />} />
                <Route path="/signup" element={<Auth isSignUp={true} />} />
            </Routes>
        </Router>
    );
}

export default App;

console.log("API Key:", process.env.NEXT_PUBLIC_API_KEY);
console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
