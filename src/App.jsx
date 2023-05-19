import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/header';
import Todo from './Components/Todo/index';
import Settings from './Components/Todo/settings';
import { TasksPerPageProvider } from './contexts/TasksPerPageContext';
import { TasksProvider } from './contexts/TasksContext';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <TasksProvider>
          <TasksPerPageProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Todo />} />
              <Route path="/settings" element={<Settings />} />
              {/* Add more routes for additional pages */}
            </Routes>
          </TasksPerPageProvider>
        </TasksProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
