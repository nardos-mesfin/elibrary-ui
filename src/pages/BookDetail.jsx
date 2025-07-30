// src/pages/BookDetail.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal';
import { Link } from 'react-router-dom'; 

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`/api/books/${id}`)
      .then(response => setBook(response.data))
      .catch(err => {
        console.error(err);
        setError('Could not find the requested tome.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/books/${id}`);
      setIsModalOpen(false);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to remove the book.');
      setIsModalOpen(false);
    }
  };

  if (loading) return <p className="text-center text-lg font-serif-display">Unveiling the tome...</p>;
  if (error) return <p className="text-center text-lg text-red-700 font-serif-display">{error}</p>;
  if (!book) return null;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-12 mt-8">
        <div className="md:w-1/3">
          <img 
            src={book.full_cover_url || `https://source.unsplash.com/400x600/?book,fantasy,${book.id}`}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="font-serif-display text-5xl text-old-book-brown">{book.title}</h1>
          <h2 className="font-serif-body text-2xl text-old-book-brown/80 mt-2">by {book.author}</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {book.categories && book.categories.map(category => (
              <span key={category.id} className="bg-enchanted-teal/20 text-enchanted-teal text-sm font-serif-body px-3 py-1 rounded-full">
                {category.name}
              </span>
            ))}
          </div>
          <p className="mt-6 text-lg leading-relaxed">
            {book.summary || "No summary is written for this tome yet."}
          </p>
          <div className="mt-8 border-t border-dusty-rose pt-4 text-sm">
            <p><strong>Publisher:</strong> {book.publisher || 'Unknown'}</p>
            <p><strong>Pages:</strong> {book.pages || 'N/A'}</p>
          </div>

          {user && user.is_admin === 1 && (
            <div className="mt-8 flex space-x-4">
                <Link to={`/books/${book.id}/edit`} className="btn">
                    Edit Tome
                </Link>
                <button onClick={handleDeleteClick} className="btn bg-red-800 hover:bg-red-900">
                    Remove from Library
                </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Removal"
      >
        <p>
          Are you certain you wish to remove the tome titled "<strong>{book.title}</strong>" from the archives?
          This action cannot be undone.
        </p>
      </ConfirmationModal>
    </>
  );
}

export default BookDetail;
