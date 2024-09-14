import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/jobseeker-dashboard"> 
        <button>Go Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;