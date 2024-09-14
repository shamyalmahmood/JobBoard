import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirments, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-Time"); // Add state for job type
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { error: insertError } = await supabase.from("jobs").insert({
      employer_id: user.id,
      title,
      description,
      requirments,
      location,
      type: jobType,
    });

    if (insertError) {
      console.error("Error creating job:", insertError.message);
      setError("Failed to create job posting.");
    } else {
      // Redirect to the employer dashboard or job listings
      navigate("/view-jobs");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Job Posting</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleCreateJob} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="5"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Requirements</label>
          <textarea
            className="w-full border p-2 rounded"
            value={requirments}
            onChange={(e) => setRequirements(e.target.value)}
            required
            rows="5"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Job Type</label>
          <select
            className="w-full border p-2 rounded"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
