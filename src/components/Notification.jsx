// src/components/Notification.jsx

import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationContext from '../context/NotificationContext';

// SVG Icons for visual feedback
const SuccessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function Notification() {
  const { notification, hideNotification } = useContext(NotificationContext);

  // Define styles based on notification type
  const isError = notification?.type === 'error';
  const bgColor = isError ? 'bg-red-800' : 'bg-enchanted-teal';
  const textColor = isError ? 'text-white' : 'text-parchment-cream';

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          position="fixed"
          className={`fixed bottom-5 right-5 z-50 flex items-center max-w-sm p-4 rounded-lg shadow-2xl ${bgColor} ${textColor}`}
        >
          <div className="flex-shrink-0">
            {isError ? <ErrorIcon /> : <SuccessIcon />}
          </div>
          <div className="ml-3 font-serif-body text-md">{notification.message}</div>
          <button onClick={hideNotification} className="ml-4 -mr-2 p-1 rounded-md hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;