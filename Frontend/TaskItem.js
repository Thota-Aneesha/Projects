import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// TaskItem component definition
function TaskItem({ task, handleDelete, handleComplete }) {
  console.log("Task item:", task); // Debugging: log the task item

  return (
    <tr>
      <td><strong>{task.title}</strong></td>
      <td>{task.description}</td>
      <td>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}</td>
      <td>{task.created_at ? new Date(task.created_at).toLocaleString() : 'Invalid Date'}</td>
      <td>
        <input
          type="checkbox"
          checked={task.completed} // Checkbox to mark the task as completed
          onChange={() => handleComplete(task.id, !task.completed)}
          className='me-4'// Add margin to the right of the checkbox
        />
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
