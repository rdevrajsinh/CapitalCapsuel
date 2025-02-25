import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Paper, Tabs, Tab } from '@mui/material';

const Admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('signup'); // State to manage active tab

    const handleSignup = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/signup`, { email, password });
        alert('Admin created');
        // Reset fields after signup
        setEmail('');
        setPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, { email, password });
        alert('Admin logged in');
        // Reset fields after login
        setEmail('');
        setPassword('');
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Admin Panel
                </Typography>
                <Tabs
                    value={activeTab}
                    onChange={(event, newValue) => setActiveTab(newValue)}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ marginBottom: '1rem' }}
                >
                    <Tab label="Sign Up" value="signup" />
                    <Tab label="Login" value="login" />
                </Tabs>
                {activeTab === 'signup' && (
                    <form onSubmit={handleSignup}>
                        <TextField
                            fullWidth
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ marginBottom: '1rem' }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Create Admin
                        </Button>
                    </form>
                )}
                {activeTab === 'login' && (
                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ marginBottom: '1rem' }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login Admin
                        </Button>
                    </form>
                )}
            </Paper>
        </Container>
    );
};

export default Admin;