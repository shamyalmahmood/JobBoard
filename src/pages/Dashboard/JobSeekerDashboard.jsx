import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import ApplicationStatus from "../JobSeeker/ApplicationStatus";
import BrowseJobs from "../JobSeeker/BrowseJobs";
import Notifications from "../JobSeeker/Notifications";
import { useNavigate } from "react-router-dom";

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({ title: "", location: "", type: "" });
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  const fetchApplications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("job_seeker_id", user.id);
    if (error) {
      console.error("Error fetching applications:", error);
    } else {
      setApplications(data);
    }
  };

  const fetchJobPostings = async () => {
    const { data, error } = await supabase.from("jobs").select("*");
    if (error) {
      console.error("Error fetching job postings:", error);
    } else {
      setJobPostings(data);
      setFilteredJobs(data);
    }
  };

  const fetchNotifications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("job_seeker_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching notifications:", error);
    } else {
      setNotifications(data);
    }
  };

  const applyFilters = () => {
    const filtered = jobPostings.filter((job) => {
      return (
        (filters.title === "" ||
          job.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.location === "" ||
          job.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        (filters.type === "All Time" ||
          filters.type === "" ||
          job.type.trim().toLowerCase() === filters.type.trim().toLowerCase())
      );
    });

    setFilteredJobs(filtered);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchJobPostings();
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Job Seeker Dashboard
      </h2>
      <div className="flex justify-end mb-4">
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <button
          onClick={() => navigate("/job-seekerProfile")}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Update Profile
        </button>
        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 text-blue-500 rounded-md"
        >
          Logout
        </button>
      </div>
      <BrowseJobs
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        filteredJobs={filteredJobs}
      />
      <ApplicationStatus applications={applications} />
    </div>
  );
};

export default JobSeekerDashboard;
