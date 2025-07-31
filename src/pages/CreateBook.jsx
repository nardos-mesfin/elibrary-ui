// src/pages/CreateBook.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotificationContext from '../context/NotificationContext';

function CreateBook() {
  const [formData, setFormData] = useState({ title: '', author: '', summary: '', publisher: '', pages: '' });
  const [coverImage, setCoverImage] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    axios.get('/api/admin/categories')
      .then(response => setAllCategories(response.data))
      .catch(err => {
        console.error('Failed to fetch categories:', err);
        showNotification('Could not load categories. Please try again.', 'error');
      });
  }, []);

  const handleTextChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCoverImageChange = (e) => setCoverImage(e.target.files[0]);
  const handleBookFileChange = (e) => setBookFile(e.target.files[0]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    Object.keys(formData).forEach(key => submissionData.append(key, formData[key]));
    if (coverImage) submissionData.append('cover_image', coverImage);
    if (bookFile) submissionData.append('book_file', bookFile);
    if (keywords) {
      submissionData.append('keywords', keywords); // <-- APPEND THE KEYWORDS
    }
    selectedCategories.forEach(id => submissionData.append('categories[]', id));

    try {
      await axios.post('/api/books', submissionData);
      showNotification('The new tome has been successfully added!', 'success');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      showNotification(err.response?.data?.message || 'An unexpected error occurred.', 'error');
    }
  };

  // Your JSX was perfect. The errors were all in the logic above.
  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-parchment-cream/70 rounded-lg shadow-xl border border-dusty-rose">
      <h1 className="font-serif-display text-4xl text-center mb-6">Inscribe a New Tome</h1>
      {/* The old message/error <p> tags were already correctly removed from the JSX */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Your entire form JSX is perfect and does not need to change. */}
        {/* Make sure the cover image onChange is correct */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-old-book-brown">Title</label>
            <input type="text" name="title" id="title" onChange={handleTextChange} className="form-input mt-1" required />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-old-book-brown">Author</label>
            <input type="text" name="author" id="author" onChange={handleTextChange} className="form-input mt-1" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="publisher" className="block text-sm font-medium text-old-book-brown">Publisher</label>
            <input type="text" name="publisher" id="publisher" onChange={handleTextChange} className="form-input mt-1" />
          </div>
          <div>
            <label htmlFor="pages" className="block text-sm font-medium text-old-book-brown">Pages</label>
            <input type="number" name="pages" id="pages" onChange={handleTextChange} className="form-input mt-1" />
          </div>
        </div>
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-old-book-brown">Summary</label>
          <textarea name="summary" id="summary" onChange={handleTextChange} rows="4" className="form-input mt-1"></textarea>
        </div>
        <div>
          <label htmlFor="cover_image" className="block text-sm font-medium text-old-book-brown">Book Cover</label>
          <input type="file" name="cover_image" id="cover_image" onChange={handleCoverImageChange} className="form-input mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-enchanted-teal/20 file:text-enchanted-teal hover:file:bg-enchanted-teal/30" />
        </div>
        <div>
          <label htmlFor="book_file" className="block text-sm font-medium text-old-book-brown">Book File (PDF/ePub)</label>
          <input type="file" name="book_file" id="book_file" onChange={handleBookFileChange} className="form-input mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-enchanted-teal/20 file:text-enchanted-teal hover:file:bg-enchanted-teal/30" />
        </div>
        <div>
          <label className="block text-sm font-medium text-old-book-brown mb-2">Categories</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-dusty-rose rounded-md bg-white">
            {allCategories.length > 0 ? (
              allCategories.map(category => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={selectedCategories.includes(category.id)} onChange={() => handleCategoryChange(category.id)} className="h-4 w-4 rounded border-gray-300 text-enchanted-teal focus:ring-enchanted-teal" />
                  <span>{category.name}</span>
                </label>
              ))
            ) : ( <p className="text-sm text-gray-500 col-span-full">No categories available.</p> )}
          </div>
        </div>
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-old-book-brown">Keywords</label>
          <input
            type="text"
            name="keywords"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="form-input mt-1"
            placeholder="e.g., magic, dragons, space travel"
          />
          <p className="text-xs text-old-book-brown/70 mt-1">Separate keywords with a comma.</p>
        </div>
        <div>
          <button type="submit" className="btn w-full">Add to Collection</button>
        </div>
      </form>
    </div>
  );
}

export default CreateBook;