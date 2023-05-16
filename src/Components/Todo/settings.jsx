import React, { useContext, useState } from 'react';
import { useTasksPerPage } from '../../contexts/TasksPerPageContext';

const Settings = () => {
  const { tasksPerPage, updateTasksPerPage } = useTasksPerPage();
  const [inputValue, setInputValue] = useState(tasksPerPage);

  const handleInputChange = (event) => {
    setInputValue(Number(event.target.value));
  };

  const handleUpdateClick = () => {
    updateTasksPerPage(inputValue);
  };

  return (
    <div>
      <h2>Settings</h2>
      <label>
        Tasks per Page:
        <input type="number" min={1} value={inputValue} onChange={handleInputChange} />
      </label>
      <button onClick={handleUpdateClick}>Update</button>
    </div>
  );
};

export default Settings;
