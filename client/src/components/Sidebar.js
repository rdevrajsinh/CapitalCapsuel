// components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import { Description, AttachMoney, Map, Menu, ExitToApp } from '@mui/icons-material'; // Import ExitToApp icon
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ onLogout, drawerOpen, toggleDrawer }) => {
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [animateLogo, setAnimateLogo] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear tokens, user data)
    onLogout(); // Call the onLogout function passed as a prop
    navigate('/'); // Redirect to the login page
  };

  useEffect(() => {
    // Trigger animation when the component mounts
    setAnimateLogo(true);
    const timer = setTimeout(() => {
      setAnimateLogo(false);
    }, 500); // Animation duration

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        edge="start"
        color="inherit"
        onClick={toggleDrawer}
        sx={{ display: { sm: 'none' }, position: 'absolute', top: 16, left: 16 }} // Show only on mobile
      >
        <Menu />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#16425b', // Primary color
            color: '#ffffff', // Text color
          },
        }}
        variant="persistent" // Use persistent variant for desktop
        anchor="left"
        open={drawerOpen} // Control drawer open state
      >
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          <img
            src="/Logo.png"
            alt="Logo"
            style={{
              width: '40px',
              height: '40px',
              marginRight: '8px',
              transition: 'transform 0.5s',
              transform: animateLogo ? 'translateY(-20px)' : 'translateY(0)', // Jump effect
            }}
          />
          <Typography variant="h6" color="#ffffff">
            Capital Capsule
          </Typography>
        </Box>
        <List sx={{ marginTop: 2 }}>
          {[
            { text: 'Documents', icon: <Description />, path: '/document-form' },
            { text: 'Cost', icon: <AttachMoney />, path: '/cost' },
            { text: 'Roadmap', icon: <Map />, path: '/roadmap' },
          ].map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon sx={{ color: '#ffffff' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: '#ffffff' }} />
            </ListItem>
          ))}
        </List>
        {/* Logout Option */}
        <List sx={{ marginTop: 'auto' }}> {/* Push logout to the bottom */}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon sx={{ color: '#ffffff' }}>
              <ExitToApp /> {/* Logout icon */}
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#ffffff' }} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;