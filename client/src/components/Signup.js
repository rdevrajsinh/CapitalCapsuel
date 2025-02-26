import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [errorMessage, setErrorMessage] = useState(''); // For showing error message
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that password and confirm password match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, { email, password });
            alert('Signup successful');
            setErrorMessage(''); // Clear error message on success
            navigate('/'); // Redirect to the login page or another page after signup
        } catch (error) {
            if (error.response) {
                // Handle specific error messages from the server
                if (error.response.status === 400) {
                    setErrorMessage('Invalid input. Please check your data.'); // Bad request
                } else if (error.response.status === 409) {
                    setErrorMessage('Email already exists. Please use a different email.'); // Conflict
                } else if (error.response.data.message) {
                    setErrorMessage(error.response.data.message); // General error message
                } else {
                    setErrorMessage('Signup failed. Please try again.'); // Fallback error message
                }
            } else {
                setErrorMessage('Network error. Please check your connection.'); // Network error
            }
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
                width: '100vw',
            }}
        >
            <Box
                sx={{
                    bgcolor: '#ffffff', // White background for the signup box
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 4,
                    width: '100%',
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                    <img src="/Logo.png" alt="Logo" width={60} height={60} />
                    <Typography variant="h5" component="h1" color="#16425b" sx={{ ml: 1 }}>
                        IPO Elivate
                    </Typography>
                </Box>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="#1976d2">
                    Signup
                </Typography>
                <form onSubmit={handleSubmit}>
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
                    <TextField
                        label="Confirm Password" // New Confirm Password field
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        sx={{ bgcolor: 'white' }} // White background for input fields
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>
                        Signup
                    </Button>
                </form>
                
                {errorMessage && (
                    <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                        {errorMessage}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Signup;