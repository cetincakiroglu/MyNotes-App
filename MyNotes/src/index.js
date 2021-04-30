import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css'
import App from './App';

import { NoteProvider } from './Context/NoteContext'
import { TaskProvider } from './Context/TaskContext'
import { CardProvider } from './Context/CardContext'
import { AuthProvider } from './Context/AuthContext'

ReactDOM.render(
  <AuthProvider>
      <NoteProvider>
        <TaskProvider>
          <CardProvider>
            <App />
          </CardProvider>
        </TaskProvider>
      </NoteProvider>
  </AuthProvider>,
  document.getElementById('root')
);

