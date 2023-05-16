import React, { useContext, useState } from 'react';
import { useTasksPerPage } from '../../contexts/TasksPerPageContext';

const Settings = () => {
  const { tasksPerPage, updateTasksPerPage } = useTasksPerPage();
  const [inputValue, setInputValue] = useState(tasksPerPage);
  const [sortBy, setSortBy] = useState(''); // State for sorting option

  const handleInputChange = (event) => {
    setInputValue(Number(event.target.value));
  };

  const handleUpdateClick = () => {
    updateTasksPerPage(inputValue);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

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
      <button onClick={handleUpdateClick}>Update</button>
    </div>
  );
};

export default Settings;
