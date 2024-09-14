import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const BrowseJobs = ({ filters, setFilters, applyFilters, filteredJobs }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Filter Jobs</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Job Title"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
          <input
            type="text"
            className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Location"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
          <select
            className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
          </select>
        </div>
        <button
          onClick={applyFilters}
          className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          Apply Filters
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">New Job Postings</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <li
            key={job.id}
            className="bg-white shadow-md rounded-lg p-6 cursor-pointer"
            onClick={() => navigate(`/job-details/${job.id}`)}
          >
            <h4 className="text-lg font-bold">{job.title}</h4>
            <h6>Description: {job.description}</h6>
            <p className="text-sm text-gray-500">{job.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrowseJobs;
