import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabaseClient";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("employer_id", user.id);

      if (error) {
        console.error("Error fetching jobs:", error.message);
        setError("Failed to load job postings.");
      } else {
        setJobs(data);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job posting?"
    );

    if (confirmDelete) {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);

      if (error) {
        console.error("Error deleting job:", error.message);
        alert("Failed to delete job posting.");
      } else {
        setJobs(jobs.filter((job) => job.id !== jobId));
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Job Postings</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {jobs.length === 0 ? (
        <p>You have not posted any jobs yet.</p>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="border px-4 py-2">{job.title}</td>
                <td className="border px-4 py-2">{job.location}</td>
                <td className="border px-4 py-2 text-center">
                  <Link
                    to={`/edit-job/${job.id}`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ViewJobs;
