import React, { useEffect, useState } from 'react';
import ProfileEditor from '../components/ProfileEditor';
import { getUserProfile } from '../services/api';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setUser(profileData);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user profile found.</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <ProfileEditor user={user} />
    </div>
  );
};

export default ProfilePage;