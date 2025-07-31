// src/components/CommentList.jsx

import React from 'react';

function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="mt-12 text-center text-old-book-brown/70">
        <p>No commentary has been inscribed for this tome yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="font-serif-display text-3xl text-old-book-brown mb-6 border-b-2 border-dusty-rose pb-2">
        Reader's Marginalia
      </h3>
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="p-4 bg-parchment-cream/50 border-l-4 border-enchanted-teal rounded-r-lg">
            <p className="font-serif-body text-lg text-old-book-brown/90">
              {comment.body}
            </p>
            <div className="text-right text-sm text-old-book-brown/70 mt-2">
              — <span className="font-bold">{comment.user.name}</span> on {new Date(comment.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;