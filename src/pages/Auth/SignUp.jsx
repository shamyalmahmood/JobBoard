import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";

const SignUp = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      const user = data.user;

      if (user) {
        const { error: profileError } = await supabase.from("users").insert([
          {
            id: user.id,
            email: user.email,
            role: userType,
          },
        ]);

        if (profileError) {
          throw new Error(profileError.message);
        }

        if (userType === "job-seeker") {
          navigate("/dashboard/job-seeker");
        } else if (userType === "employer") {
          navigate("/dashboard/employer");
        }
      }
    } catch (error) {
      setError(error.message || "An error occurred during sign-up.");
      console.error("Sign-up error:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-600 ">
          Login
        </Link>
      </p>
    </div>
  );
};
export default SignUp;
