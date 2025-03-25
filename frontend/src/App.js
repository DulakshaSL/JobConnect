import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobSeekerSignup from './components/JobSeekerSignup';
import JobSeekerLogin from './components/jobSeekerLogin';
import JobSeekerHome from './components/Home';
import JobLisitingPage from './components/JobList';
import RouteWrapper from './components/RouteWrapper';
import JobDetailsPage from './components/JobDetails';
import CommunityHomapage from './components/CommunityHomepage';
import ApplyJob from './components/ApplyJob'; // Assuming you have a component for the application page
import ApplicationTracker from './components/ApplicationTracker'; // Assuming you have a component for the application page
import Profile from "./components/Profile";
import ResumeUpload from "./components/predict";
import EmployerSignup from "./components/employerSignup";
import EmployerLogin from "./components/EmployerLogin";
import EmployerDashboardPage from "./components/employerDashboardPage";
import Received from "./components/Received";
import Create from "./components/CreateJobForm";


function App() {
  return (
   
    <Router>
       <RouteWrapper>
      <Routes>
        <Route path="/signup" element={<JobSeekerSignup />} />
        <Route path="/login" element={<JobSeekerLogin />} />
        <Route path="/empsignup" element={<EmployerSignup />} />
        <Route path="/empdashboard" element={<EmployerDashboardPage />} />
        <Route path="/emplogin" element={<EmployerLogin />} />
        <Route path="/home" element={<JobSeekerHome />} />
        <Route path="/list" element={<JobLisitingPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/community" element={<CommunityHomapage />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />
        <Route path="/track" element={<ApplicationTracker />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<ResumeUpload />} />
        <Route path="/receive" element={<Received />} />
        <Route path="/employer/jobs/create" element={<Create />} />
        {/* Dynamic route for filtering jobs */}
        <Route path="/list/:jobType" element={<JobLisitingPage />} />
        {/* Route for all jobs */}
        <Route path="/list" element={<JobLisitingPage />} />

      </Routes>
      </RouteWrapper>
    </Router>
    
  );
}

export default App;

