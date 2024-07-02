import React from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

// TaskList component definition
function TaskList({ tasks, handleDelete, handleSubmit, handleInputChange, newTask, handleFilterChange, currentFilter, handleComplete }) {
  console.log("Tasks data:", tasks); // Debugging: log the tasks data

  return (
    <div className="container">
      <TaskForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        newTask={newTask}
      />
      <div className="btn-group mt-3">
        <button className={`btn btn-primary ${currentFilter === 'Active' ? 'active' : ''}`} onClick={() => handleFilterChange('Active')}>Active</button>
        <button className={`btn btn-primary ${currentFilter === 'Completed' ? 'active' : ''}`} onClick={() => handleFilterChange('Completed')}>Completed</button>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
