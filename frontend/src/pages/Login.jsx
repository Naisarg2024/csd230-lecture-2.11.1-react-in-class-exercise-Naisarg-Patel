import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { useAuth } from '../provider/authProvider';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const queryParams = new URLSearchParams(location.search);
    const isExpired = queryParams.get("expired");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const sessionExpired = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get('expired') === 'true';
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axiosInstance.post('/rest/auth/login', {
                username,
                password
            });

            const token = response?.data?.token;

            if (!token) {
                setErrorMessage('Login failed. No token was returned.');
                return;
            }

            login(token);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid username or password.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto' }}>
            <h2>Login</h2>

            {sessionExpired && (
                <div
                    style={{
                        backgroundColor: '#fff3cd',
                        color: '#856404',
                        border: '1px solid #ffeeba',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '6px'
                    }}
                >
                    Session Expired. Please log in again.
                </div>
            )}

            {errorMessage && (
                <div
                    style={{
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        border: '1px solid #f5c6cb',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '6px'
                    }}
                >
                    {errorMessage}
                </div>
            )}
            {isExpired && (
                <div style={{
                    backgroundColor: "orange",
                    color: "black",
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "5px",
                    fontWeight: "bold"
                }}>
                    Session expired. Please log in again.
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;