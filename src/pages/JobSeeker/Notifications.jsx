import React, { useState } from "react";
import supabase from "../../supabaseClient"; // Import supabase client for DB operations

const Notifications = ({ notifications, setNotifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = async (notificationId) => {
    console.log(notificationId);
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId);

    if (error) {
      console.error("Error removing notification:", error.message);
      return;
    }

    setNotifications(
      notifications.filter((notif) => notif.id !== notificationId)
    );
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Notifications
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md border border-gray-200">
          {notifications.length === 0 ? (
            <p className="p-4 text-gray-500">No new notifications</p>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleNotificationClick(notification.id)} // Handle click
                >
                  {notification.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
