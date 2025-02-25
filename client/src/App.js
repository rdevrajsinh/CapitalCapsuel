// App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DocumentForm from './components/DocumentForm';
import Roadmap from './components/Roadmap';
import Cost from './components/Cost';
import Login from './components/Login';
import Signup from './components/Signup';
import Compliance from './components/Compliance';
import AIAnalysis from './components/AIAnalysis';
import Admin from './components/Admin';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Default to false for mobile
  const isDesktop = useMediaQuery('(min-width:600px)'); // Check if the screen is desktop size

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setDrawerOpen(isDesktop); // Set drawer open state based on screen size
  }, [isDesktop]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' ,}}>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <>
          <Sidebar onLogout={handleLogout} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 2, marginLeft: drawerOpen ? '0' : '0', transition: 'margin 0.3s' }} // Adjust margin based on drawer state
          >
            <Routes>
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/cost" element={<Cost />} />
              <Route path="/ai-analysis" element={<AIAnalysis />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/document-form" element={<DocumentForm />} />
              <Route path="/roadmap" element={<Roadmap />} />
            </Routes>
          </Box>
        </>
      )}
    </Box>
  );
};

export default App;