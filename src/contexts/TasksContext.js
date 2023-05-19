import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      title: 'Make List',
      difficulty: 4,
      assignee: "Will Willis",
      complete: true,
    },
    {
      title: 'Check List Twice',
      difficulty: 2,
      assignee: "Santa Clause",
      complete: false,
    },
    {
      title: 'Dinner With me (I Cant cancel that again)',
      difficulty: 5,
      assignee: "Cat In the hat",
      complete: true,
    },
  ]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        const fetchedTasks = response.data;
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
