import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('light')

  //Cambiar tema
  const toggleTheme = ()=>{
    const newTheme = theme === 'light'? 'dark' : 'light';
    setTheme(newTheme);
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', newTheme);
  }
  useEffect(()=>{
    document.documentElement.setAttribute('data-bs-theme', theme);
  },[theme])

  return (
    <div className={`app ${theme}-mode`}>
    <button 
      onClick={toggleTheme} 
      className="btn btn-sm btn-outline-secondary position-fixed top-0 end-0 m-3"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
      <div className='container-md'>
      <div className='row'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button className='btn btn-sm btn-outline-primary' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <div className='card border p-2 '>
          <p className='h3'>Titulo</p>
          <p>Este es un pequeño test para ver si funciona el modo dark</p>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
    </div>
  )
}

export default App
