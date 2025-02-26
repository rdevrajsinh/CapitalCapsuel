import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import { Description, AttachMoney, Map, Menu, ExitToApp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false); // Local state for drawer open/close
  const [animateLogo, setAnimateLogo] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen); // Toggle drawer state
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    setAnimateLogo(true);
    const timer = setTimeout(() => {
      setAnimateLogo(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        edge="start"
        color="inherit"
        onClick={toggleDrawer}
        sx={{ display: { sm: 'none' }, position: 'absolute', top: 16, left: 16 }}
      >
        <Menu />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#16425b',
            color: '#ffffff',
          },
        }}
        variant="temporary" // Use temporary variant for mobile
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer} // Close drawer when clicking outside
      >
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          <img
            src="/Logo.png"
            alt="Logo"
            style={{
              width: '40px',
              height: '40px',
              marginRight: '8px',
              transition: 'transform 0.5s',
              transform: animateLogo ? 'translateY(-20px)' : 'translateY(0)',
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
            <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer}>
              <ListItemIcon sx={{ color: '#ffffff' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: '#ffffff' }} />
            </ListItem>
          ))}
        </List>
        <List sx={{ marginTop: 'auto' }}>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon sx={{ color: '#ffffff' }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#ffffff' }} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;