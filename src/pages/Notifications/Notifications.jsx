import { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase.from('notifications').select('*');
      if (!error) setNotifications(data);
    };
    
    fetchNotifications();
  }, []);

  return (
    <div className="notifications">
      <h1>Notifications</h1>
      <ul>
        {notifications.map(note => (
          <li key={note.id}>
            <p>{note.message}</p>
            <p>{note.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;