import React, { useState, useEffect } from 'react';
import { getCustomerProfile, updateCustomerProfile } from '../api';

function CustomerDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getCustomerProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomerProfile(profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="nickname" className="form-control" value={profile.nickname} onChange={handleChange} placeholder="Nickname" />
        </div>
        <div className="form-group">
          <input type="date" name="date_of_birth" className="form-control" value={profile.date_of_birth} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="text" name="city" className="form-control" value={profile.city} onChange={handleChange} placeholder="City" />
        </div>
        <div className="form-group">
          <input type="text" name="state" className="form-control" value={profile.state} onChange={handleChange} placeholder="State" />
        </div>
        <div className="form-group">
          <input type="text" name="country" className="form-control" value={profile.country} onChange={handleChange} placeholder="Country" />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
}

export default CustomerDashboard;