import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/main.css'
import App from './App';

import { NoteProvider } from './Components/Context/NoteContext'
import { TaskProvider } from './Components/Context/TaskContext'
import { CardProvider } from './Components/Context/CardContext'
import { AuthProvider } from './Components/Context/AuthContext'
import { EventProvider } from './Components/Context/EventContext'

ReactDOM.render(
  <AuthProvider>
    <NoteProvider>
      <TaskProvider>
        <EventProvider>
          <CardProvider>
            <App />
          </CardProvider>
        </EventProvider>
      </TaskProvider>
    </NoteProvider>
  </AuthProvider>,
  document.getElementById('root')
);

