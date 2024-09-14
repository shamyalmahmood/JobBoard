import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData) {
        navigate("/login");
        return;
      }
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile({
          name: data.name || "",
          email: userData.user.email,
          location: data.location || "",
          phone: data.phone || "",
        });
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      if (newPassword) {
        const { error: authError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (authError) {
          throw authError;
        }
      }

      navigate("/jobseeker-dashboard");
    } catch (error) {
      setError(
        error.message || "An error occurred while updating the password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={profile.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
