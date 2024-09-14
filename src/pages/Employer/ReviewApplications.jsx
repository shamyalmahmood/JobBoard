import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const ReviewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select("id")
        .eq("employer_id", user.id);

      if (jobsError) {
        console.error("Error fetching jobs:", jobsError.message);
        setError("Failed to load job postings.");
        return;
      }

      const jobIds = jobs.map((job) => job.id);

      const { data, error: appsError } = await supabase
        .from("applications")
        .select("*, jobs(title), users(email)")
        .in("job_id", jobIds);

      if (appsError) {
        console.error("Error fetching applications:", appsError.message);
        setError("Failed to load applications.");
      } else {
        setApplications(data);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, newStatus) => {
    console.log(applicationId);
    const { data: application, error: appError } = await supabase
      .from("applications")
      .select("*, jobs(title), users(id)")
      .eq("job_id", applicationId)
      .single();

    if (appError) {
      console.error("Error fetching application:", appError.message);
      alert("Failed to fetch application details.");
      return;
    }

    const { error: updateError } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("job_id", applicationId);

    if (updateError) {
      console.error("Error updating application status:", updateError.message);
      alert("Failed to update application status.");
      return;
    }

    const message = `Your application for the job "${application.jobs.title}" has been ${newStatus}.`;
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert([
        {
          job_seeker_id: application.users.id,
          application_id: applicationId,
          message: message,
        },
      ]);

    if (notificationError) {
      console.error("Error creating notification:", notificationError.message);
    }

    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          return { ...app, status: newStatus };
        }
        return app;
      })
    );
    window.location.href = "/employer-dashboard";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Review Applications</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {applications.length === 0 ? (
        <p>No applications to review at this time.</p>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Job Title</th>
              <th className="px-4 py-2 text-left">Applicant Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.job_id}>
                <td className="border px-4 py-2">{app.jobs.title}</td>
                <td className="border px-4 py-2">{app.users.email}</td>
                <td className="border px-4 py-2">{app.status}</td>
                <td className="border px-4 py-2 text-center">
                  {app.status === "accepted" ? (
                    <span className="text-green-500">Done</span>
                  ) : app.status === "rejected" ? (
                    <span className="text-red-500">Done</span>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(app.job_id, "accepted")
                        }
                        className="text-green-500 hover:underline mr-4"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(app.job_id, "rejected")
                        }
                        className="text-red-500 hover:underline"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewApplications;
