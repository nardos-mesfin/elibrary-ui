// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// A reusable card component for our dashboard links
const AdminCard = ({ to, title, description, delay }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay } }
  };

  return (
    <motion.div variants={cardVariants}>
      <Link to={to} className="block p-6 bg-parchment-cream/70 rounded-lg shadow-lg border border-dusty-rose
                               hover:shadow-2xl hover:border-enchanted-teal transform hover:-translate-y-1 transition-all duration-300">
        <h2 className="font-serif-display text-2xl text-old-book-brown">{title}</h2>
        <p className="mt-2 font-serif-body text-old-book-brown/80">{description}</p>
      </Link>
    </motion.div>
  );
};

function AdminDashboard() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div>
      <h1 className="text-center font-serif-display text-5xl mb-12 text-old-book-brown">
        Administrator Dashboard
      </h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Our first Admin Card */}
        <AdminCard 
          to="/books/create" 
          title="Inscribe a New Tome" 
          description="Add a new book to the library's collection."
          delay={0}
        />
        
        {/* Placeholder for future features */}
        <AdminCard 
          to="/admin/users" 
          title="Manage Scribes" 
          description="View and manage all registered library members."
          delay={0.1}
        />
        <AdminCard 
          to="#" 
          title="View Library Scrolls" 
          description="See analytics and statistics for the library."
          delay={0.2}
        />
      </motion.div>
    </div>
  );
}

export default AdminDashboard;