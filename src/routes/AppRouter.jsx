import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/Misc/About";
import Contact from "../pages/Misc/Contact";
import NotFound from "../pages/Misc/NotFound";
import EmployerDashboard from "../pages/Dashboard/EmployerDashboard";
import JobSeekerDashboard from "../pages/Dashboard/JobSeekerDashboard";
import CreateJob from "../pages/Employer/CreateJob";
import EditJob from "../pages/Employer/EditJob";
import ViewJobs from "../pages/Employer/ViewJobs";
import ReviewApplications from "../pages/Employer/ReviewApplications";
import BrowseJobs from "../pages/JobSeeker/BrowseJobs";
import JobDetails from "../pages/JobSeeker/JobDetails";
import ApplicationStatus from "../pages/JobSeeker/ApplicationStatus";
import Notifications from "../pages/Notifications/Notifications";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Profile from "../pages/Auth/Profile";
import JobSeekerProfile from "../pages/Auth/JobSeekerProfile";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobseeker-dashboard/*" element={<JobSeekerDashboard />} />
        <Route path="/employer-dashboard/*" element={<EmployerDashboard />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/view-jobs" element={<ViewJobs />} />
        <Route path="/review-applications" element={<ReviewApplications />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/application-status" element={<ApplicationStatus />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job-seekerProfile" element={<JobSeekerProfile />} />
        <Route
          path="/register/employer"
          element={<SignUp userType="employer" />}
        />
        <Route
          path="/register/job-seeker"
          element={<SignUp userType="job-seeker" />}
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
