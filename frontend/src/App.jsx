import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'
import MagazineForm from './MagazineForm'
import Electronics from './Electronics'
import ElectronicsForm from './ElectronicsForm'
import './App.css'

function App() {
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [electronics, setElectronics] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch('/api/books').then(res => res.json()),
            fetch('/api/magazines').then(res => res.json()),
            fetch('/api/electronics').then(res => res.json())
        ]).then(([bookData, magazineData, electronicsData]) => {
            setBooks(bookData);
            setMagazines(magazineData);
            setElectronics(electronicsData);
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

    const handleAddMagazine = () => {
        fetch('/api/magazines')
            .then(res => res.json())
            .then(data => {
                console.log("GET /api/magazines response:", data);
                setMagazines(data);
            });
    };

    const handleDeleteMagazine = (id) => {
        if (!window.confirm("Delete this magazine?")) return;
        fetch(`/api/magazines/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setMagazines(magazines.filter(m => m.id !== id));
            });
    };

    const handleUpdateMagazine = (id, updatedData) => {
        fetch(`/api/magazines/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedMagazine => {
                setMagazines(magazines.map(m => (m.id === id ? savedMagazine : m)));
            });
    };

    const handleAddElectronic = (newElectronic) => {
        setElectronics([...electronics, newElectronic]);
    };

    const handleDeleteElectronic = (id) => {
        if (!window.confirm("Delete this electronic item?")) return;
        fetch(`/api/electronics/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setElectronics(electronics.filter(e => e.id !== id));
            });
    };

    const handleUpdateElectronic = (id, updatedData) => {
        fetch(`/api/electronics/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedElectronic => {
                setElectronics(electronics.map(e => (e.id === id ? savedElectronic : e)));
            });
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="app-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/inventory"
                    element={
                        <div className="book-list">
                            <h1>Current Inventory</h1>
                            {books.map((b) => (
                                <Book
                                    key={b.id}
                                    {...b}
                                    onDelete={handleDeleteBook}
                                    onUpdate={handleUpdateBook}
                                />
                            ))}
                        </div>
                    }
                />

                <Route
                    path="/add"
                    element={
                        <div>
                            <h1>Add to Library</h1>
                            <BookForm onBookAdded={handleAddBook} />
                        </div>
                    }
                />

                <Route
                    path="/magazines"
                    element={
                        <div className="book-list">
                            <h1>Current Magazines</h1>
                            {magazines.map((m) => (
                                <Magazine
                                    key={m.id}
                                    {...m}
                                    onDelete={handleDeleteMagazine}
                                    onUpdate={handleUpdateMagazine}
                                />
                            ))}
                        </div>
                    }
                />

                <Route
                    path="/add-magazine"
                    element={
                        <div>
                            <h1>Add Magazine</h1>
                            <MagazineForm onMagazineAdded={handleAddMagazine} />
                        </div>
                    }
                />

                <Route
                    path="/electronics"
                    element={
                        <div className="book-list">
                            <h1>Current Electronics</h1>
                            {electronics.map((e) => (
                                <Electronics
                                    key={e.id}
                                    {...e}
                                    onDelete={handleDeleteElectronic}
                                    onUpdate={handleUpdateElectronic}
                                />
                            ))}
                        </div>
                    }
                />

                <Route
                    path="/add-electronic"
                    element={
                        <div>
                            <h1>Add Electronic Item</h1>
                            <ElectronicsForm onElectronicAdded={handleAddElectronic} />
                        </div>
                    }
                />
            </Routes>
        </div>
    )
}

export default App