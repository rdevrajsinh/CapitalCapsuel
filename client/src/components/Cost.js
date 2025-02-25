import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import { Calculate } from '@mui/icons-material';

const SMECostCalculator = () => {
  const [issueSize, setIssueSize] = useState('');
  const [costBreakdown, setCostBreakdown] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const calculateCostRange = () => {
    const size = parseFloat(issueSize);
    if (isNaN(size) || size <= 0) {
      setCostBreakdown('Please enter a valid issue size.');
      setTotalCost('');
      return;
    }

    // Define cost components as percentages of the issue size
    const legalFees = (size * 0.05).toFixed(2); // 5% for legal fees
    const underwritingFees = (size * 0.07).toFixed(2); // 7% for underwriting
    const marketingCosts = (size * 0.03).toFixed(2); // 3% for marketing
    const otherCosts = (size * 0.02).toFixed(2); // 2% for other costs

    // Calculate total cost
    const total = (parseFloat(legalFees) + parseFloat(underwritingFees) + parseFloat(marketingCosts) + parseFloat(otherCosts)).toFixed(2);

    // Set the cost breakdown and total cost
    setCostBreakdown(`
      Legal Fees: ₹${legalFees}
      Underwriting Fees: ₹${underwritingFees}
      Marketing Costs: ₹${marketingCosts}
      Other Costs: ₹${otherCosts}
    `);
    setTotalCost(`Total Estimated Cost: ₹${total}`);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', padding: '20px',backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" align="center" gutterBottom>
        SME IPO Cost Calculator
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <Calculate fontSize="large" />
      </Box>
      <TextField
        label="Total Issue Size (in ₹)"
        variant="outlined"
        fullWidth
        value={issueSize}
        onChange={(e) => setIssueSize(e.target.value)}
        type="number"
        margin="normal"
      />
      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={calculateCostRange}
          size="small"
          sx={{ padding: '8px 16px' }}
        >
          Calculate Cost Range
        </Button>
      </Box>
      {costBreakdown && (
        <Card variant="outlined" sx={{ marginTop: 2, borderRadius: 2, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h6" align="center" style={{ marginBottom: '10px',backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              Cost Breakdown
            </Typography>
            <Divider/>
            <Typography variant="body2" align="center" >
              {costBreakdown.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </Typography>
          </CardContent>
        </Card>
      )}
      {totalCost && (
        <Typography variant="h6" align="center" style={{ marginTop: '20px', fontWeight: 'bold', color: '#588157' }}>
          {totalCost}
        </Typography>
      )}
    </Container>
  );
};

export default SMECostCalculator; 