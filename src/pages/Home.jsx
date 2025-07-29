// src/pages/Home.jsx

import { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import { Typography } from '@mui/material';

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the books:', error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Typography variant="h2" component="h1" gutterBottom align="center">
                E-Library Collection
            </Typography>
            <BookList loading={loading} books={books} />
        </>
    );
}

export default Home;