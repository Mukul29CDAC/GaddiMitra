
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function NotifyPop({ isOpen, onClose }) {
  const { user ,token} = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && user?.userid) {
      const fetchData = async () => {
        try {
          if(user.role === "customer"){
            const response = await axios.get(`http://localhost:8080/getNotification/${user?.userid}`,{
              headers: {
                "Authorization": `Bearer ${token}` 
              }});
            setNotifications(response.data);
          }else{
              const response = await axios.get(`http://localhost:8080/allNotification/${user?.role}`,{
                headers: {
                  "Authorization": `Bearer ${token}` 
                }});
              setNotifications(response.data);
          }
          setError(null);
        } catch (err) {
          setError(err);
          setNotifications([]);
        }
      };
      fetchData();
    }
  }, [isOpen, user?.userid]);


  if (!isOpen) return null;

  const markAsRead = async (id) => {
    try {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.notificationid === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const deleteNotification = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      setNotifications(prevNotifications =>
        prevNotifications.filter(notification => notification.notificationid !== id)
      );
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const NotificationItem = ({ notification }) => {
    let borderColor = 'border-l-gray-300';
    let bgColor = 'bg-white hover:bg-gray-50';
    let textColor = 'text-gray-800';

    borderColor = 'border-l-emerald-400';


    if (notification.isRead) {
      bgColor = 'bg-gray-50';
      textColor = 'text-gray-500';
    } else {
      bgColor = 'bg-white shadow-sm';
      textColor = 'text-gray-900';
    }

    const notificationDate = notification.datetime ? new Date(notification.datetime) : null;


    return (
      <li
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg transition-colors duration-200 border-l-4 ${borderColor} ${bgColor} ${textColor}`}
      >
        <div className="flex-1 mb-1 sm:mb-0">

          <div className="flex flex-wrap items-center text-xs text-gray-400 mt-0 space-x-2">
          
            {notification.status && <span className="px-2 py-1 bg-gray-100 rounded-full">Status: {notification.status}</span>}
            
            {(notification.recievertype && user.role === "customer") ? (<span className="px-2 py-2 my-2 bg-gray-600 text-white rounded-full capitalize">To: {notification.recievertype}</span>):(<span className="px-2 py-2 my-2 bg-gray-600 text-white rounded-full capitalize">Customer Id: {notification.customerid}</span>)}

          </div>
          
          <h3 className="font-semibold text-base mb-1">

            <span className="capitalize">{notification.message} </span>

          </h3>


        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-3 sm:mt-0">
          {!notification.isRead && (
            <button
              onClick={() => markAsRead(notification.notificationid)}
              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"

            >
              Mark Read
            </button>
          )}
          <button

            onClick={() => deleteNotification(notification.notificationid)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"

          >
            Delete
          </button>
        </div>
      </li>
    );
  };

  return (

    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-auto p-6 relative animate-fade-in-up">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-light leading-none"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Your Notifications</h2>

        {error && (
          <div className="text-red-600 bg-red-50 p-3 rounded-md mb-4 text-sm">
            Error loading notifications: {error.message || "Please check your network or try again later."}
          </div>
        )}

        <ul className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem key={notification.notificationid} notification={notification} />
            ))
          ) : (
            <li className="text-center text-gray-500 py-6 text-lg">
              No new notifications. You're all caught up! 🎉
            </li>

          )}
        </ul>
      </div>
    </div>
  );
}