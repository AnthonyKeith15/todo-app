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
/*
     <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>
*/