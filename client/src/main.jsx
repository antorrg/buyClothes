import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import {Provider}from 'react-redux';
import store from './Redux/store'
import { AuthProvider} from './Auth/AuthContext/AuthContext';


const apiUrl = import.meta.env.VITE_URL;

axios.defaults.baseURL = apiUrl;


const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Provider store= {store}>
    <BrowserRouter>
    <ToastContainer />
      <App/>
    </BrowserRouter>
    </Provider>
    </AuthProvider>

  </React.StrictMode>
);
