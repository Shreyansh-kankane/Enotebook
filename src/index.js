import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { AppProvider } from './context';
import AlertState from './context/alert/AlertState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <AlertState>
        <App />
      </AlertState>
    </React.StrictMode>
);
