import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import ProgressTracker from './ProgressTracker';
import Tooltip from './Tooltip';
import UserFeedback from './UserFeedback';
import SearchBar from './SearchBar';

const IpoRoadmap = () => {
    const [activeSection, setActiveSection] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const steps = [
        { id: 'assess-readiness', label: 'Assess Readiness', tooltip: 'Evaluate financial health and operational capabilities.' },
        { id: 'strengthen-governance', label: 'Strengthen Governance', tooltip: 'Establish a competent board of directors.' },
        { id: 'prepare-financials', label: 'Prepare Financials', tooltip: 'Update financial records to meet public standards.' },
        { id: 'engage-advisors', label: 'Engage Advisors', tooltip: 'Assemble a team of investment bankers and legal counsel.' },
        { id: 'develop-plan', label: 'Develop Plan', tooltip: 'Create a multi-year business plan.' },
        { id: 'file-registration', label: 'File Registration', tooltip: 'Submit registration documents to regulators.' },
        { id: 'investor-roadshow', label: 'Investor Roadshow', tooltip: 'Present the investment opportunity to potential investors.' },
        { id: 'launch-ipo', label: 'Launch IPO', tooltip: 'Set the final offer price and allocate shares.' },
        { id: 'post-ipo', label: 'Post-IPO Compliance', tooltip: 'Adhere to ongoing reporting requirements.' }
    ];
    const currentStep = steps.findIndex(step => step.id === activeSection);

    const handleScroll = (id) => {
        setActiveSection(id);
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    const filteredSteps = steps.filter(step => step.label.toLowerCase().includes(searchQuery));

    return (
        <Container maxWidth="lg" sx={{ padding: '2rem' }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                SME IPO Roadmap
            </Typography>
            <SearchBar onSearch={handleSearch} />
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: '1rem' }}>
                        <Typography variant="h6" gutterBottom>
                            Steps
                        </Typography>
                        <List>
                            {filteredSteps.map((step, index) => (
                                <ListItem key={index} button onClick={() => handleScroll(step.id)} selected={activeSection === step.id}>
                                    <Tooltip text={step.tooltip}>
                                        <ListItemText primary={step.label} />
                                    </Tooltip>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <ProgressTracker currentStep={currentStep} />
                    <main>
                        {steps.map((step, index) => (
                            <section id={step.id} key={index} style={{ marginBottom: '2rem' }}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {index + 1}. {step.label}
                                </Typography>
                                <ul>
                                    <li>{step.tooltip}</li>
                                    {/* Add more details as needed */}
                                </ul>
                            </section>
                        ))}
                    </main>
                </Grid>
            </Grid>
            <UserFeedback />
        </Container>
    );
};

export default IpoRoadmap;