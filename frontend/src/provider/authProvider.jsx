import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

function parseJwtPayload(token) {
    try {
        if (!token || typeof token !== 'string') return null;

        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

        const decoded = atob(padded);
        const json = decodeURIComponent(
            decoded
                .split('')
                .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
                .join('')
        );

        return JSON.parse(json);
    } catch (error) {
        console.error('Failed to decode JWT payload:', error);
        return null;
    }
}

function extractIsAdmin(payload) {
    if (!payload || typeof payload !== 'object') return false;

    const roleSources = [
        payload.role,
        payload.roles,
        payload.authorities,
        payload.auth,
        payload.scope
    ];

    for (const source of roleSources) {
        if (typeof source === 'string') {
            const normalized = source.toLowerCase();
            if (normalized.includes('admin') || normalized.includes('role_admin')) {
                return true;
            }
        }

        if (Array.isArray(source)) {
            const foundAdmin = source.some((item) => {
                if (typeof item !== 'string') return false;
                const normalized = item.toLowerCase();
                return normalized.includes('admin') || normalized.includes('role_admin');
            });

            if (foundAdmin) return true;
        }
    }

    return false;
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            setUser(parseJwtPayload(token));
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    const value = useMemo(() => {
        const isAuthenticated = !!token;
        const isAdmin = extractIsAdmin(user);

        return {
            token,
            user,
            isAuthenticated,
            isAdmin,
            login: (newToken) => setToken(newToken || ''),
            logout: () => setToken('')
        };
    }, [token, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}