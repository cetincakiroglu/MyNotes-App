import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css'
import App from './App';
import { UserProvider } from './Context/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

