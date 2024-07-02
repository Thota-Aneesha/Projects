import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  // Define state variables
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });
  const [filter, setFilter] = useState('Active');


  // useEffect to fetch tasks whenever the filter changes
  useEffect(() => {
    fetchTasks();
  }, [filter]);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:8000/tasks/');
    const filteredTasks = response.data.filter(task => {
      if (filter === 'Active') return !task.completed;
      if (filter === 'Completed') return task.completed;
      return true;
    });
    setTasks(filteredTasks);
  };

  // Handle input change for the new task form

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission to create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/tasks/', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
    setNewTask({ title: '', description: '', due_date: '' });
  };

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

   // Handle task completion status update
  const handleComplete = async (taskId, completed) => {
    try {
      await axios.patch(`http://localhost:8000/tasks/${taskId}`, { completed });
      fetchTasks(); // Refetch tasks to ensure the list is updated correctly
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Handle filter change (Active/Completed)
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4"><center>Todo List Application</center></h1>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/tasks' element={
            <>
              <TaskList
                tasks={tasks}
                handleDelete={handleDelete}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                newTask={newTask}
                handleFilterChange={handleFilterChange}
                currentFilter={filter}
                handleComplete={handleComplete}
              />
            </>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
