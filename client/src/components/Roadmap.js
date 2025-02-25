import React, { useEffect, useState, useRef } from "react";
import { Container, Typography, Box, Card, CardContent, CardHeader, Popover, IconButton } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import axios from "axios";
import { red } from "@mui/material/colors";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router-dom";

// Grouping of documents under each process title
const PROCESS_STEPS = [
  { title: "Assessing Suitability for an SME IPO", documents: ["Eligibility Documents", "Financial Statements"] },
  { title: "Appointment of a Merchant Banker", documents: ["Merchant Banker Agreement", "Underwriting Agreement"] },
  { title: "SME IPO Application", documents: ["IPO Application Form"] },
  { title: "Drafting of the Prospectus", documents: ["Draft Red Herring Prospectus (DRHP)", "Business & Risk Factors Report"] },
  { title: "Red Herring Prospectus", documents: ["Final Red Herring Prospectus (RHP)", "Updated Financial Statements"] },
  { title: "Roadshow", documents: ["Investor Presentation Deck", "Marketing Materials"] },
  { title: "SME IPO Launch", documents: ["Final IPO Prospectus", "Public Notice for IPO Opening"] },
  { title: "SME IPO Allocation", documents: ["Allotment Basis Document", "Registrar’s Final Allotment Report"] },
  { title: "SME IPO Listing", documents: ["Stock Exchange Listing Circular", "ISIN Allocation Document"] },
  { title: "Post-Listing Compliance", documents: ["Annual Reports & Shareholding Patterns", "Quarterly Corporate Governance Reports"] },
];

function Roadmap() {
  const [documents, setDocuments] = useState([]);
  const [userId, setUserId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Create refs for each timeline item
  const refs = useRef([]);

  // Fetch userId from localStorage when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch documents only when userId is available
  useEffect(() => {
    if (!userId) return; // Prevent API call if userId is empty

    const url = `${process.env.REACT_APP_API_URL}/api/documents/${userId}`;
    console.log("Fetching documents from:", url); // Debugging log

    axios
      .get(url)
      .then((res) => setDocuments(res.data.documents))
      .catch((err) => console.error("API Error:", err.response ? err.response.data : err));
  }, [userId]); // Runs when userId updates

  // Convert documents array into an object for easy lookup
  const documentStatusMap = {};
  documents.forEach((doc) => {
    documentStatusMap[doc.name] = doc.status;
  });

  // Calculate pending tasks
  const pendingTasks = PROCESS_STEPS.filter(step => 
    step.documents.some(docName => documentStatusMap[docName] === "Pending")
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleRedirect = (index) => {
    handleClose();
    // Scroll to the corresponding timeline item
    refs.current[index].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 1 }}>
        SME IPO Roadmap
      </Typography>
      <Typography variant="body2" align="center" sx={{ marginBottom: 3 }}>
        For more information, visit the 
        <a href="https://www.nseindia.com/companies-listing/raising-capital-public-issues-emerge-eligibility-criteria" target="_blank" rel="noopener" style={{ marginLeft: '4px', textDecoration: 'underline', color: '#1976d2' }}>
          NSE Eligibility Criteria
        </a>.
      </Typography>
      <Timeline position="alternate">
        {PROCESS_STEPS.map((step, index) => {
          // Get documents under this process step
          const stepDocs = step.documents.map((docName) => ({
            name: docName,
            status: documentStatusMap[docName] || "Pending",
          }));

          return (
            <TimelineItem key={index} ref={el => refs.current[index] = el}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index < PROCESS_STEPS.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Card variant="outlined" sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3,  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)', // Set background color with transparency
              
                }, // Set background color with transparency
 }}>
                  <CardHeader title={step.title} titleTypographyProps={{ variant: "h6", fontWeight: "bold" }} />
                  <CardContent>
                    {stepDocs.map((doc, docIndex) => (
                      <Box key={docIndex} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                        <TimelineDot color={doc.status === "Submitted" ? "success" : "error"} />
                        <Typography variant="body2" sx={{ marginLeft: 1 }}>
                          {doc.name} - <strong>{doc.status}</strong>
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          );
        })}
        {/* Red Circle for Pending Tasks */}
        <Box sx={{ position: 'absolute', right: 20, top: 20 }}>
          <IconButton onClick={handleClick} sx={{ backgroundColor: red[500], color: 'white', borderRadius: '50%', padding: 1 }}>
          <NotificationsIcon sx={{ fontSize: '26px' }} />            {pendingTasks.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  backgroundColor: 'white',
                  color: red[500],
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 2,
                  fontSize: 12,
                }}
              >
                {pendingTasks.length}
              </Box>
            )}
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box sx={{ padding: 2 }}>
  <Typography variant="h6">Pending Tasks</Typography>
  {pendingTasks.map((step, index) => (
    <Typography
      key={step.title}
      onClick={() => handleRedirect(PROCESS_STEPS.indexOf(step))}
      sx={{
        cursor: 'pointer',
        margin: '4px 0',
        padding: '4px', // Add some padding for better click area
        borderRadius: '4px', // Optional: add border radius for a smoother look
        '&:hover': {
          textDecoration: 'underline',
          backgroundColor: 'rgba(195, 147, 147, 0.57)', // Light background on hover
          color:"white",
        },
      }}
    >
      {step.title}
    </Typography>
  ))}
</Box>
          </Popover>
        </Box>
      </Timeline>
    </Container>
  );
}

export default Roadmap;