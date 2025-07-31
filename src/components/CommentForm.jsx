// src/components/CommentForm.jsx

import React, { useState } from 'react';

/**
 * A form for submitting a new comment.
 * @param {function} onSubmit - A function to call with the new comment's text.
 * @param {boolean} isSubmitting - A flag to disable the form while posting.
 */
function CommentForm({ onSubmit, isSubmitting }) {
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.trim()) {
      onSubmit(body);
      setBody(''); // Clear the textarea after submission
    }
  };

  return (
    <div className="mt-8 p-6 bg-parchment-cream/70 rounded-lg shadow-lg border border-dusty-rose">
      <h3 className="font-serif-display text-2xl text-old-book-brown mb-4">Leave Your Thoughts</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Inscribe your commentary here..."
          rows="4"
          className="form-input"
          required
        ></textarea>
        <div className="text-right mt-4">
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Commentary'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;