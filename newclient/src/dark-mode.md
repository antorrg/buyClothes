Para implementar un light/dark mode con Bootstrap, tienes varias opciones. Te mostraré un enfoque simple y efectivo:

1. Estructura básica (React):
```jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme, setTheme] = useState('light');

  // Función para cambiar el tema
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', newTheme);
  };

  // Efecto para aplicar el tema al cargar y cambiar
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <div className={`app ${theme}-mode`}>
      <button 
        onClick={toggleTheme} 
        className="btn btn-outline-secondary"
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      
      {/* Resto de tu contenido */}
      <div className="container">
        <div className="card">
          <div className="card-body">
            Este es un ejemplo de contenido con tema {theme}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
```

2. Mejora con persistencia:
```jsx
function App() {
  // Recuperar tema guardado o usar light por defecto
  const [theme, setTheme] = useState(() => 
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Resto del código igual...
}
```

3. Opcional - Tema por defecto del sistema:
```jsx
function App() {
  const [theme, setTheme] = useState(() => {
    // Prioridad: localStorage > sistema > light
    return localStorage.getItem('theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  // Resto del código igual...
}
```

Puntos clave:
- Usa el atributo `data-bs-theme` de Bootstrap
- Guarda la preferencia en localStorage
- Usa un botón para cambiar
- Respeta (opcionalmente) la preferencia del sistema

Consejos adicionales:
- Puedes personalizar colores en tu CSS
- Añade transiciones suaves
- Considera iconos o toggle switches más elaborados

¿Quieres que profundice en alguno de estos aspectos?

<hr>
sin borde :

className="btn btn-sm btn-secondary rounded-circle position-fixed top-0 end-0 m-3 d-flex justify-content-center align-items-center"
  style={{ width: '40px', height: '40px', border: 'none' }}