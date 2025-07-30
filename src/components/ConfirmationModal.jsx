// src/components/ConfirmationModal.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A reusable confirmation modal.
 * @param {boolean} isOpen - Controls if the modal is visible.
 * @param {function} onClose - Function to call when closing the modal (e.g., clicking cancel or the backdrop).
 * @param {function} onConfirm - Function to call when the confirm button is clicked.
 * @param {string} title - The title of the modal.
 * @param {React.ReactNode} children - The content/message of the modal.
 */
function ConfirmationModal({ isOpen, onClose, onConfirm, title, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // This is the backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close modal if backdrop is clicked
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            // This is the modal panel
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            className="relative w-full max-w-md p-8 bg-parchment-cream rounded-lg shadow-2xl border border-dusty-rose"
          >
            <h2 className="font-serif-display text-3xl text-old-book-brown mb-4">{title}</h2>
            <div className="font-serif-body text-old-book-brown/90">
              {children}
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button onClick={onClose} className="px-6 py-2 bg-gray-300 text-gray-800 font-serif-display rounded-md hover:bg-gray-400 transition-colors">
                Cancel
              </button>
              <button onClick={onConfirm} className="btn bg-red-800 hover:bg-red-900">
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmationModal;