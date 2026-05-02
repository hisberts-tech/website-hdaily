import React, { createContext, useContext, useState, useCallback } from 'react';
import { NotificationType } from '../types';

interface NotificationContextType {
  notifications: NotificationType[];
  addNotification: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = useCallback((
    message: string, 
    type: 'success' | 'error' | 'info' = 'info', 
    duration = 3000
  ) => {
    const id = Date.now();
    const notification: NotificationType = {
      id,
      message,
      type,
      duration,
    };

    setNotifications(prev => [...prev, notification]);

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
