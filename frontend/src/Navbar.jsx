import { Link } from 'react-router';
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
            <Link to="/" style={{ color: 'white', textDecoration: 'none',
                fontWeight: 'bold' }}>🏠 Home</Link>
            <Link to="/inventory" style={{ color: 'white', textDecoration:
                    'none', fontWeight: 'bold' }}>📚 View Inventory</Link>
            <Link to="/add" style={{ color: 'white', textDecoration:
                    'none', fontWeight: 'bold' }}>➕ Add New Book</Link>
        </nav>
    );
}
export default Navbar;
