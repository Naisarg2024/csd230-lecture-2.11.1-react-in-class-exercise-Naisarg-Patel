import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav style={{
            padding: '1rem',
            backgroundColor: '#222',
            color: 'white',
            marginBottom: '20px',
            display: 'flex',
            gap: '20px',
            borderRadius: '8px'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                🏠 Home
            </Link>

            <Link to="/inventory" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                📚 View Inventory
            </Link>

            <Link to="/add" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                ➕ Add New Book
            </Link>

            <Link to="/magazines" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                📰 View Magazines
            </Link>

            <Link to="/add-magazine" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                ➕ Add New Magazine
            </Link>

            <Link to="/electronics" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                💻 View Electronics
            </Link>

            <Link to="/add-electronic" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                ➕ Add Electronic
            </Link>
        </nav>
    );
}

export default Navbar;
