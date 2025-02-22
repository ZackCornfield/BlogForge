import { createContext } from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const { user, setUser } = useAuth();

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };