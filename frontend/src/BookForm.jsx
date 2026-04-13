import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './api/axiosConfig';

function BookForm({ onBookAdded }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState(0);
    const [copies, setCopies] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            title,
            author,
            price: parseFloat(price),
            copies: parseInt(copies, 10)
        };

        try {
            const response = await axiosInstance.post('/books', newBook);
            const savedBook = response.data;

            onBookAdded(savedBook);
            setTitle('');
            setAuthor('');
            setPrice(0);
            setCopies(1);
            navigate('/inventory');
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Failed to add book.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
            />

            <input
                type="number"
                placeholder="Copies"
                value={copies}
                onChange={(e) => setCopies(e.target.value)}
                required
                min="1"
            />

            <button type="submit">Save Book</button>
        </form>
    );
}

export default BookForm;