// src/pages/CreateBook.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateBook() {
  const [formData, setFormData] = useState({ title: '', author: '', summary: '', publisher: '', pages: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await axios.post('http://127.0.0.1:8000/api/books', formData);
      setMessage('The new tome has been successfully added to the shelves!');
      setTimeout(() => navigate('/'), 2000); // Go home after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred. The spirits are displeased.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-parchment-cream/70 rounded-lg shadow-xl border border-dusty-rose">
      <h1 className="font-serif-display text-4xl text-center mb-6">Inscribe a New Tome</h1>
      {message && <p className="bg-green-200 text-green-800 p-3 rounded-md mb-4">{message}</p>}
      {error && <p className="bg-red-200 text-red-800 p-3 rounded-md mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-old-book-brown">Title</label>
                <input type="text" name="title" id="title" onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div>
                <label htmlFor="author" className="block text-sm font-medium text-old-book-brown">Author</label>
                <input type="text" name="author" id="author" onChange={handleChange} className="form-input mt-1" required />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="publisher" className="block text-sm font-medium text-old-book-brown">Publisher</label>
                <input type="text" name="publisher" id="publisher" onChange={handleChange} className="form-input mt-1" />
            </div>
            <div>
                <label htmlFor="pages" className="block text-sm font-medium text-old-book-brown">Pages</label>
                <input type="number" name="pages" id="pages" onChange={handleChange} className="form-input mt-1" />
            </div>
        </div>
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-old-book-brown">Summary</label>
          <textarea name="summary" id="summary" onChange={handleChange} rows="4" className="form-input mt-1"></textarea>
        </div>
        <div>
          <button type="submit" className="btn w-full">Add to Collection</button>
        </div>
      </form>
    </div>
  );
}

export default CreateBook;