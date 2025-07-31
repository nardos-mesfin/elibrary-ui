// src/pages/ManageCategories.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import NotificationContext from '../context/NotificationContext';

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const { showNotification } = useContext(NotificationContext);

  // Function to fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/admin/categories');
      setCategories(response.data);
    } catch (err) {
      setError('Could not fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/categories', { name: newCategoryName });
      // Use the notification system for success
      showNotification(`Category "${newCategoryName}" created successfully!`, 'success');
      setNewCategoryName('');
      fetchCategories();
    } catch (err) {
      // Use the notification system for errors
      showNotification(err.response?.data?.message || 'Failed to create category.', 'error');
    }
  };

  if (loading) return <p className="text-center font-serif-display">Loading archives...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="font-serif-display text-5xl text-center mb-12">Manage Archives</h1>
      
      {/* Form for creating a new category */}
      <div className="mb-12 p-8 bg-parchment-cream/70 rounded-lg shadow-xl border border-dusty-rose">
        <h2 className="font-serif-display text-3xl mb-4">Inscribe a New Category</h2>
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="e.g., Fantasy, History..."
            className="form-input flex-grow"
            required
          />
          <button type="submit" className="btn">Create</button>
        </form>
      </div>

      {/* List of existing categories */}
      <div>
        <h2 className="font-serif-display text-3xl mb-4">Existing Categories</h2>
        <div className="flex flex-wrap gap-4">
          {categories.length > 0 ? (
            categories.map(category => (
              <span key={category.id} className="bg-enchanted-teal/20 text-enchanted-teal font-serif-body px-4 py-2 rounded-full">
                {category.name}
              </span>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageCategories;