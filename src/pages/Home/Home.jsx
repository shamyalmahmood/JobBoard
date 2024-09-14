import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <header className="bg-white shadow-md py-4 mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">SkillMatch</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to the Job Board</h2>
        <p className="text-gray-700 mb-4">
          If you're looking for your next job or seeking the perfect candidate for your company, our Job Board Application has you covered.
        </p>
        <p className="text-gray-700 mb-6">
          Sign up to get started and explore job listings or post new jobs with ease.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">For Job Seekers</h3>
            <p className="text-gray-600 mb-4">
              Find job opportunities that match your skills and interests. Apply for jobs, track your application status, and get notifications about updates.
            </p>
            <Link to="/register/job-seeker" className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Sign Up as Job Seeker
            </Link>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">For Employers</h3>
            <p className="text-gray-600 mb-4">
              Post new job openings, review applications, and manage your job listings. Stay informed with notifications about new applications.
            </p>
            <Link to="/register/employer" className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Sign Up as Employer
            </Link>
          </div> 
        </div>

        <p className="mt-4">
            Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
        </p>
      </main>
    </div>
  );
};
export default Home;