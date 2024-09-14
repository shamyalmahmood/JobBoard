import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const fetchApplications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
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

  const fetchJobDetails = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching job details:", error);
    } else {
      setJobDetails(data);
    }
  };

  const applyForJob = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error: appError } = await supabase.from("applications").insert({
      job_id: id,
      job_seeker_id: user.id,
      status: "pending",
    });

    if (appError) {
      console.error("Error applying for job:", appError);
    } else {
      const { data: job, error: jobError } = await supabase
        .from("jobs")
        .select("id, title, employer_id")
        .eq("id", id)
        .single();

      if (jobError) {
        console.error("Error fetching job details:", jobError.message);
      } else {
        const notificationMessage = `A new application has been submitted for your job "${job.title}"`;

        const { error: notificationError } = await supabase
          .from("notifications")
          .insert({
            employer_id: job.employer_id,
            job_id: id,
            message: notificationMessage,
          });

        if (notificationError) {
          console.error(
            "Error creating notification for employer:",
            notificationError
          );
        } else {
          console.log("Notification sent to employer:", job.employer_id);
        }
      }

      alert("Successfully applied for the job!");

      fetchApplications();
    }
  };

  const isJobAppliedFor = () => {
    return applications.some((app) => app.job_id === id);
  };

  useEffect(() => {
    fetchJobDetails();
    fetchApplications();
  }, [id]);

  if (!jobDetails) return <p>Loading job details...</p>;

  return (
    <div className="container md:w-1/2 mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6">{jobDetails.title}</h2>

        <p className="text-lg mb-4">
          <strong>Location:</strong> {jobDetails.location}
        </p>
        <p className="text-lg mb-4">
          <strong>Type:</strong> {jobDetails.type}
        </p>
        <p className="text-lg mb-4">
          <strong>Description:</strong> {jobDetails.description}
        </p>
        <p className="text-lg mb-6">
          <strong>Requirements:</strong> {jobDetails.requirments}
        </p>

        {isJobAppliedFor() ? (
          <button
            className="mt-4 w-full bg-gray-400 text-white font-semibold py-2 px-4 rounded-md"
            disabled
          >
            Applied
          </button>
        ) : (
          <button
            onClick={applyForJob}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-500"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
