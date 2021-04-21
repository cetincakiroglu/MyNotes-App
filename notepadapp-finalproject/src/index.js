import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css'
import App from './App';
import { UserProvider } from './Context/UserContext'
import { NoteProvider } from './Context/NoteContext'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <NoteProvider>
        <App />
      </NoteProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

