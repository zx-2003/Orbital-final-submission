import React, {useEffect, useState} from "react"
import { accountsApi } from "../api/social"
import NavigationBar from "./NavBar";
import "../styles/Profile.css"
import DefaultProfilePicture from "../assets/Default_Profile_Picture.png"

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await accountsApi.getProfile();
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Make sure you're logged in.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <NavigationBar />
        <div className="container">
          <img className="profile-picture"
            src={profile.profile_picture || DefaultProfilePicture}>  
          </img>

          <div className="profile-info">
            <h2 className="profile-title">My profile</h2>
            <p><strong>Username:</strong> {profile.user.username}</p>
            <p><strong>Email:</strong> {profile.user.email}</p>
            <p><strong>Dietary Preferences:</strong> {profile.dietary_requirements.join(", ")}</p>
            <p><strong>Cuisine Preferences:</strong> {profile.dietary_preferences.join(", ")}</p>
            <p><strong>Followers:</strong> {profile.followers_count}</p>
            <p><strong>Following:</strong> {profile.following_count}</p>
          </div>
        </div>
    </div>
  );
};

export default ProfilePage;