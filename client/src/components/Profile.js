import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
  const [email, setEmail] = useState('');

  const fetchProfile = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`);
    setEmail(response.data.email);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, { email });
    alert('Profile updated');
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <form onSubmit={handleUpdate}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;