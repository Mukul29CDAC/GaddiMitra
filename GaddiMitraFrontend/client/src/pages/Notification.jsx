import React, { useState } from 'react';

export default function NotifyPop({ isOpen, onClose }) {
  // Mock notification data. In a real app, this would come from an API.
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your car is ready for pickup!', type: 'service-center', isRead: false },
    { id: 2, message: 'New special offer from your dealer!', type: 'dealer', isRead: false },
    { id: 3, message: 'Test drive scheduled for 2 PM.', type: 'customer', isRead: true },
    { id: 4, message: 'Reminder: Service is due next week.', type: 'service-center', isRead: false },
  ]);

  if (!isOpen) return null;

  const markAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const NotificationItem = ({ notification }) => {
    let borderColor = '';
    switch (notification.type) {
      case 'dealer':
        borderColor = 'border-l-blue-500';
        break;
      case 'service-center':
        borderColor = 'border-l-green-500';
        break;
      case 'customer':
        borderColor = 'border-l-yellow-500';
        break;
      default:
        borderColor = 'border-l-gray-400';
    }

    return (
      <li
        className={`flex items-center justify-between p-3 rounded-md transition-colors duration-200 border-l-4 ${borderColor} ${
          notification.isRead ? 'bg-gray-50 text-gray-400' : 'bg-white hover:bg-gray-100 text-gray-800'
        }`}
      >
        <span className="flex-1">
          {notification.message}
        </span>
        <div className="flex space-x-2 ml-4">
          {!notification.isRead && (
            <button
              onClick={() => markAsRead(notification.id)}
              className="text-sm text-green-500 hover:text-green-700"
            >
              Mark Read
            </button>
          )}
          <button
            onClick={() => deleteNotification(notification.id)}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="fixed inset-0 bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-6 relative">
        <button className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl" onClick={onClose}>
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <li className="text-center text-gray-500 py-4">No new notifications.</li>
          )}
        </ul>
      </div>
    </div>
  );
}