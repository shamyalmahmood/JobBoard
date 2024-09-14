import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const EditJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
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
        .eq("id", id)
        .eq("employer_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching job:", error.message);
        setError("Failed to load job posting.");
      } else {
        console.log(data);
        setJob(data);
      }
    };

    fetchJob();
  }, [id]);

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    setError("");

    const { error: updateError } = await supabase
      .from("jobs")
      .update({
        title: job.title,
        description: job.description,
        requirments: job.requirments,
        location: job.location,
      })
      .eq("id", id);

    if (updateError) {
      console.error("Error updating job:", updateError.message);
      setError("Failed to update job posting.");
    } else {
      navigate("/view-jobs");
    }
  };

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Job Posting</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleUpdateJob} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            required
            rows="5"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Requirements</label>
          <textarea
            className="w-full border p-2 rounded"
            value={job.requirments}
            onChange={(e) => setJob({ ...job, requirments: e.target.value })}
            required
            rows="5"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={job.location}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};
export default EditJob;
