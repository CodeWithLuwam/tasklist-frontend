import Task from './Task';
import './TaskList.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const TaskList = ({ tasks, deleteTask, toggleIsComplete, updateTask }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [targetSection, setTargetSection] = useState(null);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e, section) => {
    e.preventDefault();
    setTargetSection(section);
  };

  const handleDrop = () => {
    if (draggedTask && targetSection) {
      // Update the task's status based on the target section
      const updatedTask = { 
        ...draggedTask, 
        isInProgress: targetSection === 'inProgress',
        isComplete: targetSection === 'done', 
      };
      if (targetSection === 'todo') {
        updatedTask.isInProgress = false;
        updatedTask.isComplete = false;
      }
    // Call a function to update the task in your state
    if (targetSection === 'done') {
      toggleIsComplete(updatedTask.id);
    } else {
      updateTask(updatedTask);
    }    
  }
    setDraggedTask(null);
    setTargetSection(null);
  };

  // Function to move a task to "In Progress" state
  const moveToInProgress = (taskId) => {
    // Find the task with the given taskId in the tasks array
    const taskToUpdate = tasks.find(task => task.id === taskId);

    // If a task with the given id is found
    if (taskToUpdate) {
      // ...taskToUpdate creates a shallow copy of the original task
      // isInProgress is set to true to move it to "In Progress"
      // isComplete is set to false in case it was previously completed
      // Create a new task object called updatedTask with updated properties
      const updatedTask = { ...taskToUpdate, isInProgress: true, isComplete: false };

      // Call the updateTask function (passed in as a prop from App.jsx) with the newly created updatedTask
      // This will update the task in the parent component's state
      updateTask(updatedTask);
    }
  };

  // Function to move a task from "Complete" to "In Progress" state by pressing 'Pause'
  const moveToPaused = (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, isInProgress: true, isComplete: false };
      updateTask(updatedTask);
    }
  };

  // Filter tasks into appropriate categories
  // These filtered arrays are used in the render method (renderTaskSection( 'To-do', todoTasks, 'todo'))
  // Tasks that are neither in progress nor complete
  const todoTasks = tasks.filter(task => !task.isInProgress && !task.isComplete);
  const inProgressTasks = tasks.filter(task => task.isInProgress && !task.isComplete);
  const doneTasks = tasks.filter(task => task.isComplete);

  const renderTaskSection = (title, taskList, sectionName) => (
    <Grid item xs={12} md={4}>
      <Paper 
        className="task-section" 
        elevation={3}
        onDragOver={(e) => handleDragOver(e, sectionName)}
        onDrop={handleDrop}
      >
        <Typography variant="h6" className={`${sectionName}-title`}>{title}</Typography>
        <ul>
          {taskList.map((task) => (
            <li key={task.id} draggable onDragStart={(e) => handleDragStart(e, task)}>
              <Task
                id={task.id}
                title={task.title}
                description={task.description}
                isComplete={task.isComplete}
                deleteTask={deleteTask}
                toggleIsComplete={toggleIsComplete}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
              />
            </li>
          ))}
        </ul>
      </Paper>
    </Grid>
  );

  return (
    <div className="task-list">
      <Grid container spacing={2}>
        {renderTaskSection('To-do', todoTasks, 'todo')}
        {renderTaskSection('In Progress', inProgressTasks, 'inProgress')}
        {renderTaskSection('Done', doneTasks, 'done')}
      </Grid>

    </div>
  );
};

export default TaskList;