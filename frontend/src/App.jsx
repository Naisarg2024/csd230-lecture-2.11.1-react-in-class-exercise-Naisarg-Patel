import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'
import MagazineForm from './MagazineForm'
import Electronics from './Electronics'
import ElectronicsForm from './ElectronicsForm'
import Login from './pages/Login'
import { useAuth } from './provider/authProvider'
import axiosInstance from './api/axiosConfig'
import './App.css'

function App() {
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [electronics, setElectronics] = useState([]);

    const { isAdmin, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            setBooks([]);
            setMagazines([]);
            setElectronics([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        Promise.all([
            axiosInstance.get('/books'),
            axiosInstance.get('/magazines'),
            axiosInstance.get('/electronics')
        ])
            .then(([bookResponse, magazineResponse, electronicsResponse]) => {
                setBooks(bookResponse.data);
                setMagazines(magazineResponse.data);
                setElectronics(electronicsResponse.data);
            })
            .catch(error => {
                console.error('Error loading data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [isAuthenticated]);

    const handleAddBook = (newBook) => {
        setBooks((prev) => [...prev, newBook]);
    };

    const handleDeleteBook = (id) => {
        if (!window.confirm('Delete this book?')) return;

        axiosInstance.delete(`/books/${id}`)
            .then(() => {
                setBooks((prev) => prev.filter(b => b.id !== id));
            })
            .catch(error => console.error('Error deleting book:', error));
    };

    const handleUpdateBook = (id, updatedData) => {
        axiosInstance.put(`/books/${id}`, updatedData)
            .then(response => {
                const savedBook = response.data;
                setBooks((prev) => prev.map(b => (b.id === id ? savedBook : b)));
            })
            .catch(error => console.error('Error updating book:', error));
    };

    const handleAddMagazine = (savedMagazine) => {
        if (savedMagazine) {
            setMagazines((prev) => [...prev, savedMagazine]);
            return;
        }

        axiosInstance.get('/magazines')
            .then(response => {
                setMagazines(response.data);
            })
            .catch(error => console.error('Error refreshing magazines:', error));
    };

    const handleDeleteMagazine = (id) => {
        if (!window.confirm('Delete this magazine?')) return;

        axiosInstance.delete(`/magazines/${id}`)
            .then(() => {
                setMagazines((prev) => prev.filter(m => m.id !== id));
            })
            .catch(error => console.error('Error deleting magazine:', error));
    };

    const handleUpdateMagazine = (id, updatedData) => {
        axiosInstance.put(`/magazines/${id}`, updatedData)
            .then(response => {
                const savedMagazine = response.data;
                setMagazines((prev) => prev.map(m => (m.id === id ? savedMagazine : m)));
            })
            .catch(error => console.error('Error updating magazine:', error));
    };

    const handleAddElectronic = (newElectronic) => {
        setElectronics((prev) => [...prev, newElectronic]);
    };

    const handleDeleteElectronic = (id) => {
        if (!window.confirm('Delete this electronic item?')) return;

        axiosInstance.delete(`/electronics/${id}`)
            .then(() => {
                setElectronics((prev) => prev.filter(e => e.id !== id));
            })
            .catch(error => console.error('Error deleting electronic item:', error));
    };

    const handleUpdateElectronic = (id, updatedData) => {
        axiosInstance.put(`/electronics/${id}`, updatedData)
            .then(response => {
                const savedElectronic = response.data;
                setElectronics((prev) => prev.map(e => (e.id === id ? savedElectronic : e)));
            })
            .catch(error => console.error('Error updating electronic item:', error));
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="App">
            {isAuthenticated && <Navbar />}

            <Routes>
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />

                <Route
                    path="/"
                    element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
                />

                <Route
                    path="/inventory"
                    element={
                        isAuthenticated ? (
                            <div className="book-list">
                                <h1>Current Inventory</h1>
                                {books.map((book) => (
                                    <Book
                                        key={book.id}
                                        {...book}
                                        onDelete={handleDeleteBook}
                                        onUpdate={handleUpdateBook}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/add"
                    element={
                        isAuthenticated && isAdmin ? (
                            <div>
                                <h1>Add New Book</h1>
                                <BookForm onBookAdded={handleAddBook} />
                            </div>
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />

                <Route
                    path="/magazines"
                    element={
                        isAuthenticated ? (
                            <div className="book-list">
                                <h1>Current Magazines</h1>
                                {magazines.map((magazine) => (
                                    <Magazine
                                        key={magazine.id}
                                        {...magazine}
                                        onDelete={handleDeleteMagazine}
                                        onUpdate={handleUpdateMagazine}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/add-magazine"
                    element={
                        isAuthenticated && isAdmin ? (
                            <div>
                                <h1>Add Magazine</h1>
                                <MagazineForm onMagazineAdded={handleAddMagazine} />
                            </div>
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />

                <Route
                    path="/electronics"
                    element={
                        isAuthenticated ? (
                            <div className="book-list">
                                <h1>Current Electronics</h1>
                                {electronics.map((electronic) => (
                                    <Electronics
                                        key={electronic.id}
                                        {...electronic}
                                        onDelete={handleDeleteElectronic}
                                        onUpdate={handleUpdateElectronic}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/add-electronic"
                    element={
                        isAuthenticated && isAdmin ? (
                            <div>
                                <h1>Add Electronic Item</h1>
                                <ElectronicsForm onElectronicAdded={handleAddElectronic} />
                            </div>
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />

                <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
            </Routes>
        </div>
    )
}

export default App