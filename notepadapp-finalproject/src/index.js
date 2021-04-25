import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css'
import App from './App';
import { UserProvider } from './Context/UserContext'
import { NoteProvider } from './Context/NoteContext'
import { TaskProvider } from './Context/TaskContext'
import { CardProvider } from './Context/CardContext'

ReactDOM.render(
    <UserProvider>
      <NoteProvider>
        <TaskProvider>
          <CardProvider>
            <App />
          </CardProvider>
        </TaskProvider>
      </NoteProvider>
    </UserProvider>,
  document.getElementById('root')
);

