// src/context/NotificationContext.jsx

import React, { createContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null); // { message: '...', type: 'success' | 'error' }

  // We use useCallback to ensure this function's reference doesn't change on every render
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    // Set a timer to automatically hide the notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;