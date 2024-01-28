// Importa las dependencias necesarias
import { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Componentes
import AdminPage from './AdminPage';
import LoginPage from './LoginPage';

// Función principal de la aplicación
function App() {
  // Estado para indicar si el usuario está autenticado
  const [authenticated, setAuthenticated] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    // Lógica para autenticar al usuario (por ejemplo, mediante una solicitud al servidor)
    // Después de autenticar, establece el estado a true
    setAuthenticated(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Lógica para cerrar sesión al usuario (por ejemplo, limpiando las cookies o haciendo una solicitud al servidor)
    // Después de cerrar sesión, establece el estado a false
    setAuthenticated(false);
  };

  return (
    <Router>
      <div>
        {/* Rutas públicas */}
        <Route path="/login">
          {/* La página de inicio de sesión solo se muestra si el usuario no está autenticado */}
          {!authenticated ? <LoginPage onLogin={handleLogin} /> : <Redirect to="/admin" />}
        </Route>

        {/* Rutas privadas */}
        <Route path="/admin">
          {/* La página de administración solo se muestra si el usuario está autenticado */}
          {authenticated ? <AdminPage onLogout={handleLogout} /> : <Redirect to="/login" />}
        </Route>
      </div>
    </Router>
  );
}

export default App;
