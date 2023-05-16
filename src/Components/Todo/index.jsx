import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import { useTasksPerPage } from '../../contexts/TasksPerPageContext';
import { TasksContext } from '../../contexts/TasksContext';

const Todo = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const { tasksPerPage } = useTasksPerPage();

  const [defaultValues] = useState({
    difficulty: 4,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [incomplete, setIncomplete] = useState([]);
  const [sortBy, setSortBy] = useState(''); // Sorting option state
  const { handleChange, handleSubmit } = useForm(addTask, defaultValues);

  function addTask(task) {
    task.id = uuid();
    task.complete = false;
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function toggleComplete(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          task.complete = !task.complete;
        }
        return task;
      })
    );
  }

  useEffect(() => {
    let incompleteCount = tasks.filter((task) => !task.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [tasks]);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const sortedTasks = [...tasks]; // Create a copy of tasks to avoid mutating the original array

  if (sortBy === 'difficulty') {
    sortedTasks.sort((a, b) => a.difficulty - b.difficulty);
  } else if (sortBy === 'name') {
    sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
  }

  const limitedTasks = sortedTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };


  return (
    <>
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

            {/* Sorting options */}
            <div>
        <label>
          Sort by:
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="">None</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </label>
      </div>

      {limitedTasks.map((task) => (
      <div key={task.id}>
        <p>{task.text}</p>
        <div onClick={() => toggleComplete(task.id)}>Complete: {task.complete.toString()}</div>
        <button onClick={() => deleteTask(task.id)}>x</button>
        <p>
          <small>Assigned to: {task.assignee}</small>
        </p>
        <p>
          <small>Difficulty: {task.difficulty}</small>
        </p>
        <button onClick={() => toggleComplete(task.id)}>Toggle Complete</button>
        <hr />
      </div>
    ))}

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index + 1} onClick={() => setCurrentPage(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default Todo;
