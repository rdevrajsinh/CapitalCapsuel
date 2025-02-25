import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Compliance = ({ userId }) => {
  const [complianceList, setComplianceList] = useState([]);
  const [complianceType, setComplianceType] = useState('');
  const [dueDate, setDueDate] = useState('');

  const fetchCompliance = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/compliance/${userId}`);
    setComplianceList(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/api/compliance`, { userId, complianceType, dueDate });
    setComplianceType('');
    setDueDate('');
    fetchCompliance();
  };

  useEffect(() => {
    fetchCompliance();
  }, []);

  return (
    <div>
      <h2>Compliance</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Compliance Type" value={complianceType} onChange={(e) => setComplianceType(e.target.value)} required />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        <button type="submit">Add Compliance</button>
      </form>
      <ul>
        {complianceList.map(comp => (
          <li key={comp._id }>{comp.complianceType} - Due: {new Date(comp.dueDate).toLocaleDateString()} - Status: {comp.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Compliance;