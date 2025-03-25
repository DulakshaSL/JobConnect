import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import ApplicationTracker from './ApplicationTracker';
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/Profile.css";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [preview, setPreview] = useState("");
  const [activeTab, setActiveTab] = useState("personalInfo"); // State for active tab
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile", {
          withCredentials: true,
        });
        setProfile(response.data);

        // Set the initial preview image if available
        if (response.data.profile_picture) {
          setPreview(response.data.profile_picture);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show a preview of the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/profile/upload",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Profile picture updated successfully!");
        setPreview(`http://localhost:5000/uploads/${response.data.filePath}`);
      } else {
        alert("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("An error occurred while uploading.");
    }
  };

  // Trigger file input when clicking the "Update Profile Picture" button
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Skills & Experience Pie Chart Data (Job Roles and Experience)
  const jobRoles = profile.job_roles || [];
  const rolesLabels = jobRoles.map((role) => role.role_name);
  const rolesExperience = jobRoles.map((role) => role.years_of_experience);

  const skillsData = {
    labels: rolesLabels.length > 0 ? rolesLabels : ["No Roles Specified"],
    datasets: [
      {
        label: "Job Roles Experience",
        data: rolesExperience.length > 0 ? rolesExperience : [1], // Set each role's experience
        backgroundColor: rolesLabels.map((_, index) => `hsl(${(index * 360) / rolesLabels.length}, 70%, 60%)`),
      },
    ],
  };

  // CV URL
  const cvUrl = profile.cv_filename ? `http://localhost:5000/${profile.cv_filename}` : null;

  return (
    <div className="profile-main">
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          {preview ? (
            <img src={preview} alt="Profile" className="profile-picture" />
          ) : (
            <div className="profile-placeholder">No Image</div>
          )}
        </div>
        <div className="profile-info">
          <h2>{profile.first_name} {profile.sur_name}</h2>
          <p>{profile.district}</p>
          <button onClick={handleUploadClick}>Update Profile Picture</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs">

      <div
          className={`tab ${activeTab === "state" ? "active" : ""}`}
          onClick={() => setActiveTab("stateInfo")}
        >
          Status of Application
        </div>


        <div
          className={`tab ${activeTab === "personalInfo" ? "active" : ""}`}
          onClick={() => setActiveTab("personalInfo")}
        >
          My Informations
        </div>
        <div
          className={`tab ${activeTab === "jobRoles" ? "active" : ""}`}
          onClick={() => setActiveTab("jobRoles")}
        >
          Experience
        </div>
        <div
          className={`tab ${activeTab === "cv" ? "active" : ""}`}
          onClick={() => setActiveTab("cv")}
        >
          CV
        </div>
      </div>
{/* Tab Content */}
{activeTab === "personalInfo" && (
  <div className="tab-content">
    <h3 className="tab-heading">Personal Information</h3>
    <form className="personal-info-form">
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" value={profile.first_name} readOnly />
      </div>
      <div className="form-group">
        <label>Surname:</label>
        <input type="text" value={profile.sur_name} readOnly />
      </div>
      <div className="form-group">
        <label>District:</label>
        <input type="text" value={profile.district} readOnly />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={profile.email} readOnly />
      </div>
      <div className="form-group">
        <label>DOB:</label>
        <input type="text" value={profile.date_of_birth} readOnly />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <input type="text" value={profile.gender_type} readOnly />
      </div>
      <div className="form-group">
        <label>NIC:</label>
        <input type="text" value={profile.id_no} readOnly />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input type="text" value={profile.phone} readOnly />
      </div>
    </form>
  </div>
)}

{activeTab === "stateInfo" && (
  <div className="state">
     <ApplicationTracker /> 
  </div>
)}

{activeTab === "jobRoles" && (
  <div className="tab-content chart-container">
    <h3 className="chart-title">Job Roles Experience</h3>
    <div className="pie-chart">
      <Pie data={skillsData} />
    </div>
  </div>
)}

      {activeTab === "cv" && cvUrl && (
        <div className="tab-content">
          <h3>CV</h3>
          <a href={cvUrl} target="_blank" rel="noopener noreferrer">Download CV</a>
        </div>
      )}
    </div>
    </div>
  );
};

export default Profile;
