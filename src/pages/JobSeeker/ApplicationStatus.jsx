import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const ApplicationStatus = ({ applications }) => {
  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-semibold mt-10 mb-4">Your Applications</h3>
      <ul className="bg-white shadow-md rounded-lg p-6">
        {applications.length > 0 ? (
          applications.map((app) => (
            <li key={app.id} className="border-b last:border-none py-2">
              Job ID: {app.job_id} - Status:{" "}
              <span className="font-semibold">{app.status}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">You haven't applied for any jobs yet.</p>
        )}
      </ul>
    </div>
  );
};

export default ApplicationStatus;
