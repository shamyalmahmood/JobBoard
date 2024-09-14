import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md py-4 mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          At Job Board Application, our mission is to connect job seekers with employers through a user-friendly platform that simplifies the job search and hiring process. We aim to provide a seamless experience for both job seekers and employers, making it easier to find and manage job opportunities.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li className="mb-2">User-friendly interface for job seekers and employers.</li>
          <li className="mb-2">Easy job posting and application management.</li>
          <li className="mb-2">Real-time notifications for application updates.</li>
          <li className="mb-2">Comprehensive dashboards for tracking job postings and applications.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions or feedback, feel free to reach out to us at{' '}
          <a href="mailto:support@jobboardapp.com" className="text-blue-500 hover:underline">
            support@jobboardapp.com
          </a>.
        </p>
      </main>
    </div>
  );
};
export default About;