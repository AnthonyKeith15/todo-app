import React, { createContext, useContext, useState } from 'react';

const TasksPerPageContext = createContext();

export const TasksPerPageProvider = ({ children }) => {
  const [tasksPerPage, setTasksPerPage] = useState(5);

  const updateTasksPerPage = (value) => {
    setTasksPerPage(value);
  };

  return (
    <TasksPerPageContext.Provider value={{ tasksPerPage, updateTasksPerPage }}>
      {children}
    </TasksPerPageContext.Provider>
  );
};

export const useTasksPerPage = () => useContext(TasksPerPageContext);
