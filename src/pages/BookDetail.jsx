// src/pages/BookDetail.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import NotificationContext from '../context/NotificationContext';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  // --- STATE MANAGEMENT ---
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]); // State for the discussion
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false); // For disabling the comment form

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchBookAndComments = async () => {
      setLoading(true);
      try {
        const [bookResponse, commentsResponse] = await Promise.all([
          axios.get(`/api/books/${id}`),
          axios.get(`/api/books/${id}/comments`)
        ]);
        setBook(bookResponse.data);
        setComments(commentsResponse.data);
      } catch (err) {
        console.error("Failed to fetch book details:", err);
        // Use the notification system for the fetch error
        showNotification('Could not find the requested tome.', 'error');
        // We can also navigate the user away from the broken page
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchBookAndComments();
  }, [id]);

  const handleDeleteClick = () => setIsModalOpen(true);

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/books/${id}`);
      setIsModalOpen(false);
      showNotification('The tome has been removed from the archives.', 'success');
      navigate('/');
    } catch (err) {
      showNotification('Failed to remove the book.', 'error');
      setIsModalOpen(false);
    }
  };

  const handleCommentSubmit = async (commentBody) => {
    setIsSubmittingComment(true);
    try {
      const response = await axios.post(`/api/books/${id}/comments`, { body: commentBody });
      setComments(prevComments => [response.data, ...prevComments]);
    } catch (err) {
      showNotification("Could not post your commentary. Please try again.", 'error');
      console.error("Failed to post comment:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // The loading check is now sufficient. If an error occurs, the user
  // is navigated away, so we don't need a separate error display here.
  if (loading) return <p className="text-center text-lg font-serif-display">Unveiling the tome...</p>;
  if (!book) return null; // If loading is done and there's no book, render nothing.
  
  return (
    <>
      {/* --- Main Book Details Section --- */}
      <div className="flex flex-col md:flex-row gap-12 mt-8">
        <div className="md:w-1/3">
          <img 
            src={book.full_cover_url || `https://source.unsplash.com/400x600/?book,fantasy,${book.id}`}
            alt={`Cover of ${book.title}`}
            className="w-full rounded-lg shadow-2xl object-cover"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="font-serif-display text-5xl text-old-book-brown">{book.title}</h1>
          <h2 className="font-serif-body text-2xl text-old-book-brown/80 mt-2">by {book.author}</h2>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {book.categories && book.categories.map(category => (
              // Wrap the span in a Link component
              <Link to={`/categories/${category.id}`} key={category.id}>
                <span className="bg-enchanted-teal/20 text-enchanted-teal text-sm font-serif-body px-3 py-1 rounded-full
                                hover:bg-enchanted-teal/40 transition-colors cursor-pointer">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-6 text-lg leading-relaxed">{book.summary || "No summary is written for this tome yet."}</p>
          
          <div className="mt-8 border-t border-dusty-rose pt-4 text-sm">
            <p><strong>Publisher:</strong> {book.publisher || 'Unknown'}</p>
            <p><strong>Pages:</strong> {book.pages || 'N/A'}</p>
          </div>

          {user && book.full_file_url && (
            <div className="mt-8">
              <a href={book.full_file_url} target="_blank" rel="noopener noreferrer" className="btn text-lg">
                Read Now
              </a>
            </div>
          )}

          {user && user.is_admin === 1 && (
            <div className="mt-8 flex space-x-4">
                <Link to={`/books/${book.id}/edit`} className="btn">Edit Tome</Link>
                <button onClick={handleDeleteClick} className="btn bg-red-800 hover:bg-red-900">Remove from Library</button>
            </div>
          )}
        </div>
      </div>

      {/* --- Separator --- */}
      <hr className="my-12 border-t-2 border-dashed border-dusty-rose" />
      
      {/* --- Discussion Circle Section --- */}
      <div>
        {user && <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmittingComment} />}
        <CommentList comments={comments} />
      </div>

      {/* --- Confirmation Modal --- */}
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