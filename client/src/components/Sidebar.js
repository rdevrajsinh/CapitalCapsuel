import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Description, AttachMoney, Map, Menu, ExitToApp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)'); // Detect mobile screen
  const [drawerOpen, setDrawerOpen] = useState(!isMobile); // Default open for desktop
  const [animateLogo, setAnimateLogo] = useState(false);

  const toggleDrawer = () => {
    if (isMobile) setDrawerOpen(!drawerOpen); // Only toggle on mobile
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    setAnimateLogo(true);
    const timer = setTimeout(() => setAnimateLogo(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer}
          sx={{ position: 'absolute', top: 16, left: 16 }}
        >
          <Menu />
        </IconButton>
      )}
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
        variant={isMobile ? 'temporary' : 'permanent'} // Always open on desktop
        anchor="left"
        open={drawerOpen}
        onClose={isMobile ? toggleDrawer : undefined} // Only close on mobile
      >
      

      <Box
    sx={{
        display: 'flex',
        justifyContent: 'center', // Center the image horizontally
        mb: 1, // Add some margin below the image
        background: '#ffffff', // White background for the logo
        padding: 1.5,
        borderRadius: '8px', // Add border radius for rounded corners
        //boxShadow: 2, // Optional: add a shadow for depth
        mx: 2, // Add horizontal margin (left and right)
        mt: 2, // Add top margin
    }}
>
    <Box
        component="img"
        src="/Logo1Transparent.png"
        alt="Logo"
        sx={{
            width: { xs: '100%', sm: '70%' }, // 100% width on extra small screens, 50% on small and up
            height: 'auto', // Maintain aspect ratio
        }}
    />
</Box>

        <List sx={{ marginTop: 2 }}>
          {[
            { text: 'Documents', icon: <Description />, path: '/document-form' },
            { text: 'Cost', icon: <AttachMoney />, path: '/cost' },
            { text: 'Roadmap', icon: <Map />, path: '/roadmap' },
          ].map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer}>
              <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
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
