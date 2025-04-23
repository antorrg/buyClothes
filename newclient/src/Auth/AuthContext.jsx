import { createContext, useContext, useState, useEffect } from 'react';
import SessionWarning from './SessionWarning';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(undefined);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expirationTime, setExpirationTime] = useState(null);

  const login = (userData, token) => {
    setAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('validToken', token);

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    setExpirationTime(tokenPayload.exp);
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('validToken');
    window.location.reload()
    // Considerar usar navigate en lugar de window.location.reload()
  };

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('validToken');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          const tokenPayload = JSON.parse(atob(storedToken.split('.')[1]));
          const currentTime = Date.now() / 1000;

          if (tokenPayload.exp > currentTime) {
            setAuthenticated(true);
            setUser(JSON.parse(storedUser));
            setExpirationTime(tokenPayload.exp);

            const timeToExpire = (tokenPayload.exp - currentTime) * 1000;
            //console.log('para expirar', timeToExpire)
            setTimeout(() => {
              logout();
            }, timeToExpire);
          } else {
            logout();
          }
        } catch (error) {
          console.error('Error al decodificar el token o al parsear el usuario', error);
          logout();
        }
      } else {
        setAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return null; // O un componente de carga si lo prefieres
  }

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout, expirationTime }}>
      {children}
      {expirationTime && <SessionWarning expirationTime={expirationTime} />}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
