import React, { useContext, useState, useEffect } from 'react';
import { useTasksPerPage } from '../../contexts/TasksPerPageContext';
import { UserContext } from '../../contexts/UserContext';

const Settings = () => {
  const { loggedInUser } = useContext(UserContext);
  const [userRole, setUserRole] = useState(loggedInUser ? loggedInUser.role : 'Guest');
  const [showCompleted, setShowCompleted] = useState(false); // State for show completed tasks

  const { tasksPerPage, updateTasksPerPage } = useTasksPerPage();
  const [inputValue, setInputValue] = useState(tasksPerPage);
  const [sortBy, setSortBy] = useState('');

  const handleInputChange = (event) => {
    setInputValue(Number(event.target.value));
  };

  const handleUpdateClick = () => {
    updateTasksPerPage(inputValue);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleToggleCompleted = () => {
    setShowCompleted((prevShowCompleted) => !prevShowCompleted);
  };

  useEffect(() => {
    setUserRole(loggedInUser ? loggedInUser.role : 'Guest');
  }, [loggedInUser]);

  if (userRole === 'Guest') {
    return (
      <div>
        <h2>Settings</h2>
        <p>Settings are not available for guests.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Settings</h2>
      <label>
        Tasks per Page:
        <input type="number" min={1} value={inputValue} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Sort by:
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="">None</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </label>
      <br />
      <label>
        Show Completed Tasks:
        <input type="checkbox" checked={showCompleted} onChange={handleToggleCompleted} />
      </label>
      <button onClick={handleUpdateClick}>Update</button>
    </div>
  );
};

export default Settings;
