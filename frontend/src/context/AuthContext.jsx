import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import httpClient from '../services/httpClient.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  );
  const [loading, setLoading] = useState(true);

  // Persist token
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Auto-login if token exists
  useEffect(() => {
    let isMounted = true;

    const fetchCurrentUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await httpClient.get('/users/current-user');
        if (!isMounted) return;
        setUser(res.data?.data ?? null);
      } catch {
        if (!isMounted) return;
        setUser(null);
        setToken(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = useCallback(async (credentials) => {
    const res = await httpClient.post('/users/login', credentials);
    const payload = res.data?.data;

    if (payload?.accessToken) {
      setToken(payload.accessToken);
    }
    if (payload?.user) {
      setUser(payload.user);
    }

    return payload;
  }, []);

  const register = useCallback(async (formData) => {
    await httpClient.post('/users/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      await httpClient.post('/users/logout');
    } catch {
      // ignore network/logout errors
    } finally {
      setUser(null);
      setToken(null);
    }
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

