import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import { useTasksPerPage } from '../../contexts/TasksPerPageContext';
import { TasksContext } from '../../contexts/TasksContext';
import { UserContext } from '../../contexts/UserContext';


const Todo = () => {
  const { loggedInUser } = useContext(UserContext);
  const [userRole, setUserRole] = useState(loggedInUser ? loggedInUser.role : 'Guest');

  const canAddTask = userRole === 'editor' || userRole === 'admin';
  const canDeleteTask = userRole === 'admin';

  const [showCompleted, setShowCompleted] = useState(false);

  const handleShowCompletedChange = (event) => {
    setShowCompleted(event.target.checked);
  };


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
    setUserRole(loggedInUser ? loggedInUser.role : 'Guest');
  
    let incompleteCount = tasks.filter((task) => !task.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [loggedInUser, tasks]);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  let sortedTasks = [...tasks]; // Create a copy of tasks to avoid mutating the original array

  if (!showCompleted) {
    sortedTasks = sortedTasks.filter(task => !task.complete);
  }

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
      <div>
        <h2>Welcome: {loggedInUser ? loggedInUser.role : 'Guest'}</h2>
      </div>

      {userRole !== 'Guest' && (
        <header data-testid="todo-header">
          <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
        </header>
      )}

      {userRole !== 'Guest' && canAddTask && (
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
      )}

      {userRole !== 'Guest' && (
        <div>
          {/* Sorting options */}
          <label>
            Sort by:
            <select value={sortBy} onChange={handleSortByChange}>
              <option value="">None</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </label>

                  {/* Checkbox for showing completed tasks */}
                  <label>
            Show Completed Tasks:
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={handleShowCompletedChange}
            />
          </label>
        </div>
      )}

{userRole !== 'Guest' && limitedTasks.map((task) => (

    <div key={task.id}>
      <p>{task.title}</p>
      <div onClick={() => toggleComplete(task.id)}>Complete: {task.complete.toString()}</div>
      {canDeleteTask && <button onClick={() => deleteTask(task.id)}>x</button>}
      <p>
        <small>Assigned to: {task.assignee}</small>
      </p>
      <p>
        <small>Difficulty: {task.difficulty}</small>
      </p>
      <hr />
    </div>
  )
)}


      {userRole !== 'Guest' && (
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
      )}
    </>
  );
};


export default Todo;
