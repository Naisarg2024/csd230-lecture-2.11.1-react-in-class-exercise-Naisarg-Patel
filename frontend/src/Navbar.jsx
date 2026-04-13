import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './provider/authProvider';

function Navbar() {
    const { isAdmin, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                padding: '15px',
                backgroundColor: '#333'
            }}
        >
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                🏠 Home
            </Link>

            <Link to="/inventory" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                📚 View Books
            </Link>

            {isAdmin && (
                <Link to="/add" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                    ➕ Add New Book
                </Link>
            )}

            <Link to="/magazines" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                📰 View Magazines
            </Link>

            {isAdmin && (
                <Link to="/add-magazine" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                    ➕ Add New Magazine
                </Link>
            )}

            <Link to="/electronics" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                💻 View Electronics
            </Link>

            {isAdmin && (
                <Link to="/add-electronic" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                    ➕ Add Electronic
                </Link>
            )}

            {isAuthenticated && (
                <button
                    onClick={handleLogout}
                    style={{
                        background: 'transparent',
                        border: '1px solid white',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Logout
                </button>
            )}
        </nav>
    );
}

export default Navbar;