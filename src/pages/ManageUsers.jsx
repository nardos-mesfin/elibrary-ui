// src/pages/ManageUsers.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageUsers() {
  // CRITICAL: Initialize state with an empty array.
  // This guarantees `users` is never undefined.
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        
        // CRITICAL: Access the array inside the 'data' property
        // from the Laravel Resource Collection.
        setUsers(response.data.data); 
        // This is the defensive change
        //setUsers(response.data.data || []); 

      } catch (err) {
        setError('Failed to fetch the list of scribes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); // Empty dependency array ensures this runs once.

  if (loading) return <p className="text-center text-lg font-serif-display">Loading Scribes...</p>;
  if (error) return <p className="text-center text-lg text-red-700 font-serif-display">{error}</p>;

  return (
    <div>
      <h1 className="text-center font-serif-display text-5xl mb-12 text-old-book-brown">
        Manage Scribes
      </h1>
      <div className="overflow-x-auto bg-parchment-cream/70 rounded-lg shadow-lg border border-dusty-rose">
        <table className="w-full text-left font-serif-body">
          <thead className="border-b-2 border-old-book-brown">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined On</th>
            </tr>
          </thead>
          <tbody>
            {/* Now, this line will never fail, because `users` will always be an array. */}
            {users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'bg-parchment-cream/50' : ''}>
                <td className="p-4 font-bold">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${user.is_admin ? 'bg-gilded-gold/50 text-old-book-brown' : 'bg-gray-200'}`}>
                    {user.is_admin ? 'Admin' : 'Member'}
                  </span>
                </td>
                <td className="p-4">{user.joined_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;