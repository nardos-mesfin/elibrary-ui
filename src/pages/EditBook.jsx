// src/pages/EditBook.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    publisher: '',
    pages: ''
  });
  const [coverImage, setCoverImage] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/books/${id}`)
      .then(response => {
        setFormData(response.data);
        setSelectedCategories(response.data.categories.map(cat => cat.id));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load the tome's current inscriptions.");
        setLoading(false);
      });

    axios.get('/api/admin/categories')
      .then(response => setAllCategories(response.data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, [id]);

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const submissionData = new FormData();
    submissionData.append('_method', 'POST');
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });
    if (coverImage) {
      submissionData.append('cover_image', coverImage);
    }
    selectedCategories.forEach(id =>
      submissionData.append('categories[]', id)
    );

    try {
      await axios.post(`/api/books/${id}/update`, submissionData);
      navigate(`/books/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save your revisions.');
    }
  };

  if (loading) return <p className="text-center text-lg font-serif-display">Loading the scribe's desk...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-parchment-cream/70 rounded-lg shadow-xl border border-dusty-rose">
      <h1 className="font-serif-display text-4xl text-center mb-6">Revise the Tome</h1>

      {error && (
        <p className="bg-red-200 text-red-800 p-3 rounded-md mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-old-book-brown">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleTextChange}
              className="form-input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-old-book-brown">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              value={formData.author}
              onChange={handleTextChange}
              className="form-input mt-1"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="publisher" className="block text-sm font-medium text-old-book-brown">Publisher</label>
            <input
              type="text"
              name="publisher"
              id="publisher"
              value={formData.publisher}
              onChange={handleTextChange}
              className="form-input mt-1"
            />
          </div>
          <div>
            <label htmlFor="pages" className="block text-sm font-medium text-old-book-brown">Pages</label>
            <input
              type="number"
              name="pages"
              id="pages"
              value={formData.pages}
              onChange={handleTextChange}
              className="form-input mt-1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-old-book-brown">Summary</label>
          <textarea
            name="summary"
            id="summary"
            value={formData.summary}
            onChange={handleTextChange}
            rows="4"
            className="form-input mt-1"
          ></textarea>
        </div>

        <div>
          <label htmlFor="cover_image" className="block text-sm font-medium text-old-book-brown">New Book Cover</label>
          <input
            type="file"
            name="cover_image"
            id="cover_image"
            onChange={handleFileChange}
            className="form-input mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-enchanted-teal/20 file:text-enchanted-teal hover:file:bg-enchanted-teal/30"
          />
        </div>

        {/* Categories Section */}
        <div>
          <label className="block text-sm font-medium text-old-book-brown mb-2">Categories</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-dusty-rose rounded-md bg-white">
            {allCategories.length > 0 ? (
              allCategories.map(category => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="h-4 w-4 rounded border-gray-300 text-enchanted-teal focus:ring-enchanted-teal"
                  />
                  <span>{category.name}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500 col-span-full">No categories available.</p>
            )}
          </div>
        </div>

        <div>
          <button type="submit" className="btn w-full">
            Save Revisions
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBook;
