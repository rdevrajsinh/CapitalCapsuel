import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
            console.log("Response Data:", response.data);
            const decodedToken = jwtDecode(response.data.token);
            console.log("Decoded Token:", decodedToken);
            alert('Login successful');
            localStorage.setItem("userId", decodedToken.id);
            navigate('/document-form'); // Redirect to Info page
            window.location.reload();
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    bgcolor: '#ffffff', // White background for the login box
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 4,
                    width: '100%',
                }}
            >
                {/* Logo and Title */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                    <img src="/Logo.png" alt="Logo" width={60} height={60} />
                    <Typography variant="h5" component="h1" color="#16425b" sx={{ ml: 1 }}>
                        Capital Capsule
                    </Typography>
                </Box>

                {/* Login Heading */}
                <Typography variant="h4" component="h1" gutterBottom align="center" color="#1976d2">
                    Login
                </Typography>

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{ bgcolor: 'white' }} // White background for input fields
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ bgcolor: 'white' }} // White background for input fields
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' }, mt: 2 }}>
                        Login
                    </Button>
                </form>

                {/* Sign Up Text with only "Sign Up" clickable */}
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account?{' '}
                    <Typography
                        component="span"
                        sx={{ cursor: 'pointer', color: '#1976d2', '&:hover': { textDecoration: 'underline' } }}
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </Typography>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
