import React, { useEffect, useState } from "react";
import { Container, Typography, FormControlLabel, Switch, Button, Card, CardContent, Box, Tooltip, CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { CheckCircle, Cancel } from '@mui/icons-material';

const DOCUMENTS_LIST = [
  "Eligibility Documents",
  "Financial Statements",
  "Merchant Banker Agreement",
  "Underwriting Agreement",
  "IPO Application Form",
  "Draft Red Herring Prospectus (DRHP)",
  "Business & Risk Factors Report",
  "Final Red Herring Prospectus (RHP)",
  "Updated Financial Statements",
  "Investor Presentation Deck",
  "Marketing Materials",
  "Final IPO Prospectus",
  "Public Notice for IPO Opening",
  "Allotment Basis Document",
  "Registrar’s Final Allotment Report",
  "Stock Exchange Listing Circular",
  "ISIN Allocation Document",
  "Annual Reports & Shareholding Patterns",
  "Quarterly Corporate Governance Reports",
];

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
}));

const StatusText = styled(Typography)(({ status }) => ({
  marginLeft: '16px',
  color: status === "Pending" ? "#f44336" : "#4caf50",
  fontWeight: 'bold',
}));

function DocumentForm() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!userId) return;

      setLoading(true); // Set loading to true before fetching
      const url = `${process.env.REACT_APP_API_URL}/api/documents/${userId}`;
      try {
        const res = await axios.get(url);
        if (res.data.documents.length === 0) {
          setDocuments(DOCUMENTS_LIST.map((doc) => ({ name: doc, status: "Pending" })));
        } else {
          setDocuments(res.data.documents);
        }
      } catch (err) {
        console.error("API Error:", err.response ? err.response.data : err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDocuments();
  }, [userId]); // Fetch documents when userId changes

  const handleToggle = (index) => {
    const newDocuments = [...documents];
    newDocuments[index].status = newDocuments[index].status === "Pending" ? "Submitted" : "Pending";
    setDocuments(newDocuments);
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error("Cannot submit, user ID is missing");
      return;
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/documents/${userId}`, { documents });
      navigate("/roadmap");
    } catch (err) {
      console.error("Update Error:", err.response ? err.response.data : err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 0 }}>
        SME IPO Document Status:
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ marginBottom: 1 }}>
        (You can change it later)
      </Typography>
      <Typography variant="body2" align="center" sx={{ marginBottom: 2 }}>
        For more information, visit the 
        <a href="https://www.nseindia.com/companies-listing/raising-capital-public-issues-emerge-eligibility-criteria" target="_blank" rel="noopener" style={{ marginLeft: '4px', textDecoration: 'underline', color: '#1976d2' }}>
          NSE Eligibility Criteria
        </a>.
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {documents.map((doc, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Tooltip title={doc.status === "Pending" ? "Document not submitted" : "Document submitted"}>
                    <FormControlLabel
                      control={<Switch checked={doc.status === "Submitted"} onChange={() => handleToggle(index)} />}
                      label={doc.name}
                    />
                  </Tooltip>
                  <StatusText variant="body1" status={doc.status}>
                    {doc.status === "Pending" ? <Cancel /> : <CheckCircle />} 
                  </StatusText>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!userId} sx={{ borderRadius: '20px', padding: '10px 20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s', '&:hover': { backgroundColor: '#1976d2' } }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default DocumentForm;