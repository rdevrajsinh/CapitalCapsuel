import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const AIAnalysis = () => {
    const [financialData, setFinancialData] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ai/analyze`, { financialData });
            setAnalysisResult(response.data);
        } catch (error) {
            console.error("Error during analysis:", error);
            alert("An error occurred while analyzing the data.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    AI Financial Analysis
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        placeholder="Enter financial data"
                        value={financialData}
                        onChange={(e) => setFinancialData(e.target.value)}
                        required
                        sx={{ marginBottom: '1rem' }}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button type="submit" variant="contained" color="primary">
                            Analyze
                        </Button>
                    </Box>
                </form>
                {analysisResult && (
                    <Box sx={{ marginTop: '2rem' }}>
                        <Typography variant="h5">Analysis Result</Typography>
                        <Typography variant="body1"><strong>Recommendation:</strong> {analysisResult.recommendation}</Typography>
                        <Typography variant="body1"><strong>Insights:</strong> {analysisResult.insights}</Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default AIAnalysis;