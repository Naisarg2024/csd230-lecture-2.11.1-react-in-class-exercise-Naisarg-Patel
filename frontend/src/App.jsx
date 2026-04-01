import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router' // Import routing components
import Navbar from './Navbar'
import Home from './Home'
import Book from './Book'
import BookForm from './BookForm'
import './App.css'
function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
// Fetch data exactly as before
    useEffect(() => {
        fetch('/api/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            });
    }, []);
    const handleAddBook = (newBook) => {
        setBooks([...books, newBook]);
    };
    const handleDeleteBook = (id) => {
        if (!window.confirm("Delete this book?")) return;
        fetch(`/api/books/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setBooks(books.filter(b => b.id !== id));
            });
    };
    const handleUpdateBook = (id, updatedData) => {
        fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedBook => {
                setBooks(books.map(b => (b.id === id ? savedBook : b)));
            });
    };
    if (loading) return <h2>Loading...</h2>;
    return (
        <div className="app-container" style={{ maxWidth: '900px', margin:
                '0 auto', padding: '20px' }}>
            {/* The Navbar stays visible on EVERY page */}
            <Navbar />
            {/* The Routes decide which component to render in this spot
*/}
            <Routes>
                {/* 1. The Home Page */}
                <Route path="/" element={<Home />} />
                {/* 2. The Inventory Page (Our old main view) */}
                <Route path="/inventory" element={
                    <div className="book-list">
                        <h1>Current Inventory</h1>
                        {books.map((b) => (
                            <Book key={b.id} {...b}
                                  onDelete={handleDeleteBook} onUpdate={handleUpdateBook} />
                        ))}
                    </div>
                } />
                {/* 3. The Add Book Page */}
                <Route path="/add" element={
                    <div>
                        <h1>Add to Library</h1>
                        <BookForm onBookAdded={handleAddBook} />
                    </div>
                } />
            </Routes>
        </div>
    )
}
export default App