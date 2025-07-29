// src/pages/Profile.jsx
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p className="text-center text-lg">Loading your profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-parchment-cream/70 rounded-lg shadow-xl border border-dusty-rose">
      <h1 className="font-serif-display text-4xl border-b-2 border-dusty-rose pb-4 mb-6">
        My Profile
      </h1>
      <div className="space-y-4 text-lg">
        <p>
          <strong className="font-serif-display mr-2">Name:</strong> 
          <span className="font-serif-body">{user.name}</span>
        </p>
        <p>
          <strong className="font-serif-display mr-2">Email:</strong> 
          <span className="font-serif-body">{user.email}</span>
        </p>
        <p>
          <strong className="font-serif-display mr-2">Member Since:</strong> 
          <span className="font-serif-body">{new Date(user.created_at).toLocaleDateString()}</span>
        </p>
        <p>
          <strong className="font-serif-display mr-2">Status:</strong> 
          <span className={`font-serif-body px-2 py-1 rounded-md ${user.is_admin === 1 ? 'bg-gilded-gold/50 text-old-book-brown' : 'bg-gray-200'}`}>
            {user.is_admin === 1 ? 'Administrator' : 'Member'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Profile;