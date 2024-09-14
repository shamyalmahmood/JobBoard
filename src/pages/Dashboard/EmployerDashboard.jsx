import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const EmployerDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalPostings: 0,
    totalApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
  });
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetricsAndNotifications = async () => {
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
        return;
      }

      const jobIds = jobs.map((job) => job.id);

      const { data: applications, error: applicationsError } = await supabase
        .from("applications")
        .select("status")
        .in("job_id", jobIds);

      if (applicationsError) {
        console.error(
          "Error fetching applications:",
          applicationsError.message
        );
        return;
      }

      const totalApplications = applications.length;
      const acceptedApplications = applications.filter(
        (app) => app.status === "accepted"
      ).length;
      const rejectedApplications = applications.filter(
        (app) => app.status === "rejected"
      ).length;

      setMetrics({
        totalPostings: jobs.length,
        totalApplications,
        acceptedApplications,
        rejectedApplications,
      });

      const { data: notificationsData, error: notificationsError } =
        await supabase
          .from("notifications")
          .select("*")
          .eq("employer_id", user.id);

      if (notificationsError) {
        console.error(
          "Error fetching notifications:",
          notificationsError.message
        );
      } else {
        setNotifications(notificationsData);
      }
    };

    fetchMetricsAndNotifications();
  }, []);

  const removeNotification = async (notificationId) => {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId);

    if (error) {
      console.error("Error deleting notification:", error.message);
    } else {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif.id !== notificationId)
      );
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employer Dashboard</h1>

      <nav className="mb-8">
        <ul className="flex space-x-6">
          <li>
            <Link to="/create-job" className="text-blue-500 hover:underline">
              Create Job
            </Link>
          </li>
          <li>
            <Link to="/view-jobs" className="text-blue-500 hover:underline">
              View Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/review-applications"
              className="text-blue-500 hover:underline"
            >
              Review Applications
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-blue-500 hover:underline">
              Profile
            </Link>
          </li>
          <li
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Job Postings</h2>
          <p className="text-3xl font-bold">{metrics.totalPostings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">
            Total Applications Received
          </h2>
          <p className="text-3xl font-bold">{metrics.totalApplications}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Accepted Applications</h2>
          <p className="text-3xl font-bold">{metrics.acceptedApplications}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Rejected Applications</h2>
          <p className="text-3xl font-bold">{metrics.rejectedApplications}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
                onClick={() => removeNotification(notification.id)}
              >
                {notification.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
