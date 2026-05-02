import React from 'react';
import { useNotifications } from '../context/NotificationContext';

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  const getNotificationStyles = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
      default:
        return 'bg-hd-secondary';
    }
  };

  const getNotificationIcon = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-exclamation-circle';
      case 'info':
      default:
        return 'fas fa-info-circle';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getNotificationStyles(
            notification.type
          )} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up flex items-center gap-3 min-w-[250px] max-w-md`}
        >
          <i className={`${getNotificationIcon(notification.type)}`}></i>
          <span className="flex-1">{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
