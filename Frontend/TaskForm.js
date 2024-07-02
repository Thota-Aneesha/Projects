import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// TaskForm component definition
const TaskForm = ({ handleSubmit, handleInputChange, newTask }) => {

  // Handle date input change
  const handleDateChange = (e) => {
    const { name, value } = e.target;

    // Convert date to YYYY-MM-DD format
    const formattedDate = new Date(value).toISOString().split('T')[0];
    
    // Call handleInputChange with the formatted date
    handleInputChange({ target: { name, value: formattedDate } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label></label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your Task"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label></label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your Description"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label></label>
        <input
          type="date"
          className="form-control"
          name="due_date"
          value={newTask.due_date}
          onChange={handleDateChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3 me-2">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TaskForm;
